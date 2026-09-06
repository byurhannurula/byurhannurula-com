"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

import { OPEN_SHORTCUTS_EVENT } from "@/components/shortcuts-dialog";
import type { LightMode } from "@/config/light-modes";
import { SITE_CONFIG } from "@/config/site";
import { cycleLightMode } from "@/lib/light-mode";
import { copyEmail, copyPageLink, openExternal } from "@/lib/shortcuts";

const NAV_KEYS: Record<string, string> = {
  h: "/",
  n: "/notes",
  u: "/uses",
  a: "/about",
};

const SHIFT_LINKS: Record<string, string> = {
  g: SITE_CONFIG.social.github,
  i: SITE_CONFIG.social.linkedin,
  x: SITE_CONFIG.social.twitter,
};

function isTyping(event: KeyboardEvent) {
  const target = event.target;
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}

/** Window in which a second `g` counts as the `gg` motion, matching vim's default. */
const CHORD_TIMEOUT_MS = 600;

const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

/** Shift plus these. Arrow keys are matched raw, letters after lowercasing. */
const SHIFT_ACTIONS: Record<string, () => void> = {
  ArrowUp: toTop,
  ArrowDown: () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
  e: copyEmail,
  l: copyPageLink,
};

/**
 * `?` opens the shortcuts sheet.
 *
 * Runs before the modifier guard below: `?` sits behind AltGr on several
 * non-US layouts, and Windows reports AltGr as ctrl and alt together. `code`
 * covers layouts that remap the character itself.
 */
function tryHelp(event: KeyboardEvent) {
  const isHelpKey =
    event.key === "?" || (event.code === "Slash" && event.shiftKey);
  if (!isHelpKey || event.metaKey) return false;
  window.dispatchEvent(new Event(OPEN_SHORTCUTS_EVENT));
  return true;
}

function tryShift(event: KeyboardEvent) {
  if (!event.shiftKey) return false;
  const key = event.key.toLowerCase();

  const action = SHIFT_ACTIONS[event.key] ?? SHIFT_ACTIONS[key];
  if (action) {
    action();
    return true;
  }
  if (key in SHIFT_LINKS) {
    openExternal(SHIFT_LINKS[key]);
    return true;
  }
  return false;
}

function tryChord(event: KeyboardEvent, pendingG: { current: number }) {
  if (event.key.toLowerCase() !== "g") return false;
  const now = Date.now();
  const isSecond = now - pendingG.current < CHORD_TIMEOUT_MS;
  pendingG.current = isSecond ? 0 : now;
  if (isSecond) toTop();
  return true;
}

function tryPlain(
  event: KeyboardEvent,
  actions: { cycle: () => void; go: (href: string) => void }
) {
  const key = event.key.toLowerCase();
  if (key === "t") {
    actions.cycle();
    return true;
  }
  if (key in NAV_KEYS) {
    actions.go(NAV_KEYS[key]);
    return true;
  }
  return false;
}

/**
 * Built here rather than inside the effect so each step is a named function at
 * the top level, which is also what keeps any one of them small enough to read.
 */
function keyHandler(
  pendingG: { current: number },
  actions: { cycle: () => void; go: (href: string) => void }
) {
  return (event: KeyboardEvent) => {
    if (isTyping(event)) return;

    const handled =
      tryHelp(event) ||
      (!(event.metaKey || event.ctrlKey || event.altKey) &&
        (tryShift(event) ||
          tryChord(event, pendingG) ||
          tryPlain(event, actions)));

    if (handled) event.preventDefault();
    // Any other key breaks the chord, including the ones handled above. A
    // half-typed `gg` should not survive a cmd+K or a shift+E in between.
    if (event.key.toLowerCase() !== "g") pendingG.current = 0;
  };
}

export function GlobalShortcuts() {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const pendingGRef = useRef(0);

  useEffect(() => {
    const onKeyDown = keyHandler(pendingGRef, {
      cycle: () => cycleLightMode(resolvedTheme as LightMode, setTheme),
      go: (href) => router.push(href),
    });

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [resolvedTheme, setTheme, router]);

  return null;
}
