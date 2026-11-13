'use client';

import { getOptions } from '@/lib/options-store';

/** One place that says which file plays for which event, and how loud. */
const SOUNDS = {
  // A real click gets no sound: it was irritating. The same file, very
  // quiet, is the tick when the pointer enters a link or a button.
  hover: ['click.webm', 0.09],
  open: ['open.webm', 0.3],
  close: ['close.webm', 0.3],
  page: ['page.webm', 0.28],
} as const;

export type SoundName = keyof typeof SOUNDS;

const cache = new Map<SoundName, HTMLAudioElement>();

export function playSound(name: SoundName, level = 1) {
  // Read at call time, not from a hook: a sound must not cause a render.
  if (getOptions().sound === 'off') return;
  const [file, gain] = SOUNDS[name];
  let base = cache.get(name);
  if (!base) {
    base = new Audio(`/sounds/${file}`);
    cache.set(name, base);
  }
  const audio = base.cloneNode() as HTMLAudioElement;
  audio.volume = gain * level;
  // Autoplay rules can reject before the first user gesture. Silence is fine.
  audio.play().catch(() => {});
}

/** `play(name)` for components. It respects the `sound` option. */
export function useSound() {
  return playSound;
}
