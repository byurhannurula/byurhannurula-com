'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { getOptions } from '@/lib/options-store';
import { canTransition, transition } from '@/lib/view-transition';

/** Longest wait for the next page before the transition lets go. */
const MAX_WAIT = 1500;

/**
 * Page change animation for the `pagefx` option. It takes over clicks on
 * links to another page of this site and runs the navigation inside a view
 * transition; the browser holds the old picture until the new path renders.
 * Back and forward are left alone: the browser restores those at once.
 */
export function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const arrived = useRef<(() => void) | null>(null);
  const shownPath = useRef(pathname);

  // The new path has rendered: the browser may take the "after" picture.
  useEffect(() => {
    if (shownPath.current === pathname) return;
    shownPath.current = pathname;
    arrived.current?.();
    arrived.current = null;
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (getOptions().pagefx === 'off' || !canTransition()) return;
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element).closest('a');
      if (!link || link.hasAttribute('download')) return;
      if (link.target && link.target !== '_self') return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // A link in the same page (contents, footnotes) only scrolls.
      if (url.pathname === window.location.pathname) return;
      // Feeds and files are not pages of the app.
      if (/\.\w+$/.test(url.pathname)) return;

      // Capture phase, before React: next/link sees defaultPrevented and
      // leaves the navigation to us.
      event.preventDefault();
      transition(
        'page',
        () =>
          new Promise<void>((resolve) => {
            arrived.current = resolve;
            router.push(url.pathname + url.search + url.hash);
            setTimeout(resolve, MAX_WAIT);
          }),
      );
    };
    window.addEventListener('click', onClick, { capture: true });
    return () =>
      window.removeEventListener('click', onClick, { capture: true });
  }, [router]);

  return null;
}
