import { BOOKS } from './books';

export type ShelfKind = 'book' | 'film' | 'show';

export interface ShelfItem {
  slug: string;
  kind: ShelfKind;
  title: string;
  /** Author, director or creator. */
  by: string;
  year: number;
  /** In /public/assets, with its real pixel size. */
  cover: { src: string; width: number; height: number };
  /** The main colour of the cover. It tints the tile behind it. */
  tone: string;
  /** `now`: reading or watching. `again`: a reread or a rewatch. */
  status: 'now' | 'done' | 'again';
  /** 1 to 5. */
  rating: number;
  /** One line on why it is here. */
  note: string;
  /** 0 to 1, for `now` items. */
  progress?: number;
}

export const SHELF_KINDS: { kind: ShelfKind; label: string }[] = [
  { kind: 'book', label: 'Books' },
  { kind: 'film', label: 'Films' },
  { kind: 'show', label: 'Shows' },
];

export const SHELF_COPY = {
  title: 'Books, films',
  titleEnd: 'and shows.',
  lead: 'What I read and watch, with one line on each. The ones that stay with me get a second time.',
  now: 'Right now',
  all: 'All',
  sample: 'sample list',
} as const;

const book = (
  slug: string,
  rest: Omit<ShelfItem, 'slug' | 'kind' | 'title' | 'by' | 'cover'>,
): ShelfItem => {
  const source = BOOKS.find((item) => item.slug === slug);
  if (!source) throw new Error(`No book "${slug}" in books.ts`);
  return {
    slug,
    kind: 'book',
    title: source.title,
    by: source.author,
    cover: source.cover,
    ...rest,
  };
};

const poster = (slug: string, width: number, height = 600) => ({
  src: `/assets/shelf/${slug}.webp`,
  width,
  height,
});

/**
 * Placeholder list: well-known titles, not a true record. Replace it, then
 * remove the sample tag on the page.
 */
export const SHELF: ShelfItem[] = [
  book('designing-data-intensive-applications', {
    year: 2017,
    tone: '#df2340',
    status: 'now',
    rating: 5,
    progress: 0.62,
    note: 'Slow going, one chapter a week. Every chapter changes a decision at work.',
  }),
  {
    slug: 'the-bear',
    kind: 'show',
    title: 'The Bear',
    by: 'Christopher Storer',
    year: 2022,
    cover: poster('the-bear', 1067),
    tone: '#595959',
    status: 'now',
    rating: 4,
    progress: 0.4,
    note: 'A kitchen as a team under load. Too close to a release week.',
  },
  {
    slug: 'arrival',
    kind: 'film',
    title: 'Arrival',
    by: 'Denis Villeneuve',
    year: 2016,
    cover: poster('arrival', 385),
    tone: '#414139',
    status: 'again',
    rating: 5,
    note: 'A film about language that trusts the viewer. Better the second time.',
  },
  book('design-of-everyday-things', {
    year: 1988,
    tone: '#8a301b',
    status: 'done',
    rating: 5,
    note: 'Every door handle is an interface. I cannot stop seeing them.',
  }),
  {
    slug: 'halt-and-catch-fire',
    kind: 'show',
    title: 'Halt and Catch Fire',
    by: 'Cantwell & Rogers',
    year: 2014,
    cover: poster('halt-and-catch-fire', 1071),
    tone: '#b01a13',
    status: 'again',
    rating: 5,
    note: 'The best show about building things. Season two is the reason.',
  },
  {
    slug: 'spirited-away',
    kind: 'film',
    title: 'Spirited Away',
    by: 'Hayao Miyazaki',
    year: 2001,
    cover: poster('spirited-away', 423),
    tone: '#7d594e',
    status: 'again',
    rating: 5,
    note: 'Every frame is made by hand, and you can feel it.',
  },
  book('refactoring-ui', {
    year: 2018,
    tone: '#24343e',
    status: 'done',
    rating: 4,
    note: 'Design rules for people who write code. Short and practical.',
  }),
  {
    slug: 'blade-runner-2049',
    kind: 'film',
    title: 'Blade Runner 2049',
    by: 'Denis Villeneuve',
    year: 2017,
    cover: poster('blade-runner-2049', 405),
    tone: '#0a888a',
    status: 'done',
    rating: 4,
    note: 'Slow, huge and orange. Watch it on the biggest screen you can.',
  },
  {
    slug: 'chernobyl',
    kind: 'show',
    title: 'Chernobyl',
    by: 'Craig Mazin',
    year: 2019,
    cover: poster('chernobyl', 405),
    tone: '#91a397',
    status: 'done',
    rating: 5,
    note: 'The best incident review ever made. Every on-call engineer should watch it.',
  },
  book('pragmatic-programmer', {
    year: 1999,
    tone: '#373135',
    status: 'again',
    rating: 4,
    note: 'I read it as an intern and again as a lead. Different book each time.',
  }),
  {
    slug: 'social-network',
    kind: 'film',
    title: 'The Social Network',
    by: 'David Fincher',
    year: 2010,
    cover: poster('social-network', 405),
    tone: '#2a3237',
    status: 'done',
    rating: 4,
    note: 'The fastest dialogue I know, and the best score for writing code.',
  },
  {
    slug: 'silicon-valley',
    kind: 'show',
    title: 'Silicon Valley',
    by: 'Judge, Altschuler & Krinsky',
    year: 2014,
    cover: poster('silicon-valley', 1067),
    tone: '#b4b0a7',
    status: 'done',
    rating: 4,
    note: 'Funny until it is about a meeting you had last week.',
  },
  book('shape-up', {
    year: 2019,
    tone: '#4c4749',
    status: 'done',
    rating: 4,
    note: 'Fixed time, variable scope. We use a small part of it at work.',
  }),
  {
    slug: 'interstellar',
    kind: 'film',
    title: 'Interstellar',
    by: 'Christopher Nolan',
    year: 2014,
    cover: poster('interstellar', 405),
    tone: '#2d343a',
    status: 'done',
    rating: 4,
    note: 'Big ideas, a bigger organ.',
  },
  book('thinking-fast-and-slow', {
    year: 2011,
    tone: '#a39c8c',
    status: 'done',
    rating: 3,
    note: 'Good first half. I use the two systems idea in code review.',
  }),
  {
    slug: 'everything-everywhere',
    kind: 'film',
    title: 'Everything Everywhere All at Once',
    by: 'Daniels',
    year: 2022,
    cover: poster('everything-everywhere', 405),
    tone: '#64141b',
    status: 'done',
    rating: 5,
    note: 'Loud and silly, then it is about your family.',
  },
  {
    slug: 'her',
    kind: 'film',
    title: 'Her',
    by: 'Spike Jonze',
    year: 2013,
    cover: poster('her', 420),
    tone: '#cb083b',
    status: 'done',
    rating: 4,
    note: 'It looked like science fiction in 2013. Not any more.',
  },
  book('steal-like-an-artist', {
    year: 2012,
    tone: '#5a5a5a',
    status: 'done',
    rating: 3,
    note: 'A one-hour read. Good to give to somebody who just started.',
  }),
  {
    slug: 'dune-part-two',
    kind: 'film',
    title: 'Dune: Part Two',
    by: 'Denis Villeneuve',
    year: 2024,
    cover: poster('dune-part-two', 405),
    tone: '#894d13',
    status: 'done',
    rating: 4,
    note: 'The sound alone is worth the ticket.',
  },
];

export const shelfCount = (kind: ShelfKind) =>
  SHELF.filter((item) => item.kind === kind).length;
