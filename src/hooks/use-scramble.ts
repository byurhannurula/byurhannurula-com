'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { wantsStill } from '@/lib/motion';

const NOISE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$*';
const FRAME_MS = 34;

// Texts that finished playing. Module scope outlives a client navigation but
// not a reload, so going back to the page does not replay the effect.
const played = new Set<string>();

/** Text that resolves out of noise, left to right. `auto` runs it once when it turns true. */
export function useScramble(text: string, auto = false) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const run = useCallback(() => {
    // Noise in place of a word is the whole effect. There is no softer form.
    if (timer.current || wantsStill()) return;
    const total = Math.ceil(text.length * 1.6);
    let frame = 0;
    timer.current = setInterval(() => {
      frame += 1;
      const settled = (frame / total) * text.length;
      setDisplay(
        [...text]
          .map((char, position) =>
            char === ' ' || position < settled
              ? char
              : NOISE[Math.floor(Math.random() * NOISE.length)],
          )
          .join(''),
      );
      if (frame >= total) {
        stop();
        setDisplay(text);
        // Marked at the end: a run that Strict Mode tears down has not played.
        played.add(text);
      }
    }, FRAME_MS);
  }, [text, stop]);

  useEffect(() => {
    if (auto && !played.has(text)) run();
    return stop;
  }, [auto, text, run, stop]);

  return { display, run };
}
