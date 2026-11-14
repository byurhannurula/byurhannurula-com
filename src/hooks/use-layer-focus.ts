'use client';

import { useCallback, useState } from 'react';

/**
 * Track the selected row of the layer drawing, the row under the pointer or
 * focus, and how far each slab lifts.
 *
 * Rows `0..layerCount-1` are layers. A higher index is a row that spans all
 * layers.
 */
export function useLayerFocus(layerCount: number) {
  const [selected, select] = useState(0);
  // A look, not a choice: hover and focus lift a slab but do not select it.
  const [peek, setPeek] = useState<number | null>(null);

  const active = peek ?? selected;
  const spansAll = active >= layerCount;

  const isLit = useCallback(
    (layer: number) => spansAll || layer === active,
    [active, spansAll],
  );

  // The open layer and everything above it rise, so the gap shows which one
  // is meant. A row that spans all layers fans the full stack out.
  const liftOf = useCallback(
    (layer: number) => {
      if (spansAll) return `${(layerCount - 1 - layer) * 0.4}rem`;
      if (layer < active) return '2.4rem';
      return layer === active ? '1.2rem' : '0rem';
    },
    [active, layerCount, spansAll],
  );

  return { active, selected, select, setPeek, isLit, liftOf };
}
