'use client';

import { useOption } from '@/hooks/use-options';
import { useScramble } from '@/hooks/use-scramble';

interface ScrambleTitleProps {
  text: string;
}

/** The pixel-font name. It resolves out of noise when shown and on hover. */
export function ScrambleTitle({ text }: ScrambleTitleProps) {
  const shown = useOption('hero') === 'current';
  const { display, run } = useScramble(text, shown);
  return (
    <h1
      // The label is the real text. The letters below are noise for a while.
      aria-label={text}
      onPointerEnter={run}
      className="mb-7 font-pixel text-[clamp(2.6rem,5vw,3.5rem)] leading-[1.1] font-normal tracking-normal"
    >
      <span aria-hidden>{display}</span>
    </h1>
  );
}
