'use client';

import { useTokenValue } from '@/hooks/use-token-value';

/** The value a CSS variable has right now, read from the stylesheet. */
export function TokenValue({ variable }: { variable: string }) {
  const { ref, value } = useTokenValue<HTMLSpanElement>(variable);
  // The space keeps the line height before the first read.
  return <span ref={ref}>{value || ' '}</span>;
}
