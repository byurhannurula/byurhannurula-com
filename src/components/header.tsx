'use client';

import Link from 'next/link';
import { CommandIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils';
import { LINKS } from '@/constants';
import { BaseLink } from '@/components/common';
import { ThemeSwitcher } from '@/components/theme-switcher';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="container my-8 flex items-center justify-between">
      <Link href="/" className="text-lg font-semibold">
        byurhan.
      </Link>

      <div className=" flex items-center justify-end space-x-8">
        <nav className="flex items-center gap-x-10">
          {LINKS.filter(({ showInMainNav }) => showInMainNav).map(
            ({ label, href }) => {
              const path = `/${pathname.split('/')[1]}`; // active paths on dynamic subpages
              const active = path === href;

              return (
                <BaseLink
                  key={href}
                  href={href}
                  className={cn(
                    'text-sm font-medium hover:text-primary',
                    active ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {label}
                </BaseLink>
              );
            }
          )}
        </nav>

        <span className="h-full w-px bg-foreground/20">&nbsp;</span>

        <div className="flex items-center justify-center gap-2">
          <ThemeSwitcher />

          <button
            className="rounded-lg p-1.5 text-foreground/80 hover:bg-foreground/15"
            aria-label="Search"
          >
            <CommandIcon className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
