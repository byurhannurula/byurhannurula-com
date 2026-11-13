const ink = 'stroke-ink stroke-[1.6]';
const thin = 'stroke-line-strong stroke-[1.4]';
const KEYS = [0, 1, 2, 3, 4, 5, 6, 7];

/** Hero drawing for the uses page: a monitor with code and a row of keys. */
export function UsesArt() {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-auto w-full overflow-visible"
    >
      <rect
        pathLength={1}
        x="64"
        y="18"
        width="192"
        height="124"
        rx="12"
        className={`fill-card motion-safe:animate-draw ${ink}`}
      />
      <path className={ink} d="M140 142l-6 22h52l-6-22M118 164h84" />
      <rect
        x="82"
        y="38"
        width="46"
        height="7"
        rx="3.5"
        className="fill-hue-3"
      />
      <rect
        x="134"
        y="38"
        width="70"
        height="7"
        rx="3.5"
        className="fill-line-strong"
      />
      <rect
        x="94"
        y="54"
        width="60"
        height="7"
        rx="3.5"
        className="fill-hue-2"
      />
      <rect
        x="160"
        y="54"
        width="34"
        height="7"
        rx="3.5"
        className="fill-hue-5"
      />
      <rect
        x="94"
        y="70"
        width="38"
        height="7"
        rx="3.5"
        className="fill-hue-6"
      />
      <rect
        x="138"
        y="70"
        width="86"
        height="7"
        rx="3.5"
        className="fill-line-strong"
      />
      <rect
        x="82"
        y="86"
        width="52"
        height="7"
        rx="3.5"
        className="fill-hue-1"
      />
      <rect
        x="140"
        y="84"
        width="2.5"
        height="11"
        rx="1.2"
        className="fill-accent-bright motion-safe:animate-caret"
      />
      {KEYS.map((key) => (
        <rect
          key={key}
          x={58 + key * 26}
          y="186"
          width="22"
          height="22"
          rx="6"
          className={key === 1 ? 'fill-accent-bright' : `fill-card ${thin}`}
        />
      ))}
      <rect
        x="84"
        y="212"
        width="152"
        height="18"
        rx="6"
        className={`fill-card ${thin}`}
      />
    </svg>
  );
}
