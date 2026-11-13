'use client';

import { useEffect, useState } from 'react';

/** Headings count as reached this far below the top of the view. */
const REACHED_AT = 160;

/** The id of the last heading the reader passed, or null above the first. */
export function useActiveHeading(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;

    const measure = () => {
      frame = 0;
      let current: string | null = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top >= REACHED_AT) break;
        current = heading.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids]);

  return active;
}
