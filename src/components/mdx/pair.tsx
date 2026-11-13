import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SideProps {
  children: ReactNode;
}

const side = (label: string, tone: 'good' | 'bad') =>
  function Side({ children }: SideProps) {
    return (
      <div
        className={cn(
          // Lists in a side are plain lines: no bullet, tight rows. Important,
          // because the list's own item rules have the same weight.
          'rounded-lg px-5 py-[1.15rem] [&_li]:py-[0.2rem]! [&_li]:pl-0! [&_li]:before:hidden [&_p]:mb-0 [&_ul]:mb-0',
          tone === 'good' ? 'bg-accent/8' : 'bg-danger/8',
        )}
      >
        <b
          className={cn(
            'mb-[0.7rem] block font-mono text-xs leading-none font-medium',
            tone === 'good' ? 'text-accent' : 'text-danger',
          )}
        >
          {label}
        </b>
        {children}
      </div>
    );
  };

export const Do = side('do', 'good');
export const Dont = side('do not', 'bad');
export const Pros = side('pros', 'good');
export const Cons = side('cons', 'bad');

function Pair({ children }: SideProps) {
  return (
    <div
      data-reveal
      className="my-9 grid gap-3 text-base leading-[1.55] md:grid-cols-2"
    >
      {children}
    </div>
  );
}

/** Two tinted columns: wrap a <Do> and a <Dont>, each with a list. */
export const DoDont = Pair;

/** Two tinted columns: wrap a <Pros> and a <Cons>, each with a list. */
export const ProsCons = Pair;
