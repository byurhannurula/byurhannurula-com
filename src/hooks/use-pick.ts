'use client';

import { useCallback, useState, type KeyboardEvent } from 'react';

/**
 * One picked item out of a set. `buttonProps` makes a non-button element,
 * such as an SVG group, behave as a toggle button for keyboard and pointer.
 */
export function usePick<Id extends string>(
  initial: Id,
  onPick?: (id: Id) => void,
) {
  const [picked, setPicked] = useState(initial);

  const pick = useCallback(
    (id: Id) => {
      setPicked(id);
      onPick?.(id);
    },
    [onPick],
  );

  const buttonProps = (id: Id) => ({
    role: 'button',
    tabIndex: 0,
    'aria-pressed': picked === id,
    onClick: () => pick(id),
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      // Space must not scroll the page.
      event.preventDefault();
      pick(id);
    },
  });

  return { picked, pick, buttonProps };
}
