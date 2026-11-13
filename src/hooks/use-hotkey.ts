'use client';

import { useEffect, useRef } from 'react';

interface HotkeyOptions {
  /** Require Cmd (macOS) or Ctrl. */
  mod?: boolean;
  /** Do nothing while the reader types in a field. */
  ignoreWhileTyping?: boolean;
}

function isTyping() {
  const el = document.activeElement;
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
}

/** Run `handler` when `key` is pressed anywhere on the page. */
export function useHotkey(
  key: string,
  handler: () => void,
  { mod = false, ignoreWhileTyping = false }: HotkeyOptions = {},
) {
  const latest = useRef(handler);
  useEffect(() => {
    latest.current = handler;
  }, [handler]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== key) return;
      if (mod !== (event.metaKey || event.ctrlKey)) return;
      if (event.altKey) return;
      if (ignoreWhileTyping && isTyping()) return;
      event.preventDefault();
      latest.current();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, mod, ignoreWhileTyping]);
}
