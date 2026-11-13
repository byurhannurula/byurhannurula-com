import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ImageZoom } from '@/components/mdx/image-zoom';
import { BackLink } from '@/components/notes/back-link';
import { LikeButton } from '@/components/notes/like-button';
import { NOTE_COLUMN, NoteHeader } from '@/components/notes/note-header';
import { NoteHeroCover } from '@/components/notes/note-hero-cover';
import { NoteRelated } from '@/components/notes/note-related';
import { ReadingProgress } from '@/components/notes/reading-progress';
import { TocIsland } from '@/components/notes/toc-island';
import { RELATED_SAMPLE } from '@/content/notes';
import { renderNote } from '@/lib/mdx';
import { getNote, getNotes } from '@/lib/notes';
import { pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

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
  const base = pageMetadata({
    path: `/notes/${note.slug}`,
    title: note.title,
    description: note.excerpt,
    noindex: note.sample,
  });
  return {
    ...base,
    keywords: [...note.tags, ...note.keywords],
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: note.date,
      tags: note.tags,
      images: note.cover ? [note.cover] : undefined,
    },
  };
}

/** The reading progress and the contents list measure this element. */
const BODY = '[data-note-body]';

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();

  const { content, headings } = await renderNote(note.body);

  return (
    <div data-page="note" className="pb-16">
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
          <NoteHeroCover src={note.cover} alt={note.coverAlt} />
        ) : null}
        {content}
      </article>
      <div
        className={cn(
          NOTE_COLUMN,
          'mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6',
        )}
      >
        <LikeButton />
        <BackLink href="/notes">All notes</BackLink>
      </div>
      <NoteRelated
        items={RELATED_SAMPLE}
        className={cn(NOTE_COLUMN, 'hidden pt-12 in-data-[related=on]:block')}
      />
      <TocIsland headings={headings} title={note.title} target={BODY} />
      <ImageZoom />
    </div>
  );
}
