'use client';

import { useSyncExternalStore } from 'react';

const VISIBLE_MS = 1800;

interface ToastState {
  text: string;
  visible: boolean;
}

// A module store, so any component can show a toast without a provider.
let state: ToastState = { text: '', visible: false };
const HIDDEN: ToastState = { text: '', visible: false };
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | undefined;

function set(next: ToastState) {
  state = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Show a short confirmation at the bottom of the screen. */
export function showToast(text: string) {
  set({ text, visible: true });
  clearTimeout(timer);
  // The text stays while it fades out.
  timer = setTimeout(() => set({ text, visible: false }), VISIBLE_MS);
}

/** The current toast. `<Toast />` draws it; call `showToast` to set it. */
export function useToast(): ToastState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => HIDDEN,
  );
}
