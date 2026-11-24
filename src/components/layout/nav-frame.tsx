'use client';

import { type ReactNode, useRef } from 'react';

import { type NavScrollMode, useNavScroll } from '@/hooks/use-nav-scroll';
import { useOption } from '@/hooks/use-options';
import { cn } from '@/lib/utils';

interface NavFrameProps {
  children: ReactNode;
}

const toMode = (value: string): NavScrollMode =>
  value === 'shrink' || value === 'fixed' ? value : 'hide';

/**
 * The sticky bar. The `navscroll` option says what scroll does to it: hide
 * and come back on a scroll up, only get small, or nothing. `data-size` lets
 * children react in CSS.
 */
export function NavFrame({ children }: NavFrameProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const { small, hidden, reveal } = useNavScroll(
    toMode(useOption('navscroll')),
    barRef,
  );

  return (
    <header
      data-site-nav
      data-size={small ? 'small' : 'full'}
      // A hidden bar can still take keyboard focus, so focus brings it back.
      onFocus={reveal}
      // Below 430 px the bar needs the room that the page margin takes.
      className="group/nav pointer-events-none sticky top-3 z-30 flex justify-center px-2 pt-3 min-[430px]:px-5 md:px-0 md:in-data-[nav=wide]:px-5"
    >
      <div
        ref={barRef}
        className={cn(
          // The bar hides with translate and opacity only. max-width is for
          // the size change; the bar is sticky, so the page does not move.
          // In a page change the bar is a snapshot, and a snapshot loses the
          // backdrop blur: it goes solid then, or it looks see-through.
          'flex items-center gap-1 rounded-full border border-line bg-card/78 in-data-[vt=page]:bg-card p-[0.35rem] shadow-soft backdrop-blur-[14px] backdrop-saturate-[1.4] [transition:max-width_.45s_var(--ease-out-soft),translate_.3s_var(--ease-out-soft),opacity_.2s] max-md:w-full max-md:in-data-[nav=pill]:max-w-[28rem] in-data-[motion=off]:transition-none',
          'in-data-[nav=wide]:w-full in-data-[nav=wide]:justify-between in-data-[nav=wide]:px-2 in-data-[nav=wide]:py-[0.4rem]',
          small
            ? // Room for the brand, the links and two buttons in the widest font.
              'in-data-[nav=wide]:max-w-[38rem] in-data-[nav=wide]:in-data-[homelab=off]:max-w-[33rem]'
            : 'in-data-[nav=wide]:max-w-(--wrap)',
          hidden
            ? 'pointer-events-none -translate-y-[150%] opacity-0'
            : 'pointer-events-auto',
        )}
      >
        {children}
      </div>
    </header>
  );
}
