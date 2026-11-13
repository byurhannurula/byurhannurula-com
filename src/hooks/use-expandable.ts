'use client';

import { useCallback, useState } from 'react';

/** A set of open keys. `toggle` returns the new state of the key. */
export function useExpandable<Key extends string>() {
  const [open, setOpen] = useState<readonly Key[]>([]);

  const isOpen = useCallback((key: Key) => open.includes(key), [open]);

  const toggle = useCallback(
    (key: Key) => {
      const next = !open.includes(key);
      setOpen(next ? [...open, key] : open.filter((item) => item !== key));
      return next;
    },
    [open],
  );

  return { isOpen, toggle };
}
