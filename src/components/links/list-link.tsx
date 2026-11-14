import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { BaseLink } from '@/components/links/base-link';
import { ExternalMark } from '@/components/links/external-mark';
import { isExternal } from '@/components/links/link-styles';
import { cn } from '@/lib/utils';

interface ListLinkProps {
  href: string;
  title: string;
  description?: string;
  /** An icon element, shown in a tile at the left. */
  icon?: ReactNode;
  className?: string;
}

/**
 * A large link for a page that is a list of places to go: icon tile, title,
 * one line, and an arrow that shows on hover and focus.
 */
export function ListLink({
  href,
  title,
  description,
  icon,
  className,
}: ListLinkProps) {
  const external = isExternal(href);
  const Arrow = external ? ArrowUpRight : ArrowRight;
  return (
    <BaseLink
      href={href}
      className={cn(
        'group/link flex items-center gap-4 rounded-lg bg-sunk p-4 no-underline transition-[background-color,box-shadow] duration-200 hover:bg-card hover:shadow-soft focus-visible:bg-card',
        className,
      )}
    >
      {icon ? (
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-md bg-bg text-soft transition-colors group-hover/link:text-accent [&>svg]:size-5"
        >
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block font-medium">
          {title}
          {external ? <ExternalMark hideArrow /> : null}
        </span>
        {description ? (
          <span className="block truncate text-[0.875rem] text-soft">
            {description}
          </span>
        ) : null}
      </span>
      <Arrow
        aria-hidden
        className="size-4 shrink-0 -translate-x-1 text-faint opacity-0 transition-[opacity,translate] duration-200 ease-soft group-hover/link:translate-x-0 group-hover/link:opacity-100 group-focus-visible/link:translate-x-0 group-focus-visible/link:opacity-100 in-data-[motion=off]:transition-none motion-reduce:transition-none"
      />
    </BaseLink>
  );
}
