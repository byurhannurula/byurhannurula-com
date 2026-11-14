'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Runs the animations of a subtree again. Put `run` as the `key` and `ref`
 * on the wrapper: a new key mounts new elements, and CSS animations start
 * with the element.
 */
export function useReplay<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (run === 0) return;
    // The new elements have data-reveal without data-in, and the observer in
    // the layout looks only on scroll. One paint later, show them.
    const timer = setTimeout(() => {
      for (const el of ref.current?.querySelectorAll<HTMLElement>(
        '[data-reveal]',
      ) ?? []) {
        el.dataset.in = '';
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [run]);

  return { ref, run, replay: () => setRun((n) => n + 1) };
}
