import { brand } from '@/lib/brand';

/**
 * Everything a search engine or a link preview reads, in one file.
 *
 * - `SITE_SEO`: values that are the same on every page.
 * - `PAGES`: the title, description and share image text of each page.
 *
 * Pages pass their entry to `pageMetadata()` (src/lib/seo.ts), and each
 * `opengraph-image.tsx` passes the same entry to `renderShareImage()`
 * (src/lib/og.tsx). Notes take theirs from the front matter of the MDX file.
 */
export const SITE_SEO = {
  /** The home title, and the fallback for a page without one. */
  defaultTitle: `${brand.name}, full-stack engineer`,
  /** Every other page: "About · Byurhan Nurula". */
  titleTemplate: `%s · ${brand.name}`,
  description: brand.description,
  locale: 'en',
  /** Browser bar colour for light and dark systems. */
  themeColor: { light: '#fafafa', dark: '#0a0a0a' },
  /** A short clip for link previews. Made by scripts/make-og-video.mjs. */
  shareVideo: { path: '/og/intro.mp4', width: 1200, height: 630 },
} as const;

/** The kind of page: it picks the colour of the share image. */
export type ShareKind =
  | 'home'
  | 'about'
  | 'work'
  | 'notes'
  | 'note'
  | 'uses'
  | 'homelab'
  | 'shelf'
  | 'colophon';

export interface PageSeo {
  path: string;
  title: string;
  /** Use the title as it is, without the site name after it. */
  absoluteTitle?: boolean;
  /** 120 to 160 characters: the text under the title in search results. */
  description: string;
  /** Keep the page out of search results. */
  noindex?: boolean;
  /** The text on the share image. */
  share: {
    kind: ShareKind;
    eyebrow: string;
    title: string;
    /** The line at the bottom. Without it, the role shows. */
    meta?: string;
    /** Alt text of the image. */
    alt: string;
  };
}

export const PAGES = {
  home: {
    path: '/',
    title: `${brand.name}: ${brand.role}`,
    absoluteTitle: true,
    description: brand.description,
    share: {
      kind: 'home',
      eyebrow: 'home',
      title:
        'Full-stack engineer. I build web products from the first commit to the server.',
      alt: `${brand.name}, ${brand.role}`,
    },
  },
  about: {
    path: '/about',
    title: 'About',
    description:
      'Byurhan Nurula is a full-stack engineer and team lead. Six years at ReCheck, from intern to team lead, across design, front end, back end and servers.',
    share: {
      kind: 'about',
      eyebrow: 'about',
      title: 'Six years, one company, every layer of the product.',
      alt: `About ${brand.name}`,
    },
  },
  work: {
    path: '/work',
    title: 'Work',
    description:
      'Small tools that do one job well: Jotter, OGee and FullShot. Open source, built on my own time, with no data collection.',
    share: {
      kind: 'work',
      eyebrow: 'work',
      title: 'Small tools that do one job well.',
      meta: 'Open source. No tracking.',
      alt: `Side projects by ${brand.name}`,
    },
  },
  notes: {
    path: '/notes',
    title: 'Notes',
    description:
      'Notes on things I build, fix and run. One idea for each post, written after I fix something, because the next person will have the same problem.',
    share: {
      kind: 'notes',
      eyebrow: 'notes',
      title: 'Notes on things I build, fix and run.',
      meta: 'One idea for each post.',
      alt: `Notes by ${brand.name}`,
    },
  },
  uses: {
    path: '/uses',
    title: 'Uses',
    description:
      'Hardware and software on my desk: the laptop, the editor, the terminal and the small apps I use every day.',
    share: {
      kind: 'uses',
      eyebrow: 'uses',
      title: 'What I use every day.',
      meta: 'Hardware and software on my desk.',
      alt: `What ${brand.name} uses`,
    },
  },
  homelab: {
    path: '/homelab',
    title: 'Homelab',
    description:
      'One mini PC, one Raspberry Pi and a 10 inch rack: what runs on them, how a request gets in, and the rules I keep.',
    share: {
      kind: 'homelab',
      eyebrow: 'homelab',
      title: 'A small homelab that I run like production.',
      meta: 'A hobby, not my job.',
      alt: `The homelab of ${brand.name}`,
    },
  },
  shelf: {
    path: '/shelf',
    title: 'Shelf',
    description:
      'Books, films and shows I read and watch, with one line on each and a mark on the ones I went back to a second time.',
    share: {
      kind: 'shelf',
      eyebrow: 'shelf',
      title: 'Books, films and shows.',
      meta: 'One line on each.',
      alt: `The shelf of ${brand.name}`,
    },
  },
  stats: {
    path: '/stats',
    title: 'Stats',
    description:
      'The numbers behind this site: notes and words written, the most read notes, the shelf by kind and rating, a year of code and the Lighthouse scores.',
    share: {
      kind: 'colophon',
      eyebrow: 'stats',
      title: 'Numbers, counted at each deploy.',
      meta: 'Notes, reads, shelf, code and scores.',
      alt: `Stats of the site of ${brand.name}`,
    },
  },
  cv: {
    path: '/cv',
    title: 'CV',
    description:
      'The CV of Byurhan Nurula: six years at ReCheck from intern to team lead, the stack, the side projects and the degree. Print it to save a PDF.',
    share: {
      kind: 'about',
      eyebrow: 'cv',
      title: 'Six years, one company, every layer of the product.',
      meta: 'One page. Print it to save a PDF.',
      alt: `The CV of ${brand.name}`,
    },
  },
  colophon: {
    path: '/colophon',
    title: 'Colophon',
    description:
      'How this site is made and why it looks like this: the stack, the type, the four light modes, the sites I learned from and the four versions so far.',
    share: {
      kind: 'colophon',
      eyebrow: 'colophon',
      title: 'How this site is made, and why it looks like this.',
      meta: 'Stack, type, colour and credits.',
      alt: `How the site of ${brand.name} is made`,
    },
  },
  designSystem: {
    path: '/design-system',
    title: 'Design system',
    description:
      'The tokens, type, motion, components and options of this site, drawn from the live stylesheet and one config file, with a history of every design change.',
    share: {
      kind: 'home',
      eyebrow: 'design system',
      title: 'What this site is made of.',
      alt: 'Design system',
    },
  },
} as const satisfies Record<string, PageSeo>;
