// AI Image Detection product mark - a magnifier examining the letters "AI"
// on the brand gradient tile. (Option 4 of the detector concepts.)
export default function DetectorLogo({ size = 44, spinning = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" aria-hidden="true"
      className={spinning ? "spin" : undefined}
      style={{ borderRadius: size * 0.22 }}>
      <defs>
        <linearGradient id="dgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C4DFF" />
          <stop offset="1" stopColor="#00BCD4" />
        </linearGradient>
      </defs>
      <rect width="240" height="240" rx="52" fill="#141418" />
      <g transform="translate(114 112)">
        <circle cx="0" cy="0" r="46" fill="none" stroke="url(#dgrad)" strokeWidth="9" />
        <line x1="33" y1="33" x2="62" y2="62" stroke="#00BCD4" strokeWidth="12" strokeLinecap="round" />
        <text x="0" y="12" fontFamily="Space Grotesk, Arial, sans-serif" fontSize="34"
          fontWeight="700" textAnchor="middle" fill="#fff">AI</text>
      </g>
    </svg>
  );
}
