import { toast } from "sonner";

import { SITE_CONFIG } from "@/config/site";

/** Single source for keyboard shortcuts, shared by the global listener and the palette hints. */
export const SHORTCUTS = {
  home: "h",
  notes: "n",
  uses: "u",
  about: "a",
  theme: "t",
  copyEmail: "⇧e",
  copyLink: "⇧l",
  github: "⇧g",
  linkedin: "⇧i",
  twitter: "⇧x",
  palette: "⌘k",
  help: "?",
  scrollTop: "⇧↑",
  scrollBottom: "⇧↓",
  scrollTopVim: "gg",
} as const;

export const SHORTCUT_GROUPS = [
  {
    heading: "navigate",
    items: [
      { keys: SHORTCUTS.home, label: "home" },
      { keys: SHORTCUTS.notes, label: "notes" },
      { keys: SHORTCUTS.uses, label: "uses" },
      { keys: SHORTCUTS.about, label: "about" },
      { keys: SHORTCUTS.scrollTop, label: "scroll to top" },
      { keys: SHORTCUTS.scrollTopVim, label: "scroll to top (vim)" },
      { keys: SHORTCUTS.scrollBottom, label: "scroll to bottom" },
    ],
  },
  {
    heading: "actions",
    items: [
      { keys: SHORTCUTS.palette, label: "command palette" },
      { keys: SHORTCUTS.help, label: "this list" },
      { keys: SHORTCUTS.theme, label: "toggle theme" },
      { keys: SHORTCUTS.copyEmail, label: "copy email" },
      { keys: SHORTCUTS.copyLink, label: "copy page link" },
    ],
  },
  {
    heading: "elsewhere",
    items: [
      { keys: SHORTCUTS.github, label: "open github" },
      { keys: SHORTCUTS.linkedin, label: "open linkedin" },
      { keys: SHORTCUTS.twitter, label: "open twitter" },
    ],
  },
] as const;

function copyToClipboard(text: string, message: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success(message))
    .catch(() => toast.error("clipboard is not available"));
}

export function copyEmail() {
  copyToClipboard(SITE_CONFIG.author.email, "email copied to clipboard");
}

export function copyPageLink() {
  copyToClipboard(window.location.href, "link copied to clipboard");
}

export function openExternal(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}
