import { NoteList } from '@/components/notes/note-list';
import { NoteQueue } from '@/components/notes/note-queue';
import { NotesArt } from '@/components/notes/notes-art';
import { PageHero } from '@/components/shared/page-hero';
import { Section } from '@/components/shared/section';
import { NOTE_QUEUE, NOTE_QUEUE_COPY, NOTES_HERO } from '@/content/notes';
import { getNotes } from '@/lib/notes';
import { PAGES } from '@/config/seo';
import { pageMetadata } from '@/lib/seo';
import { hideUnlisted } from '@/lib/unlisted';

export const metadata = pageMetadata(PAGES.notes);

export default async function NotesPage() {
  hideUnlisted('/notes');
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
        {/* The note titles are h3: this keeps the heading order whole. */}
        <h2 className="sr-only">All notes</h2>
        <NoteList notes={notes} />
      </Section>
      <Section title={NOTE_QUEUE_COPY.title} sub={NOTE_QUEUE_COPY.sub}>
        <NoteQueue items={NOTE_QUEUE} />
      </Section>
    </div>
  );
}
