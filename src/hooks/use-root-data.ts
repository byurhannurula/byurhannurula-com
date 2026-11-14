'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * The live value of `data-<name>` on `<html>`, the same source that CSS
 * reads. Use it when script must agree with the styles at every moment.
 */
export function useRootData(name: string): string | undefined {
  const attribute = `data-${name}`;
  // Stable per name, or React would subscribe again on every render.
  const subscribe = useCallback(
    (onChange: () => void) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [attribute],
      });
      return () => observer.disconnect();
    },
    [attribute],
  );
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.getAttribute(attribute) ?? undefined,
    () => undefined,
  );
}
