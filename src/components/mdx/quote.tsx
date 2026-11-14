import type { ReactNode } from 'react';

interface QuoteProps {
  /** Who said it. */
  cite?: string;
  /** Where: a book, a talk, a page. */
  source?: string;
  children: ReactNode;
}

/**
 * A large pull quote with its source. For the one line a reader should keep;
 * a plain Markdown quote is enough for the rest.
 */
export function Quote({ cite, source, children }: QuoteProps) {
  return (
    <figure data-reveal className="my-14">
      <blockquote className="text-[1.6em] leading-[1.25] font-medium tracking-[-0.03em] text-balance [&>p]:mb-0 [&>p]:before:content-[open-quote] [&>p]:after:content-[close-quote]">
        {children}
      </blockquote>
      {cite || source ? (
        <figcaption
          // The short line stands where a dash would.
          className="mt-5 flex items-center gap-3 label-mono text-faint before:h-px before:w-8 before:flex-none before:bg-accent-bright"
        >
          <span>
            {cite ? <b className="font-medium text-ink">{cite}</b> : null}
            {cite && source ? ', ' : null}
            {source ? <cite className="not-italic">{source}</cite> : null}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
