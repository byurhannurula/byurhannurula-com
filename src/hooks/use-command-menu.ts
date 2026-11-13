'use client';

import { useSyncExternalStore } from 'react';

// A module store: the nav button and the menu live in different trees.
let open = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setCommandMenuOpen(next: boolean) {
  if (open === next) return;
  open = next;
  for (const listener of listeners) listener();
}

export function toggleCommandMenu() {
  setCommandMenuOpen(!open);
}

/** Open state of the command menu, shared by the menu and its buttons. */
export function useCommandMenu() {
  const isOpen = useSyncExternalStore(
    subscribe,
    () => open,
    () => false,
  );
  return { open: isOpen, setOpen: setCommandMenuOpen };
}
