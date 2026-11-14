'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface IndicatorBox {
  left: number;
  width: number;
}

/**
 * Measure the `aria-current` link in a list, for a sliding indicator.
 * `activeKey` names the current link; when it changes, a list that scrolls
 * sideways brings the link into view.
 */
export function useNavIndicator(activeKey?: string) {
  const listRef = useRef<HTMLUListElement>(null);
  const [box, setBox] = useState<IndicatorBox>();
  const [slides, setSlides] = useState(false);

  const measure = useCallback(() => {
    const link = listRef.current?.querySelector<HTMLElement>('[aria-current]');
    setBox((previous) => {
      // No offsetParent: an option hides this link (display: none).
      if (!link?.offsetParent) return undefined;
      const next = { left: link.offsetLeft, width: link.offsetWidth };
      return previous?.left === next.left && previous.width === next.width
        ? previous
        : next;
    });
  }, []);

  // A list that scrolls sideways brings the current link to its centre.
  const showCurrent = useCallback(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current]');
    if (!list || !link?.offsetParent) return;
    if (list.scrollWidth <= list.clientWidth) return;
    // Not scrollIntoView: that can also move the page.
    list.scrollLeft =
      link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
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
    // The items are watched too: an option can hide one, and the others then
    // move while the list keeps its size.
    const observer = new ResizeObserver(() => {
      measure();
      showCurrent();
    });
    observer.observe(list);
    for (const item of list.children) observer.observe(item);
    void document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [measure, showCurrent]);

  useEffect(() => {
    if (activeKey) showCurrent();
  }, [activeKey, showCurrent]);

  // The first box must show in place. With the transition on from the start,
  // the indicator grows out of the left edge on every page load.
  useEffect(() => {
    if (!box || slides) return;
    const frame = requestAnimationFrame(() => setSlides(true));
    return () => cancelAnimationFrame(frame);
  }, [box, slides]);

  return { listRef, box, slides };
}
