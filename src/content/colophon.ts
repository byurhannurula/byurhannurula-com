import type { Role } from '@/content/career';
import type { LightMode } from '@/lib/light';

export const COLOPHON_HERO = {
  title: 'How this site is made,',
  titleEnd: 'and why it looks like this.',
  lead: 'A colophon is the note at the end of a book that says how it was made. This is the one for this site: the tools, the type, the colours and the sites I learned from.',
} as const;

/** The stack as one sentence. `tech` names get their icon from tech.ts. */
export const BUILT_WITH = {
  tech: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Cloudflare'],
  text: 'The pages are server components in Next.js 16 and React 19, written in strict TypeScript and styled with Tailwind CSS 4. Notes are MDX files in the repository. The site is static and runs on Cloudflare Workers.',
} as const;

export interface Decision {
  title: string;
  text: string;
  /** Tailwind text colour for the number. Static, so Tailwind finds it. */
  tone: string;
}

/** The choices behind the stack: each one is a "no" to something. */
export const DECISIONS: Decision[] = [
  {
    title: 'No CMS',
    text: 'A note is a file. If writing takes more than opening a file, I stop writing.',
    tone: 'text-hue-5',
  },
  {
    title: 'No tracking',
    text: 'No cookies and no third-party scripts. Visits are counted by Umami on my own server, without personal data.',
    tone: 'text-hue-6',
  },
  {
    title: 'CSS before JavaScript',
    text: 'Motion is CSS where CSS can do it. One library loads on one page, for the contents island of a note.',
    tone: 'text-hue-2',
  },
  {
    title: 'Static first',
    text: 'Every page is built ahead of time. The server does no work when you open a page.',
    tone: 'text-hue-3',
  },
  {
    title: 'Light that follows the day',
    text: 'Four modes instead of a light and dark switch. The page is warm in the morning and black only at night.',
    tone: 'text-hue-7',
  },
  {
    title: 'Small tools',
    text: 'pnpm with a 48-hour release cooldown, oxlint and oxfmt, and a build that fails loudly.',
    tone: 'text-hue-4',
  },
];

export interface Typeface {
  name: string;
  role: string;
  /** Tailwind font class for the specimen. */
  font: string;
  sample: string;
}

export const TYPEFACES: Typeface[] = [
  {
    name: 'Instrument Sans',
    role: 'Titles and text',
    font: 'font-sans',
    sample: 'Aa',
  },
  {
    name: 'Geist Mono',
    role: 'Labels, dates and code',
    font: 'font-mono',
    sample: 'Aa',
  },
  {
    name: 'Geist Pixel',
    role: 'The name, in one hero',
    font: 'font-pixel',
    sample: 'Aa',
  },
];

export const LIGHT_MODES_COPY: {
  mode: LightMode;
  hours: string;
  text: string;
}[] = [
  { mode: 'morning', hours: '05 to 11', text: 'Warm white' },
  { mode: 'day', hours: '11 to 17', text: 'Plain white' },
  { mode: 'evening', hours: '17 to 21', text: 'Warm dark' },
  { mode: 'night', hours: '21 to 05', text: 'Black' },
];

/**
 * The versions of the site, oldest first, in the shape the career track
 * draws. Four rebuilds of one site read like four roles in one job.
 */
export const LINEAGE: Role[] = [
  {
    period: '2019 to 2022',
    year: '2019',
    title: 'v1, byurhanbeyzat.com',
    text: 'Gatsby, GitLab, a blog and a Supporters page. The byurhan. wordmark starts here.',
  },
  {
    period: '2022 to 2025',
    year: '2022',
    title: 'v2, byurhannurula.com',
    text: 'The first Next.js version, and a new last name. The wordmark stays.',
  },
  {
    period: '2025 to 2026',
    year: '2025',
    title: 'v3, never shipped',
    text: 'Theme experiments and a design playground. Good research that did not launch.',
  },
  {
    period: '2026',
    year: '2026',
    title: 'v4, this one',
    text: 'Rounded and calm, with four light modes. Built to ship unfinished.',
    current: true,
  },
];

export interface Credit {
  name: string;
  href: string;
  why: string;
}

/** Sites that shaped this one. */
export const INSPIRATION: Credit[] = [
  {
    name: 'barisozcan.com',
    href: 'https://barisozcan.com',
    why: 'craft and warmth',
  },
  {
    name: 'emilycampbell.co',
    href: 'https://emilycampbell.co',
    why: 'signature details',
  },
  {
    name: 'ouassim.tech',
    href: 'https://ouassim.tech',
    why: 'clear structure',
  },
  {
    name: 'juliacodes.com',
    href: 'https://www.juliacodes.com',
    why: 'clarity',
  },
  { name: 'ebrukaya.me', href: 'https://ebrukaya.me', why: 'voice' },
  {
    name: 'wesbos.com',
    href: 'https://wesbos.com/uses',
    why: 'the uses page, and the courses that started everything',
  },
  {
    name: 'colinlienard.com',
    href: 'https://colinlienard.com',
    why: 'the social card that travels, from his MIT source',
  },
];

/** Where the pictures on the site come from. */
export const ICON_CREDITS: Credit[] = [
  { name: 'Lucide', href: 'https://lucide.dev', why: 'interface icons' },
  { name: 'Simple Icons', href: 'https://simpleicons.org', why: 'brand marks' },
  {
    name: 'selfh.st/icons',
    href: 'https://selfh.st/icons',
    why: 'homelab service icons',
  },
];

export const PROCESS = {
  text: 'The design direction was explored in conversation with Claude, and every decision was second-guessed by me, many times. The byurhan. wordmark has survived a name change and three rebuilds. Some things are worth keeping.',
  source: 'The source is on GitHub',
} as const;
