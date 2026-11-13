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
 * the HTML and CSS shows one. When the tone is chosen, replace each use with
 * plain text and delete this file.
 */
export function CopyVariant({ a, b, c }: CopyVariantProps) {
  return (
    <>
      <span className="hidden in-data-[copy=a]:inline">{a}</span>
      <span className="hidden in-data-[copy=b]:inline">{b}</span>
      <span className="hidden in-data-[copy=c]:inline">{c}</span>
    </>
  );
}
