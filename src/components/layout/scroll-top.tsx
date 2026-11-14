'use client';

import { ArrowUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useOption } from '@/hooks/use-options';
import { scrollToTop } from '@/lib/scroll-to-top';
import { cn } from '@/lib/utils';

const RING_RADIUS = 20;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/** 0 to 1 through the page, and whether the reader is a screen down. */
function usePageScroll(active: boolean) {
  const [state, setState] = useState({ shown: false, progress: 0 });

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const root = document.documentElement;
      const span = root.scrollHeight - window.innerHeight;
      const progress = span > 0 ? Math.min(1, window.scrollY / span) : 0;
      setState({
        shown: window.scrollY > window.innerHeight * 0.9,
        // Steps of one percent: enough for the ring, few renders.
        progress: Math.round(progress * 100) / 100,
      });
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [active]);

  return state;
}

/**
 * A round button in the lower right that takes the reader back up. It shows
 * after one screen of scroll. `totop` picks off, plain, or with a ring that
 * fills as the reader goes down the page.
 */
export function ScrollTop() {
  const variant = useOption('totop');
  const active = variant !== 'off';
  const { shown, progress } = usePageScroll(active);
  // On a phone the contents island of a note sits at the bottom too.
  const lift = usePathname().startsWith('/notes/') && 'max-md:bottom-20';
  if (!active) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      // Hidden from the tab order while it is out of view.
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={cn(
        'fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-full border border-line-strong bg-card/90 text-soft shadow-lift backdrop-blur-sm [transition:opacity_.25s,translate_.35s_var(--ease-out-soft),color_.2s] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:right-6 md:bottom-6 print:hidden motion-reduce:transition-none',
        lift,
        shown
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      {variant === 'ring' ? (
        <svg
          aria-hidden
          viewBox="0 0 48 48"
          className="absolute inset-[-1px] size-[calc(100%+2px)] -rotate-90"
        >
          <circle
            cx="24"
            cy="24"
            r={RING_RADIUS}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH * (1 - progress)}
          />
        </svg>
      ) : null}
      <ArrowUp aria-hidden className="size-4" />
    </button>
  );
}
