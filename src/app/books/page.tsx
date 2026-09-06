import { BookCard } from "@/components/books/book-card";
import { PageWrapper } from "@/components/page-wrapper";
import { SectionHeading } from "@/components/section-heading";
import { SoundToggle } from "@/components/sound";
import { createMetadata } from "@/config";
import {
  type BookStatus,
  booksByStatus,
  STATUS_LABEL,
  TALLEST_TRIM,
} from "@/config/books";

export const metadata = createMetadata("/books");

const ORDER: BookStatus[] = ["reading", "finished", "shelved"];

export default function BooksPage() {
  return (
    <PageWrapper>
      {/*
       * Page-scoped CSS, as on /lab. The shelf is the only thing on the site
       * that needs a 3D context, and none of it should reach any other route
       * until the page is kept.
       */}
      <style>{`
        /*
         * One inch of book. Every height on the shelf is this times a real trim
         * measurement, so the proportions between the titles are the proportions
         * between the objects.
         */
        .bk-shelf { --bk-inch: clamp(9px, 2.1vw, 17px); }
        .bk-stage {
          display: flex;
          height: calc(var(--bk-inch) * var(--bk-tallest));
          align-items: flex-end;
          perspective: 1400px;
        }
        .bk-body {
          position: relative;
          display: block;
          height: calc(var(--bk-inch) * var(--bk-trim));
          aspect-ratio: var(--bk-ratio);
          transform-style: preserve-3d;
          rotate: y 0deg;
          transition: rotate 220ms var(--ease-out);
        }
        .bk:focus-within .bk-body { rotate: y -11deg; }

        /* The page block only exists to be seen through the opened cover. */
        .bk-pages {
          position: absolute;
          inset: 1.2% -1.5% 1.2% 2%;
          border-radius: 1px 3px 3px 1px;
          background:
            repeating-linear-gradient(
              to bottom,
              rgb(0 0 0 / 0.05) 0 1px,
              transparent 1px 4px
            ),
            linear-gradient(90deg, #cfcabd 0 3%, #fbfaf6 12%, #efece3 100%);
          box-shadow: 1px 1px 0 rgb(0 0 0 / 0.12);
        }
        .bk-cover {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 2px 4px 4px 2px;
          transform-origin: left center;
          rotate: y 0deg;
          box-shadow:
            0 1px 2px rgb(0 0 0 / 0.28),
            0 10px 26px -14px rgb(0 0 0 / 0.5);
          transition: rotate 220ms var(--ease-out);
        }
        /*
         * Opening is the deliberate act and closing is the shelf letting go,
         * so only the opening half takes its time. will-change is scoped with
         * it: unconditional, every cover on the page holds a compositor layer
         * for the life of the page.
         */
        .bk:hover .bk-body,
        .bk:hover .bk-cover,
        .bk:focus-within .bk-body,
        .bk:focus-within .bk-cover {
          will-change: rotate;
          transition-duration: 460ms;
        }
        .bk:focus-within .bk-cover { rotate: y -46deg; }
        /* Gated: a tap on a touch screen leaves the book stuck open. */
        @media (hover: hover) and (pointer: fine) {
          .bk:hover .bk-body { rotate: y -11deg; }
          .bk:hover .bk-cover { rotate: y -46deg; }
        }
        .bk-photo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        /* The darker band a hardback carries where the board meets the spine. */
        .bk-hinge {
          position: absolute;
          inset: 0 auto 0 0;
          width: 7%;
          opacity: 0.55;
          box-shadow: inset -3px 0 6px -3px rgb(0 0 0 / 0.5);
        }

        .bk-face {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          padding: 12% 10% 9% 15%;
        }
        .bk-face-title {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: clamp(13px, 2vw, 19px);
          line-height: 1.12;
          letter-spacing: -0.015em;
          text-wrap: balance;
        }
        .bk-face-sub {
          margin-top: 0.35em;
          font-family: var(--font-sans);
          font-size: 0.72em;
          font-weight: 400;
          opacity: 0.75;
        }
        .bk-face-author {
          margin-top: auto;
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          opacity: 0.72;
        }
        .bk-face--block { justify-content: center; text-align: left; }
        .bk-face--block .bk-face-title {
          font-size: clamp(16px, 2.7vw, 26px);
          text-transform: uppercase;
          letter-spacing: -0.005em;
        }
        .bk-face--rule { justify-content: center; text-align: center; }
        .bk-face--rule .bk-face-title {
          padding: 0.7em 0;
          font-weight: 500;
        }
        .bk-face-line {
          display: block;
          height: 1px;
          background: currentcolor;
          opacity: 0.5;
        }
        .bk-face--rule .bk-face-author { margin-top: 1.2em; }

        @media (prefers-reduced-motion: reduce) {
          .bk-body, .bk-cover { transition: none; }
          .bk:hover .bk-cover, .bk:focus-within .bk-cover { rotate: y -12deg; }
        }

      `}</style>

      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h1>
          Books <span className="text-primary">/ the shelf.</span>
        </h1>
        <SoundToggle />
      </div>
      <p className="mb-2 text-muted-foreground">
        What I am reading, what I finished, and what has been face-down beside
        the desk for a year. Hover a cover and it opens.
      </p>
      <p className="mb-8 font-mono text-[12px] text-faint">
        real jackets and real trim sizes; the list itself is a placeholder
      </p>

      {ORDER.map((status) => {
        const books = booksByStatus(status);
        if (books.length === 0) return null;

        return (
          <section key={status}>
            <SectionHeading>{STATUS_LABEL[status]}</SectionHeading>
            {/* data-sound="page": pointing at a book turns a page rather than
                ticking. The value names the sample; see config/sound.ts. */}
            <div
              className="bk-shelf grid grid-cols-2 items-start gap-x-6 gap-y-9 sm:grid-cols-3"
              data-sound="page"
              style={{ "--bk-tallest": TALLEST_TRIM } as React.CSSProperties}
            >
              {books.map((book) => (
                <BookCard book={book} key={book.slug} />
              ))}
            </div>
          </section>
        );
      })}
    </PageWrapper>
  );
}
