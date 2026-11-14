'use client';

import { type ComponentType, type ReactNode, useState } from 'react';

import type { LightMenuProps } from './light-menu-radix';

type Menu = ComponentType<LightMenuProps>;

const load = () => import('./light-menu-radix').then((m) => m.LightMenuRadix);

/**
 * The light menu, with its dropdown code out of the first load. The button
 * is plain until a pointer comes near; the Radix menu loads then. A click
 * (or Enter) that comes first opens the menu once the code is in. Not on
 * focus: the swap remounts the button, and a keyboard reader would lose it.
 */
export function LightMenu({ children }: { children: ReactNode }) {
  const [Menu, setMenu] = useState<Menu | null>(null);
  const [clicked, setClicked] = useState(false);

  if (Menu) {
    return <Menu defaultOpen={clicked}>{children}</Menu>;
  }

  const get = () => {
    void load().then((loaded) => setMenu(() => loaded));
  };

  return (
    // The button inside handles the keys; these only watch the events that
    // bubble up from it. `contents`: the wrapper has no box of its own.
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <span
      className="contents"
      onPointerEnter={get}
      onClick={() => {
        setClicked(true);
        get();
      }}
    >
      {children}
    </span>
  );
}
