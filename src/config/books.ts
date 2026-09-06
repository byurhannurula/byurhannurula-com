/**
 * The shelf.
 *
 * Placeholder titles for now: the list is plausible rather than true, and the
 * notes are written in the right voice so the page can be judged before the
 * real reading list replaces it.
 *
 * Jackets are the real ones, from the Open Library cover service, converted to
 * WebP: seven titles for 152 KB. A book with no usable scan falls back to a
 * cover drawn from `paper`, `ink` and `face`, which is why both paths exist.
 *
 * `trim` is the real physical size in inches. It is what makes the shelf read
 * as a shelf: Steal Like an Artist is square because it is square, and Grid
 * Systems stands a head above everything because it is A4.
 */

export type BookStatus = "reading" | "finished" | "shelved";

export interface Trim {
  /** Inches. Real trim sizes, so a square book is square and a monograph is tall. */
  width: number;
  height: number;
}

export interface Cover {
  src: string;
  width: number;
  height: number;
}

export interface Book {
  slug: string;
  title: string;
  /** Set on its own line under the title, in a lighter weight. */
  subtitle?: string;
  author: string;
  year?: number;
  status: BookStatus;
  /** Why it is here. One line, first person, an opinion rather than a summary. */
  note: string;
  /** Cover and spine colours. */
  paper: string;
  ink: string;
  spine: string;
  /** Physical trim. Sets the shape of the book and how tall it stands. */
  trim: Trim;
  /** Real jacket, from /public/assets/books. Overrides the drawn one. */
  cover?: Cover;
  /** Layout of the drawn cover. */
  face?: "stack" | "block" | "rule";
}

export const BOOKS: Book[] = [
  {
    slug: "design-of-everyday-things",
    trim: { width: 5.5, height: 8.25 },
    cover: {
      src: "/assets/books/design-of-everyday-things.webp",
      width: 322,
      height: 500,
    },
    title: "The Design of Everyday Things",
    author: "Don Norman",
    year: 1988,
    status: "finished",
    note: "Doors, stoves, and the idea that none of it was ever your fault.",
    paper: "#e8b93a",
    ink: "#1b1b1b",
    spine: "#c9992a",
    face: "stack",
  },
  {
    slug: "refactoring-ui",
    trim: { width: 8.25, height: 11.0 },
    cover: {
      src: "/assets/books/refactoring-ui.webp",
      width: 354,
      height: 500,
    },
    title: "Refactoring UI",
    author: "Wathan & Schoger",
    year: 2018,
    status: "finished",
    note: "The book that made me stop guessing at spacing.",
    paper: "#1f6f4a",
    ink: "#f2f2ef",
    spine: "#175338",
    face: "block",
  },
  {
    slug: "designing-data-intensive-applications",
    trim: { width: 7.0, height: 9.19 },
    cover: {
      src: "/assets/books/designing-data-intensive-applications.webp",
      width: 381,
      height: 500,
    },
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    year: 2017,
    status: "reading",
    note: "Three chapters in, for the second time. It is not the book's fault.",
    paper: "#3f4a6b",
    ink: "#eceef5",
    spine: "#2f3852",
    face: "rule",
  },
  {
    slug: "grid-systems",
    trim: { width: 8.27, height: 11.69 },
    title: "Grid Systems in Graphic Design",
    author: "Josef Müller-Brockmann",
    year: 1981,
    status: "reading",
    note: "Read slowly, a spread at a time. Half of this site came out of it.",
    paper: "#d8d4cb",
    ink: "#232323",
    spine: "#b9b4a8",
    face: "rule",
  },
  {
    slug: "steal-like-an-artist",
    trim: { width: 5.5, height: 5.5 },
    cover: {
      src: "/assets/books/steal-like-an-artist.webp",
      width: 318,
      height: 318,
    },
    title: "Steal Like an Artist",
    author: "Austin Kleon",
    year: 2012,
    status: "finished",
    note: "An afternoon to read, and it settled the question of where ideas come from.",
    paper: "#141414",
    ink: "#f4f4f0",
    spine: "#0c0c0c",
    face: "block",
  },
  {
    slug: "pragmatic-programmer",
    trim: { width: 7.4, height: 9.1 },
    cover: {
      src: "/assets/books/pragmatic-programmer.webp",
      width: 382,
      height: 500,
    },
    title: "The Pragmatic Programmer",
    author: "Hunt & Thomas",
    year: 1999,
    status: "finished",
    note: "Read it too late. It still changed how I work.",
    paper: "#8c3a34",
    ink: "#f6efe6",
    spine: "#6d2b26",
    face: "stack",
  },
  {
    slug: "shape-up",
    trim: { width: 6.0, height: 9.0 },
    cover: {
      src: "/assets/books/shape-up.webp",
      width: 309,
      height: 475,
    },
    title: "Shape Up",
    subtitle: "Stop Running in Circles",
    author: "Ryan Singer",
    year: 2019,
    status: "shelved",
    note: "Right about scoping, and I have never once managed to hold to it.",
    paper: "#e2543f",
    ink: "#fdf6f2",
    spine: "#b93f2e",
    face: "block",
  },
  {
    slug: "thinking-fast-and-slow",
    trim: { width: 5.5, height: 8.25 },
    cover: {
      src: "/assets/books/thinking-fast-and-slow.webp",
      width: 334,
      height: 499,
    },
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    year: 2011,
    status: "shelved",
    note: "Started three times. One day I will get past part two.",
    paper: "#f0ede4",
    ink: "#1a1a1a",
    spine: "#d5d1c5",
    face: "rule",
  },
];

export const STATUS_LABEL: Record<BookStatus, string> = {
  reading: "reading",
  finished: "finished",
  shelved: "on the shelf",
};

/** The tallest trim on the shelf, which sets the height every row is cleared to. */
export const TALLEST_TRIM = BOOKS.reduce(
  (max, book) => Math.max(max, book.trim.height),
  0
);

/** Jacket proportions when there is a scan, physical proportions when there is not. */
export function coverRatio(book: Book) {
  const source = book.cover ?? book.trim;
  return source.width / source.height;
}

export function booksByStatus(status: BookStatus) {
  return BOOKS.filter((book) => book.status === status);
}
