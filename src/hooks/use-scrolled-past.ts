'use client';

import { useEffect, useState } from 'react';

/** True once the page is scrolled more than `offset` pixels from the top. */
export function useScrolledPast(offset: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const measure = () => setPast(window.scrollY > offset);
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    return () => window.removeEventListener('scroll', measure);
  }, [offset]);

  return past;
}
