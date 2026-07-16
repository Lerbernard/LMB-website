"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// Draggable + resizable crop box over the image. Coordinates are IMAGE-relative
// (0,0 = image top-left), which removes every offset/edge issue: the box can
// always reach all four edges because its bounds ARE the image. Exports a
// native-resolution JPEG.
export default function CropModal({ src, onCancel, onCrop }) {
  const imgRef = useRef(null);
  const stageRef = useRef(null);
  const [box, setBox] = useState(null); // {x,y,w,h} in image-displayed px (0..imgW/H)
  const [disp, setDisp] = useState({ w: 0, h: 0, left: 0, top: 0 });
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const drag = useRef(null);

  // measure the image's displayed size + its offset inside the stage
  const measure = useCallback(() => {
    const img = imgRef.current,
      stage = stageRef.current;
    if (!img || !stage) return null;
    const ir = img.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    const d = {
      w: Math.round(ir.width),
      h: Math.round(ir.height),
      left: Math.round(ir.left - sr.left),
      top: Math.round(ir.top - sr.top),
    };
    setDisp(d);
    return d;
  }, []);

  const onImgLoad = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    // wait for layout to settle (portrait images are height-constrained by
    // max-height, so their displayed width isn't final on the load event)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const d = measure();
        if (!d || d.w === 0) return;
        const w = Math.round(d.w * 0.8),
          h = Math.round(d.h * 0.8);
        setBox({ x: Math.round((d.w - w) / 2), y: Math.round((d.h - h) / 2), w, h });
      }),
    );
  }, [measure]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  useEffect(() => {
    const move = (e) => {
      if (!drag.current) return;
      if (e.cancelable) e.preventDefault();
      const p = e.touches ? e.touches[0] : e;
      const dx = p.clientX - drag.current.px;
      const dy = p.clientY - drag.current.py;
      const s = drag.current.start;
      const W = disp.w,
        H = disp.h; // image bounds; box lives inside [0..W]x[0..H]
      const MIN = 30;
      const m = drag.current.mode;

      if (m === "move") {
        // move: clamp position so the box stays fully inside the image
        const x = Math.min(Math.max(0, s.x + dx), W - s.w);
        const y = Math.min(Math.max(0, s.y + dy), H - s.h);
        setBox({ x, y, w: s.w, h: s.h });
        return;
      }

      // resize: compute the two opposite edges, then clamp each to the image.
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
  }, [disp]);

  const startDrag = (mode) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    measure(); // refresh true image bounds before this interaction
    const p = e.touches ? e.touches[0] : e;
    drag.current = { mode, px: p.clientX, py: p.clientY, start: box };
  };

  const doCrop = () => {
    const img = imgRef.current;
    if (!img || !box) return;
    const sx = natural.w / disp.w;
    const sy = natural.h / disp.h;
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(box.w * sx));
    canvas.height = Math.max(1, Math.round(box.h * sy));
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
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
          <img ref={imgRef} src={src} onLoad={onImgLoad} alt="" draggable={false} />
          {box && (
            <div
              className="crop-box"
              style={{
                left: disp.left + box.x,
                top: disp.top + box.y,
                width: box.w,
                height: box.h,
              }}
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
