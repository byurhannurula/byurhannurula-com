/** Copy for the command menu. */
export const COMMAND_COPY = {
  open: 'Open the command menu',
  title: 'Command menu',
  shortcut: '⌘K',
  placeholder: 'Search pages, notes and actions',
  results: 'Results',
  empty: 'Nothing found. Try a page name or "copy".',
  move: 'move',
  select: 'select',
  current: 'current',
  copyLink: 'Copy link to this page',
  copyEmail: 'Copy email address',
  soundOn: 'Sound on',
  soundOff: 'Sound off',
  linkCopied: 'Link copied',
  emailCopied: 'Email copied',
  copyFailed: 'Could not copy. The browser blocked it.',
  openConfig: 'Open the config',
} as const;

export const COMMAND_GROUPS = [
  'Pages',
  'Notes',
  'Actions',
  'Light',
  'Elsewhere',
] as const;

export type CommandGroupName = (typeof COMMAND_GROUPS)[number];

/** What the menu needs from a note. The server builds it. */
export interface CommandNote {
  slug: string;
  title: string;
  /** Formatted date, shown as the hint. */
  date: string;
  /** Tags and keywords in one string, matched but not shown. */
  keywords: string;
}
