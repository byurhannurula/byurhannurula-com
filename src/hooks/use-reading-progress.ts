'use client';

import { useEffect, useState } from 'react';

/** How far the reader is through the element that matches `selector`, 0 to 1. */
export function useReadingProgress(selector: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.querySelector(selector);
    if (!target) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      // Done when the end of the text is in the lower part of the view, not
      // when it leaves the top: nobody scrolls the last line to the top.
      const span = rect.height - window.innerHeight * 0.6;
      const raw = span > 0 ? -rect.top / span : 1;
      // Steps of half a percent: enough for the bar, few renders.
      setProgress(Math.round(Math.min(1, Math.max(0, raw)) * 200) / 200);
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
  }, [selector]);

  return progress;
}
