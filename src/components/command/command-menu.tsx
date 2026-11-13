import { formatNoteDate, getNotes } from '@/lib/notes';

import type { CommandNote } from './command-content';
import { CommandPalette } from './command-palette';

/** Reads the notes on the server and hands them to the menu. */
export async function CommandMenu() {
  const notes = await getNotes();
  const rows: CommandNote[] = notes.map((note) => ({
    slug: note.slug,
    title: note.title,
    date: formatNoteDate(note.date),
    keywords: [...note.tags, ...note.keywords].join(' '),
  }));
  return <CommandPalette notes={rows} />;
}
