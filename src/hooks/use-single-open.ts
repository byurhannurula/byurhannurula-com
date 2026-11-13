'use client';

import { useCallback, useState } from 'react';

/** At most one open item in a group. Toggling the open one closes it. */
export function useSingleOpen(initial: string | null = null) {
  const [openId, setOpenId] = useState(initial);
  const toggle = useCallback(
    (id: string) => setOpenId((current) => (current === id ? null : id)),
    [],
  );
  return [openId, toggle] as const;
}
