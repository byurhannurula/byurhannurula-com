'use client';

import type { ReactNode } from 'react';

import { useNavScroll } from '@/hooks/use-nav-scroll';
import { useOption } from '@/hooks/use-options';
import { cn } from '@/lib/utils';

interface NavFrameProps {
  children: ReactNode;
}

/**
 * The sticky bar. With `navscroll: shrink` it hides while the reader scrolls
 * down and comes back small. `data-size` lets children react in CSS.
 */
export function NavFrame({ children }: NavFrameProps) {
  const shrink = useOption('navscroll') === 'shrink';
  const { small, hidden, reveal } = useNavScroll(shrink);

  return (
    <header
      data-size={small ? 'small' : 'full'}
      // A hidden bar can still take keyboard focus, so focus brings it back.
      onFocus={reveal}
      // Below 375 px the bar needs the room that the page margin takes.
      className="group/nav pointer-events-none sticky top-3 z-30 flex justify-center px-2 pt-3 min-[375px]:px-5 md:px-0 md:in-data-[nav=wide]:px-5"
    >
      <div
        className={cn(
          'flex items-center gap-1 rounded-full max-md:w-full max-md:in-data-[nav=pill]:max-w-[26rem] border border-line bg-card/78 p-[0.35rem] shadow-soft backdrop-blur-[14px] backdrop-saturate-[1.4] [transition:max-width_.55s_var(--ease-out-soft),translate_.45s_var(--ease-out-soft),opacity_.3s]',
          'in-data-[nav=wide]:w-full in-data-[nav=wide]:justify-between in-data-[nav=wide]:px-2 in-data-[nav=wide]:py-[0.4rem]',
          small
            ? // Room for the brand, five links and two buttons in the widest font.
              'in-data-[nav=wide]:max-w-[33rem]'
            : 'in-data-[nav=wide]:max-w-(--wrap)',
          hidden
            ? 'pointer-events-none -translate-y-[170%] opacity-0'
            : 'pointer-events-auto',
        )}
      >
        {children}
      </div>
    </header>
  );
}
