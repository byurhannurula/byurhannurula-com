'use client';

import { useCallback, useState } from 'react';

const withItem = (set: Set<number>, item: number) =>
  set.has(item) ? set : new Set(set).add(item);

/**
 * Which pictures of a stack to render and which one to show. A picture is
 * rendered from its first use, and it is shown only when it has loaded, so
 * the one before it stays in view until then.
 */
export function useFadeStack(active: number) {
  const [seen, setSeen] = useState(() => new Set([active]));
  const [loaded, setLoaded] = useState(() => new Set<number>());
  const [shown, setShown] = useState(active);

  // State derived from a prop, set during render: React runs the render
  // again at once, with no extra paint.
  if (!seen.has(active)) setSeen(withItem(seen, active));
  if (shown !== active && loaded.has(active)) setShown(active);

  /** Start the download before the picture is asked for, on hover or focus. */
  const preload = useCallback(
    (index: number) => setSeen((current) => withItem(current, index)),
    [],
  );
  const markLoaded = useCallback(
    (index: number) => setLoaded((current) => withItem(current, index)),
    [],
  );

  return { seen, shown, preload, markLoaded };
}
