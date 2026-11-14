export interface Book {
  slug: string;
  title: string;
  author: string;
  /** Jacket scan in /public/assets/books, with its real pixel size. */
  cover: { src: string; width: number; height: number };
  /** Real height of the book in inches. A tall book stands taller on the shelf. */
  trimHeight: number;
}

export const SHELF_SECTION = {
  title: 'Bookshelf',
  sample: 'sample books',
} as const;

/**
 * Placeholder titles from the old site, plausible but not a true reading
 * list. Replace the list, then remove the sample tag in book-shelf.tsx.
 */
export const BOOKS: Book[] = [
  {
    slug: 'design-of-everyday-things',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    cover: {
      src: '/assets/books/design-of-everyday-things.webp',
      width: 322,
      height: 500,
    },
    trimHeight: 8.25,
  },
  {
    slug: 'refactoring-ui',
    title: 'Refactoring UI',
    author: 'Wathan & Schoger',
    cover: {
      src: '/assets/books/refactoring-ui.webp',
      width: 354,
      height: 500,
    },
    trimHeight: 11,
  },
  {
    slug: 'designing-data-intensive-applications',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    cover: {
      src: '/assets/books/designing-data-intensive-applications.webp',
      width: 381,
      height: 500,
    },
    trimHeight: 9.19,
  },
  {
    slug: 'steal-like-an-artist',
    title: 'Steal Like an Artist',
    author: 'Austin Kleon',
    cover: {
      src: '/assets/books/steal-like-an-artist.webp',
      width: 318,
      height: 318,
    },
    trimHeight: 5.5,
  },
  {
    slug: 'pragmatic-programmer',
    title: 'The Pragmatic Programmer',
    author: 'Hunt & Thomas',
    cover: {
      src: '/assets/books/pragmatic-programmer.webp',
      width: 382,
      height: 500,
    },
    trimHeight: 9.1,
  },
  {
    slug: 'shape-up',
    title: 'Shape Up',
    author: 'Ryan Singer',
    cover: { src: '/assets/books/shape-up.webp', width: 309, height: 475 },
    trimHeight: 9,
  },
  {
    slug: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    cover: {
      src: '/assets/books/thinking-fast-and-slow.webp',
      width: 334,
      height: 499,
    },
    trimHeight: 8.25,
  },
];
