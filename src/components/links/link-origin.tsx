import { hostOf, pathOf } from '@/components/links/link-styles';
import { cn } from '@/lib/utils';

interface LinkOriginProps {
  href: string;
  className?: string;
}

/**
 * The domain at rest, the full path on hover or focus. Put it inside a link
 * with the class `group/link`.
 */
export function LinkOrigin({ href, className }: LinkOriginProps) {
  const path = pathOf(href);
  return (
    <span
      className={cn(
        'flex min-w-0 font-mono text-xs leading-[1.5] text-faint',
        className,
      )}
    >
      <span className="shrink-0 text-accent">{hostOf(href)}</span>
      {path ? (
        // A grid from 0fr to 1fr, because `width: auto` does not transition.
        <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover/link:grid-cols-[1fr] group-focus-visible/link:grid-cols-[1fr] in-data-[motion=off]:transition-none motion-reduce:transition-none">
          <span className="min-w-0 overflow-hidden">
            <span className="block truncate">{path}</span>
          </span>
        </span>
      ) : null}
    </span>
  );
}

interface SiteIconProps {
  href: string;
  /** The icon of the site. Without it the tile shows the first letter. */
  icon?: string;
  className?: string;
}

/** The icon of a site in a small tile. Decorative: the link has the name. */
export function SiteIcon({ href, icon, className }: SiteIconProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[0.5rem] bg-sunk font-mono text-sm font-semibold text-soft uppercase',
        className,
      )}
    >
      {icon ? (
        // An icon from any host, in a fixed box: see tech.tsx.
        // oxlint-disable-next-line nextjs/no-img-element
        <img
          src={icon}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-[62%] object-contain"
        />
      ) : (
        hostOf(href).charAt(0)
      )}
    </span>
  );
}
