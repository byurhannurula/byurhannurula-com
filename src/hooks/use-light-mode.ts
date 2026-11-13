'use client';

import { useSyncExternalStore } from 'react';

function subscribe(listener: () => void) {
  // Under `auto` the mode changes on a timer, without a store event, so the
  // attribute on <html> is the source to watch.
  const observer = new MutationObserver(listener);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-light'],
  });
  return () => observer.disconnect();
}

/** The light mode in use now (morning, day, evening, night). */
export function useLightMode(): string | undefined {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.light,
    () => undefined,
  );
}
