'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Marks `[data-reveal]` elements with `data-in` when they enter the view.
 * Mounted once in the layout, so server components only add the attribute.
 * Styles: src/styles/motion.css.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = '';
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    // An element hidden by an option has no box yet; the observer reports
    // it when the option changes and it shows.
    for (const el of document.querySelectorAll(
      '[data-reveal]:not([data-in])',
    )) {
      observer.observe(el);
    }
    return () => {
      observer.disconnect();
    };
    // Runs again after a navigation: the new page has new elements.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [pathname]);

  return null;
}
