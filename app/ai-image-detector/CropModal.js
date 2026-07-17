"use client";
import { useEffect, useRef, useState } from "react";

// CANVAS-BASED crop tool. The image is decoded in JS and drawn onto a canvas
// whose display size WE compute (fit inside the stage, preserve aspect ratio).
// The crop box lives in canvas coordinates with bounds [0..cw]x[0..ch] - pure
// numbers we own, nothing measured from CSS layout - so the box reaches every
// edge on every image shape, portrait or landscape, by construction.
export default function CropModal({ src, onCancel, onCrop }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const imgObj = useRef(null); // decoded Image()
  const [size, setSize] = useState(null); // { cw, ch } canvas px
  const [box, setBox] = useState(null); // { x, y, w, h } in canvas px
  const drag = useRef(null);

  // decode the image, then compute the display size ourselves
  useEffect(() => {
    let alive = true;
    const im = new Image();
    im.onload = () => {
      if (!alive) return;
      imgObj.current = im;
      layout(im);
    };
    im.src = src;

    const onResize = () => imgObj.current && layout(imgObj.current);
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const layout = (im) => {
    const stageW = stageRef.current?.clientWidth || 640;
    const maxW = Math.max(200, stageW);
    const maxH = Math.max(240, Math.round(window.innerHeight * 0.6));
    const scale = Math.min(maxW / im.naturalWidth, maxH / im.naturalHeight);
    const cw = Math.max(1, Math.floor(im.naturalWidth * scale));
    const ch = Math.max(1, Math.floor(im.naturalHeight * scale));
    setSize({ cw, ch });
    const w = Math.round(cw * 0.8),
      h = Math.round(ch * 0.8);
    setBox({ x: Math.round((cw - w) / 2), y: Math.round((ch - h) / 2), w, h });
  };

  // draw whenever the canvas size is (re)set
  useEffect(() => {
    const c = canvasRef.current,
      im = imgObj.current;
    if (!c || !im || !size) return;
    c.width = size.cw;
    c.height = size.ch;
    c.getContext("2d").drawImage(im, 0, 0, size.cw, size.ch);
  }, [size]);

  // drag / resize - bounds are simply [0..cw] x [0..ch]
  useEffect(() => {
    const move = (e) => {
      if (!drag.current || !size) return;
      if (e.cancelable) e.preventDefault();
      const p = e.touches ? e.touches[0] : e;
      const dx = p.clientX - drag.current.px;
      const dy = p.clientY - drag.current.py;
      const s = drag.current.start;
      const W = size.cw,
        H = size.ch,
        MIN = 30;
      const m = drag.current.mode;

      if (m === "move") {
        setBox({
          x: Math.min(Math.max(0, s.x + dx), W - s.w),
          y: Math.min(Math.max(0, s.y + dy), H - s.h),
          w: s.w,
          h: s.h,
        });
        return;
      }
      // resize: move each edge independently, clamped to the canvas
      let left = s.x,
        top = s.y,
        right = s.x + s.w,
        bottom = s.y + s.h;
      if (m.includes("e")) right = Math.min(W, Math.max(s.x + MIN, s.x + s.w + dx));
      if (m.includes("s")) bottom = Math.min(H, Math.max(s.y + MIN, s.y + s.h + dy));
      if (m.includes("w")) left = Math.max(0, Math.min(right - MIN, s.x + dx));
      if (m.includes("n")) top = Math.max(0, Math.min(bottom - MIN, s.y + dy));
      setBox({ x: left, y: top, w: right - left, h: bottom - top });
    };
    const up = () => (drag.current = null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [size]);

  const startDrag = (mode) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const p = e.touches ? e.touches[0] : e;
    drag.current = { mode, px: p.clientX, py: p.clientY, start: box };
  };

  const doCrop = () => {
    const im = imgObj.current;
    if (!im || !box || !size) return;
    const sx = im.naturalWidth / size.cw;
    const sy = im.naturalHeight / size.ch;
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(box.w * sx));
    canvas.height = Math.max(1, Math.round(box.h * sy));
    canvas
      .getContext("2d")
      .drawImage(
        im,
        box.x * sx,
        box.y * sy,
        box.w * sx,
        box.h * sy,
        0,
        0,
        canvas.width,
        canvas.height,
      );
    canvas.toBlob((blob) => blob && onCrop(blob), "image/jpeg", 0.92);
  };

  const handles = ["nw", "ne", "sw", "se"];
  const hpos = (h) => ({
    left: h.includes("w") ? -7 : undefined,
    right: h.includes("e") ? -7 : undefined,
    top: h.includes("n") ? -7 : undefined,
    bottom: h.includes("s") ? -7 : undefined,
    cursor: `${h}-resize`,
  });

  return (
    <div
      className="modal"
      onMouseDown={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="modal-card">
        <div className="modal-head">
          <h3>Crop to what matters</h3>
          <button
            className="btn-ghost btn"
            onClick={onCancel}
            style={{ padding: "7px 14px" }}
          >
            Cancel
          </button>
        </div>
        <div className="crop-stage" ref={stageRef}>
          {/* wrapper is EXACTLY canvas-sized; the box's world = the canvas */}
          <div
            style={{
              position: "relative",
              width: size ? size.cw : "100%",
              height: size ? size.ch : 240,
              margin: "0 auto",
            }}
          >
            <canvas ref={canvasRef} style={{ display: "block" }} />
            {box && (
              <div
                className="crop-box"
                style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
                onMouseDown={startDrag("move")}
                onTouchStart={startDrag("move")}
              >
                {handles.map((h) => (
                  <span
                    key={h}
                    className="crop-h"
                    style={hpos(h)}
                    onMouseDown={startDrag(h)}
                    onTouchStart={startDrag(h)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onCancel}>
            Use full image
          </button>
          <button className="btn btn-teal" onClick={doCrop}>
            Crop &amp; check
          </button>
        </div>
      </div>
    </div>
  );
}
