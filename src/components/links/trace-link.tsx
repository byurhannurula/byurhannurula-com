import type { ReactNode } from 'react';

import { BaseLink } from '@/components/links/base-link';
import { ExternalMark } from '@/components/links/external-mark';
import { isExternal } from '@/components/links/link-styles';
import { cn } from '@/lib/utils';

interface TraceLinkProps {
  children: ReactNode;
  /** Without it the word is decorated text and takes no focus. */
  href?: string;
  /** A small drawing in front of the word. */
  glyph?: ReactNode;
  className?: string;
}

/**
 * A word with a circuit trace: on hover and focus a line runs out under the
 * word to a solder pad. For one word in a headline, not for body text.
 */
export function TraceLink({
  children,
  href,
  glyph,
  className,
}: TraceLinkProps) {
  const classes = cn(
    'group/link relative whitespace-nowrap text-ink no-underline',
    className,
  );
  const content = (
    <>
      {glyph ? (
        <span
          aria-hidden
          className="mr-[0.28em] ml-[0.08em] inline-flex size-[1.1em] translate-y-[0.2em] text-soft transition-colors duration-200 group-hover/link:text-accent group-focus-visible/link:text-accent [&>svg]:size-full"
        >
          {glyph}
        </span>
      ) : null}
      {children}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-[0.35em] -bottom-[0.34em] h-[0.36em]',
          glyph ? 'left-[1.4em]' : 'left-0',
        )}
      >
        {/* pathLength is 1, so the dash offset is 1 at any word width. */}
        <svg
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          className="block size-full overflow-visible"
        >
          <path
            d="M0 1H70L76 6H100"
            pathLength={1}
            className="fill-none stroke-accent-bright stroke-[1.5] transition-[stroke-dashoffset] duration-[450ms] ease-soft [stroke-dasharray:1] [stroke-dashoffset:1] group-hover/link:[stroke-dashoffset:0] group-focus-visible/link:[stroke-dashoffset:0] in-data-[motion=off]:transition-none motion-reduce:transition-none"
          />
        </svg>
        {/* The pad is HTML: the SVG stretches to the word, and a circle in
            it would stretch into an oval. */}
        <span className="absolute -right-0.5 bottom-[calc(25%-2.5px)] size-[5px] scale-0 rounded-full bg-accent-bright transition-[scale] duration-200 ease-soft group-hover/link:scale-100 group-hover/link:delay-[350ms] group-focus-visible/link:scale-100 group-focus-visible/link:delay-[350ms] in-data-[motion=off]:transition-none motion-reduce:transition-none" />
      </span>
    </>
  );
  if (!href) return <span className={classes}>{content}</span>;
  return (
    <BaseLink href={href} className={classes}>
      {content}
      {isExternal(href) ? <ExternalMark hideArrow /> : null}
    </BaseLink>
  );
}
