import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface WindowFrameProps {
  children: ReactNode;
  className?: string;
}

const DOTS = [0, 1, 2];

/** A plain app window around a screenshot: a title bar with three dots. */
export function WindowFrame({ children, className }: WindowFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl bg-card shadow-[0_0_0_1px_var(--line),var(--shadow-soft)]',
        className,
      )}
    >
      <div aria-hidden className="flex h-7 items-center gap-1.5 px-3.5">
        {DOTS.map((dot) => (
          <span key={dot} className="size-2 rounded-full bg-line-strong" />
        ))}
      </div>
      {children}
    </div>
  );
}
