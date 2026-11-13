/** Drawing for the notes page top: a sheet of paper with a blinking caret. */
export function NotesArt() {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-auto w-full overflow-visible"
    >
      <rect
        x="96"
        y="24"
        width="160"
        height="196"
        rx="14"
        transform="rotate(7 176 122)"
        className="fill-card stroke-line-strong stroke-[1.4]"
      />
      <rect
        x="80"
        y="22"
        width="160"
        height="196"
        rx="14"
        pathLength={1}
        className="fill-card stroke-ink stroke-[1.6] motion-safe:animate-draw"
      />
      <rect
        x="100"
        y="46"
        width="34"
        height="12"
        rx="6"
        className="fill-hue-5 opacity-85"
      />
      <rect
        x="100"
        y="70"
        width="104"
        height="10"
        rx="5"
        className="fill-ink"
      />
      <rect x="100" y="88" width="70" height="10" rx="5" className="fill-ink" />
      <rect
        x="100"
        y="116"
        width="120"
        height="6"
        rx="3"
        className="fill-line-strong"
      />
      <rect
        x="100"
        y="130"
        width="112"
        height="6"
        rx="3"
        className="fill-line-strong"
      />
      <rect
        x="100"
        y="144"
        width="120"
        height="6"
        rx="3"
        className="fill-line-strong"
      />
      <rect
        x="100"
        y="158"
        width="58"
        height="6"
        rx="3"
        className="fill-line-strong"
      />
      <rect
        x="163"
        y="153"
        width="2.5"
        height="16"
        rx="1.2"
        className="fill-accent-bright motion-safe:animate-caret"
      />
      <rect
        x="100"
        y="184"
        width="120"
        height="16"
        rx="5"
        className="fill-hue-2 opacity-16"
      />
    </svg>
  );
}
