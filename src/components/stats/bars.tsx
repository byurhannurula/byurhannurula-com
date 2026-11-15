import type { ReactNode } from 'react';

export interface Bar {
  key: string;
  label: ReactNode;
  value: number;
  /** Shown at the end in place of the value. */
  note?: ReactNode;
  colour?: string;
}

/** Labelled horizontal bars, each against the largest. Read as a list. */
export function Bars({ bars }: { bars: Bar[] }) {
  const max = Math.max(1, ...bars.map((bar) => bar.value));
  return (
    <ul data-reveal className="grid gap-3">
      {bars.map((bar) => (
        <li
          key={bar.key}
          className="grid grid-cols-[minmax(0,9rem)_1fr_auto] items-center gap-4 text-sm sm:grid-cols-[minmax(0,16rem)_1fr_auto]"
        >
          <span className="truncate text-soft">{bar.label}</span>
          <span
            aria-hidden
            className="h-2.5 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--ink)_7%,transparent)]"
          >
            <span
              className="block h-full rounded-full"
              style={{
                width: `${(bar.value / max) * 100}%`,
                background: bar.colour ?? 'var(--accent)',
              }}
            />
          </span>
          <span className="min-w-12 text-right font-mono text-xs text-soft tabular-nums">
            {bar.note ?? bar.value.toLocaleString('en')}
          </span>
        </li>
      ))}
    </ul>
  );
}
