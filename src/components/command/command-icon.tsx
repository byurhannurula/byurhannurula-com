import type { ReactNode } from 'react';

const ICONS = {
  page: (
    <>
      <path d="M3.5 2.5h6l3 3v8h-9z" />
      <path d="M9.5 2.5v3h3" />
    </>
  ),
  note: <path d="M3 4h10M3 8h10M3 12h6" />,
  link: (
    <path d="M6.5 9.5l3-3M7 4.5l1-1a2.5 2.5 0 0 1 3.5 3.5l-1 1M9 11.5l-1 1A2.5 2.5 0 0 1 4.5 9l1-1" />
  ),
  copy: (
    <>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M3 10.5V3h7.5" />
    </>
  ),
  light: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 2.5v11a5.5 5.5 0 0 0 0-11Z" fill="currentColor" />
    </>
  ),
  out: <path d="M6.5 3H3v10h10V9.5M9.5 3H13v3.5M13 3 7.5 8.5" />,
  gear: (
    <>
      <path d="M2 4.5h6m4 0h2M2 11.5h2m4 0h6" />
      <circle cx="10" cy="4.5" r="1.8" />
      <circle cx="6" cy="11.5" r="1.8" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type CommandIconName = keyof typeof ICONS;

interface CommandIconProps {
  name: CommandIconName;
  className?: string;
}

/** Small 16 px line icon for a command menu row. Decorative. */
export function CommandIcon({ name, className }: CommandIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {ICONS[name]}
    </svg>
  );
}
