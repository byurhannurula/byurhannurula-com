'use client';

import { useSyncExternalStore } from 'react';

// A module store: the nav button and the menu live in different trees.
let open = false;
let opener: HTMLElement | null = null;
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
  // The dialog has no Radix trigger, so Radix does not know where focus was.
  // Without this, focus falls to <body> when the menu closes.
  if (next) {
    const active = document.activeElement;
    opener =
      active instanceof HTMLElement && active !== document.body ? active : null;
  } else {
    requestAnimationFrame(() => {
      if (opener?.isConnected) opener.focus();
      opener = null;
    });
  }
  for (const listener of listeners) listener();
}

/**
 * Call it when a command goes to another page. Focus then starts at the top
 * of the new page, and does not go back to the button that opened the menu.
 */
export function forgetCommandOpener() {
  opener = null;
}

/** For code that must not render on a change, such as a scroll handler. */
export function isCommandMenuOpen() {
  return open;
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
