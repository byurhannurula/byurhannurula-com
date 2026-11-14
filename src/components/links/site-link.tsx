import type { ReactNode } from 'react';

import { BaseLink } from '@/components/links/base-link';
import { ExternalMark } from '@/components/links/external-mark';
import {
  isExternal,
  LINK_IN,
  LINK_OUT,
  UNDERLINE_IN_GROUP,
} from '@/components/links/link-styles';
import { cn } from '@/lib/utils';

interface SiteLinkProps {
  href: string;
  children: ReactNode;
  /** The icon of the site. Without it the mark is a letter on a tile. */
  icon?: string;
  /**
   * `colour`: the mark is grey and takes its colour on hover.
   * `tilt`: the mark sits at an angle and springs straight on hover.
   */
  effect?: 'colour' | 'tilt';
  className?: string;
}

const MARK = {
  colour:
    'opacity-90 grayscale transition-[filter,opacity,scale] duration-200 ease-out group-hover/link:scale-110 group-hover/link:opacity-100 group-hover/link:grayscale-0 group-focus-visible/link:scale-110 group-focus-visible/link:opacity-100 group-focus-visible/link:grayscale-0',
  // The overshoot curve makes the mark look set down by hand.
  tilt: '-rotate-[14deg] transition-[rotate,scale] duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/link:rotate-0 group-hover/link:scale-[1.06] group-focus-visible/link:rotate-0 group-focus-visible/link:scale-[1.06]',
};

/** A link in a sentence with the icon of its site in front of the word. */
export function SiteLink({
  href,
  children,
  icon,
  effect = 'colour',
  className,
}: SiteLinkProps) {
  const external = isExternal(href);
  return (
    <BaseLink
      href={href}
      className={cn(
        'group/link whitespace-nowrap no-underline',
        external ? LINK_OUT : LINK_IN,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'mr-[0.28em] inline-flex size-[1.05em] shrink-0 translate-y-[0.16em] overflow-hidden rounded-[0.25em] motion-reduce:transition-none in-data-[motion=off]:transition-none',
          MARK[effect],
        )}
      >
        {icon ? (
          // A tiny icon in a fixed box: see tech.tsx.
          // oxlint-disable-next-line nextjs/no-img-element
          <img src={icon} alt="" loading="lazy" className="size-full" />
        ) : (
          <span className="flex size-full items-center justify-center bg-(--lc) font-mono text-[0.62em] font-semibold text-bg">
            {typeof children === 'string' ? children.charAt(0) : ''}
          </span>
        )}
      </span>
      {/* The rule belongs to the word, not to the mark. */}
      <span className={UNDERLINE_IN_GROUP}>{children}</span>
      {external ? <ExternalMark /> : null}
    </BaseLink>
  );
}
