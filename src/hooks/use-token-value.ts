'use client';

import { useEffect, useRef, useState } from 'react';

import { useOptions } from '@/hooks/use-options';
import { useRootAttributes } from '@/hooks/use-root-attributes';

/**
 * The live value of a CSS variable at the element that takes `ref`. It is
 * empty on the server and until the first read.
 */
export function useTokenValue<T extends HTMLElement>(variable: string) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState('');
  // Options: a parent scope may get new inline variables in the same commit.
  const options = useOptions();
  const version = useRootAttributes();

  useEffect(() => {
    if (!ref.current) return;
    setValue(getComputedStyle(ref.current).getPropertyValue(variable).trim());
    // `options` and `version` are not read: they say when the value changed.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [variable, options, version]);

  return { ref, value };
}
