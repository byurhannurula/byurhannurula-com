import type { QueuedNote } from '@/content/notes';

interface NoteQueueProps {
  items: QueuedNote[];
}

/** Planned notes: a state and a title. Not links, because no page exists. */
export function NoteQueue({ items }: NoteQueueProps) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.title}
          className="flex items-center gap-4 border-t border-rule py-[1.05rem] last:border-b"
        >
          <span className="w-22 flex-none label-mono text-faint">
            {item.status}
          </span>
          <h3 className="text-lg leading-[1.3] font-medium tracking-[-0.015em] text-soft">
            {item.title}
          </h3>
        </li>
      ))}
    </ul>
  );
}
