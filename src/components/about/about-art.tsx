const STEPS = [
  { x: 28, y: 180, height: 34, fill: 'var(--hue-2)', opacity: 0.14 },
  { x: 94, y: 140, height: 74, fill: 'var(--hue-3)', opacity: 0.14 },
  { x: 160, y: 100, height: 114, fill: 'var(--hue-5)', opacity: 0.14 },
  { x: 226, y: 60, height: 154, fill: 'var(--accent-bright)', opacity: 0.2 },
];

const LABELS = [
  { x: 61, y: 198, yearY: 209, role: 'Intern', year: '2020' },
  { x: 127, y: 158, yearY: 170, role: 'Developer', year: '2020' },
  { x: 193, y: 118, yearY: 130, role: 'Engineer', year: '2022' },
  { x: 259, y: 80, yearY: 92, role: 'Team Lead', year: '2024' },
];

/**
 * The about page drawing: four roles as a staircase, with a flag on the top
 * step. Decorative. All colours are tokens, so it follows the light mode.
 */
export function AboutArt() {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="block h-auto w-full overflow-visible"
    >
      {STEPS.map((step) => (
        <rect
          key={step.x}
          x={step.x}
          y={step.y}
          width={66}
          height={step.height}
          fill={step.fill}
          opacity={step.opacity}
        />
      ))}
      <path
        d="M2 214h26"
        stroke="var(--line-strong)"
        strokeWidth={1.4}
        strokeDasharray="2 5"
      />
      <path d="M292 214h26" stroke="var(--line-strong)" strokeWidth={1.4} />
      <path
        d="M28 214v-34h66v-40h66v-40h66v-40h66v154"
        pathLength={1}
        stroke="var(--ink)"
        strokeWidth={1.6}
        className="motion-safe:animate-draw"
      />
      <path
        d="M259 60V28"
        pathLength={1}
        stroke="var(--ink)"
        strokeWidth={1.6}
        className="motion-safe:animate-draw"
      />
      <path d="M259 28l20 6.5-20 6.5Z" fill="var(--accent-bright)" />
      {LABELS.map((label) => (
        <g key={label.role} textAnchor="middle">
          <text
            x={label.x}
            y={label.y}
            className="fill-ink font-sans text-[11px] font-medium"
          >
            {label.role}
          </text>
          <text
            x={label.x}
            y={label.yearY}
            className="fill-faint font-mono text-[9px]"
          >
            {label.year}
          </text>
        </g>
      ))}
    </svg>
  );
}
