'use client';

import { VARIANT_KEYS } from '@/config/design-system';
import { useDetachedOptions } from '@/hooks/use-detached-options';

/**
 * Lets the side by side examples work: see VARIANT_KEYS. While the page is
 * open, its own titles and hero use the default of those options.
 */
export function DetachOptions() {
  useDetachedOptions(VARIANT_KEYS);
  return null;
}
