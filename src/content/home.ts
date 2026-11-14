/** Copy and small data for the home page. Rich sentences with links live in the hero components. */

export interface CopySet {
  a: string;
  b: string;
  c: string;
}

/** The h1 in two parts. The second part is toned down by the `heading` option. */
export const HERO_TITLE: Record<keyof CopySet, [start: string, end: string]> = {
  a: [
    'Full-stack engineer.',
    'I build web products from the first commit to the server they run on.',
  ],
  b: [
    'I make small software',
    'that does one job and then gets out of the way.',
  ],
  c: ['I write it, I ship it,', 'I host it.'],
};

export const HERO_LEAD: CopySet = {
  a: 'I am Byurhan. I have worked at ReCheck for six years, from intern to team lead. After work I build small local-first apps and publish them.',
  b: 'I am Byurhan, a full-stack engineer and team lead. At work I build web products. On my own time I make small tools that I use every day.',
  c: 'I am Byurhan, a full-stack engineer and team lead. At work that means React, Node and the deploy pipeline. At home it means a small server rack and services I run for myself.',
};

export const HERO_ACTIONS = {
  primary: { label: 'About me', href: '/about' },
  secondary: { label: 'Read the notes', href: '/notes' },
} as const;

/** The h1 for screen readers in the heroes that are one long sentence. */
export const HERO_HEADING = 'Byurhan Nurula, full-stack engineer and team lead';

/** The name in the `current` hero. It resolves out of noise. */
export const HERO_NAME = 'Byurhan Nurula.';

/** Services in the "self-hosting" popup. Only ones that do run at home. */
export const HOME_SERVICES = [
  { name: 'Home Assistant', icon: '/assets/icons/home-assistant.svg' },
  { name: 'Immich', icon: '/assets/icons/immich.svg' },
  { name: 'AdGuard Home', icon: '/assets/icons/adguard-home.svg' },
  { name: 'Proxmox', icon: '/assets/icons/proxmox.svg' },
] as const;

export type ExpandKey = 'eng' | 'lead' | 'small' | 'tinker';

/** A plain string, or a marked word that opens the panel with its key. */
export type ExpandPart = string | { key: ExpandKey; text: string };

/** The `expand` hero: each sentence, then the panels its marked words open. */
export const EXPAND_SENTENCES: ExpandPart[][] = [
  [
    'Hi, I am Byurhan, a ',
    { key: 'eng', text: 'full-stack engineer' },
    ' who ',
    { key: 'lead', text: 'leads a team' },
    ' and still writes a lot of the code.',
  ],
  [
    'I like software that is ',
    { key: 'small', text: 'small, private and repairable' },
    '. After hours I ',
    { key: 'tinker', text: 'tinker' },
    '.',
  ],
];

export const EXPAND_HINT = 'Click a marked word to read more.';

export const EXPAND_DAILY_STACK = [
  'TypeScript',
  'React',
  'Next.js',
  'Node',
  'PostgreSQL',
  'Docker',
];

/** Upper hour limit (exclusive) and the greeting until then. */
export const GREETINGS: [before: number, text: string][] = [
  [5, 'Good night'],
  [12, 'Good morning'],
  [18, 'Good afternoon'],
  [24, 'Good evening'],
];

export const PROJECTS_SECTION = {
  title: 'Side projects',
  sub: 'Small tools I built for myself. Nothing big.',
  action: 'All projects',
} as const;

/** One more line in the `rows` view, after the three projects. */
export const EXTRA_PROJECT_ROW = {
  name: 'dotfiles',
  kind: 'shell',
  icon: '/assets/icons/ghostty.svg',
  short: 'One script takes a blank Mac to a fully configured machine.',
} as const;

export const JOB_SECTION = {
  title: 'Day job',
  action: 'More about me',
  intro: {
    a: 'I started as an intern and now lead the team. In between I did every job the product needed: front end, back end, deployments and the brand.',
    b: 'I started as an intern and now lead the team. In between I did every job the product needed: front end, back end, deployments and the brand.',
    c: 'I started as an intern and now lead the team. The team had no designer and no DevOps person, so I learned both jobs.',
  } satisfies CopySet,
  summary:
    'I started as an intern and now lead the team. In between I did every job the product needed: front end, back end, deployments and the brand.',
  years: '6 years',
  ladderTitle: 'Team Lead / Full-Stack Engineer',
  ladderText:
    'Six years and every layer of it: from intern to leading the team.',
  rolesLabel: 'Roles at ReCheck',
} as const;

export const NOTE_SECTION = { title: 'Latest note', action: 'All notes' };

export const NOW_SECTION = { title: 'Now', action: 'More about me' };
