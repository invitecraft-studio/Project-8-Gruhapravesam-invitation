/* A rangoli (kolam) that draws itself when its section is revealed. */
export default function Kolam({ size = 130 }) {
  const a8 = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg className="kolam" viewBox="-62 -62 124 124" width={size} height={size} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        {a8.map((a) => (
          <path key={a} pathLength="100" transform={`rotate(${a})`} d="M0 -8 C14 -22 14 -40 0 -54 C-14 -40 -14 -22 0 -8" />
        ))}
        {a8.map((a) => (
          <path key={"s" + a} pathLength="100" transform={`rotate(${a + 22.5})`} d="M0 -30 C6 -34 6 -42 0 -46" />
        ))}
        <circle r="6" pathLength="100" />
      </g>
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={(58 * Math.cos((i * Math.PI) / 8)).toFixed(1)} cy={(58 * Math.sin((i * Math.PI) / 8)).toFixed(1)} r="1.7" fill="currentColor" />
      ))}
    </svg>
  );
}
