export const NOTES_HERO = {
  title: 'Notes',
  titleEnd: 'on things I build, fix and run.',
  lead: 'One idea for each post. I write them after I fix something, in case someone else has the same problem.',
  description:
    'Short notes on things I build, fix and run. One idea for each post.',
} as const;

export interface QueuedNote {
  status: 'next' | 'idea';
  title: string;
}

/** Planned notes. They have no page yet, so they are never links. */
export const NOTE_QUEUE: QueuedNote[] = [
  {
    status: 'next',
    title:
      'What runs in my homelab now, what broke, and what I would not buy again',
  },
  {
    status: 'idea',
    title:
      'A screenshot extension with zero dependencies: what I had to write myself',
  },
  {
    status: 'idea',
    title:
      'Optional sync for a local-first app, with one Worker and one bucket',
  },
  {
    status: 'idea',
    title:
      'From intern to team lead in the same company: what changed and what did not',
  },
];

export const NOTE_QUEUE_COPY = {
  title: 'In the queue',
  sub: 'Planned, not written yet.',
} as const;

export interface RelatedNote {
  title: string;
  status: 'planned' | 'idea';
}

/** Sample list for "Keep reading" until there is more than one real note. */
export const RELATED_SAMPLE: RelatedNote[] = [
  { title: 'What runs in my homelab now, and what broke', status: 'planned' },
  { title: 'A screenshot extension with zero dependencies', status: 'idea' },
  { title: 'Optional sync for a local-first app', status: 'idea' },
];

export const RELATED_COPY = {
  title: 'Keep reading',
  sub: 'There is only one real note now.',
} as const;
