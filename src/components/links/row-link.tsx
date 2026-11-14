import type { ReactNode } from 'react';

import { BaseLink } from '@/components/links/base-link';
import { ExternalMark } from '@/components/links/external-mark';
import { isExternal } from '@/components/links/link-styles';
import { cn } from '@/lib/utils';

interface RowLinkProps {
  href: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Right side: a date or a state, set in a small pill. */
  meta?: ReactNode;
  className?: string;
}

/**
 * One row in a list of things to read. No line under it: a dotted leader
 * holds the row together, and the row lifts onto a surface on hover.
 */
export function RowLink({
  href,
  title,
  subtitle,
  meta,
  className,
}: RowLinkProps) {
  return (
    <BaseLink
      href={href}
      className={cn(
        // Pulled out past the column and padded back in, so the hover
        // surface is wider than the text and does not crop it.
        'group/link -mx-3 block rounded-md px-3 py-[0.65rem] no-underline transition-colors duration-200 hover:bg-sunk focus-visible:bg-sunk',
        className,
      )}
    >
      <span className="flex items-baseline gap-[0.7rem]">
        {/* The title keeps its colour: the accent on the hover surface is
            under 4.5:1 in the light modes. */}
        <span className="min-w-0 font-medium">
          {title}
          {isExternal(href) ? <ExternalMark className="text-faint" /> : null}
        </span>
        {meta ? (
          <>
            <span
              aria-hidden
              className="min-w-5 flex-1 -translate-y-[0.3em] border-b-2 border-dotted border-line-strong"
            />
            <span className="shrink-0 rounded-full border border-line px-2 py-px font-mono text-[0.6875rem] leading-[1.7] whitespace-nowrap text-faint tabular-nums transition-colors group-hover/link:border-accent-bright group-hover/link:text-ink group-focus-visible/link:border-accent-bright group-focus-visible/link:text-ink">
              {meta}
            </span>
          </>
        ) : null}
      </span>
      {subtitle ? (
        <span className="mt-1 line-clamp-2 block text-[0.875rem] leading-snug text-soft">
          {subtitle}
        </span>
      ) : null}
    </BaseLink>
  );
}
