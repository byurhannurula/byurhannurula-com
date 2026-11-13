'use client';

import type { CSSProperties, ReactNode } from 'react';

import { useTravelCard } from '@/hooks/use-travel-card';
import { cn } from '@/lib/utils';

export interface SocialRowItem {
  name: string;
  href: string;
  icon: ReactNode;
  /** Card body. It must set its own width; the card measures it. */
  card: ReactNode;
}

interface SocialRowProps {
  items: SocialRowItem[];
}

const direction = (dir: number) => ({ '--dir': dir }) as CSSProperties;

/**
 * Icon links that share ONE preview card. The card travels and resizes
 * between them, so it reads as one object that points at different things.
 * The `socials` option picks the body in CSS: the rich card or the name alone.
 *
 * The interaction comes from Colin Lienard's Contacts component (MIT):
 * github.com/colinlienard/colinlienard.com.
 *
 * The card is aria-hidden and adds no tab stop: it repeats where the link
 * under it goes.
 */
export function SocialRow({ items }: SocialRowProps) {
  const {
    rowRef,
    measure,
    point,
    close,
    open,
    index,
    swap,
    generation,
    travels,
    box,
  } = useTravelCard();

  const body = (item: SocialRowItem | undefined) =>
    item ? (
      <>
        <div className="relative in-data-[socials=tooltip]:hidden">
          {item.card}
        </div>
        <div className="hidden px-[0.7rem] py-[0.4rem] font-mono text-xs leading-[1.2] whitespace-nowrap text-ink in-data-[socials=tooltip]:block">
          {item.name}
        </div>
      </>
    ) : null;

  return (
    // The handlers only dismiss a decorative card, so no role fits the row.
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={rowRef}
      onPointerLeave={close}
      onBlur={(event) => {
        // Only when focus left the row, not when it moved along it.
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') close();
      }}
      className="relative -ml-[0.6rem] flex w-fit gap-[0.2rem] in-data-[footer=centre]:ml-0 in-data-[socials=text]:hidden"
    >
      {items.map(({ name, href, icon }, i) => (
        <a
          key={name}
          href={href}
          aria-label={name}
          onPointerEnter={(event) => {
            // A touch would open a card that the same tap tries to follow.
            if (event.pointerType === 'mouse') point(i, event.currentTarget);
          }}
          onFocus={(event) => {
            // Keyboard focus only. A tap or a click also gives focus.
            if (event.currentTarget.matches(':focus-visible')) {
              point(i, event.currentTarget);
            }
          }}
          // Above the bridge at the end of the row.
          className="relative z-10 grid size-10 place-items-center rounded-[0.8rem] text-soft [transition:background-color_.2s,color_.2s,translate_.3s_var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-sunk hover:text-ink focus-visible:-translate-y-0.5 focus-visible:bg-sunk focus-visible:text-ink [&_svg]:size-[1.15rem]"
        >
          {icon}
        </a>
      ))}

      {open ? (
        <div
          aria-hidden
          style={{
            // The travel is a transform, not `left`: it changes on every icon
            // the pointer crosses, and a transform does not lay out the card.
            transform: `translateX(calc(${box.left}px - 50%))`,
            width: box.width || undefined,
            height: box.height || undefined,
          }}
          className={cn(
            'social-card absolute bottom-[calc(100%+0.5rem)] left-0 z-20 overflow-hidden rounded-md border border-line-strong bg-card shadow-lift in-data-[socials=tooltip]:rounded-[0.6rem]',
            travels &&
              'transition-[transform,width,height] duration-300 ease-soft',
          )}
        >
          {swap ? (
            <div
              key={`out-${generation}`}
              style={direction(swap.dir)}
              className="social-body-out absolute bottom-0 left-0"
            >
              {body(items[swap.from])}
            </div>
          ) : null}
          <div
            key={`in-${generation}`}
            ref={measure}
            style={direction(swap?.dir ?? 0)}
            className={cn('absolute bottom-0 left-0', swap && 'social-body-in')}
          >
            {body(items[index])}
          </div>
        </div>
      ) : null}

      {/* Covers the gap between the icons and the card. Without it the
          pointer leaves the row on the way up and the card closes. */}
      <div className="absolute inset-0 -top-2" />
    </div>
  );
}
