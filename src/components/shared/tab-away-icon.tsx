'use client';

import { useEffect } from 'react';

// An emoji as an SVG favicon: no image file, and it uses the reader's own
// emoji font. The eyes say "I am still here" while the tab is in the back.
const AWAY_ICON = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="88">👀</text></svg>',
)}`;

/**
 * A small detail: the tab icon changes to a pair of eyes while the reader
 * is in another tab, and goes back when they return. Mounted once in the
 * layout.
 */
export function TabAwayIcon() {
  useEffect(() => {
    const original = new Map<HTMLLinkElement, string>();

    const onChange = () => {
      const away = document.visibilityState === 'hidden';
      for (const link of document.querySelectorAll<HTMLLinkElement>(
        'link[rel~="icon"]',
      )) {
        if (away) {
          if (!original.has(link)) original.set(link, link.href);
          link.href = AWAY_ICON;
        } else {
          const href = original.get(link);
          if (href) link.href = href;
        }
      }
      if (!away) original.clear();
    };

    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return null;
}
