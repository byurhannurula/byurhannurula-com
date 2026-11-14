import { ArrowUpRight } from 'lucide-react';

import { BaseLink } from '@/components/links/base-link';
import { ExternalMark } from '@/components/links/external-mark';
import { SiteIcon } from '@/components/links/link-origin';
import { hostOf, isExternal, pathOf } from '@/components/links/link-styles';
import { cn } from '@/lib/utils';

interface LinkChipProps {
  href: string;
  /** Without it the chip shows the domain. */
  title?: string;
  icon?: string;
}

/** A small pill inside a sentence that shows where the link goes. */
export function LinkChip({ href, title, icon }: LinkChipProps) {
  return (
    <BaseLink
      href={href}
      className="group/link inline-flex items-center gap-[0.35em] rounded-full bg-sunk px-[0.6em] py-[0.1em] text-[0.875em] font-medium whitespace-nowrap no-underline transition-colors hover:bg-accent-soft focus-visible:bg-accent-soft"
    >
      {icon ? (
        // oxlint-disable-next-line nextjs/no-img-element
        <img src={icon} alt="" loading="lazy" className="size-[1em]" />
      ) : null}
      {title ?? hostOf(href)}
      {isExternal(href) ? (
        <ExternalMark className="ml-0 size-[0.9em] text-faint group-hover/link:text-accent" />
      ) : null}
    </BaseLink>
  );
}

interface LinkBarProps {
  href: string;
  icon?: string;
  className?: string;
}

/**
 * A full-width bar of icon, domain and path, for a link that stands alone
 * between two paragraphs and needs no title.
 */
export function LinkBar({ href, icon, className }: LinkBarProps) {
  const path = pathOf(href);
  return (
    <BaseLink
      href={href}
      className={cn(
        'group/link my-6 flex items-center gap-3 rounded-md border border-line p-3 no-underline transition-colors hover:border-accent focus-visible:border-accent',
        className,
      )}
    >
      <SiteIcon href={href} icon={icon} />
      <span className="min-w-0 flex-1 truncate font-mono text-[12.5px] tracking-[0.06em] uppercase">
        <span className="text-ink transition-colors group-hover/link:text-accent">
          {hostOf(href)}
        </span>
        {path ? <span className="text-faint">{path}</span> : null}
      </span>
      {isExternal(href) ? <ExternalMark hideArrow /> : null}
      <ArrowUpRight
        aria-hidden
        className="size-4 shrink-0 text-faint transition-colors group-hover/link:text-accent"
      />
    </BaseLink>
  );
}
