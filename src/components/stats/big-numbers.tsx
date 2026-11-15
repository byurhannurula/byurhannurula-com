import type { ReactNode } from 'react';

export interface BigNumber {
  label: string;
  value: number;
  /** Small line under the number. */
  sub?: ReactNode;
  colour: string;
}

/** The headline numbers, each in its own card with a colour mark. */
export function BigNumbers({ items }: { items: BigNumber[] }) {
  return (
    <ul data-reveal className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-5">
      {items.map((item) => (
        <li
          key={item.label}
          className="rounded-xl border border-line bg-card px-5 pt-4 pb-5"
        >
          <p className="flex items-center gap-2 label-mono text-faint">
            <span
              aria-hidden
              className="size-2 rounded-full"
              style={{ background: item.colour }}
            />
            {item.label}
          </p>
          <p className="mt-2 text-[2.25rem] leading-none font-semibold tracking-[-0.04em] tabular-nums">
            {item.value.toLocaleString('en')}
          </p>
          {item.sub ? (
            <p className="mt-2 text-xs text-faint">{item.sub}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
