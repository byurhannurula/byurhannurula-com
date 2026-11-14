'use client';

import { useEffect } from 'react';

import type { OptionKey } from '@/config/options';
import { getOptions } from '@/lib/options-store';

/**
 * Takes these option attributes off `<html>` while the caller is mounted, so
 * a wrapper with its own `data-<key>` can show one value alone. Pass a stable
 * array.
 */
export function useDetachedOptions(keys: readonly OptionKey[]) {
  useEffect(() => {
    const root = document.documentElement;
    const strip = () => {
      for (const key of keys) {
        if (key in root.dataset) delete root.dataset[key];
      }
    };

    strip();
    // The store writes every attribute again on each change.
    const observer = new MutationObserver(strip);
    observer.observe(root, {
      attributes: true,
      attributeFilter: keys.map((key) => `data-${key}`),
    });

    return () => {
      observer.disconnect();
      const options = getOptions();
      for (const key of keys) root.dataset[key] = options[key];
    };
  }, [keys]);
}
