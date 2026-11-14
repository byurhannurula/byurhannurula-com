import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ExternalMarkProps {
  /** Text only, for a link that already shows an arrow. */
  hideArrow?: boolean;
  className?: string;
}

/**
 * Says that a link goes to another site: an arrow for the eye, words for a
 * screen reader. Put it inside a link with the class `group/link`.
 */
export function ExternalMark({ hideArrow, className }: ExternalMarkProps) {
  return (
    <>
      <span className="sr-only"> (another site)</span>
      {hideArrow ? null : (
        <ArrowUpRight
          aria-hidden
          className={cn(
            'ml-[0.1em] inline size-[0.8em] align-baseline transition-transform duration-200 ease-soft group-hover/link:translate-x-px group-hover/link:-translate-y-px motion-reduce:transition-none in-data-[motion=off]:transition-none',
            className,
          )}
        />
      )}
    </>
  );
}
