export interface TilItem {
  /** ISO date, for <time>. */
  date: string;
  topic: string;
  text: string;
  /** Tailwind class for the topic's hue. Static, so Tailwind finds it. */
  tone: string;
}

export const TIL_SECTION = {
  title: 'Today I learned',
  sample: 'draft items',
} as const;

/**
 * Draft items. Each one is a general fact about a tool the site already
 * names, not a real event. Replace them with real learnings, newest first.
 */
export const TIL: TilItem[] = [
  {
    date: '2026-11-09',
    topic: 'backups',
    text: 'A backup job that reports success says nothing about the restore. Only the restore drill does.',
    tone: 'text-hue-5',
  },
  {
    date: '2026-11-02',
    topic: 'tailwind v4',
    text: 'Tailwind v4 needs no config file. The theme is CSS variables in an @theme block.',
    tone: 'text-hue-2',
  },
  {
    date: '2026-10-21',
    topic: 'cloudflare tunnel',
    text: 'A tunnel connects outward, so a service at home can be public with no open port on the router.',
    tone: 'text-hue-6',
  },
  {
    date: '2026-10-12',
    topic: 'passkeys',
    text: 'A passkey belongs to one domain. A login page on a look-alike domain gets nothing from it.',
    tone: 'text-hue-3',
  },
  {
    date: '2026-09-30',
    topic: 'mdx',
    text: 'An MDX post is a file in the repo. A typo fix is a commit, and the history is free.',
    tone: 'text-hue-1',
  },
  {
    date: '2026-09-18',
    topic: 'docker',
    text: 'A container with no restart policy stays down after a reboot. The policy belongs in the compose file.',
    tone: 'text-hue-4',
  },
];
