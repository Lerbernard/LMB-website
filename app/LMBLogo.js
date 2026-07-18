// LMB Technology mark - the "layers" glyph (option 3), the strongest
// software-studio symbol of the set. Purely CSS-var / currentColor friendly.
export default function LMBLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" aria-hidden="true"
      style={{ borderRadius: size * 0.22 }}>
      <rect width="240" height="240" rx="52" fill="#141418" />
      <g transform="translate(120 120)">
        <rect x="-58" y="-40" width="116" height="22" rx="8" fill="#7C4DFF" />
        <rect x="-58" y="-11" width="86" height="22" rx="8" fill="#F2F2F5" />
        <rect x="-58" y="18" width="116" height="22" rx="8" fill="#00BCD4" />
      </g>
    </svg>
  );
}
