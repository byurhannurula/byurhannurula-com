/** Text with links in it. A string is plain text. */
export type RichPart = string | { text: string; href: string };
export type RichText = RichPart[];

interface CopyTones {
  /** Job first. */
  a: string;
  /** Builder. */
  b: string;
  /** Tinkerer. */
  c: string;
}

export const ABOUT_HERO: {
  title: CopyTones;
  titleEnd: CopyTones;
  lead: CopyTones;
} = {
  title: {
    a: 'Six years at one company,',
    b: 'I like software that is small, private',
    c: 'I want to know how it works,',
  },
  titleEnd: {
    a: 'learning as I go.',
    b: 'and possible to repair.',
    c: 'all the way down.',
  },
  lead: {
    a: 'I am Byurhan Nurula, a full-stack engineer. I wrote my first HTML in 6th grade. Since 2020 I work at ReCheck, where I started as an intern and now lead the team.',
    b: 'I am Byurhan Nurula, a full-stack engineer and team lead. I wrote my first HTML in 6th grade. Today I build web products at ReCheck, and small tools of my own after work.',
    c: 'I am Byurhan Nurula, a full-stack engineer and team lead. I started with HTML in 6th grade. Since then I moved in both directions: up to design, and down to the server.',
  },
};

export const ABOUT_LINKS = {
  linkedin: 'https://linkedin.com/in/byurhannurula',
  github: 'https://github.com/byurhannurula',
} as const;

/** Bio, `bio: a`. The first entry is the left column. */
export const BIO_COLUMNS = {
  left: 'Most of my work is web products: the React and Next.js front end, the Node services behind it, the database and the deployment.',
  right: [
    'For a long time my team had no designer and no DevOps engineer, so I learned enough of both to get the work done. Now I can help with most steps, from a Figma file to a server.',
    'As team lead I plan the work, review code and mentor new developers. I still write a lot of code, and I want to keep it that way.',
  ],
} as const;

export type BioLength = 'short' | 'long';

/**
 * Bio, `bio: switch`. The long form is BIO_COLUMNS. The short form is one
 * paragraph made from the same sentences, with no new facts.
 */
export const BIO_SWITCH = {
  legend: 'Bio length',
  labels: { short: 'short', long: 'long' } satisfies Record<BioLength, string>,
  copy: 'Copy bio',
  short:
    'I am a full-stack engineer and team lead. I work on web products: the React and Next.js front end, the Node services behind it, the database and the deployment. I still write a lot of code.',
} as const;

/** Bio, `bio: inline`. The tools named in the sentence. */
export const BIO_INLINE_TECH = [
  'React',
  'Next.js',
  'Node',
  'PostgreSQL',
  'Docker',
];

export type BioPanelKey = 'eng' | 'lead' | 'small' | 'tinker';

export type BioSentencePart = string | { key: BioPanelKey; text: string };

/** Bio, `bio: expand`. Each sentence, then the panels its marked words open. */
export const BIO_EXPAND: { parts: BioSentencePart[]; panels: BioPanelKey[] }[] =
  [
    {
      parts: [
        'Hi, I am Byurhan, a ',
        { key: 'eng', text: 'full-stack engineer' },
        ' who ',
        { key: 'lead', text: 'leads a team' },
        ' and still writes a lot of the code.',
      ],
      panels: ['eng', 'lead'],
    },
    {
      parts: [
        'I like software that is ',
        { key: 'small', text: 'small, private and repairable' },
        '. After hours I ',
        { key: 'tinker', text: 'tinker' },
        '.',
      ],
      panels: ['small', 'tinker'],
    },
  ];

export const BIO_EXPAND_HINT = 'Click a marked word to read more.';

export const BIO_PANELS: Record<
  BioPanelKey,
  { text: RichText; tech?: string[] }
> = {
  eng: {
    text: [
      'Most of my work is web products: the front end, the services behind it, the database and the deployment. Daily stack: ',
    ],
    tech: ['TypeScript', 'React', 'Next.js', 'Node', 'PostgreSQL', 'Docker'],
  },
  lead: {
    text: [
      'I joined ',
      { text: 'ReCheck', href: 'https://recheck.io/' },
      ' as an intern in 2020 and I have led the team since 2024. I plan the work, review code and mentor new developers.',
    ],
  },
  small: {
    text: [
      'The kind you can run on a machine you can touch. No account when none is necessary, no tracking, and data that stays where you put it.',
    ],
  },
  tinker: {
    text: [
      'A small homelab, a 3D printer and a soldering iron. I also make ',
      { text: 'small tools', href: '/work' },
      ' for myself. None of it is my job, but a lot of it helps at work.',
    ],
  },
};

export interface Layer {
  name: string;
  text: string;
  /** Number of the `--hue-N` token. */
  hue: number;
}

/** Top of the product first. The order is the order of the drawing. */
export const LAYERS: Layer[] = [
  {
    name: 'Design',
    text: 'No designer on the team, so I did it: the brand, a Figma system and the UI.',
    hue: 1,
  },
  {
    name: 'Front end',
    text: 'React and Next.js apps, from an empty repository to production.',
    hue: 2,
  },
  {
    name: 'API',
    text: 'REST and GraphQL APIs for our apps and for other teams.',
    hue: 3,
  },
  {
    name: 'Data',
    text: 'Data models and caching. I try to keep them simple.',
    hue: 4,
  },
  {
    name: 'Infrastructure',
    text: 'Docker, reverse proxies, CI/CD and backups that I test with a restore.',
    hue: 5,
  },
];

export const ACROSS_LABEL = 'across the layers';

/** Work that is not one layer: these light up the full stack. */
export const ACROSS_LAYERS = [
  { name: 'Automation', text: 'If it happens twice, it gets a script.' },
  { name: 'Team lead', text: 'Planning, code review and mentoring.' },
];

/** A sentence with marked words. `hue` is the number of a `--hue-N` token. */
export type SayPart = string | { text: string; hue: number };

/** What I do, `caps: b`. */
export const CAPS_SENTENCE: SayPart[] = [
  'Most days I work on the ',
  { text: 'front end', hue: 2 },
  ' and the ',
  { text: 'API', hue: 3 },
  ' behind it. I also help with the ',
  { text: 'interface', hue: 1 },
  ', the ',
  { text: 'data', hue: 4 },
  ' and the ',
  { text: 'servers', hue: 5 },
  ', ',
  { text: 'automate', hue: 6 },
  ' the boring parts, and ',
  { text: 'lead a small team', hue: 7 },
  '.',
];

export const TOPICS_SENTENCE: SayPart[] = [
  'Happy to talk about ',
  { text: 'system design', hue: 2 },
  ', ',
  { text: 'design engineering', hue: 1 },
  ', ',
  { text: 'local-first apps', hue: 4 },
  ', ',
  { text: 'React and Next.js', hue: 3 },
  ', ',
  { text: 'leading a small team', hue: 7 },
  ', ',
  { text: '3D printing', hue: 5 },
  ' or ',
  { text: 'dotfiles', hue: 6 },
  '.',
];

export type WayGlyph =
  | 'small'
  | 'restore'
  | 'layer'
  | 'lead'
  | 'data'
  | 'write';

export interface Way {
  glyph: WayGlyph;
  title: string;
  text: string;
  /** Tailwind class for this habit's hue. Static, so Tailwind finds it. */
  tone: string;
}

export const WAYS_SUB = 'Six habits, taken from the text on this site.';

export const WAYS: Way[] = [
  {
    glyph: 'small',
    title: 'Keep it small',
    text: 'A small tool that does one job is easier to trust and to repair.',
    tone: 'text-hue-2',
  },
  {
    glyph: 'restore',
    title: 'Test the restore',
    text: 'A backup that I did not restore is not a backup yet.',
    tone: 'text-hue-5',
  },
  {
    glyph: 'layer',
    title: 'Learn the layer below',
    text: 'When a part is a black box, I open it. That is how I got to design and to servers.',
    tone: 'text-hue-3',
  },
  {
    glyph: 'lead',
    title: 'Lead, and still code',
    text: 'I plan the work and review it. I also write a lot of the code.',
    tone: 'text-hue-6',
  },
  {
    glyph: 'data',
    title: 'Collect no data',
    text: 'My tools are local first. Sync is optional, and there is no tracking.',
    tone: 'text-hue-1',
  },
  {
    glyph: 'write',
    title: 'Write it down',
    text: 'After I fix something, I write the note that I wanted to find.',
    tone: 'text-hue-4',
  },
];

export const AFTER_HOURS = {
  sub: 'Not my job. Good for my job.',
  first: {
    a: 'After work I build small tools and publish them. I also run a small homelab and a 3D printer. It is a hobby, but it is also where I practise: a restore drill at home teaches the same lesson as one at work, and it costs less.',
    b: 'My side projects have one rule: small, local-first and no tracking. The same rule applies at home. I run my own services on a small homelab, because I like my data on hardware I can touch.',
    c: 'At night there is a soldering iron, a 3D printer and one more self-hosted service that nobody asked for. I try to run my small homelab with care: separate networks, monitoring and backups that I test.',
  } satisfies CopyTones,
  second:
    'This year I study two things that do not meet often: system design, and design engineering (type, spacing, motion). To me they are the same habit. Look at the detail, ask why it is there, then try it.',
  links: [
    { label: 'The homelab', href: '/homelab' },
    { label: 'What I use', href: '/uses' },
    { label: 'Projects', href: '/work' },
  ],
};

export interface FaqItem {
  question: string;
  answer: RichText;
  /** Tools shown with their icons before the answer. */
  tech?: string[];
  /** The answer is not known yet. Only the site owner can write it. */
  unknown?: boolean;
}

export const FAQ_INTRO =
  'For recruiters and hiring managers. Select a question.';

/** The CV page. Its print button saves the PDF. */
export const CV_HREF = '/cv';

const UNKNOWN_ANSWER = 'Your answer goes here. I do not know it.';

export const FAQ: FaqItem[] = [
  {
    question: 'What do you do, in one line?',
    answer: [
      'I am a full-stack engineer and team lead. I build web products, mostly with React, Next.js and Node.',
    ],
  },
  {
    question: 'Which stack do you know best?',
    tech: ['TypeScript', 'React', 'Next.js', 'Node'],
    answer: [' for the daily work. Docker and CI for the part after the code.'],
  },
  {
    question: 'Do you still write code as a team lead?',
    answer: [
      'Yes, a lot. I plan the work, review code and mentor new developers, and I keep my own tasks in each sprint.',
    ],
  },
  {
    question: 'How long were you in one company?',
    answer: [
      'Six years at ReCheck, in four roles: intern, software developer, full-stack engineer and team lead.',
    ],
  },
  {
    question: 'Are you open to new roles?',
    answer: [UNKNOWN_ANSWER],
    unknown: true,
  },
  {
    question: 'Remote, hybrid or office?',
    answer: [UNKNOWN_ANSWER],
    unknown: true,
  },
  {
    question: 'Where is the CV?',
    answer: [
      'The ',
      { text: 'CV is here', href: CV_HREF },
      '. The same data is on ',
      { text: 'LinkedIn', href: ABOUT_LINKS.linkedin },
      '.',
    ],
  },
];
