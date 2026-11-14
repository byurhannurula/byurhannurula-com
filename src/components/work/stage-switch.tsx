'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';

import { FadeStack } from '@/components/work/fade-stack';
import { WindowFrame } from '@/components/work/window-frame';
import type { ProjectShot } from '@/content/projects';
import { useFadeStack } from '@/hooks/use-fade-stack';
import { useTabs } from '@/hooks/use-tabs';
import { cn } from '@/lib/utils';

export interface StageItem {
  id: string;
  name: string;
  /** The icon in the tab. */
  icon: ReactNode;
  /** Text and links of the project, rendered on the server. */
  text: ReactNode;
  shots: ProjectShot[];
}

interface StageSwitchProps {
  items: StageItem[];
}

/**
 * Tabs with the project names and one stage below them. All projects share
 * one window, so a change of project is a cross-fade of the picture, the
 * same as a change of screenshot. Only the selection lives here.
 */
export function StageSwitch({ items }: StageSwitchProps) {
  const ids = items.map((item) => item.id);
  const { selected, tabProps, panelProps } = useTabs(ids, ids[0]);
  // Each project keeps its place when the reader comes back to it.
  const [shotOf, setShotOf] = useState<Record<string, number>>({});

  const current = items.find((item) => item.id === selected) ?? items[0];
  const shot = shotOf[current.id] ?? 0;

  // One flat list of all pictures: the stack can then fade between two
  // projects.
  const pictures = items.flatMap((item) =>
    item.shots.map(({ caption, ...size }) => ({ ...size, alt: caption })),
  );
  const firstOf = (id: string) => {
    let first = 0;
    for (const item of items) {
      if (item.id === id) break;
      first += item.shots.length;
    }
    return first;
  };
  const offset = firstOf(current.id);
  const { seen, shown, preload, markLoaded } = useFadeStack(offset + shot);

  return (
    <>
      <div
        role="tablist"
        aria-label="Projects"
        className="mb-8 flex gap-1 md:mb-10"
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            {...tabProps(item.id)}
            onPointerEnter={() =>
              preload(firstOf(item.id) + (shotOf[item.id] ?? 0))
            }
            // Three names do not fit in one line on a small phone, so the
            // icon sits above the name there.
            className="flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-lg px-3 py-2.5 text-[0.9375rem] leading-tight font-medium text-soft transition-colors duration-200 hover:text-ink aria-selected:bg-sunk aria-selected:text-ink sm:flex-none sm:flex-row sm:gap-2.5 sm:py-2 sm:pr-4 sm:pl-2"
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>
      <div
        {...panelProps}
        className="grid items-start gap-x-12 gap-y-7 md:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] md:in-data-[shots=small]:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]"
      >
        {/* All texts lie in one cell. The cell has the height of the
            longest text, so the page does not move on a change. */}
        <div className="grid">
          {items.map((item) => {
            const active = item.id === current.id;
            return (
              <div
                key={item.id}
                inert={!active}
                className={cn(
                  'col-start-1 row-start-1 transition-opacity ease-soft',
                  // Out first, then in: two texts must not show at once.
                  active
                    ? 'opacity-100 delay-150 duration-400'
                    : 'opacity-0 duration-150',
                )}
              >
                {item.text}
              </div>
            );
          })}
        </div>
        {/* On a phone the picture is first: it has a fixed height, so the
            switch above it and the picture stay in place. */}
        <figure className="max-md:order-first">
          <WindowFrame>
            <FadeStack
              pictures={pictures}
              seen={seen}
              shown={shown}
              onLoaded={markLoaded}
              // `auto` takes the width from layout. It works for lazy
              // pictures only; a browser without it reads the rest.
              sizes="auto, (min-width: 768px) 40rem, 100vw"
            />
          </WindowFrame>
          <figcaption
            aria-live="polite"
            className="mt-3 label-mono text-faint max-md:min-h-[2lh]"
          >
            {current.shots[shot]?.caption}
          </figcaption>
          <div
            // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- a named set of buttons, not a form group
            role="group"
            aria-label={`${current.name} screenshots`}
            className="mt-2 flex gap-2"
          >
            {current.shots.map((item, index) => (
              <button
                key={item.src}
                type="button"
                aria-pressed={index === shot}
                aria-label={`Screenshot ${index + 1} of ${current.shots.length}: ${item.caption}`}
                onClick={() =>
                  setShotOf((all) => ({ ...all, [current.id]: index }))
                }
                onPointerEnter={() => preload(offset + index)}
                onFocus={() => preload(offset + index)}
                className="aspect-16/10 w-12 flex-none overflow-hidden rounded-md bg-sunk opacity-55 shadow-[0_0_0_1px_var(--line)] transition-[opacity,box-shadow] duration-200 hover:opacity-100 aria-pressed:opacity-100 aria-pressed:shadow-[0_0_0_2px_var(--ink)] sm:w-14"
              >
                <Image
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                  sizes="3.5rem"
                  className="size-full object-cover object-top"
                />
              </button>
            ))}
          </div>
        </figure>
      </div>
    </>
  );
}
