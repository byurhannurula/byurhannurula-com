import { LeaderRow } from '@/components/notes/leader-row';
import { SampleTag } from '@/components/shared/sample-tag';
import { Section } from '@/components/shared/section';
import { RELATED_COPY, type RelatedNote } from '@/content/notes';

interface NoteRelatedProps {
  items: RelatedNote[];
  className?: string;
}

/** "Keep reading" under a note. The `related` option turns it off. */
export function NoteRelated({ items, className }: NoteRelatedProps) {
  return (
    <Section
      title={RELATED_COPY.title}
      sub={
        <>
          <SampleTag>sample list</SampleTag> {RELATED_COPY.sub}
        </>
      }
      className={className}
    >
      {items.map((item) => (
        <LeaderRow key={item.title} title={item.title} end={item.status} />
      ))}
    </Section>
  );
}
