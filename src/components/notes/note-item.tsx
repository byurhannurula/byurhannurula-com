import Link from 'next/link';

import type { NoteMeta } from '@/lib/notes';

// Placeholder until the notes area is ported. Keep this signature.
export function NoteItem({ note }: { note: NoteMeta }) {
  return <Link href={`/notes/${note.slug}`}>{note.title}</Link>;
}
