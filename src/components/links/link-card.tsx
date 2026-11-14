import { BaseLink } from '@/components/links/base-link';
import { ExternalMark } from '@/components/links/external-mark';
import { LinkOrigin, SiteIcon } from '@/components/links/link-origin';
import { LinkPicture } from '@/components/links/link-picture';
import { hostOf, isExternal } from '@/components/links/link-styles';
import { cn } from '@/lib/utils';

export interface LinkCardProps {
  href: string;
  title?: string;
  description?: string;
  /** Preview picture. Without it the card starts with the icon of the site. */
  image?: string;
  /** The icon of the site, for the form without a picture. */
  icon?: string;
  /** Picture beside the text, not above it. Better inside a dense post. */
  compact?: boolean;
  /** Older name for the same choice: `side` is `compact`. */
  layout?: 'side' | 'top';
  /** Drop the picture; the card falls back to the icon of the site. */
  noImage?: boolean;
  className?: string;
}

// The same shell as the old site: a thin border that takes the accent
// colour on hover. No lift and no zoom: the card is part of the text.
const SHELL =
  'group/link my-6 block overflow-hidden rounded-md border border-line no-underline transition-colors hover:border-accent focus-visible:border-accent in-data-[motion=off]:transition-none';

/**
 * A link as a card. It degrades in one direction as the props allow less:
 * picture above the text, picture beside it when compact, and the icon of
 * the site when there is no picture, so the card never falls to bare text.
 *
 * This component only draws. `LinkEmbed` in src/components/mdx fetches the
 * title, text and picture from the target and passes them in.
 */
export function LinkCard({
  href,
  title,
  description,
  image,
  icon,
  compact,
  layout,
  noImage,
  className,
}: LinkCardProps) {
  const beside = compact ?? layout === 'side';
  const picture = noImage ? undefined : image;
  const external = isExternal(href) ? <ExternalMark hideArrow /> : null;
  // A card that leaves the site opens a new tab, as on the old site, so the
  // reader keeps their place in the note.
  const target = isExternal(href) ? '_blank' : undefined;

  const heading = (
    <span className="text-[14.5px] leading-snug font-medium text-ink">
      {title ?? hostOf(href)}
    </span>
  );

  if (!picture) {
    return (
      <BaseLink href={href} target={target} className={cn(SHELL, className)}>
        <span className="flex flex-col gap-1 p-3.5">
          <SiteIcon href={href} icon={icon} className="mb-1.5 size-7" />
          {heading}
          {description ? (
            <span className="text-[13px] leading-snug text-soft">
              {description}
            </span>
          ) : null}
          <LinkOrigin href={href} className="mt-0.5" />
          {external}
        </span>
      </BaseLink>
    );
  }

  return (
    <BaseLink href={href} target={target} className={cn(SHELL, className)}>
      <span className={cn('block', beside && 'sm:flex sm:items-stretch')}>
        <LinkPicture
          src={picture}
          className={cn(
            'aspect-video',
            beside
              ? 'sm:aspect-auto sm:w-40 sm:shrink-0 sm:border-r sm:border-line'
              : 'border-b border-line',
          )}
        />
        <span className="flex min-w-0 flex-col gap-1 p-3.5">
          {heading}
          {description ? (
            <span className="line-clamp-2 text-[13px] leading-snug text-soft">
              {description}
            </span>
          ) : null}
          <LinkOrigin href={href} className="mt-0.5" />
          {external}
        </span>
      </span>
    </BaseLink>
  );
}
