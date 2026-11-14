import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { LeaderRow } from '@/components/notes/leader-row';
import { NoteCover } from '@/components/notes/note-cover';
import { SampleTag } from '@/components/shared/sample-tag';
import {
  formatNoteDate,
  formatNoteDateShort,
  type NoteMeta,
} from '@/lib/notes';
import { cn } from '@/lib/utils';

interface NoteItemProps {
  note: NoteMeta;
}

const H3 = 'font-semibold text-ink';

/**
 * Put this on the element that holds the items: it sets the space between
 * them for each `note` value, and the two columns of `grid`.
 */
export const NOTE_LIST =
  'grid grid-cols-1 in-data-[note=a]:gap-y-6 in-data-[note=c]:gap-y-6 in-data-[note=grid]:max-w-[54rem] in-data-[note=grid]:gap-x-8 in-data-[note=grid]:gap-y-10 in-data-[note=tagged]:gap-y-9 in-data-[note=thumb]:gap-y-8 md:in-data-[note=grid]:grid-cols-2';

function Meta({ note, onPicture }: NoteItemProps & { onPicture?: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-[0.9rem] label-mono',
        onPicture ? 'text-white/65' : 'text-faint',
      )}
    >
      <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
      <span>{note.readingMinutes} min read</span>
      {note.tags[0] ? (
        <b
          className={cn(
            'font-medium',
            // Fixed green: the cover is dark in both themes.
            onPicture ? 'text-green-300' : 'text-accent',
          )}
        >
          {note.tags[0]}
        </b>
      ) : null}
      {note.sample ? (
        // The amber of a light page does not show on the dark shade.
        <SampleTag
          className={onPicture ? 'bg-white/16 text-white' : undefined}
        />
      ) : null}
    </div>
  );
}

/**
 * One note in a list. The `note` option picks the form (row, thumb, file,
 * leaders, cover, compact, tagged or grid); all are in the markup and CSS
 * shows one. The space between items comes from the list (NOTE_LIST).
 */
export function NoteItem({ note }: NoteItemProps) {
  const href = `/notes/${note.slug}`;
  const { cover } = note;

  return (
    <article className="group/item min-w-0">
      {/* b: row */}
      <Link
        href={href}
        className="group/note hidden grid-cols-1 items-center gap-3 border-t border-rule py-7 no-underline group-last/item:border-b in-data-[note=b]:grid md:grid-cols-[7rem_1fr_auto] md:gap-8"
      >
        <span className="label-mono text-faint">
          <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
          <br />
          {note.readingMinutes} min read
        </span>
        <div>
          <h3
            className={cn(
              H3,
              'text-[1.75rem] leading-[1.3] tracking-[-0.03em] transition-[translate] duration-350 ease-soft group-hover/note:translate-x-1.5',
            )}
          >
            {note.title}
          </h3>
          <p className="mt-[0.35rem] max-w-[34rem] text-soft">{note.excerpt}</p>
          {note.sample ? <SampleTag className="mt-2" /> : null}
        </div>
        {cover ? (
          <NoteCover
            src={cover}
            sizes="(min-width: 768px) 11rem, 100vw"
            className="aspect-4/3 w-full rounded-lg shadow-soft transition-[rotate,scale,box-shadow] duration-500 ease-soft group-hover/note:scale-108 group-hover/note:-rotate-1 group-hover/note:shadow-lift md:w-44 md:rotate-3"
          />
        ) : null}
      </Link>

      {/* thumb: small square picture */}
      <Link
        href={href}
        className={cn(
          'group/note hidden max-w-[44rem] items-center gap-4 no-underline in-data-[note=thumb]:grid md:gap-6',
          cover && 'grid-cols-[5.5rem_1fr] md:grid-cols-[8.5rem_1fr]',
        )}
      >
        {cover ? (
          <NoteCover
            src={cover}
            sizes="(min-width: 768px) 8.5rem, 5.5rem"
            className="aspect-square w-full rounded-lg shadow-[0_0_0_1px_var(--line)] transition-[scale] duration-500 ease-soft group-hover/note:scale-104"
          />
        ) : null}
        <div>
          <Meta note={note} />
          <h3
            className={cn(
              H3,
              'mt-[0.35rem] mb-[0.3rem] text-[1.375rem] leading-[1.3] tracking-[-0.025em]',
            )}
          >
            {note.title}
          </h3>
          <p className="text-soft">{note.excerpt}</p>
        </div>
      </Link>

      {/* c: file window */}
      <Link
        href={href}
        className="group/note hidden overflow-hidden rounded-lg border border-line-strong bg-card no-underline shadow-soft transition-[translate,box-shadow] duration-400 ease-soft hover:-translate-y-1 hover:shadow-lift in-data-[note=c]:block"
      >
        <div className="flex items-center gap-[0.35rem] border-b border-line px-[0.85rem] py-[0.65rem] font-mono text-xs leading-none text-faint">
          <span
            aria-hidden
            className="size-[0.6rem] rounded-full bg-line-strong"
          />
          <span
            aria-hidden
            className="size-[0.6rem] rounded-full bg-line-strong"
          />
          <span
            aria-hidden
            className="size-[0.6rem] rounded-full bg-line-strong"
          />
          <span className="ml-2">notes/{note.slug}.mdx</span>
          {note.sample ? <SampleTag className="ml-auto" /> : null}
        </div>
        <div
          className={cn(
            'grid grid-cols-1 gap-8 px-8 pt-7',
            cover && 'md:grid-cols-[1fr_17rem]',
          )}
        >
          <div className="relative max-h-54 min-h-40 overflow-hidden text-[1.0625rem] leading-[1.7] text-soft after:absolute after:inset-x-0 after:bottom-0 after:h-24 after:bg-linear-to-b after:from-transparent after:to-card">
            <h3
              className={cn(
                H3,
                'mb-[0.6rem] text-[1.75rem] leading-[1.3] tracking-[-0.03em]',
              )}
            >
              {note.title}
            </h3>
            {(note.intro.length > 0 ? note.intro : [note.excerpt]).map(
              (paragraph) => (
                <p key={paragraph} className="mb-[1em]">
                  {paragraph}
                </p>
              ),
            )}
            <span className="absolute bottom-[1.1rem] z-1 inline-flex items-center gap-[0.35rem] text-[0.9375rem] font-medium whitespace-nowrap text-ink">
              Keep reading
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-250 ease-soft group-hover/note:translate-x-0.75"
              />
            </span>
          </div>
          {cover ? (
            <NoteCover
              src={cover}
              sizes="17rem"
              className="mb-7 hidden aspect-4/3 w-full rounded-md md:block"
            />
          ) : null}
        </div>
      </Link>

      {/* leaders: title, dots, date */}
      <LeaderRow
        href={href}
        title={
          <>
            {note.title}
            {note.sample ? <SampleTag className="ml-2 align-middle" /> : null}
          </>
        }
        end={<time dateTime={note.date}>{formatNoteDateShort(note.date)}</time>}
        className="hidden in-data-[note=leaders]:flex"
      />

      {/* compact: one line, for a long list */}
      <Link
        href={href}
        className="group/note hidden items-baseline justify-between gap-6 py-[0.5rem] no-underline in-data-[note=compact]:flex"
      >
        <h3 className="min-w-0 text-[1.0625rem] leading-[1.4] font-medium text-ink transition-colors group-hover/note:text-accent">
          {note.title}
          {note.sample ? <SampleTag className="ml-2 align-middle" /> : null}
        </h3>
        <time
          dateTime={note.date}
          className="font-mono text-[0.8125rem] leading-none whitespace-nowrap text-faint"
        >
          {formatNoteDateShort(note.date)}
        </time>
      </Link>

      {/* tagged: title, excerpt, then tags and reading time */}
      <Link
        href={href}
        className="group/note hidden max-w-[44rem] no-underline in-data-[note=tagged]:block"
      >
        <h3
          className={cn(
            H3,
            'text-[1.375rem] leading-[1.3] tracking-[-0.025em] transition-[translate] duration-350 ease-soft group-hover/note:translate-x-1.5',
          )}
        >
          {note.title}
        </h3>
        <p className="mt-[0.3rem] text-soft">{note.excerpt}</p>
        <div className="mt-[0.7rem] flex flex-wrap items-center gap-x-[0.9rem] gap-y-1 label-mono text-faint">
          {note.tags.map((tag) => (
            <b key={tag} className="font-medium text-accent">
              {tag}
            </b>
          ))}
          <span>{note.readingMinutes} min read</span>
          <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
          {note.sample ? <SampleTag /> : null}
        </div>
      </Link>

      {/* grid: a small cover on top, two columns on a wide screen */}
      <Link
        href={href}
        className="group/note hidden max-w-[26rem] no-underline in-data-[note=grid]:block"
      >
        {cover ? (
          <span className="block overflow-hidden rounded-lg shadow-[0_0_0_1px_var(--line)]">
            <NoteCover
              src={cover}
              sizes="(min-width: 768px) 26rem, 100vw"
              className="aspect-16/10 w-full transition-[scale] duration-700 ease-soft group-hover/note:scale-104"
            />
          </span>
        ) : (
          // No picture: the file name on a quiet sheet keeps the columns even.
          <span
            aria-hidden
            className="grid aspect-16/10 place-items-center rounded-lg bg-sunk px-4 text-center font-mono text-xs text-faint"
          >
            notes/{note.slug}.mdx
          </span>
        )}
        <h3
          className={cn(
            H3,
            'mt-[0.9rem] text-[1.1875rem] leading-[1.3] tracking-[-0.02em] transition-colors group-hover/note:text-accent',
          )}
        >
          {note.title}
        </h3>
        <div className="mt-[0.35rem] flex flex-wrap items-center gap-[0.9rem] label-mono text-faint">
          <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
          <span>{note.readingMinutes} min read</span>
          {note.sample ? <SampleTag /> : null}
        </div>
      </Link>

      {/* a: cover. On a narrow screen the text is taller than the dark part
          of the picture, so the shade there goes higher. */}
      <Link
        href={href}
        data-reveal
        className="group/note relative hidden overflow-hidden rounded-xl text-white no-underline shadow-[0_0_0_1px_var(--line)] after:absolute after:inset-0 after:bg-linear-to-t after:from-black/85 after:to-transparent after:to-70% in-data-[note=a]:block max-md:after:via-black/60 max-md:after:via-60% max-md:after:to-100%"
      >
        {cover ? (
          <NoteCover
            src={cover}
            sizes="(min-width: 1200px) 74rem, 100vw"
            className="aspect-21/9 min-h-88 w-full transition-[scale] duration-1400 ease-soft group-hover/note:scale-104"
          />
        ) : (
          // No picture: a plain dark sheet, so the white text keeps its contrast.
          <span className="block aspect-21/9 min-h-88 w-full bg-neutral-900" />
        )}
        <span className="absolute top-5 right-5 z-1 grid size-8 place-items-center rounded-full bg-white/16 text-white backdrop-blur-sm transition-[background-color,color,rotate] duration-350 ease-soft group-hover/note:-rotate-45 group-hover/note:bg-white group-hover/note:text-neutral-900">
          <ArrowRight aria-hidden className="size-[0.9rem]" />
        </span>
        <div className="absolute inset-x-8 bottom-7 z-1 max-w-xl">
          <Meta note={note} onPicture />
          <h3 className="mt-[0.6rem] mb-2 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
            {note.title}
          </h3>
          <p className="text-white/80">{note.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
