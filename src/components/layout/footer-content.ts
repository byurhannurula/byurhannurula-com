import { RSS_PATH } from '@/content/socials';

/** Copy for the footer and the shell controls. */
export const LIGHT_MENU_LABEL = 'Change the light';

export const FOOTER_COPY = {
  siteHeading: 'Site',
  elsewhereHeading: 'Elsewhere',
  sentenceStart: 'That is the end of the page.',
  sentenceMid: 'Write to me at',
  sentenceEnd: 'or find me here.',
  copyEmailHint: 'Copy email',
  emailCopied: 'Copied to clipboard',
  emailCopiedShort: 'copied',
  version: 'v4.0',
  updated: 'Updated November 2026',
  privacy: 'No cookies, no tracking',
  source: 'Source',
  lightFallback: 'light',
  sound: 'sound',
  top: 'top',
} as const;

export const RSS_LINK = { name: 'RSS', href: RSS_PATH } as const;

export type SocialCard =
  | { kind: 'github'; handle: string; line: string }
  | {
      kind: 'profile';
      /** The network's own brand colour, for the banner and the button. */
      brandColour: string;
      name: string;
      line: string;
      cta: string;
    }
  | { kind: 'small'; title: string; line: string };

/** Hover card for each social link, by `Social.name`. */
export const SOCIAL_CARDS: Record<string, SocialCard> = {
  GitHub: {
    kind: 'github',
    handle: 'byurhannurula',
    line: 'contributions in the last year (sample data)',
  },
  LinkedIn: {
    kind: 'profile',
    brandColour: '#0a66c2',
    name: 'Byurhan Nurula',
    line: 'Team Lead / Full-Stack Engineer',
    cta: 'Connect',
  },
  X: {
    kind: 'profile',
    brandColour: '#2a2a2e',
    name: '@byurhannurula',
    line: 'Full-stack engineer. Privacy, homelabs, and things that outlive their hype cycle.',
    cta: 'Follow',
  },
  Mastodon: {
    kind: 'small',
    title: '@byurhannurula',
    line: 'on mastodon.social',
  },
  RSS: { kind: 'small', title: 'Notes feed', line: RSS_PATH },
};

const GRID_WEEKS = 26;
const LEVEL_PATTERN = [0, 0, 1, 0, 2, 1, 0, 3, 0, 1, 2, 0, 0, 1];

/** SAMPLE DATA: a fixed pattern, not real GitHub contributions. */
export const SAMPLE_CONTRIBUTION_LEVELS = Array.from(
  { length: GRID_WEEKS * 7 },
  (_, i) => LEVEL_PATTERN[(i * 7 + (i >> 3) * 3) % LEVEL_PATTERN.length],
);
