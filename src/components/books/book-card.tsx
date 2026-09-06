"use client";

import Image from "next/image";

import { type Book, coverRatio } from "@/config/books";
import { playSound } from "@/lib/sound";

/**
 * The drawn jacket.
 *
 * Three layouts rather than one, because a shelf where every cover is set the
 * same way stops reading as a shelf. Which one a title gets is written down in
 * the data, not derived from its index, so the shelf does not reshuffle itself
 * when a book is added.
 */
function DrawnCover({ book }: { book: Book }) {
  if (book.face === "block") {
    return (
      <span className="bk-face bk-face--block">
        <span className="bk-face-title">{book.title}</span>
        {book.subtitle ? (
          <span className="bk-face-sub">{book.subtitle}</span>
        ) : null}
        <span className="bk-face-author">{book.author}</span>
      </span>
    );
  }

  if (book.face === "rule") {
    return (
      <span className="bk-face bk-face--rule">
        <span className="bk-face-line" />
        <span className="bk-face-title">{book.title}</span>
        <span className="bk-face-line" />
        <span className="bk-face-author">{book.author}</span>
      </span>
    );
  }

  return (
    <span className="bk-face bk-face--stack">
      <span className="bk-face-title">{book.title}</span>
      <span className="bk-face-author">{book.author}</span>
    </span>
  );
}

/**
 * A book that opens a little when you look at it.
 *
 * The cover is a separate plane hinged on its left edge inside a
 * `preserve-3d` block, so the hover is the object doing what the object does
 * rather than a card scaling up. The page block behind it is drawn, not
 * photographed, and only exists to be seen at that angle.
 */
export function BookCard({ book }: { book: Book }) {
  return (
    <article className="bk">
      {/*
       * The stage is a fixed band that every row clears, and the book stands on
       * its floor. Sizing the card to the book instead would step the titles up
       * and down the page by an inch a time.
       */}
      <span
        className="bk-stage"
        onPointerEnter={() => playSound("page", { hover: true, volume: 0.7 })}
      >
        <span
          className="bk-body"
          style={
            {
              "--bk-ratio": coverRatio(book).toFixed(4),
              "--bk-trim": book.trim.height,
            } as React.CSSProperties
          }
        >
          <span aria-hidden="true" className="bk-pages" />
          <span
            className="bk-cover"
            style={{ background: book.paper, color: book.ink }}
          >
            {book.cover ? (
              <Image
                alt=""
                className="bk-photo"
                height={book.cover.height}
                src={book.cover.src}
                width={book.cover.width}
              />
            ) : (
              <DrawnCover book={book} />
            )}
            <span
              aria-hidden="true"
              className="bk-hinge"
              style={{ background: book.spine }}
            />
          </span>
        </span>
      </span>

      <h3 className="mt-4 font-medium text-[14.5px] text-foreground leading-snug">
        {book.title}
      </h3>
      <p className="font-mono text-[12px] text-faint">{book.author}</p>
      <p className="mt-1.5 text-[13px] text-muted-foreground leading-snug">
        {book.note}
      </p>
    </article>
  );
}
