'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** An element shows when its top is above this part of the window height. */
const SHOW_AT = 0.92;

/**
 * Marks `[data-reveal]` elements with `data-in` when they enter the view.
 * Mounted once in the layout, so server components only add the attribute.
 * Styles: src/styles/motion.css.
 *
 * It measures on scroll instead of using IntersectionObserver: the observer
 * did not report elements in an embedded preview pane, and a missed report
 * leaves content invisible. A measured check cannot miss.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const check = () => {
      frame = 0;
      const limit = window.innerHeight * SHOW_AT;
      for (const el of document.querySelectorAll<HTMLElement>(
        '[data-reveal]:not([data-in])',
      )) {
        // offsetParent is null while an option hides the element.
        if (el.offsetParent && el.getBoundingClientRect().top < limit) {
          el.dataset.in = '';
        }
      }
    };
    const schedule = () => {
      frame ||= requestAnimationFrame(check);
    };

    // What is in view now is shown at once, then hiding starts for the
    // rest. Content on the first screen never waits for this script: a
    // hidden headline would hold back the first paint (LCP).
    check();
    document.documentElement.classList.add('reveal');
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // An option change can show a variant that is already in view.
    const options = new MutationObserver(schedule);
    options.observe(document.documentElement, { attributes: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      options.disconnect();
    };
    // Runs again after a navigation: the new page has new elements.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [pathname]);

  return null;
}
