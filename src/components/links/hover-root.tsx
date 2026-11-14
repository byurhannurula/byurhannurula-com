'use client';

import type { ReactNode } from 'react';

import { useEscapeDismiss } from '@/hooks/use-escape-dismiss';
import { cn } from '@/lib/utils';

interface HoverRootProps {
  children: ReactNode;
  className?: string;
}

/**
 * The box around a trigger and its <HoverCard>. CSS opens the card on hover
 * and focus, so it works without scripts; this part only adds Escape.
 */
export function HoverRoot({ children, className }: HoverRootProps) {
  const { ref, dismissed, handlers } = useEscapeDismiss<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      data-dismissed={dismissed}
      {...handlers}
      className={cn('group/hover relative inline-block', className)}
    >
      {children}
    </span>
  );
}
