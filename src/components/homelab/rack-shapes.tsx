import type { ReactNode } from 'react';

import type { DeviceId } from '@/content/homelab';

/*
 * The pieces of the rack drawing. They are plain SVG, rendered on the
 * server; <RackPicker> wraps each device shape in a group that can be
 * selected. Not to scale.
 */

const ink = 'stroke-ink stroke-[1.6]';
const thin = 'stroke-line-strong stroke-[1.4]';

// The outline of a device. It turns accent when its group is selected or
// has keyboard focus (`group/dev` is set in <RackPicker>).
const body =
  'transition-[stroke,stroke-width] duration-200 group-focus-visible/dev:stroke-accent-bright group-focus-visible/dev:stroke-[2.6] group-aria-pressed/dev:stroke-accent-bright group-aria-pressed/dev:stroke-[2.6]';

const led = 'motion-safe:animate-blink';

const HOLE_ROWS = Array.from({ length: 16 }, (_, row) => 52 + row * 22.4);
const ROUTER_PORTS = [0, 1, 2, 3, 4];
const SERVER_VENTS = [0, 1, 2, 3, 4, 5, 6];

/** The frame, the mounting holes and the cables. Nothing here is selectable. */
export function RackBackdrop() {
  return (
    <>
      <rect
        className={`fill-card ${ink}`}
        x="40"
        y="30"
        width="240"
        height="380"
        rx="16"
      />
      <path className={thin} d="M40 420h240" />
      {[55, 265].map((x) =>
        HOLE_ROWS.map((y) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="2"
            className="fill-line-strong"
          />
        )),
      )}
      <path
        d="M246 96C330 96 300 90 319 90"
        className="stroke-hue-2 stroke-2"
      />
      <path
        d="M196 184C268 184 262 104 246 104"
        className="stroke-hue-6 stroke-2"
      />
      <path
        d="M246 252C278 252 272 88 246 88"
        className="stroke-hue-3 stroke-2"
      />
      <path
        d="M246 272C290 272 290 258 318 258"
        className="stroke-hue-5 stroke-2"
      />
      <path className={thin} d="M74 208h172" />
    </>
  );
}

export const DEVICE_SHAPES: Record<DeviceId, ReactNode> = {
  router: (
    <>
      <rect
        className={`fill-card ${ink} ${body}`}
        x="74"
        y="70"
        width="172"
        height="46"
        rx="12"
      />
      <rect x="88" y="82" width="32" height="22" rx="5" className="fill-ink" />
      <circle cx="134" cy="93" r="3" className={`fill-hue-2 ${led}`} />
      {ROUTER_PORTS.map((port) => (
        <rect
          key={port}
          className={thin}
          x={152 + port * 17}
          y="87"
          width="12"
          height="12"
          rx="2.5"
        />
      ))}
    </>
  ),
  pi: (
    <>
      <rect
        className={`fill-[color-mix(in_srgb,var(--hue-6)_22%,var(--card))] stroke-hue-6 stroke-[1.6] ${body}`}
        x="100"
        y="158"
        width="96"
        height="48"
        rx="6"
      />
      <rect
        x="112"
        y="172"
        width="22"
        height="22"
        rx="3"
        className="fill-ink"
      />
      <rect
        x="142"
        y="164"
        width="44"
        height="6"
        rx="1.5"
        className="fill-ink opacity-50"
      />
      <rect
        className={`fill-card ${thin}`}
        x="176"
        y="180"
        width="16"
        height="18"
        rx="2"
      />
      <circle
        cx="150"
        cy="190"
        r="2.6"
        className={`fill-hue-1 ${led}`}
        style={{ animationDelay: '0.7s' }}
      />
    </>
  ),
  server: (
    <>
      <rect
        className={`fill-sunk ${ink} ${body}`}
        x="74"
        y="232"
        width="172"
        height="62"
        rx="9"
      />
      <circle className={thin} cx="98" cy="263" r="8" />
      <circle
        cx="98"
        cy="263"
        r="2.8"
        className={`fill-accent-bright ${led}`}
        style={{ animationDelay: '1.3s' }}
      />
      <rect
        x="120"
        y="258"
        width="13"
        height="6"
        rx="1.5"
        className="fill-ink opacity-60"
      />
      <rect
        x="138"
        y="258"
        width="13"
        height="6"
        rx="1.5"
        className="fill-ink opacity-60"
      />
      {SERVER_VENTS.map((vent) => (
        <path key={vent} className={thin} d={`M${172 + vent * 10} 248v30`} />
      ))}
    </>
  ),
  free: (
    <>
      {/* The transparent fill makes the full empty unit a click target. */}
      <rect
        className={`fill-transparent ${thin} ${body}`}
        x="74"
        y="318"
        width="172"
        height="62"
        rx="9"
        strokeDasharray="4 6"
      />
      <text
        x="160"
        y="353"
        textAnchor="middle"
        className="fill-faint font-mono text-[11px]"
      >
        1U free
      </text>
    </>
  ),
  ap: (
    <>
      <circle className={`fill-card ${ink} ${body}`} cx="346" cy="90" r="27" />
      <circle
        cx="346"
        cy="90"
        r="9"
        className={`stroke-hue-2 stroke-[2.2] ${led}`}
        style={{ animationDelay: '0.3s' }}
      />
      <path
        className={thin}
        d="M372 52a38 38 0 0 1 12 20M380 40a52 52 0 0 1 16 28"
      />
    </>
  ),
  zigbee: (
    <>
      <rect
        className={`fill-card ${ink} ${body}`}
        x="318"
        y="249"
        width="46"
        height="18"
        rx="5"
      />
      <path className={ink} d="M364 258l20-34" />
      <circle
        cx="330"
        cy="258"
        r="2.6"
        className={`fill-hue-5 ${led}`}
        style={{ animationDelay: '1.8s' }}
      />
    </>
  ),
};
