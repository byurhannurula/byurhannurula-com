import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';

import { CommandButton } from '@/components/command/command-button';
import { brand } from '@/lib/brand';

import { LIGHT_MENU_LABEL } from './footer-content';
import { iconButton } from './icon-button';
import { LightMenu } from './light-menu';
import { ModeSwitch } from './mode-switch';
import { NavFrame } from './nav-frame';
import { NavLinks } from './nav-links';

/** The nav bar: brand, page links, search, the mode switch and the light. */
export function SiteNav() {
  return (
    <NavFrame>
      <Link
        href="/"
        className="hidden py-[0.4rem] pr-[0.6rem] pl-[0.85rem] font-bold tracking-[-0.02em] no-underline md:block"
      >
        {brand.wordmark}
        <span className="text-accent">.</span>
      </Link>
      <NavLinks />
      <div className="flex items-center gap-[0.15rem]">
        <CommandButton />
        <ModeSwitch />
        <LightMenu>
          <button
            type="button"
            aria-label={LIGHT_MENU_LABEL}
            data-light-switch
            className={`${iconButton} active:scale-[0.92] active:rotate-40`}
          >
            <Sun aria-hidden className="dark:hidden" />
            <Moon aria-hidden className="hidden dark:block" />
          </button>
        </LightMenu>
      </div>
    </NavFrame>
  );
}
