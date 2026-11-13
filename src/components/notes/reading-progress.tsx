'use client';

import { useReadingProgress } from '@/hooks/use-reading-progress';

/** The thin bar at the top of a note. The island states the same value. */
export function ReadingProgress({ target }: { target: string }) {
  const progress = useReadingProgress(target);
  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-accent-bright"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
