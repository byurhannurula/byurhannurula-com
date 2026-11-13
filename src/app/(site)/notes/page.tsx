import { NoteItem } from '@/components/notes/note-item';
import { NoteQueue } from '@/components/notes/note-queue';
import { NotesArt } from '@/components/notes/notes-art';
import { PageHero } from '@/components/shared/page-hero';
import { Section } from '@/components/shared/section';
import { NOTE_QUEUE, NOTE_QUEUE_COPY, NOTES_HERO } from '@/content/notes';
import { getNotes } from '@/lib/notes';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/notes',
  title: 'Notes',
  description: NOTES_HERO.description,
});

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div data-page="notes">
      <PageHero
        title={NOTES_HERO.title}
        titleEnd={NOTES_HERO.titleEnd}
        lead={NOTES_HERO.lead}
        art={<NotesArt />}
      />
      <Section>
        {notes.map((note) => (
          <NoteItem key={note.slug} note={note} />
        ))}
      </Section>
      <Section title={NOTE_QUEUE_COPY.title} sub={NOTE_QUEUE_COPY.sub}>
        <NoteQueue items={NOTE_QUEUE} />
      </Section>
    </div>
  );
}
