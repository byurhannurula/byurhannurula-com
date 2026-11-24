'use client';

import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { techIconUrl } from '@/components/shared/tech';
import { useSound } from '@/hooks/use-sound';
import { wantsStill } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface TechPileProps {
  names: string[];
  className?: string;
}

const DURATION = 450;
/** The same curve as `ease-hover` (tokens.css). */
const EASE = 'cubic-bezier(0.33, 1, 0.68, 1)';

/**
 * Overlapping icon circles that spread and show their names on click.
 * It keeps a long stack to one line until the reader asks for it.
 *
 * The new layout is set at once and each pill glides from where it was
 * (FLIP). Growing the names in CSS instead made the pills jump between
 * lines for the whole animation.
 */
export function TechPile({ names, className }: TechPileProps) {
  const [open, setOpen] = useState(false);
  const play = useSound();
  const box = useRef<HTMLButtonElement>(null);

  const pills = () => [
    ...(box.current?.querySelectorAll<HTMLElement>('[data-pill]') ?? []),
  ];

  const toggle = () => {
    play(open ? 'close' : 'open');
    const el = box.current;
    if (!el || wantsStill()) {
      setOpen(!open);
      return;
    }
    const rects = pills().map((pill) => pill.getBoundingClientRect());
    const height = el.offsetHeight;
    // Render the new layout now, so it can be measured in this click.
    flushSync(() => setOpen(!open));
    const timing = { duration: DURATION, easing: EASE };

    pills().forEach((pill, index) => {
      const from = rects[index];
      if (!from) return;
      const to = pill.getBoundingClientRect();
      // A pill that got wider is shown from its old width, then uncovered.
      // -1px keeps the 1px ring outside the box visible.
      const grow = Math.max(0, to.width - from.width);
      pill.animate(
        [
          {
            translate: `${from.left - to.left}px ${from.top - to.top}px`,
            clipPath: `inset(-1px ${grow - 1}px -1px -1px round 999px)`,
          },
          { translate: '0 0', clipPath: 'inset(-1px round 999px)' },
        ],
        timing,
      );
    });
    // The rows below move with the pile instead of jumping.
    el.animate(
      [{ height: `${height}px` }, { height: `${el.offsetHeight}px` }],
      timing,
    );
  };

  return (
    <button
      ref={box}
      type="button"
      aria-expanded={open}
      aria-label={`${names.length} ${names.length === 1 ? 'tool' : 'tools'}: ${names.join(', ')}`}
      onClick={toggle}
      className={cn(
        // min-h: a 40px tap target around the 34px circles.
        'group/pile inline-flex min-h-10 flex-wrap items-center gap-y-2 pl-2 text-left',
        className,
      )}
    >
      {names.map((name) => {
        const icon = techIconUrl(name);
        return (
          <span
            key={name}
            data-pill
            className={cn(
              'inline-flex h-8.5 min-w-8.5 items-center justify-center rounded-full bg-card px-2 shadow-[0_0_0_1px_var(--line-strong)]',
              open ? 'mr-1.5 px-3' : '-ml-2',
            )}
          >
            {icon ? (
              // oxlint-disable-next-line nextjs/no-img-element
              <img src={icon} alt="" loading="lazy" className="size-4" />
            ) : (
              <span className="font-mono text-[0.625rem]">
                {name.slice(0, 2)}
              </span>
            )}
            <span
              className={cn(
                'overflow-hidden text-sm font-medium whitespace-nowrap',
                open
                  ? 'ml-1.5 opacity-100 transition-opacity delay-100 duration-300 ease-hover motion-reduce:transition-none'
                  : 'max-w-0 opacity-0',
              )}
            >
              {name}
            </span>
          </span>
        );
      })}
      <span
        className={cn(
          'label-mono whitespace-nowrap text-faint transition-colors duration-400 ease-hover group-hover/pile:text-ink',
          open ? 'hidden' : 'ml-3',
        )}
      >
        {names.length} {names.length === 1 ? 'tool' : 'tools'}
      </span>
    </button>
  );
}
