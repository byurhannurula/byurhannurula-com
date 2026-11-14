'use client';

import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { isCommandMenuOpen } from '@/hooks/use-command-menu';

export type NavScrollMode = 'hide' | 'shrink' | 'fixed';

// Two lines, not one: the bar must not flicker when the page rests on the line.
const SMALL_ON_PX = 48;
const SMALL_OFF_PX = 24;
/** The bar never hides this close to the top of the page. */
const HIDE_BELOW_PX = 200;
/** Scroll down this far in one go, and the bar hides. A nudge does not. */
const HIDE_TRAVEL_PX = 64;
/** Scroll up this far, and it comes back. More than trackpad jitter. */
const SHOW_TRAVEL_PX = 16;
/** A mouse this close to the top edge of the window brings the bar back. */
const TOP_EDGE_PX = 72;

interface NavScrollState {
  small: boolean;
  hidden: boolean;
}

const AT_TOP: NavScrollState = { small: false, hidden: false };

/** True while the reader uses the bar: it must not leave under them. */
function isInUse(bar: HTMLElement | null) {
  if (isCommandMenuOpen()) return true;
  if (!bar) return false;
  // :focus-visible, not :focus. A link keeps plain focus after a click, and
  // that must not pin the bar for the rest of the page.
  if (bar.querySelector(':focus-visible, [aria-expanded="true"]')) return true;
  // Touch screens leave :hover on the last element tapped.
  return window.matchMedia('(hover: hover)').matches && bar.matches(':hover');
}

/**
 * Nav state for scroll. `hide`: the bar leaves on a clear scroll down and
 * comes back, small, on a scroll up. `shrink`: it only gets small.
 */
export function useNavScroll(
  mode: NavScrollMode,
  barRef: RefObject<HTMLElement | null>,
) {
  const [state, setState] = useState(AT_TOP);
  const current = useRef(AT_TOP);
  // The turning point: the highest scroll position while the bar shows, the
  // lowest while it hides. Travel is measured from it, so slow scrolls count
  // and small reversals do not.
  const turn = useRef(0);

  const apply = useCallback((next: NavScrollState) => {
    const now = current.current;
    if (now.small === next.small && now.hidden === next.hidden) return;
    current.current = next;
    setState(next);
  }, []);

  const reveal = useCallback(() => {
    turn.current = Math.max(window.scrollY, 0);
    apply({ ...current.current, hidden: false });
  }, [apply]);

  useEffect(() => {
    if (mode === 'fixed') {
      apply(AT_TOP);
      return;
    }
    const canHide = mode === 'hide';
    let maxY = 0;
    let frame = 0;

    // Layout is read here, on resize, and never in the scroll path.
    const measure = () => {
      maxY = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    };
    // iOS reports positions past both ends while the page bounces. Clamped,
    // the bounce back is not read as a scroll in the other direction.
    const readY = () => Math.min(Math.max(window.scrollY, 0), maxY);

    const update = () => {
      frame = 0;
      const y = readY();
      const now = current.current;
      const small = y > (now.small ? SMALL_OFF_PX : SMALL_ON_PX);
      let hidden = canHide && now.hidden;

      if (hidden) {
        turn.current = Math.max(turn.current, y);
        if (y <= SMALL_ON_PX || y < turn.current - SHOW_TRAVEL_PX) {
          hidden = false;
          turn.current = y;
        }
      } else if (canHide) {
        turn.current = Math.min(turn.current, y);
        if (y > HIDE_BELOW_PX && y > turn.current + HIDE_TRAVEL_PX) {
          hidden = !isInUse(barRef.current);
          turn.current = y;
        }
      }
      apply({ small, hidden });
    };

    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!current.current.hidden || event.pointerType !== 'mouse') return;
      if (event.clientY <= TOP_EDGE_PX) reveal();
    };

    measure();
    turn.current = readY();
    update();

    // The page gets longer as images and notes load.
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    if (canHide) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [mode, barRef, apply, reveal]);

  return { ...state, reveal };
}
