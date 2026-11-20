import type { ReactNode } from 'react';

interface CopyVariantProps {
  /** Job first. */
  a: ReactNode;
  /** Builder. */
  b: ReactNode;
  /** Tinkerer. */
  c: ReactNode;
}

/**
 * Three tones of the same text, chosen by the `copy` option. All three are in
 * the HTML and CSS shows one. Personal mode (`mode` option, the nav switch)
 * always shows the tinkerer tone, so its rules carry `!` to win.
 */
export function CopyVariant({ a, b, c }: CopyVariantProps) {
  return (
    <>
      <span className="hidden in-data-[copy=a]:inline in-data-[mode=personal]:hidden!">
        {a}
      </span>
      <span className="hidden in-data-[copy=b]:inline in-data-[mode=personal]:hidden!">
        {b}
      </span>
      <span className="hidden in-data-[copy=c]:inline in-data-[mode=personal]:inline!">
        {c}
      </span>
    </>
  );
}
