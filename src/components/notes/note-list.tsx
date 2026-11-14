import { Fragment } from 'react';

import { NOTE_LIST, NoteItem } from '@/components/notes/note-item';
import type { NoteMeta } from '@/lib/notes';
import { cn } from '@/lib/utils';

interface NoteListProps {
  /** Newest first. */
  notes: NoteMeta[];
}

/**
 * All notes. `notegroup: year` puts a quiet year label before the first note
 * of each year: at the left on a wide screen, above the group on a phone and
 * for `note: grid`. The labels and the notes share one grid, so `flat` is
 * the same markup with the labels hidden.
 */
export function NoteList({ notes }: NoteListProps) {
  return (
    <div
      className={cn(
        NOTE_LIST,
        'md:in-data-[notegroup=year]:grid-cols-[4.5rem_minmax(0,1fr)]',
        // After the year columns, so `grid` keeps its own two.
        'md:in-data-[note=grid]:grid-cols-2!',
      )}
    >
      {notes.map((note, index) => {
        const year = note.date.slice(0, 4);
        const opensYear = year !== notes[index - 1]?.date.slice(0, 4);
        return (
          <Fragment key={note.slug}>
            {opensYear ? (
              <p
                className={cn(
                  'hidden self-start font-mono text-[0.8125rem] leading-none text-faint in-data-[notegroup=year]:block',
                  // The same top space as the first note of the year (below).
                  'not-first:mt-8 in-data-[note=grid]:col-span-full',
                  // At the left, the label meets the first line of the note.
                  // Each form starts its text at another height, and a grid
                  // baseline would follow a picture, not the title.
                  'md:in-data-[note=b]:pt-[1.9rem] md:in-data-[note=compact]:pt-[0.84rem] md:in-data-[note=leaders]:pt-[1.17rem] md:in-data-[note=tagged]:pt-[0.49rem] md:in-data-[note=thumb]:pt-1',
                  // Above its group, the label must sit nearer to it than to
                  // the group before: this takes back most of the list gap.
                  'max-md:mb-1 in-data-[note=grid]:-mb-6 max-md:in-data-[note=a]:-mb-3 max-md:in-data-[note=c]:-mb-3 max-md:in-data-[note=tagged]:-mb-6 max-md:in-data-[note=thumb]:-mb-5',
                )}
              >
                {year}
              </p>
            ) : null}
            <div
              className={cn(
                'min-w-0 md:in-data-[notegroup=year]:col-start-2 md:in-data-[note=grid]:col-auto!',
                opensYear &&
                  index > 0 &&
                  'md:in-data-[notegroup=year]:mt-8 md:in-data-[note=grid]:mt-0!',
              )}
            >
              <NoteItem note={note} />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
