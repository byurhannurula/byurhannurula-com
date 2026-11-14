'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { useActiveHeading } from '@/hooks/use-active-heading';
import { useRootData } from '@/hooks/use-root-data';
import type { NoteHeading } from '@/lib/mdx';

import { TocSide } from './toc-side';

// The island brings the `motion` library. A lazy chunk keeps it out of the
// shared bundle, and the note text does not wait for it.
const TocIsland = dynamic(
  () => import('./toc-island').then((mod) => mod.TocIsland),
  { ssr: false },
);

interface TocProps {
  headings: NoteHeading[];
  /** Shown in the island before the first heading. */
  title: string;
  /** Selector of the element whose reading progress the island shows. */
  target: string;
}

/**
 * Contents of a note. `toc: island` is a floating pill, `toc: side` a side
 * column on wide screens (the island below that), `toc: off` neither.
 */
export function Toc({ headings, title, target }: TocProps) {
  const toc = useRootData('toc');
  const ids = useMemo(() => headings.map((h) => h.id), [headings]);
  const active = useActiveHeading(ids);

  if (headings.length === 0) return null;
  return (
    <div className="in-data-[toc=off]:hidden">
      <TocSide headings={headings} active={active} />
      {toc === 'off' ? null : (
        <TocIsland
          headings={headings}
          active={active}
          title={title}
          target={target}
        />
      )}
    </div>
  );
}
