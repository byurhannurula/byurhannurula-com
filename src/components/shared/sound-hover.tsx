'use client';

import { useEffect } from 'react';

import { playSound } from '@/hooks/use-sound';

const TARGETS = 'a[href], button, [role="button"], summary';
const MIN_GAP_MS = 70;

/**
 * A quiet tick when the pointer enters a link or a button, if the `sound`
 * option is on. Mounted once in the layout. Mouse only: a touch has no hover.
 */
export function SoundHover() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    let last: Element | null = null;
    let lastTime = 0;

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element).closest?.(TARGETS) ?? null;
      // pointerover also fires when the pointer moves between children.
      if (target === last) return;
      last = target;
      if (!target || event.timeStamp - lastTime < MIN_GAP_MS) return;
      lastTime = event.timeStamp;
      playSound('hover');
    };

    document.addEventListener('pointerover', onOver, { passive: true });
    return () => document.removeEventListener('pointerover', onOver);
  }, []);

  return null;
}
