import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface HoverCardProps {
  /** The trigger points here with `aria-describedby`. */
  id: string;
  children: ReactNode;
  /** The side of the trigger that the card lines up with. */
  align?: 'start' | 'end';
  /** `card`: a raised surface. `note`: a small dark label. */
  tone?: 'card' | 'note';
  className?: string;
}

const TONE = {
  card: 'border border-line bg-card p-3 text-soft shadow-lift',
  note: 'bg-ink px-3 py-2 text-bg shadow-lift',
};

/**
 * Content that shows above its trigger on hover and on keyboard focus.
 * Must sit in a <HoverRoot>, after the trigger.
 */
export function HoverCard({
  id,
  children,
  align = 'start',
  tone = 'card',
  className,
}: HoverCardProps) {
  return (
    // The outer span has no look: its bottom padding joins the card to the
    // trigger, so the pointer can move onto the card and it stays open.
    <span
      id={id}
      role="tooltip"
      className={cn(
        'pointer-events-none invisible absolute bottom-full z-20 block w-max max-w-[min(18rem,calc(100vw-2.5rem))] translate-y-1 pb-2 opacity-0 transition-[opacity,translate,visibility] duration-200 ease-soft group-hover/hover:pointer-events-auto group-hover/hover:visible group-hover/hover:translate-y-0 group-hover/hover:opacity-100 group-focus-within/hover:pointer-events-auto group-focus-within/hover:visible group-focus-within/hover:translate-y-0 group-focus-within/hover:opacity-100 group-data-[dismissed=true]/hover:invisible! group-data-[dismissed=true]/hover:opacity-0! motion-reduce:transition-none in-data-[motion=off]:translate-y-0 in-data-[motion=off]:transition-none',
        align === 'start' ? 'left-0' : 'right-0',
      )}
    >
      <span
        className={cn(
          'block rounded-md text-left text-[0.8125rem] leading-snug font-normal tracking-normal whitespace-normal',
          TONE[tone],
          className,
        )}
      >
        {children}
      </span>
    </span>
  );
}
