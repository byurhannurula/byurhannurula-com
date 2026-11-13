'use client';

import { useCallback, useState } from 'react';

/**
 * Track which row of the layer drawing is in focus and how far each slab lifts.
 *
 * Rows `0..layerCount-1` are layers. A higher index is a row that spans all
 * layers.
 */
export function useLayerFocus(layerCount: number) {
  const [active, setActive] = useState(0);

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

  return { active, setActive, isLit, liftOf };
}
