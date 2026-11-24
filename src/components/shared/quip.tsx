'use client';

import { useEffect, useRef } from 'react';

import { wantsStill } from '@/lib/motion';

/** Where the bubble sits from the pointer: right and a little above. */
const OFFSET_X = 16;
const OFFSET_Y = -34;
/** Share of the gap the bubble closes each frame: a soft lag. */
const FOLLOW = 0.22;

/**
 * One chat bubble with a joke that follows the mouse, in personal mode.
 * Any element with `data-quip="…"` shows its line while the pointer is on
 * it. Mounted once in the layout; mouse only, so a phone never shows it.
 * Decorative: the joke is not read out.
 */
export function QuipCursor() {
  const bubble = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bubble.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches)
      return;

    let target: HTMLElement | null = null;
    let frame = 0;
    const goal = { x: 0, y: 0 };
    const at = { x: 0, y: 0 };

    const place = () => {
      el.style.translate = `${at.x}px ${at.y}px`;
    };
    const step = () => {
      at.x += (goal.x - at.x) * FOLLOW;
      at.y += (goal.y - at.y) * FOLLOW;
      place();
      frame =
        Math.abs(goal.x - at.x) + Math.abs(goal.y - at.y) > 0.3
          ? requestAnimationFrame(step)
          : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const personal = document.documentElement.dataset.mode === 'personal';
      const next = personal
        ? (event.target as Element).closest<HTMLElement>('[data-quip]')
        : null;
      goal.x = event.clientX + OFFSET_X;
      goal.y = event.clientY + OFFSET_Y;

      if (next !== target) {
        target = next;
        if (next) {
          el.textContent = next.dataset.quip ?? '';
          // A new bubble starts at the pointer, it does not fly in.
          at.x = goal.x;
          at.y = goal.y;
          place();
          el.dataset.on = '';
        } else {
          delete el.dataset.on;
        }
      }
      if (!target) return;
      if (wantsStill()) {
        at.x = goal.x;
        at.y = goal.y;
        place();
      } else {
        frame ||= requestAnimationFrame(step);
      }
    };
    const onLeave = () => {
      target = null;
      delete el.dataset.on;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onLeave);
    };
  }, []);

  return (
    <div
      ref={bubble}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-60 w-max origin-bottom-left scale-90 rounded-2xl rounded-bl-sm bg-accent px-3 py-1.5 text-[0.8125rem] leading-snug font-medium whitespace-nowrap text-bg opacity-0 shadow-lift [transition:opacity_.15s_ease-out,scale_.35s_var(--ease-out-spring)] data-on:scale-100 data-on:opacity-100 motion-reduce:scale-100"
    />
  );
}
