"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// Draggable + resizable crop box over the image. Outputs a cropped JPEG Blob
// at the image's native resolution (the box is tracked in displayed px and
// scaled up on export, so detection quality isn't lost).
export default function CropModal({ src, onCancel, onCrop }) {
  const imgRef = useRef(null);
  const stageRef = useRef(null);
  const [box, setBox] = useState(null); // {x,y,w,h} in displayed px
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const drag = useRef(null);

  const onImgLoad = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    const r = img.getBoundingClientRect();
    // start with a centered box at 70% of the displayed image
    const w = r.width * 0.7, h = r.height * 0.7;
    setBox({ x: (r.width - w) / 2, y: (r.height - h) / 2, w, h });
  }, []);

  const clamp = useCallback((b) => {
    const img = imgRef.current;
    if (!img) return b;
    const r = img.getBoundingClientRect();
    const min = 40;
    let { x, y, w, h } = b;
    w = Math.max(min, Math.min(w, r.width));
    h = Math.max(min, Math.min(h, r.height));
    x = Math.max(0, Math.min(x, r.width - w));
    y = Math.max(0, Math.min(y, r.height - h));
    return { x, y, w, h };
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (!drag.current || !box) return;
      const p = e.touches ? e.touches[0] : e;
      const dx = p.clientX - drag.current.px;
      const dy = p.clientY - drag.current.py;
      const s = drag.current.start;
      if (drag.current.mode === "move") {
        setBox(clamp({ ...s, x: s.x + dx, y: s.y + dy }));
      } else {
        // resize from a corner
        const m = drag.current.mode;
        let nx = s.x, ny = s.y, nw = s.w, nh = s.h;
        if (m.includes("e")) nw = s.w + dx;
        if (m.includes("s")) nh = s.h + dy;
        if (m.includes("w")) { nw = s.w - dx; nx = s.x + dx; }
        if (m.includes("n")) { nh = s.h - dy; ny = s.y + dy; }
        setBox(clamp({ x: nx, y: ny, w: nw, h: nh }));
      }
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
  }, [box, clamp]);

  const startDrag = (mode) => (e) => {
    e.preventDefault();
    const p = e.touches ? e.touches[0] : e;
    drag.current = { mode, px: p.clientX, py: p.clientY, start: box };
  };

  const doCrop = () => {
    const img = imgRef.current;
    if (!img || !box) return;
    const r = img.getBoundingClientRect();
    const sx = natural.w / r.width;
    const sy = natural.h / r.height;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(box.w * sx);
    canvas.height = Math.round(box.h * sy);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
      box.x * sx, box.y * sy, box.w * sx, box.h * sy,
      0, 0, canvas.width, canvas.height
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
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal-card">
        <div className="modal-head">
          <h3>Crop to what matters</h3>
          <button className="btn-ghost btn" onClick={onCancel} style={{ padding: "7px 14px" }}>
            Cancel
          </button>
        </div>
        <div className="crop-stage" ref={stageRef}>
          <img ref={imgRef} src={src} onLoad={onImgLoad} alt="" draggable={false} />
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
                  onMouseDown={(e) => { e.stopPropagation(); startDrag(h)(e); }}
                  onTouchStart={(e) => { e.stopPropagation(); startDrag(h)(e); }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onCancel}>Use full image</button>
          <button className="btn btn-teal" onClick={doCrop}>Crop &amp; check</button>
        </div>
      </div>
    </div>
  );
}
