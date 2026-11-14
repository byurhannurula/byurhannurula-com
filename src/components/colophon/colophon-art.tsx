/**
 * The drawing for the colophon top: a type specimen sheet, the page a
 * printer keeps to show a typeface. Letters, a baseline, and the seven hues.
 */
export function ColophonArt() {
  const hues = [1, 2, 3, 4, 5, 6, 7];
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="40"
        y="18"
        width="240"
        height="204"
        rx="16"
        fill="var(--card)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        pathLength={1}
        className="motion-safe:animate-draw"
      />
      <text
        x="64"
        y="128"
        fill="var(--ink)"
        fontSize="96"
        fontWeight="600"
        letterSpacing="-5"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        Aa
      </text>
      <text
        x="196"
        y="128"
        fill="var(--accent)"
        fontSize="56"
        style={{ fontFamily: 'var(--font-pixel)' }}
      >
        b.
      </text>
      {/* the baseline and the height of a small letter */}
      <path d="M58 129h204" stroke="var(--line-strong)" strokeWidth="1.4" />
      <path
        d="M58 82h204"
        stroke="var(--line-strong)"
        strokeWidth="1.4"
        strokeDasharray="2 6"
      />
      <text
        x="64"
        y="160"
        fill="var(--faint)"
        fontSize="10"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Instrument Sans, 600
      </text>
      {hues.map((hue, index) => (
        <circle
          key={hue}
          cx={70 + index * 30}
          cy="192"
          r="9"
          fill={`var(--hue-${hue})`}
        />
      ))}
    </svg>
  );
}
