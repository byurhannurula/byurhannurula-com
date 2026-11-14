'use client';

import dynamic from 'next/dynamic';

import { useOption } from '@/hooks/use-options';

// Loaded only with `nf: puzzle`: the plain 404 page ships no puzzle code.
const DotPuzzle = dynamic(
  () => import('./dot-puzzle').then((m) => m.DotPuzzle),
  { ssr: false },
);

/** The 404 puzzle, when the `nf` option asks for it. */
export function DotPuzzleSlot() {
  return useOption('nf') === 'puzzle' ? (
    <div className="mt-12">
      <p className="mb-4 label-mono font-medium text-soft">
        While you are here
      </p>
      <DotPuzzle />
    </div>
  ) : null;
}
