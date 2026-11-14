import Image from 'next/image';

import { SampleTag } from '@/components/shared/sample-tag';
import { Section } from '@/components/shared/section';
import { BOOKS, SHELF_SECTION } from '@/content/books';
import { cn } from '@/lib/utils';

/** Rem of cover height for one inch of book, so a tall book stands taller. */
const REM_PER_INCH = 1.05;

// Each book leans a little, like a shelf that somebody uses.
const TILTS = [
  '-rotate-3',
  'rotate-2',
  '-rotate-1',
  'rotate-3',
  '-rotate-2',
  'rotate-1',
  '-rotate-2',
];

/** A row of book covers. Hover, focus or a tap lifts one and names it. Option: `shelf`. */
export function BookShelf() {
  return (
    <Section
      title={SHELF_SECTION.title}
      sub={<SampleTag className="mt-1">{SHELF_SECTION.sample}</SampleTag>}
      className="hidden in-data-[shelf=on]:block"
    >
      {/* On a phone the row scrolls sideways and bleeds to the screen edges.
          The padding keeps a lifted cover and its focus ring inside the
          scroll box, which clips. */}
      <ul
        data-reveal
        className="-mx-5 flex [scrollbar-width:none] items-end gap-5 overflow-x-auto px-5 pt-6 pb-2 md:mx-0 md:gap-7 md:overflow-visible md:px-0"
      >
        {BOOKS.map((book, index) => (
          <li key={book.slug} className="shrink-0">
            {/* A button, so a keyboard and a tap can reach the title. */}
            <button
              type="button"
              className="group/book flex flex-col items-center text-center"
            >
              <Image
                src={book.cover.src}
                alt=""
                width={book.cover.width}
                height={book.cover.height}
                sizes="160px"
                style={{ height: `${book.trimHeight * REM_PER_INCH}rem` }}
                className={cn(
                  'w-auto origin-bottom rounded-[0.3rem] shadow-soft transition-[rotate,translate,box-shadow] duration-400 ease-soft group-hover/book:-translate-y-2 group-hover/book:rotate-0 group-hover/book:shadow-lift group-focus-visible/book:-translate-y-2 group-focus-visible/book:rotate-0 group-focus-visible/book:shadow-lift',
                  TILTS[index % TILTS.length],
                )}
              />
              {/* Fixed width and height: a long title must not move the row. */}
              <span className="mt-3 block h-17 w-30 text-[0.8125rem] leading-[1.35] opacity-0 transition-opacity duration-300 group-hover/book:opacity-100 group-focus/book:opacity-100 pointer-coarse:opacity-100">
                <b className="block font-medium text-balance">{book.title}</b>
                <span className="text-soft">{book.author}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Section>
  );
}
