"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "./use-reduced-motion";

/** Below this the header is simply at rest, with no surface of its own. */
const SURFACE_AT = 24;
/** Slack before a change of direction counts, so a trackpad cannot flicker it. */
const DIRECTION_SLACK = 8;
/** Never hide the header near the top: there is nothing to reclaim there. */
const HIDE_AFTER = 160;

export interface NavVisibility {
  /** The page has been scrolled, so the header needs a surface to sit on. */
  scrolled: boolean;
  /** Scrolling down and past the threshold: give the screen back. */
  hidden: boolean;
}

/**
 * Whether the sticky header should be showing, and whether it needs a surface.
 *
 * Reads scroll in a rAF, not in the listener: the handler fires far more often
 * than the screen refreshes, and this decides two class names.
 *
 * Under reduced motion the header never hides. A bar that leaves and comes back
 * as you move is motion the reader did not ask for, and unlike a transition it
 * cannot be softened, only skipped.
 */
export function useNavVisibility(): NavVisibility {
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<NavVisibility>({
    scrolled: false,
    hidden: false,
  });

  useEffect(() => {
    let frame = 0;
    let last = window.scrollY;
    // Where the current run of scrolling started, so the slack is measured
    // against the turning point rather than against the previous frame.
    let pivot = last;
    let goingDown = false;

    const read = () => {
      frame = 0;
      const y = window.scrollY;

      if (y > last !== goingDown) {
        goingDown = y > last;
        pivot = y;
      }
      last = y;

      const travelled = Math.abs(y - pivot);
      setState((current) => {
        const scrolled = y > SURFACE_AT;
        let hidden = current.hidden;
        if (!reduced && travelled > DIRECTION_SLACK) {
          hidden = goingDown && y > HIDE_AFTER;
        }
        if (scrolled === current.scrolled && hidden === current.hidden) {
          return current;
        }
        return { scrolled, hidden };
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return state;
}
