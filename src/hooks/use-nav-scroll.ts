'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SMALL_AFTER_PX = 40;
const HIDE_AFTER_PX = 160;
/** Scroll jitter smaller than this does not count as a direction. */
const DIRECTION_SLOP_PX = 2;
const RETURN_AFTER_MS = 2000;

interface NavScrollState {
  small: boolean;
  hidden: boolean;
}

const AT_TOP: NavScrollState = { small: false, hidden: false };

/** Nav state for scroll: small below the top, hidden while scrolling down. */
export function useNavScroll(enabled: boolean) {
  const [state, setState] = useState(AT_TOP);
  const current = useRef(AT_TOP);

  const apply = useCallback((next: NavScrollState) => {
    const now = current.current;
    if (now.small === next.small && now.hidden === next.hidden) return;
    current.current = next;
    setState(next);
  }, []);

  const reveal = useCallback(() => {
    apply({ ...current.current, hidden: false });
  }, [apply]);

  useEffect(() => {
    if (!enabled) {
      apply(AT_TOP);
      return;
    }
    let lastY = window.scrollY;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onScroll = () => {
      const y = window.scrollY;
      let { hidden } = current.current;
      if (y <= SMALL_AFTER_PX || y < lastY - DIRECTION_SLOP_PX) hidden = false;
      else if (y > lastY + DIRECTION_SLOP_PX && y > HIDE_AFTER_PX)
        hidden = true;
      lastY = y;
      apply({ small: y > SMALL_AFTER_PX, hidden });
      clearTimeout(timer);
      timer = setTimeout(reveal, RETURN_AFTER_MS);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, [enabled, apply, reveal]);

  return { ...state, reveal };
}
