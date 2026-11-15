import { formatNoteDate, getNote, getNotes } from '@/lib/notes';
import {
  OG_CONTENT_TYPE,
  OG_NOTE_STYLE,
  OG_SIZE,
  OG_STYLE,
  renderShareImage,
} from '@/lib/og';

export const alt = 'A note by Byurhan Nurula';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// The page allows only known slugs, so the image route must list them too.
export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

/** Each note gets its own share image: title, date and reading time. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getNote(slug);
  return renderShareImage(
    {
      kind: 'note',
      eyebrow: 'note',
      title: note?.title ?? 'Note',
      meta: note
        ? `${formatNoteDate(note.date)} · ${note.readingMinutes} min read`
        : undefined,
      cover: note?.cover,
    },
    OG_NOTE_STYLE ?? OG_STYLE,
  );
}
