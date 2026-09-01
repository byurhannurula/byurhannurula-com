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

export function GlobalShortcuts() {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const pendingGRef = useRef(0);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (isTyping(event)) return;

      // `?` sits behind AltGr on several non-US layouts, and Windows reports
      // AltGr as ctrl+alt together, so this has to run before the modifier
      // guard below. `code` covers layouts that remap the character itself.
      const isHelpKey =
        event.key === "?" || (event.code === "Slash" && event.shiftKey);
      if (isHelpKey && !event.metaKey) {
        event.preventDefault();
        window.dispatchEvent(new Event(OPEN_SHORTCUTS_EVENT));
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();

      if (event.shiftKey) {
        if (key === "e") copyEmail();
        else if (key === "l") copyPageLink();
        else if (key in SHIFT_LINKS) openExternal(SHIFT_LINKS[key]);
        else if (event.key === "ArrowUp") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (event.key === "ArrowDown") {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        } else return;
        event.preventDefault();
        return;
      }

      if (key === "g") {
        event.preventDefault();
        const now = Date.now();
        if (now - pendingGRef.current < CHORD_TIMEOUT_MS) {
          pendingGRef.current = 0;
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          pendingGRef.current = now;
        }
        return;
      }
      pendingGRef.current = 0;

      if (key === "t") {
        event.preventDefault();
        cycleLightMode(resolvedTheme as LightMode, setTheme);
      } else if (key in NAV_KEYS) {
        event.preventDefault();
        router.push(NAV_KEYS[key]);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [resolvedTheme, setTheme, router]);

  return null;
}
