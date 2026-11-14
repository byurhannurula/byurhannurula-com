'use client';

import { type FocusEvent, useEffect, useRef, useState } from 'react';

/**
 * Lets Escape hide content that CSS shows on hover or focus inside `ref`.
 * It stays hidden until the pointer and the focus are both away.
 */
export function useEscapeDismiss<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (ref.current?.matches(':hover, :focus-within')) setDismissed(true);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handlers = {
    onPointerLeave: () => {
      if (!ref.current?.matches(':focus-within')) setDismissed(false);
    },
    onBlur: (event: FocusEvent<T>) => {
      if (event.currentTarget.contains(event.relatedTarget)) return;
      if (!ref.current?.matches(':hover')) setDismissed(false);
    },
  };

  return { ref, dismissed, handlers };
}
