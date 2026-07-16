export default function Logo({ size = 30, spinning = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 108 108"
      className={spinning ? "spin" : undefined} aria-hidden="true">
      <path d="M51.05,37.26 A17,17 0 0 1 67.93,63.75" stroke="#00BCD4"
        strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M56.95,70.74 A17,17 0 0 1 40.07,44.25" stroke="#7C4DFF"
        strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <circle cx="44.87" cy="39.67" r="2.6" fill="#fff" />
      <circle cx="54" cy="54" r="4.6" fill="#fff" />
    </svg>
  );
}
