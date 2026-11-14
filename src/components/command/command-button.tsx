'use client';

import { Search } from 'lucide-react';

import { iconButton } from '@/components/layout/icon-button';
import { toggleCommandMenu } from '@/hooks/use-command-menu';

import { COMMAND_COPY } from './command-content';
import { preloadCommandMenu } from './command-preload';
import { Kbd } from './kbd';

/** Search button in the nav bar. The wide bar also shows the shortcut. */
export function CommandButton() {
  return (
    <button
      type="button"
      onClick={toggleCommandMenu}
      onPointerEnter={preloadCommandMenu}
      onFocus={preloadCommandMenu}
      aria-label={COMMAND_COPY.open}
      aria-keyshortcuts="Meta+K Control+K"
      className={`${iconButton} active:scale-[0.94] md:in-data-[nav=wide]:group-data-[size=full]/nav:flex md:in-data-[nav=wide]:group-data-[size=full]/nav:w-auto md:in-data-[nav=wide]:group-data-[size=full]/nav:items-center md:in-data-[nav=wide]:group-data-[size=full]/nav:gap-2 md:in-data-[nav=wide]:group-data-[size=full]/nav:pr-[0.6rem] md:in-data-[nav=wide]:group-data-[size=full]/nav:pl-[0.7rem]`}
    >
      <Search aria-hidden />
      <Kbd className="hidden md:in-data-[nav=wide]:group-data-[size=full]/nav:inline">
        {COMMAND_COPY.shortcut}
      </Kbd>
    </button>
  );
}
