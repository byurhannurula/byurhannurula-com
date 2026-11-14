import { type ReactNode, useId } from 'react';

import { BaseLink } from '@/components/links/base-link';
import { ExternalMark } from '@/components/links/external-mark';
import { HoverCard } from '@/components/links/hover-card';
import { HoverRoot } from '@/components/links/hover-root';
import { LinkOrigin } from '@/components/links/link-origin';
import {
  isExternal,
  isInternal,
  LINK_IN,
  LINK_OUT,
  UNDERLINE_IN_GROUP,
} from '@/components/links/link-styles';
import { cn } from '@/lib/utils';

interface PreviewLinkProps {
  href: string;
  children: ReactNode;
  /** A small drawing in front of the word. It takes the accent on hover. */
  glyph?: ReactNode;
  /** The card, made by the caller. It wins over the three props below. */
  preview?: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  align?: 'start' | 'end';
  className?: string;
}

/**
 * A link in a sentence that shows a small card of its target on hover and
 * on keyboard focus. The card repeats nothing a reader needs to follow the
 * link: it is a look ahead.
 */
export function PreviewLink({
  href,
  children,
  glyph,
  preview,
  title,
  description,
  image,
  align,
  className,
}: PreviewLinkProps) {
  const id = useId();
  const external = isExternal(href);
  return (
    <HoverRoot>
      <BaseLink
        href={href}
        aria-describedby={id}
        className={cn(
          'group/link whitespace-nowrap no-underline',
          isInternal(href) ? LINK_IN : LINK_OUT,
          className,
        )}
      >
        {glyph ? (
          <span
            aria-hidden
            className="mr-[0.28em] inline-flex size-[1.1em] translate-y-[0.2em] text-soft transition-colors duration-200 group-hover/link:text-(color:--lc) group-focus-visible/link:text-(color:--lc) [&>svg]:size-full"
          >
            {glyph}
          </span>
        ) : null}
        <span className={UNDERLINE_IN_GROUP}>{children}</span>
        {external ? <ExternalMark /> : null}
      </BaseLink>
      <HoverCard
        id={id}
        align={align}
        className={preview ? undefined : 'w-64 overflow-hidden p-0'}
      >
        {preview ?? (
          <>
            {image ? (
              // A preview from any host, in a fixed box: see figure.tsx.
              // oxlint-disable-next-line nextjs/no-img-element
              <img
                src={image}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-16/10 w-full border-b border-line object-cover object-top"
              />
            ) : null}
            <span className="block p-3">
              {title ? (
                <b className="block text-[0.875rem] font-semibold text-ink">
                  {title}
                </b>
              ) : null}
              {description ? (
                <span className="block">{description}</span>
              ) : null}
              {external ? <LinkOrigin href={href} className="mt-1" /> : null}
            </span>
          </>
        )}
      </HoverCard>
    </HoverRoot>
  );
}
