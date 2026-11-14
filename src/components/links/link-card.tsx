import { BaseLink } from '@/components/links/base-link';
import { ExternalMark } from '@/components/links/external-mark';
import { LinkOrigin, SiteIcon } from '@/components/links/link-origin';
import { hostOf, isExternal } from '@/components/links/link-styles';
import { cn } from '@/lib/utils';

export interface LinkCardProps {
  href: string;
  title?: string;
  description?: string;
  /** Preview picture. Without it the card starts with the icon of the site. */
  image?: string;
  icon?: string;
  /** `side`: picture at the right of the text. `top`: picture above it. */
  layout?: 'side' | 'top';
  className?: string;
}

const SHELL =
  'group/link my-9 block overflow-hidden rounded-lg border border-line text-base leading-[1.5] no-underline transition-[border-color,translate] duration-300 ease-soft hover:-translate-y-0.5 hover:border-line-strong focus-visible:border-line-strong motion-reduce:hover:translate-y-0 in-data-[motion=off]:transition-none in-data-[motion=off]:hover:translate-y-0';

/**
 * A link as a card. The caller states the title and text: nothing is
 * fetched from the target. Three forms: picture at the side, picture on
 * top, or no picture and the icon of the site in its place.
 */
export function LinkCard({
  href,
  title,
  description,
  image,
  icon,
  layout = 'side',
  className,
}: LinkCardProps) {
  const text = (
    <>
      <b className="block font-semibold">{title ?? hostOf(href)}</b>
      {description ? (
        <span className="block text-[0.9375rem] text-soft">{description}</span>
      ) : null}
      <LinkOrigin href={href} className="mt-1" />
      {isExternal(href) ? <ExternalMark hideArrow /> : null}
    </>
  );

  if (!image) {
    return (
      <BaseLink
        href={href}
        className={cn(SHELL, 'flex items-start gap-4 p-4', className)}
      >
        <SiteIcon href={href} icon={icon} className="mt-0.5 size-9" />
        <span className="block min-w-0 flex-1">{text}</span>
      </BaseLink>
    );
  }

  const picture = (
    // A preview from any host, in a fixed box: see figure.tsx.
    // oxlint-disable-next-line nextjs/no-img-element
    <img
      src={image}
      alt=""
      loading="lazy"
      decoding="async"
      className={cn(
        'w-full object-cover object-top transition-[scale] duration-500 ease-soft group-hover/link:scale-[1.03] motion-reduce:transition-none in-data-[motion=off]:scale-100 in-data-[motion=off]:transition-none',
        layout === 'top' ? 'aspect-video' : 'aspect-16/10',
      )}
    />
  );

  return layout === 'top' ? (
    <BaseLink href={href} className={cn(SHELL, className)}>
      <span className="block overflow-hidden border-b border-line bg-sunk">
        {picture}
      </span>
      <span className="block min-w-0 px-5 py-4">{text}</span>
    </BaseLink>
  ) : (
    <BaseLink
      href={href}
      className={cn(
        SHELL,
        'grid grid-cols-1 items-center gap-4 py-[0.6rem] pr-[0.6rem] pl-5 md:grid-cols-[1fr_9rem]',
        className,
      )}
    >
      <span className="block min-w-0 py-2 md:py-0">{text}</span>
      {/* The side picture is hidden on a narrow screen. */}
      <span className="hidden overflow-hidden rounded-md bg-sunk md:block">
        {picture}
      </span>
    </BaseLink>
  );
}
