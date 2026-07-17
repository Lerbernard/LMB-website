"use client";
import { useId } from "react";

// AI Image Detection product mark - a magnifier examining the letters "AI".
// The gradient id must be UNIQUE PER INSTANCE: duplicate SVG ids make every
// copy reference the first one in the DOM, and if that copy is display:none
// (like the nav brand on mobile), the gradient renders as invisible.
export default function DetectorLogo({ size = 44, spinning = false }) {
  const uid = useId().replace(/:/g, "");
  const gid = `dgrad-${uid}`;
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" aria-hidden="true"
      className={spinning ? "spin" : undefined}
      style={{ borderRadius: size * 0.22 }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C4DFF" />
          <stop offset="1" stopColor="#00BCD4" />
        </linearGradient>
      </defs>
      <rect width="240" height="240" rx="52" fill="#141418" />
      <g transform="translate(114 112)">
        <circle cx="0" cy="0" r="46" fill="none" stroke={`url(#${gid})`} strokeWidth="9" />
        <line x1="33" y1="33" x2="62" y2="62" stroke="#00BCD4" strokeWidth="12" strokeLinecap="round" />
        <text x="0" y="12" fontFamily="Space Grotesk, Arial, sans-serif" fontSize="34"
          fontWeight="700" textAnchor="middle" fill="#fff">AI</text>
      </g>
    </svg>
  );
}
