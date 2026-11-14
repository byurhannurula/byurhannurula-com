import { type ReactNode, useId } from 'react';

import { HoverCard } from '@/components/links/hover-card';
import { HoverRoot } from '@/components/links/hover-root';
import { cn } from '@/lib/utils';

interface AnnotatedProps {
  children: ReactNode;
  /** The detail behind the phrase. Plain text, one or two sentences. */
  note: string;
  align?: 'start' | 'end';
  className?: string;
}

/**
 * A phrase with more behind it. The dashed rule says so; the note opens on
 * hover, on focus and on a tap. Not a link: it goes nowhere.
 */
export function Annotated({
  children,
  note,
  align,
  className,
}: AnnotatedProps) {
  const id = useId();
  return (
    <HoverRoot>
      <button
        type="button"
        aria-describedby={id}
        className={cn(
          'relative cursor-help text-left underline decoration-line-strong decoration-dashed decoration-1 underline-offset-4 transition-colors hover:decoration-soft focus-visible:decoration-soft',
          className,
        )}
      >
        {children}
        {/* Out of the line, at the top corner of the phrase, so nothing
            moves when it shows and no gap stays when it does not. */}
        <span
          aria-hidden
          className="absolute -top-[0.7em] -right-[1em] inline-flex size-[1.4em] items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-[0.6em] leading-none text-faint opacity-0 transition-opacity duration-200 group-focus-within/hover:opacity-100 group-hover/hover:opacity-100 in-data-[motion=off]:transition-none motion-reduce:transition-none"
        >
          ?
        </span>
      </button>
      <HoverCard id={id} tone="note" align={align}>
        {note}
      </HoverCard>
    </HoverRoot>
  );
}
