/**
 * The list that drives /design-system. The page components only draw what is
 * here: add an entry and it shows on the page.
 *
 * The values repeat src/styles/tokens.css, options.css and motion.css on
 * purpose. CSS sets a default on `:root` only, so a preview of one mode or of
 * one option value inside the page must state the value again. Change a token
 * in the stylesheet and here together.
 *
 * Class names are complete static strings, so Tailwind finds them here.
 */

import type { OptionKey } from '@/config/options';
import type { LightMode } from '@/lib/light';

type CssVars = Record<`--${string}`, string>;
type PerMode = Record<LightMode, string>;

const perMode = (
  morning: string,
  day: string,
  evening: string,
  night: string,
): PerMode => ({ morning, day, evening, night });

const perTheme = (light: string, dark: string) =>
  perMode(light, light, dark, dark);

/* ------------------------------------------------------------------ */
/* Sections of the page, in order. The side index is this list.        */
/* ------------------------------------------------------------------ */

export interface DsSection {
  /** Anchor id. The page maps it to a section body. */
  id: string;
  title: string;
  /** Not set for a section that brings its own title row. */
  sub?: string;
}

export const DS_SECTIONS: DsSection[] = [
  {
    id: 'colour',
    title: 'Colour',
    sub: 'Read from the live stylesheet. Change the light or the accent and it follows.',
  },
  {
    id: 'type',
    title: 'Type',
    sub: 'One text face, one mono face for labels, one pixel face for play.',
  },
  {
    id: 'shape',
    title: 'Shape and space',
    sub: 'Corners, shadows, gaps and page widths.',
  },
  {
    id: 'motion',
    title: 'Motion',
    sub: 'One curve, a few keyframes. Still when the reader asks for it.',
  },
  {
    id: 'components',
    title: 'Components',
    sub: 'The real components, not copies of them.',
  },
  // Drawn by <LinksSection />, which has its own title and text.
  { id: 'links', title: 'Links' },
  {
    id: 'options',
    title: 'Options',
    sub: 'Every open design choice. A click sets it for the whole site.',
  },
  {
    id: 'changes',
    title: 'Changes',
    sub: 'Every commit that touched the styles, components or options, read from git at each deploy.',
  },
];

/* ------------------------------------------------------------------ */
/* Colour                                                               */
/* ------------------------------------------------------------------ */

export interface ColourToken {
  name: string;
  variable: `--${string}`;
  /** The Tailwind class that paints with it. */
  className: string;
  use: string;
  values: PerMode;
}

export interface ColourGroup {
  id: string;
  title: string;
  note?: string;
  /** How a swatch draws: a filled block, a letter, an edge or a small dot. */
  show: 'block' | 'text' | 'edge' | 'dot';
  tokens: ColourToken[];
}

export const COLOUR_GROUPS: ColourGroup[] = [
  {
    id: 'surfaces',
    title: 'surfaces',
    show: 'block',
    tokens: [
      {
        name: 'bg',
        variable: '--bg',
        className: 'bg-bg',
        use: 'The page.',
        values: perMode('#faf6f0', '#fafafa', '#1c1815', '#0a0a0a'),
      },
      {
        name: 'card',
        variable: '--card',
        className: 'bg-card',
        use: 'Things that lie on the page: cards, menus, keys.',
        values: perMode('#fffdf9', '#ffffff', '#241f1a', '#141414'),
      },
      {
        name: 'sunk',
        variable: '--sunk',
        className: 'bg-sunk',
        use: 'Things set into the page: code, chips, hover fills.',
        values: perMode('#f2ece3', '#f1f1f1', '#2b241d', '#1c1c1c'),
      },
    ],
  },
  {
    id: 'text',
    title: 'text',
    show: 'text',
    tokens: [
      {
        name: 'ink',
        variable: '--ink',
        className: 'text-ink',
        use: 'Titles and body text.',
        values: perMode('#241f1a', '#1a1a1a', '#ede4d8', '#e6e6e6'),
      },
      {
        name: 'soft',
        variable: '--soft',
        className: 'text-soft',
        use: 'Second level text: leads, excerpts.',
        values: perMode('#554d45', '#515151', '#b4a899', '#9e9e9e'),
      },
      {
        name: 'faint',
        variable: '--faint',
        className: 'text-faint',
        use: 'Small text: dates, labels. 4.5:1 or more on bg.',
        values: perMode('#756c62', '#707070', '#9a8f83', '#8a8a8a'),
      },
      {
        name: 'faint-large',
        variable: '--faint-large',
        className: 'text-(--faint-large)',
        use: 'Large display text only: the second half of a title.',
        values: perMode('#8f867b', '#8c8c8c', '#7f756a', '#6c6c6c'),
      },
    ],
  },
  {
    id: 'lines',
    title: 'lines',
    show: 'edge',
    note: 'Dividers use border-rule, which is line, or nothing when the lines option is off.',
    tokens: [
      {
        name: 'line',
        variable: '--line',
        className: 'border-line',
        use: 'Quiet edges and dividers.',
        values: perMode(
          'rgb(70 45 10 / 0.1)',
          'rgb(0 0 0 / 0.09)',
          'rgb(255 232 205 / 0.09)',
          'rgb(255 255 255 / 0.09)',
        ),
      },
      {
        name: 'line-strong',
        variable: '--line-strong',
        className: 'border-line-strong',
        use: 'Edges that must show: outline buttons, inputs.',
        values: perMode(
          'rgb(70 45 10 / 0.19)',
          'rgb(0 0 0 / 0.16)',
          'rgb(255 232 205 / 0.19)',
          'rgb(255 255 255 / 0.18)',
        ),
      },
    ],
  },
  {
    id: 'accent',
    title: 'accent',
    show: 'block',
    note: 'Green, the one accent of the site.',
    tokens: [
      {
        name: 'accent',
        variable: '--accent',
        className: 'text-accent',
        use: 'Accent as text: tags, links on hover.',
        values: perMode('#15803d', '#15803d', '#5ecf8b', '#4ade80'),
      },
      {
        name: 'accent-bright',
        variable: '--accent-bright',
        className: 'bg-accent-bright',
        use: 'Accent as a shape: dots, the focus ring, list marks.',
        values: perMode('#22c55e', '#22c55e', '#5ecf8b', '#4ade80'),
      },
      {
        name: 'accent-soft',
        variable: '--accent-soft',
        className: 'bg-accent-soft',
        use: 'Accent as a fill: the text selection.',
        values: perMode(
          'rgb(34 197 94 / 0.13)',
          'rgb(34 197 94 / 0.13)',
          'rgb(94 207 139 / 0.13)',
          'rgb(74 222 128 / 0.13)',
        ),
      },
    ],
  },
  {
    id: 'signals',
    title: 'signals',
    show: 'text',
    tokens: [
      {
        name: 'amber',
        variable: '--amber',
        className: 'text-amber',
        use: 'Sample content and warnings.',
        values: perTheme('#b45309', '#fbbf24'),
      },
      {
        name: 'danger',
        variable: '--danger',
        className: 'text-danger',
        use: 'Errors and the do not column.',
        values: perTheme('#dc2626', '#f87171'),
      },
    ],
  },
  {
    id: 'hues',
    title: 'hues',
    show: 'dot',
    note: 'One per idea, never decoration alone: section marks, layers, the now block.',
    tokens: [
      ['1', 'pink', '#db2777', '#f472b6'],
      ['2', 'blue', '#2563eb', '#60a5fa'],
      ['3', 'violet', '#7c3aed', '#a78bfa'],
      ['4', 'cyan', '#0891b2', '#22d3ee'],
      ['5', 'orange', '#ea580c', '#fb923c'],
      ['6', 'green', '#16a34a', '#4ade80'],
      ['7', 'yellow', '#ca8a04', '#facc15'],
    ].map(([n, colour, light, dark]) => ({
      name: `hue-${n}`,
      variable: `--hue-${n}` as const,
      className: `text-hue-${n}`,
      use: `${colour}.`,
      values: perTheme(light ?? '', dark ?? ''),
    })),
  },
];

export interface ModeDef {
  value: LightMode;
  note: string;
}

export const MODES: ModeDef[] = [
  { value: 'morning', note: 'Warm white, from 05:00.' },
  { value: 'day', note: 'Plain white, from 11:00.' },
  { value: 'evening', note: 'Warm dark, from 17:00.' },
  { value: 'night', note: 'Black, from 21:00.' },
];

export interface ContrastPair {
  text: `--${string}`;
  on: `--${string}`;
  /** The WCAG ratio this pair must reach. */
  min: number;
}

/** Text colours on the surfaces they are used on. 3:1 is for large text. */
export const CONTRAST_PAIRS: ContrastPair[] = [
  { text: '--ink', on: '--bg', min: 4.5 },
  { text: '--soft', on: '--bg', min: 4.5 },
  { text: '--faint', on: '--bg', min: 4.5 },
  { text: '--faint-large', on: '--bg', min: 3 },
  { text: '--accent', on: '--bg', min: 4.5 },
  { text: '--amber', on: '--bg', min: 4.5 },
  { text: '--danger', on: '--bg', min: 4.5 },
  { text: '--soft', on: '--card', min: 4.5 },
  { text: '--faint', on: '--card', min: 4.5 },
  { text: '--soft', on: '--sunk', min: 4.5 },
];

/* ------------------------------------------------------------------ */
/* Shape and space                                                      */
/* ------------------------------------------------------------------ */

export interface ShadowToken {
  name: string;
  variable?: `--${string}`;
  className: string;
  use: string;
  values?: PerMode;
}

export const SHADOWS: ShadowToken[] = [
  {
    name: 'soft',
    variable: '--shadow-soft',
    className: 'shadow-soft',
    use: 'A thing at rest on the page.',
    values: perTheme(
      '0 1px 2px rgb(0 0 0 / 0.05), 0 10px 28px -14px rgb(0 0 0 / 0.18)',
      '0 0 0 1px rgb(255 255 255 / 0.04)',
    ),
  },
  {
    name: 'lift',
    variable: '--shadow-lift',
    className: 'shadow-lift',
    use: 'The same thing on hover, or a thing that floats.',
    values: perTheme(
      '0 2px 4px rgb(0 0 0 / 0.05), 0 28px 56px -24px rgb(0 0 0 / 0.28)',
      '0 28px 56px -24px rgb(0 0 0 / 0.9)',
    ),
  },
  {
    name: 'hairline',
    className: 'shadow-[0_0_0_1px_var(--line)]',
    use: 'An edge that takes no space: pictures, code blocks.',
  },
];

export interface RadiusToken {
  name: string;
  variable: `--${string}`;
  className: string;
  use: string;
}

export const RADII: RadiusToken[] = [
  {
    name: 'md',
    variable: '--r-md',
    className: 'rounded-md',
    use: 'small parts',
  },
  {
    name: 'lg',
    variable: '--r-lg',
    className: 'rounded-lg',
    use: 'pictures, callouts',
  },
  {
    name: 'xl',
    variable: '--r-xl',
    className: 'rounded-xl',
    use: 'covers, large panels',
  },
];

export interface SpaceToken {
  name: string;
  variable: `--${string}`;
  /** The option that sets it. */
  option: OptionKey;
  use: string;
}

export const GAPS: SpaceToken[] = [
  {
    name: 'section gap',
    variable: '--section-gap',
    option: 'density',
    use: 'Above each section.',
  },
  {
    name: 'hero gap',
    variable: '--hero-gap',
    option: 'density',
    use: 'Above the page title.',
  },
];

export const GAP_NOTE =
  'Below 860 px the normal gaps are 3.5rem and 4.5rem, so a phone does not scroll through air.';

export const WIDTHS: SpaceToken[] = [
  {
    name: 'wrap',
    variable: '--wrap',
    option: 'width',
    use: 'The page column. 1.25rem of padding at each side.',
  },
];

/**
 * The CSS variables each look option sets, per value. A wrapper with these as
 * an inline style shows one value of the option, whatever the page is set to.
 */
export const OPTION_VARS: Partial<Record<OptionKey, Record<string, CssVars>>> =
  {
    font: {
      instrument: { '--font-body': 'var(--font-instrument)' },
      geist: { '--font-body': 'var(--font-geist)' },
      hanken: { '--font-body': 'var(--font-hanken)' },
    },
    heading: {
      twotone: { '--title-em': 'var(--faint-large)' },
      one: { '--title-em': 'inherit' },
      accent: { '--title-em': 'var(--accent)' },
    },
    width: {
      normal: { '--wrap': '64rem' },
      narrow: { '--wrap': '50rem' },
      wide: { '--wrap': '74rem' },
    },
    radius: {
      round: { '--r-md': '12px', '--r-lg': '18px', '--r-xl': '26px' },
      small: { '--r-md': '8px', '--r-lg': '10px', '--r-xl': '12px' },
      large: { '--r-md': '16px', '--r-lg': '26px', '--r-xl': '38px' },
    },
    h1: {
      normal: {
        '--title-size': 'clamp(2.25rem, 5.2vw, 3.9rem)',
        '--page-title-size': 'clamp(2rem, 4.4vw, 3.25rem)',
      },
      small: {
        '--title-size': 'clamp(1.9rem, 3.8vw, 2.75rem)',
        '--page-title-size': 'clamp(1.9rem, 3.8vw, 2.75rem)',
      },
      large: {
        '--title-size': 'clamp(2.5rem, 6.2vw, 4.75rem)',
        '--page-title-size': 'clamp(2.5rem, 6.2vw, 4.75rem)',
      },
    },
    density: {
      normal: { '--section-gap': '5rem', '--hero-gap': '7rem' },
      compact: { '--section-gap': '3.25rem', '--hero-gap': '5rem' },
      roomy: { '--section-gap': '7rem', '--hero-gap': '9rem' },
    },
    lines: {
      on: { '--rule': 'var(--line)' },
      off: { '--rule': 'transparent' },
    },
  };

/** Every colour and shadow variable of one light mode. */
export function modeVars(mode: LightMode): CssVars {
  const vars: CssVars = {};
  for (const group of COLOUR_GROUPS) {
    for (const token of group.tokens) vars[token.variable] = token.values[mode];
  }
  for (const shadow of SHADOWS) {
    if (shadow.variable && shadow.values) {
      vars[shadow.variable] = shadow.values[mode];
    }
  }
  return vars;
}

/* ------------------------------------------------------------------ */
/* Type                                                                 */
/* ------------------------------------------------------------------ */

export interface FontDef {
  id: string;
  name: string;
  /** The variable next/font sets on <html> (src/lib/fonts.ts). */
  variable: `--${string}`;
  role: string;
  /** Set when this face is a value of the `font` option. */
  option?: { key: OptionKey; value: string };
  className?: string;
  sample: string;
}

export const FONTS: FontDef[] = [
  {
    id: 'instrument',
    name: 'Instrument Sans',
    variable: '--font-instrument',
    role: 'Text face, the default.',
    option: { key: 'font', value: 'instrument' },
    sample: 'Small tools, built with care.',
  },
  {
    id: 'geist',
    name: 'Geist',
    variable: '--font-geist',
    role: 'Text face, in trial.',
    option: { key: 'font', value: 'geist' },
    sample: 'Small tools, built with care.',
  },
  {
    id: 'hanken',
    name: 'Hanken Grotesk',
    variable: '--font-hanken',
    role: 'Text face, in trial.',
    option: { key: 'font', value: 'hanken' },
    sample: 'Small tools, built with care.',
  },
  {
    id: 'mono',
    name: 'Geist Mono',
    variable: '--font-geist-mono',
    role: 'Labels, dates, code. Weights 400 and 500.',
    className: 'font-mono',
    sample: '11 Sep 2026 · 4 min read',
  },
  {
    id: 'pixel',
    name: 'Geist Pixel Square',
    variable: '--font-geist-pixel',
    role: 'Play only: one hero variant uses it.',
    className: 'font-pixel',
    sample: 'hello, world',
  },
];

export interface TypeStyle {
  name: string;
  /** The classes the app uses for this style. */
  classes: string;
  /** Size, weight and tracking in words, for the label. */
  spec: string;
  use: string;
  sample: string;
}

export const TYPE_SCALE: TypeStyle[] = [
  {
    name: 'home title',
    classes:
      'text-(length:--title-size) leading-[1.04] font-semibold tracking-[-0.035em]',
    spec: '--title-size · 600 · -0.035em',
    use: 'The h1 of the home page. The h1 and top options change the size.',
    sample: 'Full-stack engineer.',
  },
  {
    name: 'page title',
    classes:
      'text-(length:--page-title-size) leading-[1.04] font-semibold tracking-[-0.035em]',
    spec: '--page-title-size · 600 · -0.035em',
    use: 'The h1 of every other page.',
    sample: 'What I use every day.',
  },
  {
    name: 'note heading',
    classes: 'text-[1.75rem] leading-[1.2] font-semibold tracking-[-0.025em]',
    spec: '1.75rem · 600 · -0.025em',
    use: 'An h2 inside a note, and the title of a note in a list.',
    sample: 'Third time is the charm',
  },
  {
    name: 'section title',
    classes: 'text-2xl leading-tight font-semibold tracking-[-0.025em]',
    spec: '1.5rem · 600 · -0.025em',
    use: 'The h2 of a section. The sectitle option has two more forms.',
    sample: 'Selected work',
  },
  {
    name: 'note subheading',
    classes: 'text-xl leading-[1.3] font-semibold tracking-[-0.015em]',
    spec: '1.25rem · 600 · -0.015em',
    use: 'An h3 inside a note.',
    sample: 'What changed this time',
  },
  {
    name: 'lead',
    classes: 'text-[1.1875rem] leading-[1.55] text-soft',
    spec: '1.1875rem · 400 · soft',
    use: 'The paragraph under a page title.',
    sample:
      'Hardware and software on my desk. I change it slowly, and only for a reason.',
  },
  {
    name: 'note body',
    classes: 'text-[1.1875rem] leading-[1.75]',
    spec: '1.1875rem · 400 · 1.75',
    use: 'Long text in a note. The psize option has a small and a large form.',
    sample:
      'The post that exists is better than the perfect post that does not.',
  },
  {
    name: 'body',
    classes: 'text-base leading-[1.6]',
    spec: '1rem · 400 · 1.6',
    use: 'Everything else.',
    sample: 'I lead the team at ReCheck and I still write code.',
  },
  {
    name: 'link',
    classes: 'text-[0.9375rem] font-medium',
    spec: '0.9375rem · 500',
    use: 'Arrow links and technology names.',
    sample: 'All work',
  },
  {
    name: 'label',
    classes: 'label-mono text-faint',
    spec: 'mono · 0.8125rem · 400 · faint',
    use: 'Dates, meta lines, small labels. The label-mono utility.',
    sample: '11 Sep 2026 · 4 min read',
  },
  {
    name: 'tag',
    classes: 'font-mono text-xs leading-none font-medium',
    spec: 'mono · 0.75rem · 500',
    use: 'Sample tags and file names.',
    sample: 'notes/third-time-is-the-charm.mdx',
  },
];

/** The two-part title, shown for each value of the `heading` option. */
export const TWO_TONE = {
  title: 'What I use',
  titleEnd: 'every day.',
  note: 'The second half of a title takes --title-em. The heading option sets it.',
};

/* ------------------------------------------------------------------ */
/* Motion                                                               */
/* ------------------------------------------------------------------ */

export interface EasingDef {
  name: string;
  /** A CSS timing function. */
  value: string;
  className?: string;
  use: string;
}

export const EASINGS: EasingDef[] = [
  {
    name: 'ease-soft',
    value: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    className: 'ease-soft',
    use: 'Every move and fade: a fast start, a long soft stop.',
  },
  {
    name: 'steps',
    value: 'steps(1)',
    use: 'Caret and blink: on or off, nothing between.',
  },
];

export interface DurationDef {
  /** A CSS time. */
  value: string;
  use: string;
}

export const DURATIONS: DurationDef[] = [
  { value: '0.2s', use: 'Hover and press on a button, pop-in.' },
  { value: '0.3s', use: 'Light mode change, the arrow of a link.' },
  { value: '0.35s', use: 'Rise-in, titles that move on hover.' },
  { value: '0.7s', use: 'Scroll reveal.' },
  { value: '1.6s', use: 'Line drawings.' },
];

export interface KeyframeDef {
  name: string;
  /** The Tailwind class from the theme (src/styles/motion.css). */
  className: string;
  timing: string;
  use: string;
  /** Which small drawing shows it. */
  demo: 'line' | 'caret' | 'dot' | 'card' | 'text';
}

export const KEYFRAMES: KeyframeDef[] = [
  {
    name: 'draw',
    className: 'animate-draw',
    timing: '1.6s, ease-soft, once',
    use: 'Line drawings draw themselves. The shape needs pathLength="1".',
    demo: 'line',
  },
  {
    name: 'rise-in',
    className: 'animate-rise-in',
    timing: '0.35s, ease-soft, once',
    use: 'Text that swaps in place: 8px up, out of a blur.',
    demo: 'text',
  },
  {
    name: 'pop-in',
    className: 'animate-pop-in',
    timing: '0.2s, ease-soft, once',
    use: 'Panels and menus that open.',
    demo: 'card',
  },
  {
    name: 'caret',
    className: 'animate-caret',
    timing: '1.1s, steps, loops',
    use: 'The text cursor of a typed line.',
    demo: 'caret',
  },
  {
    name: 'blink',
    className: 'animate-blink',
    timing: '2.6s, steps, loops',
    use: 'A status light.',
    demo: 'dot',
  },
];

export const REVEAL = {
  name: 'scroll reveal',
  attribute: 'data-reveal',
  timing: '0.7s, ease-soft: 18px up, from 98.5% size',
  use: 'Add data-reveal to an element. It shows when it enters the view. Without scripts the page is complete.',
};

export const MOTION_NOTE =
  'Reduced motion in the system, or the motion option set to off, cuts every animation here to a still state.';

/* ------------------------------------------------------------------ */
/* Components                                                           */
/* ------------------------------------------------------------------ */

export const DEMO_GROUPS = [
  'actions',
  'labels and tech',
  'blocks',
  'notes',
] as const;

export type DemoGroup = (typeof DEMO_GROUPS)[number];

export interface DemoEntry {
  /** Matches a renderer in src/components/design-system/demos.tsx. */
  id: string;
  title: string;
  group: DemoGroup;
  /** One line: when to use it. */
  use: string;
  /** Where the component lives. */
  source: string;
  /** Options that change it. */
  options?: OptionKey[];
  /**
   * Show the demo once per value of this option, side by side. `values`
   * limits the list; without it every choice of the option shows.
   */
  variants?: {
    key: OptionKey;
    values?: string[];
    layout: 'stack' | 'grid';
  };
}

export const DEMOS: DemoEntry[] = [
  {
    id: 'button',
    title: 'Button',
    group: 'actions',
    use: 'The main action of a block. One filled button per view; the rest are outline or ghost.',
    source: 'ui/button',
  },
  {
    id: 'arrow-link',
    title: 'ArrowLink',
    group: 'actions',
    use: 'A link to the next place: the end of a section title, the end of a card.',
    source: 'shared/arrow-link',
  },
  {
    id: 'copy-button',
    title: 'CopyButton',
    group: 'actions',
    use: 'Copies a text and says so for a moment. It brings no style of its own.',
    source: 'shared/copy-button',
  },
  {
    id: 'sample-tag',
    title: 'SampleTag',
    group: 'labels and tech',
    use: 'Marks content that is not real yet. Search for it before launch.',
    source: 'shared/sample-tag',
  },
  {
    id: 'tech',
    title: 'Tech',
    group: 'labels and tech',
    use: 'One technology with its brand icon, in a sentence or a list. No box.',
    source: 'shared/tech',
  },
  {
    id: 'tech-list',
    title: 'TechList',
    group: 'labels and tech',
    use: 'The stack of a project, when there is room for names.',
    source: 'shared/tech',
  },
  {
    id: 'tech-pile',
    title: 'TechPile',
    group: 'labels and tech',
    use: 'The same stack in one line. A click spreads it and shows the names.',
    source: 'shared/tech-pile',
    options: ['sound'],
  },
  {
    id: 'now-block',
    title: 'NowBlock',
    group: 'blocks',
    use: 'Four short lines about the present, on the home and about pages.',
    source: 'shared/now-block',
    options: ['now'],
  },
  {
    id: 'section-title',
    title: 'Section, title styles',
    group: 'blocks',
    use: 'Every section of a page: a title, one short line, an action at the right.',
    source: 'shared/section',
    options: ['sectitle', 'density'],
    variants: { key: 'sectitle', layout: 'stack' },
  },
  {
    id: 'section-marks',
    title: 'Section, marks',
    group: 'blocks',
    use: 'A small shape in the hue of the section. Five shapes, in turn.',
    source: 'shared/section',
    options: ['colour'],
    variants: { key: 'colour', layout: 'grid' },
  },
  {
    id: 'page-hero',
    title: 'PageHero',
    group: 'blocks',
    use: 'The top of an inner page. A small preview: it does not take clicks.',
    source: 'shared/page-hero',
    options: ['top', 'artsize', 'h1', 'heading'],
    variants: { key: 'top', layout: 'stack' },
  },
  {
    id: 'note-item',
    title: 'NoteItem',
    group: 'notes',
    use: 'One note in a list. All forms are in the markup and CSS shows one.',
    source: 'notes/note-item',
    options: ['note', 'lines'],
    variants: { key: 'note', layout: 'stack' },
  },
];

/**
 * Options shown side by side. The page takes these attributes off <html>
 * while it is open: an `in-data-[key=value]:` class matches any ancestor,
 * not the nearest, so the page value would show in every example too.
 */
export const VARIANT_KEYS: OptionKey[] = [
  ...new Set(
    DEMOS.flatMap((demo) => (demo.variants ? [demo.variants.key] : [])),
  ),
];

export interface PostSample {
  id: string;
  title: string;
  use: string;
  /** MDX, compiled with the same pipeline as a note (src/lib/mdx.tsx). */
  source: string;
}

export const POST_NOTE =
  'Each sample below is MDX text in the config file, compiled with the pipeline of a real note.';

export const POST_SAMPLES: PostSample[] = [
  {
    id: 'post-text',
    title: 'Text',
    use: 'Plain Markdown: bold, inline code, links, lists, a quote with its source.',
    source: `A paragraph with **bold text**, \`inline code\`, a link to [another page](/notes) and a key: press <Kbd>Cmd</Kbd> <Kbd>K</Kbd> to open the menu.

- A list item with a point.
- A second item, with \`code\` in it.

1. A numbered step.
2. The next step.

> One idea per post, publish rough, and write what you just fixed.
> -- A note to myself

A small link inside a sentence: <LinkChip href="https://github.com/byurhannurula" title="GitHub" />.`,
  },
  {
    id: 'post-callout',
    title: 'Callout',
    use: 'A fact, a success, a warning or a danger that must not be missed.',
    source: `<Callout type="info" title="Info">
  Posts are MDX files in the repo. No editor, no dashboard.
</Callout>

<Callout type="ok" title="Success">
  The restore drill passed. The backup is a real backup now.
</Callout>

<Callout type="warn" title="Warning">
  Label the cables before the rack is full, not after.
</Callout>

<Callout type="danger" title="Do not do this">
  Do not open a port on the router to reach one service.
</Callout>`,
  },
  {
    id: 'post-quote',
    title: 'Quote',
    use: 'The one line a reader should keep. A plain Markdown quote is enough for the rest.',
    source: `<Quote cite="A note to myself" source="the third try">
  The post that exists is better than the perfect post that does not.
</Quote>`,
  },
  {
    id: 'post-steps',
    title: 'Steps',
    use: 'A task in order. The numbers are a CSS counter.',
    source: `<Steps>
  <Step title="Write the file">
    Make a new \`.mdx\` file in \`content/notes\`. The file name is the address.
  </Step>
  <Step title="Add the front matter">
    A title, a date and one line for the lists.
  </Step>
  <Step title="Push">The build makes the page. There is no step four.</Step>
</Steps>`,
  },
  {
    id: 'post-code',
    title: 'Code block and file tree',
    use: 'A code block shows its file name or its language. The language tree makes a file tree.',
    source: `\`\`\`ts title="src/lib/drafts.ts"
// keep every draft, even when a new note starts
export async function saveDraft(text: string) {
  const id = crypto.randomUUID();
  await store.set(id, { text, savedAt: Date.now() });
  return id;
}
\`\`\`

\`\`\`tree
content/
  notes/
    third-time-is-the-charm.mdx
src/
  lib/
    mdx.tsx  # turns a note into a page
package.json
\`\`\``,
  },
  {
    id: 'post-figure',
    title: 'Figure and image grid',
    use: 'A picture with a caption. Click to zoom. A grid crops its pictures to one shape.',
    source: `<Figure
  src="/assets/projects/jotter/editor-light.png"
  alt="Jotter in light mode"
  label="default"
  caption="stays inside the reading column"
/>

<ImageGrid columns="2" label="grid of 2" caption="light and dark, side by side">
  <GridImage
    src="/assets/projects/jotter/editor-light.png"
    alt="Jotter light mode"
  />
  <GridImage
    src="/assets/projects/jotter/editor-dark.png"
    alt="Jotter dark mode"
  />
</ImageGrid>`,
  },
  {
    id: 'post-pair',
    title: 'Do and do not, pros and cons',
    use: 'Two short lists that answer each other.',
    source: `<DoDont>
<Do>

- One idea per post.
- Publish rough.

</Do>
<Dont>

- Wait for the perfect draft.
- Start with an ultimate guide.

</Dont>
</DoDont>`,
  },
  {
    id: 'post-link',
    title: 'Link card',
    use: 'A link that earns more than a word: the note states the title and text.',
    source: `<LinkEmbed
  href="https://jotter.byurhannurula.com"
  title="Jotter"
  description="A fast, minimal notepad: a quiet place for quick thoughts."
  image="/assets/projects/jotter/editor-dark.png"
/>`,
  },
  {
    id: 'post-table',
    title: 'Table',
    use: 'Only for data that is a table. One line under the head, no cell borders.',
    source: `| App      | Type        | Licence  |
| -------- | ----------- | -------- |
| Jotter   | Desktop app | AGPL-3.0 |
| OGee     | Extension   | MIT      |
| FullShot | Extension   | MIT      |`,
  },
];
