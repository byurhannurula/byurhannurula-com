import { RSS_PATH } from '@/content/socials';

/** Copy for the footer and the shell controls. */
export const LIGHT_MENU_LABEL = 'Change the light';

export const FOOTER_COPY = {
  siteHeading: 'Site',
  siteNavLabel: 'Footer',
  elsewhereHeading: 'Elsewhere',
  sentenceStart: 'That is the end of the page.',
  sentenceMid: 'Write to me at',
  sentenceEnd: 'or find me here.',
  copyEmailHint: 'Copy email',
  emailCopied: 'Copied to clipboard',
  emailCopiedShort: 'copied',
  version: 'v4.0',
  source: 'Source',
  rss: 'RSS',
  llms: 'llms.txt',
  lightFallback: 'light',
  sound: 'sound',
  top: 'top',
} as const;

export const RSS_LINK = { name: 'RSS', href: RSS_PATH } as const;

export type SocialCard =
  | {
      kind: 'github';
      handle: string;
      /** Follows the count: "1,204 contributions in the last year". */
      line: string;
      /** Shown when there is no contribution data. */
      fallback: string;
    }
  | {
      kind: 'linkedin';
      name: string;
      /** Each entry is one line under the name. */
      lines: string[];
      cta: string;
    }
  | { kind: 'x'; handle: string; bio: string; cta: string }
  | { kind: 'small'; title: string; line: string };

/** Hover card for each social link, by `Social.name`. */
export const SOCIAL_CARDS: Record<string, SocialCard> = {
  GitHub: {
    kind: 'github',
    handle: 'byurhannurula',
    line: 'contributions in the last year',
    fallback: 'on GitHub',
  },
  LinkedIn: {
    kind: 'linkedin',
    name: 'Byurhan Nurula',
    lines: ['Team Lead / Full-Stack Engineer', 'Ruse, Bulgaria'],
    cta: 'Connect',
  },
  X: {
    kind: 'x',
    handle: '@byurhannurula',
    bio: 'Full-stack engineer. Privacy, homelabs, and things that outlive their hype cycle.',
    cta: 'Follow',
  },
  Mastodon: {
    kind: 'small',
    title: '@byurhannurula',
    line: 'on mastodon.social',
  },
  RSS: { kind: 'small', title: 'Notes feed', line: RSS_PATH },
};
