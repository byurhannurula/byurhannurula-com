'use client';

import { useGreeting } from '@/hooks/use-greeting';

/** A greeting for the reader's time of day, above the title. Option: `greeting`. */
export function HeroGreeting() {
  const greeting = useGreeting();
  return (
    // min-h holds the line before the clock is known, so the title stays put.
    <p className="mb-5 hidden min-h-[1.5em] label-mono text-faint in-data-[greeting=on]:block">
      {greeting}
    </p>
  );
}
