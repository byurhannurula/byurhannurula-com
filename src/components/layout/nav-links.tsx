'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/content/nav';
import { useNavIndicator } from '@/hooks/use-nav-indicator';
import { cn } from '@/lib/utils';

/** Pages without a nav link of their own mark the page they belong to. */
const PARENT_OF: Record<string, string> = { '/homelab': '/about' };

function activeHref(pathname: string) {
  const path = PARENT_OF[pathname] ?? pathname;
  return NAV_ITEMS.find(({ href }) =>
    href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`),
  )?.href;
}

/** The page links, with a pill that slides under the current one. */
export function NavLinks() {
  const active = activeHref(usePathname());
  const { listRef, box, slides } = useNavIndicator();

  return (
    <nav aria-label="Main" className="max-md:min-w-0 max-md:flex-1">
      <ul ref={listRef} className="relative flex">
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
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={href} className="max-md:flex-1">
            <Link
              href={href}
              aria-current={href === active ? 'page' : undefined}
              // On a phone the links share the bar in equal parts, 40 px high.
              className="relative z-1 flex h-10 items-center justify-center rounded-full text-[0.8125rem] font-medium text-soft no-underline transition-colors duration-200 hover:text-ink aria-[current=page]:text-ink min-[375px]:text-sm md:block md:h-auto md:px-[0.8rem] md:py-[0.45rem] md:text-[0.9375rem]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
