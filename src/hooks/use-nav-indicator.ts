'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface IndicatorBox {
  left: number;
  width: number;
}

/** Measure the `aria-current` link in a list, for a sliding indicator. */
export function useNavIndicator() {
  const listRef = useRef<HTMLUListElement>(null);
  const [box, setBox] = useState<IndicatorBox>();
  const [slides, setSlides] = useState(false);

  const measure = useCallback(() => {
    const link = listRef.current?.querySelector<HTMLElement>('[aria-current]');
    setBox((previous) => {
      if (!link) return undefined;
      const next = { left: link.offsetLeft, width: link.offsetWidth };
      return previous?.left === next.left && previous.width === next.width
        ? previous
        : next;
    });
  }, []);

  // No dependency list: the current link changes with the route, and the
  // measure is cheap. `setBox` keeps the old object when nothing moved.
  useEffect(() => {
    measure();
  });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    // Link widths change with the web font, the breakpoint and the nav size.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    void document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [measure]);

  // The first box must show in place. With the transition on from the start,
  // the indicator grows out of the left edge on every page load.
  useEffect(() => {
    if (!box || slides) return;
    const frame = requestAnimationFrame(() => setSlides(true));
    return () => cancelAnimationFrame(frame);
  }, [box, slides]);

  return { listRef, box, slides };
}
