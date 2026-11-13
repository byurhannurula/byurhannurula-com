'use client';

import type { CSSProperties } from 'react';

import { ACROSS_LABEL, ACROSS_LAYERS, LAYERS } from '@/content/about';
import { useLayerFocus } from '@/hooks/use-layer-focus';
import { cn } from '@/lib/utils';

const ROW =
  'group/row grid w-full grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-1 rounded-md px-1 py-[1.05rem] text-left transition-[padding] duration-400 ease-soft aria-pressed:pl-[0.9rem] md:grid-cols-[auto_9.5rem_1fr]';
const ROW_NAME = 'text-lg font-semibold tracking-[-0.015em]';
const ROW_TEXT =
  'col-start-2 text-soft transition-colors duration-300 group-aria-pressed/row:text-ink md:col-start-3';
const ROW_MARK =
  'size-[0.7rem] -translate-y-[0.05rem] transition-[scale] duration-400 ease-soft group-aria-pressed/row:scale-150';

/**
 * The product as a stack of slabs, with one row of text for each layer.
 * Hover, focus or click on a row lifts its slab and the ones above it.
 */
export function LayerStack({ className }: { className?: string }) {
  const { active, setActive, isLit, liftOf } = useLayerFocus(LAYERS.length);

  const rowEvents = (index: number) => ({
    'aria-pressed': active === index,
    onPointerEnter: () => setActive(index),
    onFocus: () => setActive(index),
    onClick: () => setActive(index),
  });

  return (
    <div
      className={cn(
        'items-center gap-4 md:grid-cols-[24rem_1fr] md:gap-12',
        className,
      )}
    >
      <div
        aria-hidden
        className="relative -my-4 h-104 scale-85 md:my-0 md:scale-100"
      >
        {LAYERS.map((layer, index) => (
          <div
            key={layer.name}
            onPointerEnter={() => setActive(index)}
            style={
              {
                '--c': `var(--hue-${layer.hue})`,
                top: `${index * 3.5 + 2.75}rem`,
                zIndex: 9 - index,
                translate: `-50% calc(${liftOf(index)} * -1)`,
              } as CSSProperties
            }
            className="absolute left-1/2 transition-[translate] duration-380 ease-soft"
          >
            <span
              data-lit={isLit(index) ? '' : undefined}
              className="layer-slab flex size-54 items-end rounded-4xl px-5 py-[1.1rem] text-[1.0625rem] leading-none font-semibold tracking-[-0.01em]"
            >
              {layer.name}
            </span>
          </div>
        ))}
      </div>

      <ol>
        {LAYERS.map((layer, index) => (
          <li key={layer.name} className="border-t border-line">
            <button type="button" className={ROW} {...rowEvents(index)}>
              <span
                aria-hidden
                style={{ background: `var(--hue-${layer.hue})` }}
                className={cn(ROW_MARK, 'rotate-45 rounded-sm')}
              />
              <b className={ROW_NAME}>{layer.name}</b>
              <span className={ROW_TEXT}>{layer.text}</span>
            </button>
          </li>
        ))}
        <li className="border-t border-line px-1 pt-[1.4rem] pb-[0.6rem] font-mono text-xs leading-none text-faint">
          {ACROSS_LABEL}
        </li>
        {ACROSS_LAYERS.map((item, index) => (
          <li
            key={item.name}
            className={cn(
              'border-line',
              // The label above already draws the line over the first row.
              index > 0 && 'border-t',
              index === ACROSS_LAYERS.length - 1 && 'border-b',
            )}
          >
            <button
              type="button"
              className={ROW}
              {...rowEvents(LAYERS.length + index)}
            >
              <span
                aria-hidden
                className={cn(
                  ROW_MARK,
                  'rounded-full shadow-[0_0_0_2px_var(--soft)]',
                )}
              />
              <b className={ROW_NAME}>{item.name}</b>
              <span className={ROW_TEXT}>{item.text}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
