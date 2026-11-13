'use client';

import { useEffect } from 'react';

import { repaintLight } from '@/lib/options-store';

const CHECK_EVERY_MS = 30_000;

/** Under `light: auto` the mode must change when the hour passes a limit. */
export function LightClock() {
  useEffect(() => {
    const timer = setInterval(repaintLight, CHECK_EVERY_MS);
    return () => clearInterval(timer);
  }, []);
  return null;
}
