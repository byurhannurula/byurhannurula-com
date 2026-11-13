'use client';

import { useCallback, useState } from 'react';

/** Keep a set of open keys, for panels that open and close on their own. */
export function useOpenSet<Key extends string>() {
  const [open, setOpen] = useState<ReadonlySet<Key>>(() => new Set());

  const isOpen = useCallback((key: Key) => open.has(key), [open]);

  /** Flip one key and return its new state. */
  const toggle = useCallback(
    (key: Key) => {
      const next = new Set(open);
      const nowOpen = !next.has(key);
      if (nowOpen) next.add(key);
      else next.delete(key);
      setOpen(next);
      return nowOpen;
    },
    [open],
  );

  return { isOpen, toggle };
}
