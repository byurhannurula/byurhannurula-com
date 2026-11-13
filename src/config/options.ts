/**
 * Every design choice that is still open is an option here.
 *
 * An option is one `data-<key>="<value>"` attribute on `<html>`. Components
 * read it in CSS (`in-data-[job=summary]:block`), so server components need
 * no client state. To settle a choice: keep its winning markup, delete the
 * other variants, then delete the option from this file.
 */

type Choice = readonly [value: string, label?: string];

export interface OptionDef {
  label: string;
  choices: readonly Choice[];
}

const def = (label: string, ...choices: Choice[]): OptionDef => ({
  label,
  choices,
});

export const OPTION_GROUPS = {
  Global: {
    copy: def('copy', ['a', 'job first'], ['b', 'builder'], ['c', 'tinkerer']),
    light: def(
      'light',
      ['auto', 'auto (clock)'],
      ['morning'],
      ['day'],
      ['evening'],
      ['night'],
    ),
    accent: def('accent', ['green'], ['blue'], ['orange'], ['violet'], ['ink']),
    font: def('font', ['instrument'], ['geist'], ['hanken']),
    heading: def('heading', ['twotone', 'two tone'], ['one'], ['accent']),
    width: def('page width', ['normal'], ['narrow'], ['wide']),
    radius: def('corners', ['round'], ['small'], ['large']),
    sound: def('sound', ['off'], ['click'], ['hover', 'click + hover']),
    homelab: def('homelab page', ['off'], ['on']),
    lab: def('homelab layout', ['rack'], ['lists']),
  },
  Look: {
    nav: def('nav bar', ['wide'], ['pill']),
    navscroll: def('nav on scroll', ['shrink', 'hide, then small'], ['fixed']),
    top: def('page top', ['text'], ['wide'], ['art', 'drawing']),
    artsize: def('drawing size', ['normal'], ['large']),
    h1: def('title size', ['normal'], ['small'], ['large']),
    sectitle: def(
      'section titles',
      ['plain'],
      ['label', 'small label'],
      ['large'],
    ),
    colour: def('colour', ['quiet'], ['sections', 'section marks']),
    bg: def('background', ['plain'], ['dots'], ['grid'], ['grain']),
    density: def('spacing', ['normal'], ['compact'], ['roomy']),
    lines: def('divider lines', ['on'], ['off']),
    motion: def('motion', ['on'], ['off']),
  },
  Home: {
    hero: def(
      'hero',
      ['text'],
      ['current', 'current site'],
      ['expand'],
      ['logos'],
    ),
    greeting: def('greeting', ['off'], ['on']),
    order: def(
      'order',
      ['job', 'day job first'],
      ['projects', 'projects first'],
    ),
    projects: def(
      'projects',
      ['rows'],
      ['a', 'panels'],
      ['b', 'filmstrip'],
      ['tiles'],
      ['off'],
    ),
    job: def('day job', ['a', 'track'], ['summary'], ['ladder'], ['off']),
    note: def(
      'note item',
      ['b', 'row'],
      ['thumb'],
      ['c', 'file'],
      ['leaders'],
      ['a', 'cover'],
    ),
  },
  About: {
    bio: def('bio', ['a', 'columns'], ['inline'], ['expand']),
    caps: def('what I do', ['a', 'layers'], ['b', 'sentence'], ['list']),
    stack: def('stack', ['rows'], ['cloud'], ['chips'], ['pile'], ['plain']),
  },
  Post: {
    toc: def('contents', ['island'], ['side'], ['off']),
    pcol: def('column', ['normal'], ['narrow'], ['wide']),
    psize: def('text size', ['normal'], ['small'], ['large']),
    related: def('keep reading', ['on'], ['off']),
  },
  Work: {
    work: def('layout', ['strips'], ['accordion'], ['grid']),
    shots: def('screens', ['large'], ['small']),
  },
  Sections: {
    now: def('now', ['off'], ['home'], ['about'], ['both']),
    ways: def('how I work', ['off'], ['on']),
    ask: def('good topics', ['off'], ['on']),
    faq: def('short answers', ['off'], ['on']),
    site: def('this site', ['off'], ['on']),
  },
  Footer: {
    footer: def(
      'layout',
      ['columns'],
      ['line'],
      ['big', 'big name'],
      ['centre'],
      ['sentence'],
    ),
    fmark: def('big name', ['solid'], ['outline'], ['fade']),
    socials: def('socials', ['cards'], ['tooltip'], ['text']),
    fmeta: def('meta line', ['off'], ['on']),
    fctl: def('theme + sound', ['off'], ['on']),
    ftop: def('back to top', ['off'], ['on']),
  },
} as const;

export type OptionGroup = keyof typeof OPTION_GROUPS;

type Groups = typeof OPTION_GROUPS;

export type OptionKey = {
  [G in OptionGroup]: keyof Groups[G];
}[OptionGroup];
export type Options = Record<OptionKey, string>;

export const OPTIONS = Object.assign(
  {},
  ...Object.values(OPTION_GROUPS),
) as Record<OptionKey, OptionDef>;

export const OPTION_KEYS = Object.keys(OPTIONS) as OptionKey[];

export const DEFAULT_OPTIONS = Object.fromEntries(
  OPTION_KEYS.map((key) => [key, OPTIONS[key].choices[0][0]]),
) as Options;

export function isValidChoice(key: OptionKey, value: unknown): value is string {
  return OPTIONS[key].choices.some(([choice]) => choice === value);
}

/** A preset is the defaults plus these overrides. */
export const PRESETS: Record<string, Partial<Options>> = {
  calm: {},
  colour: {
    top: 'art',
    colour: 'sections',
    bg: 'grain',
    stack: 'chips',
    now: 'home',
    ways: 'on',
    ask: 'on',
    footer: 'big',
    fmark: 'fade',
    fmeta: 'on',
  },
  recruiter: {
    top: 'wide',
    job: 'summary',
    projects: 'rows',
    now: 'about',
    faq: 'on',
    ask: 'on',
    footer: 'columns',
    fmeta: 'on',
    ftop: 'on',
  },
  'current site': {
    hero: 'current',
    font: 'geist',
    job: 'ladder',
    stack: 'chips',
    footer: 'line',
    fctl: 'on',
  },
  minimal: {
    width: 'narrow',
    heading: 'one',
    h1: 'small',
    sectitle: 'label',
    job: 'ladder',
    note: 'leaders',
    stack: 'plain',
    socials: 'text',
    footer: 'line',
    density: 'compact',
  },
  playful: {
    accent: 'violet',
    radius: 'large',
    top: 'art',
    artsize: 'large',
    bg: 'dots',
    colour: 'sections',
    hero: 'expand',
    greeting: 'on',
    projects: 'tiles',
    stack: 'pile',
    sound: 'click',
    now: 'both',
    site: 'on',
    footer: 'sentence',
    fctl: 'on',
    ftop: 'on',
  },
};

/** A preset changes the look. These are the reader's own and stay. */
export const PRESET_KEEPS: OptionKey[] = ['light', 'copy', 'homelab'];

export const OPTIONS_STORAGE_KEY = 'site-options';
