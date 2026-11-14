'use client';

import { useEffect } from 'react';

import { useOption } from '@/hooks/use-options';
import { useReadingProgress } from '@/hooks/use-reading-progress';
import { confetti } from '@/lib/confetti';

const STORAGE_KEY = 'notes-finished';

function finished(): string[] {
  try {
    const list: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(list) ? list.filter((s) => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

function markFinished(slug: string) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...finished(), slug]));
  } catch {
    // The burst may play again next time; nothing else depends on it.
  }
}

/**
 * `readfx: confetti`. The first time a reader reaches the end of a note, a
 * burst rises from the bottom of the screen. Once per note per browser.
 */
export function FinishConfetti({
  slug,
  target,
}: {
  slug: string;
  target: string;
}) {
  const mode = useOption('readfx');
  const progress = useReadingProgress(target);

  useEffect(() => {
    // A short note can count as read before any scroll: that is not reading.
    if (mode !== 'confetti' || progress < 1 || window.scrollY < 200) return;
    if (finished().includes(slug)) return;
    markFinished(slug);
    confetti(window.innerWidth / 2, window.innerHeight - 40, {
      count: 46,
      reach: Math.min(420, window.innerHeight * 0.55),
      spread: 70,
      fall: 120,
      duration: 1700,
    });
  }, [mode, progress, slug]);

  return null;
}
