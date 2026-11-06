/* A brass diya. `lit` (0 to 1) grows the flame and the glow. */
export default function Diya({ lit = 1, size = 150, uid = "d", className = "" }) {
  const s = Math.max(0, Math.min(1, lit));
  return (
    <svg className={className} viewBox="0 0 160 160" width={size} height={size} aria-hidden="true">
      <defs>
        <radialGradient id={uid + "g"} cx="50%" cy="45%" r="50%">
          <stop offset="0" stopColor="#fff3b0" stopOpacity={0.9 * s} />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={uid + "b"} x1="0" x2="1">
          <stop offset="0" stopColor="#8a5e14" /><stop offset=".45" stopColor="#f6dc8f" /><stop offset="1" stopColor="#9a6a12" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="76" r={26 + 56 * s} fill={`url(#${uid}g)`} />
      <g style={{ transformOrigin: "80px 100px", transform: `scale(${0.12 + 0.88 * s})`, opacity: s > 0.02 ? 1 : 0 }}>
        <g className="flick">
          <path d="M80 40 C97 62 101 80 80 100 C59 80 63 62 80 40Z" fill="#ffb02e" />
          <path d="M80 64 C89 76 90 86 80 97 C70 86 71 76 80 64Z" fill="#fff3b0" />
        </g>
      </g>
      <rect x="78" y="96" width="4" height="9" rx="1.5" fill="#2b1005" />
      <path d="M26 104 Q80 94 134 104 Q128 136 80 142 Q32 136 26 104Z" fill={`url(#${uid}b)`} stroke="#6b470c" />
      <path d="M134 104 q20 -4 22 -16 q-10 7 -24 6z" fill={`url(#${uid}b)`} stroke="#6b470c" />
      <ellipse cx="80" cy="104" rx="52" ry="8" fill="#5c3a08" />
      <path d="M62 142 h36 l7 10 h-50z" fill={`url(#${uid}b)`} stroke="#6b470c" />
    </svg>
  );
}
