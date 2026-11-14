import type { ReactNode } from 'react';

import { BaseLink } from '@/components/links/base-link';
import { isExternal } from '@/components/links/link-styles';
import { cn } from '@/lib/utils';

interface IconLinkProps {
  href: string;
  /** The name of the link. The icon alone says nothing to a screen reader. */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * A 40px tile that holds one icon. The edge becomes dashed and green on
 * hover, and the tile gives a little under a press.
 */
export function IconLink({ href, label, children, className }: IconLinkProps) {
  return (
    <BaseLink
      href={href}
      aria-label={isExternal(href) ? `${label} (another site)` : label}
      title={label}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-md border border-line bg-sunk text-soft no-underline transition-[scale,color,border-color] duration-150 ease-soft hover:border-dashed hover:border-accent-bright hover:text-ink focus-visible:border-accent-bright focus-visible:text-ink active:scale-[0.97] motion-reduce:active:scale-100 in-data-[motion=off]:active:scale-100 [&>svg]:size-4',
        className,
      )}
    >
      {children}
    </BaseLink>
  );
}

interface TagLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** A small mono pill for a tag or a filter. Same dashed edge on hover. */
export function TagLink({ href, children, className }: TagLinkProps) {
  return (
    <BaseLink
      href={href}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-line bg-sunk px-[0.6rem] py-[0.2rem] font-mono text-xs leading-[1.5] text-soft no-underline transition-colors duration-150 hover:border-dashed hover:border-accent-bright hover:text-ink focus-visible:border-accent-bright focus-visible:text-ink',
        className,
      )}
    >
      {children}
    </BaseLink>
  );
}
