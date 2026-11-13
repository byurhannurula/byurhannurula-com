'use client';

import type { ReactNode } from 'react';

import { useTravelCard } from '@/hooks/use-travel-card';
import { cn } from '@/lib/utils';

export interface SocialRowItem {
  name: string;
  href: string;
  icon: ReactNode;
  card: ReactNode;
}

interface SocialRowProps {
  items: SocialRowItem[];
}

/**
 * Icon links with ONE hover card that travels between them. The `socials`
 * option picks the card content in CSS: rich card or the name alone.
 */
export function SocialRow({ items }: SocialRowProps) {
  const {
    rowRef,
    registerItem,
    registerBody,
    point,
    close,
    open,
    active,
    live,
    box,
  } = useTravelCard<HTMLAnchorElement>();

  return (
    <div
      ref={rowRef}
      onPointerLeave={close}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      className="relative -ml-[0.6rem] flex gap-[0.2rem] in-data-[footer=centre]:justify-center in-data-[socials=text]:hidden"
    >
      {items.map(({ name, href, icon }, i) => (
        <a
          key={name}
          ref={(el) => registerItem(i, el)}
          href={href}
          aria-label={name}
          onPointerEnter={() => point(i)}
          onFocus={() => point(i)}
          className="grid size-10 place-items-center rounded-[0.8rem] text-soft [transition:background-color_.2s,color_.2s,translate_.3s_var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-sunk hover:text-ink focus-visible:-translate-y-0.5 focus-visible:bg-sunk focus-visible:text-ink [&_svg]:size-[1.15rem]"
        >
          {icon}
        </a>
      ))}
      <div
        aria-hidden
        style={box}
        className={cn(
          'pointer-events-none absolute bottom-[calc(100%+0.6rem)] left-0 z-5 origin-bottom -translate-x-1/2 overflow-hidden rounded-2xl border border-line-strong bg-card shadow-lift in-data-[socials=tooltip]:rounded-[0.6rem]',
          open ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-0',
          live
            ? '[transition:opacity_.18s,scale_.2s_var(--ease-out-soft),left_.3s_var(--ease-out-soft),width_.3s_var(--ease-out-soft),height_.3s_var(--ease-out-soft)]'
            : '[transition:opacity_.18s,scale_.2s_var(--ease-out-soft)]',
        )}
      >
        {items.map(({ name, card: body }, i) => (
          <div
            key={name}
            ref={(el) => registerBody(i, el)}
            className={cn(
              'absolute top-0 left-0 text-[0.8125rem] leading-[1.4] text-soft [transition:opacity_.3s,filter_.3s,translate_.3s_var(--ease-out-soft)]',
              i === active
                ? 'opacity-100'
                : 'translate-x-[calc(var(--dir,0)*2.5rem)] opacity-0 blur-[5px]',
            )}
          >
            <div className="relative in-data-[socials=tooltip]:hidden">
              {body}
            </div>
            <div className="hidden px-[0.7rem] py-[0.4rem] font-mono text-xs leading-[1.2] whitespace-nowrap text-ink in-data-[socials=tooltip]:block">
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
