'use client';

import { useEffect, useRef, useState } from 'react';

import { contrastRatio, readColour } from '@/components/design-system/contrast';
import type { ContrastPair } from '@/config/design-system';
import { useOptions } from '@/hooks/use-options';
import { useRootAttributes } from '@/hooks/use-root-attributes';

/**
 * The WCAG contrast ratio of each pair, measured at the element that takes
 * `ref`, so a local light mode gives its own numbers. Null until measured.
 * Pass a stable array.
 */
export function useContrast<T extends HTMLElement>(
  pairs: readonly ContrastPair[],
) {
  const ref = useRef<T>(null);
  const [ratios, setRatios] = useState<(number | null)[]>([]);
  const options = useOptions();
  const version = useRootAttributes();

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    setRatios(
      pairs.map((pair) => {
        const text = readColour(host, pair.text);
        const surface = readColour(host, pair.on);
        return text && surface ? contrastRatio(text, surface) : null;
      }),
    );
    // `options` and `version` are not read: they say when the colours changed.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [pairs, options, version]);

  return { ref, ratios };
}
