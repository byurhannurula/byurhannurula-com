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
      className="group/nav pointer-events-none sticky top-3 z-30 flex justify-center pt-3 in-data-[nav=wide]:px-5"
    >
      <div
        className={cn(
          'flex items-center gap-1 rounded-full border border-line bg-card/78 p-[0.35rem] shadow-soft backdrop-blur-[14px] backdrop-saturate-[1.4] [transition:max-width_.55s_var(--ease-out-soft),translate_.45s_var(--ease-out-soft),opacity_.3s]',
          'in-data-[nav=wide]:w-full in-data-[nav=wide]:justify-between in-data-[nav=wide]:px-2 in-data-[nav=wide]:py-[0.4rem]',
          small
            ? 'in-data-[nav=wide]:max-w-[30rem]'
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
