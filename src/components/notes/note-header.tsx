import { BackLink } from '@/components/notes/back-link';
import { PageTitle } from '@/components/shared/page-hero';
import { SampleTag } from '@/components/shared/sample-tag';
import { formatNoteDateLong, type NoteMeta } from '@/lib/notes';
import { cn } from '@/lib/utils';

/** Column width of the note page. The `pcol` option changes it. */
export const NOTE_COLUMN =
  'mx-auto max-w-[44rem] in-data-[pcol=narrow]:max-w-[38rem] in-data-[pcol=wide]:max-w-[50rem]';

/** The top of a note: back link, title, lead, date, reading time and tags. */
export function NoteHeader({ note }: { note: NoteMeta }) {
  return (
    <header className={cn(NOTE_COLUMN, 'pt-(--hero-gap) pb-10')}>
      <BackLink href="/notes">Notes</BackLink>
      <PageTitle
        title={note.title}
        className="mt-6 mb-4 text-[clamp(2.25rem,5vw,3.5rem)] in-data-[h1=large]:text-(length:--title-size) in-data-[h1=small]:text-(length:--title-size)"
      />
      <p className="mb-6 text-[1.1875rem] leading-[1.55] text-pretty text-soft">
        {note.excerpt}
      </p>
      <div className="flex flex-wrap items-center gap-[0.9rem] label-mono text-faint">
        <time dateTime={note.date}>{formatNoteDateLong(note.date)}</time>
        <span>{note.readingMinutes} min read</span>
        {note.tags.map((tag) => (
          <b key={tag} className="font-medium text-accent">
            {tag}
          </b>
        ))}
        {note.sample ? <SampleTag>sample post</SampleTag> : null}
      </div>
    </header>
  );
}
