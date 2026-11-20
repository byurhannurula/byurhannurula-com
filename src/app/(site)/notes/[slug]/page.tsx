import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Figure } from '@/components/mdx/figure';
import { ImageZoom } from '@/components/mdx/image-zoom';
import { BackLink } from '@/components/notes/back-link';
import { FinishConfetti } from '@/components/notes/finish-confetti';
import { LikeButton } from '@/components/notes/like-button';
import { NOTE_COLUMN, NoteHeader } from '@/components/notes/note-header';
import { NoteJsonLd } from '@/components/notes/note-json-ld';
import { NoteRelated } from '@/components/notes/note-related';
import { ReadingProgress } from '@/components/notes/reading-progress';
import { Sidenotes } from '@/components/notes/sidenotes';
import { Toc } from '@/components/notes/toc';
import { RELATED_SAMPLE } from '@/content/notes';
import { renderNote } from '@/lib/mdx';
import { getNote, getNotes } from '@/lib/notes';
import { pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';
import { hideUnlisted } from '@/lib/unlisted';

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

// Notes are files in the repo: every page is known at build time.
export const dynamicParams = false;

export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) return {};
  // No `images` here: opengraph-image.tsx next to this file draws the share
  // picture, and a value set here would replace it.
  return pageMetadata({
    path: `/notes/${note.slug}`,
    title: note.title,
    description: note.excerpt,
    noindex: note.sample,
    article: { publishedTime: note.date, tags: note.tags },
  });
}

/** The reading progress and the contents list measure this element. */
const BODY = '[data-note-body]';

export default async function NotePage({ params }: NotePageProps) {
  hideUnlisted('/notes');
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();

  const { content, headings } = await renderNote(note.body);

  return (
    <div data-page="note" className="pb-16">
      <NoteJsonLd note={note} />
      <ReadingProgress target={BODY} />
      <NoteHeader note={note} />
      <article
        data-note-body
        className={cn(
          NOTE_COLUMN,
          'text-[1.1875rem] leading-[1.75] in-data-[psize=large]:text-[1.3125rem] in-data-[psize=small]:text-[1.0625rem] in-data-[psize=small]:leading-[1.7]',
          // The first block sits under the header without its top margin.
          '[&>:first-child]:mt-0',
        )}
      >
        {note.cover ? (
          <Figure src={note.cover} alt={note.coverAlt} width="wide" priority />
        ) : null}
        {content}
      </article>
      <div
        className={cn(
          NOTE_COLUMN,
          'mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6',
        )}
      >
        <LikeButton slug={note.slug} />
        <BackLink href="/notes">All notes</BackLink>
      </div>
      <NoteRelated
        items={RELATED_SAMPLE}
        className={cn(NOTE_COLUMN, 'hidden pt-12 in-data-[related=on]:block')}
      />
      <Toc headings={headings} title={note.title} target={BODY} />
      <Sidenotes target={BODY} />
      <FinishConfetti slug={note.slug} target={BODY} />
      <ImageZoom />
    </div>
  );
}
