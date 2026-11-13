const ink = 'stroke-ink stroke-[1.6]';
const thin = 'stroke-line-strong stroke-[1.4]';

/** Hero drawing for the work page: three windows and a cursor. */
export function WorkArt() {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-auto w-full overflow-visible"
    >
      <rect className={thin} x="74" y="22" width="200" height="128" rx="12" />
      <rect
        className={`fill-card ${thin}`}
        x="40"
        y="52"
        width="200"
        height="128"
        rx="12"
      />
      <rect
        pathLength={1}
        className={`fill-card motion-safe:animate-draw ${ink}`}
        x="90"
        y="84"
        width="200"
        height="128"
        rx="12"
      />
      <path className={ink} d="M90 108h200" />
      <circle cx="104" cy="96" r="3.5" className="fill-hue-1" />
      <circle cx="116" cy="96" r="3.5" className="fill-hue-7" />
      <circle cx="128" cy="96" r="3.5" className="fill-hue-6" />
      <rect x="106" y="124" width="70" height="8" rx="4" className="fill-ink" />
      <rect
        x="106"
        y="142"
        width="150"
        height="6"
        rx="3"
        className="fill-line-strong"
      />
      <rect
        x="106"
        y="156"
        width="120"
        height="6"
        rx="3"
        className="fill-line-strong"
      />
      <rect
        x="106"
        y="178"
        width="46"
        height="18"
        rx="9"
        className="fill-accent-bright"
      />
      <rect
        x="160"
        y="178"
        width="46"
        height="18"
        rx="9"
        className="fill-hue-2 opacity-25"
      />
      <path
        d="M262 176l7 22 4-9 9-3-20-10Z"
        className="fill-ink stroke-bg stroke-[1.5]"
      />
    </svg>
  );
}
