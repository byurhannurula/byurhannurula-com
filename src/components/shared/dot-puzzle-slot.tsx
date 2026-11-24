'use client';

import dynamic from 'next/dynamic';

import { useOption } from '@/hooks/use-options';

// Each loads only with its `nf` value: the plain 404 page ships none of them.
const DotPuzzle = dynamic(
  () => import('./dot-puzzle').then((m) => m.DotPuzzle),
  { ssr: false },
);
const LostDots = dynamic(() => import('./lost-dots').then((m) => m.LostDots), {
  ssr: false,
});
const LostLines = dynamic(
  () => import('./lost-lines').then((m) => m.LostLines),
  { ssr: false },
);

/** The big "404." in dots, when `nf: dots`. It takes the text's place. */
export function NotFoundNumber() {
  return useOption('nf') === 'dots' ? (
    <div className="mb-5">
      <LostDots />
    </div>
  ) : null;
}

/** The 404 extras under the button: the puzzle or the lost lines. */
export function DotPuzzleSlot() {
  const nf = useOption('nf');
  if (nf === 'lines') {
    return (
      <div className="mt-12">
        <LostLines />
      </div>
    );
  }
  return nf === 'puzzle' ? (
    <div className="mt-12">
      <p className="mb-4 label-mono font-medium text-soft">
        While you are here
      </p>
      <DotPuzzle />
    </div>
  ) : null;
}
