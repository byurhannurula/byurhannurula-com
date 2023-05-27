'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ThemeSwitcher from '@/components/theme-switcher';
import { cn } from '@/utils';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Uses', href: '/uses' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="relative top-0 z-20 bg-[var(--bg)] md:sticky">
      <div className="container flex items-center justify-between py-3">
        <h4 className="text-lg font-semibold tracking-tighter text-zinc-900 dark:text-white">
          <Link href="/">byurhan.</Link>
        </h4>

        <nav className="flex items-center gap-x-3">
          {links.map(({ label, href }) => {
            const path = `/${pathname.split('/')[1]}`; // active paths on dynamic subpages
            const active = path === href;

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm hover:text-zinc-900 hover:dark:text-zinc-100 transition-colors',
                  active
                    ? 'bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-700 dark:text-zinc-400'
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex h-8 w-8 items-center justify-center">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
