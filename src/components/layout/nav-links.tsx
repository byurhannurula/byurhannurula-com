'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/content/nav';
import { useNavIndicator } from '@/hooks/use-nav-indicator';
import { cn } from '@/lib/utils';

function activeHref(pathname: string) {
  return NAV_ITEMS.find(({ href }) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`),
  )?.href;
}

/** The page links, with a pill that slides under the current one. */
export function NavLinks() {
  const active = activeHref(usePathname());
  const { listRef, box, slides } = useNavIndicator(active);

  return (
    <nav aria-label="Main" className="max-md:min-w-0 max-md:flex-1">
      {/* Six links fit from 375 px. Below that the row scrolls sideways, and
          a fade on the right edge says that there is more. */}
      <ul
        ref={listRef}
        className="relative flex max-[374px]:[mask-image:linear-gradient(90deg,#000_calc(100%-1.75rem),transparent)] max-[374px]:pr-6 max-md:[scrollbar-width:none] max-md:overflow-x-auto max-md:overscroll-x-contain max-md:[&::-webkit-scrollbar]:hidden"
      >
        <li
          aria-hidden
          className={cn(
            'pointer-events-none absolute top-0 left-0 h-full rounded-full bg-sunk',
            slides &&
              'transition-[transform,width,opacity] duration-350 ease-soft',
            active && box ? 'opacity-100' : 'opacity-0',
          )}
          style={
            box && {
              width: box.width,
              transform: `translateX(${box.left}px)`,
            }
          }
        />
        {NAV_ITEMS.map(({ label, href, when }) => (
          <li
            key={href}
            className={cn(
              'max-md:flex-auto',
              when === 'homelab:on' && 'in-data-[homelab=off]:hidden',
            )}
          >
            <Link
              href={href}
              aria-current={href === active ? 'page' : undefined}
              // On a phone the links share the bar, 40 px high. The focus
              // ring sits inside there: the scrolling row would cut it.
              className="relative z-1 flex h-10 items-center justify-center rounded-full px-[0.1rem] text-[0.8125rem] font-medium whitespace-nowrap text-soft no-underline transition-colors duration-200 hover:text-ink aria-[current=page]:text-ink max-md:focus-visible:-outline-offset-2 min-[400px]:text-sm md:block md:h-auto md:px-[0.8rem] md:py-[0.45rem] md:text-[0.9375rem]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
