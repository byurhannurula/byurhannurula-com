'use client';

import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

/** Draws the toast set by `showToast`. Render it once. */
export function Toast() {
  const { text, visible } = useToast();
  return (
    <output
      className={cn(
        'pointer-events-none fixed bottom-6 left-1/2 z-80 -translate-x-1/2 rounded-full bg-ink px-4 py-[0.6rem] text-sm leading-none font-medium text-bg shadow-lift [transition:opacity_.25s,translate_.35s_var(--ease-out-soft)]',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2.5 opacity-0',
      )}
    >
      {text}
    </output>
  );
}
