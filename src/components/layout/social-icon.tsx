const FILLED: Record<string, string> = {
  GitHub:
    'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z',
  LinkedIn:
    'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  X: 'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z',
};

const OUTLINED: Record<string, string[]> = {
  Mastodon: [
    'M4 9.5C4 6 6.5 4 12 4s8 2 8 5.5v3c0 3-2.5 4.5-8 4.5-1.5 0-2.8-.2-3.8-.5.3 2 2.3 2.8 5.8 2.3',
    'M8 13V9.8C8 8.7 8.8 8 9.9 8S12 8.8 12 10v1.5M12 11.5V10c0-1.2.9-2 2.1-2S16 8.7 16 9.8V13',
  ],
  RSS: [
    'M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14',
    'M6 18m-1.2 0a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0',
  ],
};

interface SocialIconProps {
  /** `Social.name` from src/content/socials.ts, or "RSS". */
  name: string;
  className?: string;
}

/** Brand mark for a social link. An unknown name draws nothing. */
export function SocialIcon({ name, className }: SocialIconProps) {
  const filled = FILLED[name];
  if (filled) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className={className}
      >
        <path d={filled} />
      </svg>
    );
  }
  const outlined = OUTLINED[name];
  if (!outlined) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {outlined.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
