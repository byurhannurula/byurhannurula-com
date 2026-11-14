'use client';

import { useEffect, useState } from 'react';

/**
 * A number that goes up each time an attribute of `<html>` changes: an
 * option, or the light mode when the clock moves it. Use it as an effect
 * dependency to read styles again.
 */
export function useRootAttributes(): number {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => setVersion((n) => n + 1));
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return version;
}
