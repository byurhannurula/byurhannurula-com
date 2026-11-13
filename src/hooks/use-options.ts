'use client';

import { useSyncExternalStore } from 'react';

import type { OptionKey, Options } from '@/config/options';
import { getOptions, getServerOptions, subscribe } from '@/lib/options-store';

/** All options. Server render and first paint use the defaults. */
export function useOptions(): Options {
  return useSyncExternalStore(subscribe, getOptions, getServerOptions);
}

/** One option. Prefer CSS (`in-data-[key=value]:`) when markup can decide. */
export function useOption(key: OptionKey): string {
  return useOptions()[key];
}
