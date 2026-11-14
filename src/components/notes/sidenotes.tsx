'use client';

import { useEffect } from 'react';

import { useOption } from '@/hooks/use-options';

/** Same breakpoint as <Aside>: below it the margins are too narrow. */
const WIDE = '(min-width: 1340px)';
/** Least space between two notes in the margin, in pixels. */
const GAP = 12;

/**
 * `fnote: side`. Copies each footnote of the note into the margin, level
 * with its number, and hides the list at the end. The contents list may
 * use the right margin (`toc: side`); then the notes go left.
 */
export function Sidenotes({ target }: { target: string }) {
  const mode = useOption('fnote');
  const toc = useOption('toc');

  useEffect(() => {
    const body = document.querySelector<HTMLElement>(target);
    if (!body || mode !== 'side') return;
    const wide = window.matchMedia(WIDE);
    let notes: HTMLElement[] = [];

    const clear = () => {
      for (const note of notes) note.remove();
      notes = [];
      delete body.dataset.sidenotes;
    };

    const place = () => {
      clear();
      if (!wide.matches) return;
      const refs = body.querySelectorAll<HTMLAnchorElement>(
        'a[data-footnote-ref]',
      );
      if (refs.length === 0) return;
      body.dataset.sidenotes = toc === 'side' ? 'left' : 'right';
      const top = body.getBoundingClientRect().top;
      let below = 0;
      for (const ref of refs) {
        const id = ref.getAttribute('href')?.slice(1);
        const item = id ? document.getElementById(id) : null;
        if (!item) continue;
        const note = document.createElement('aside');
        note.dataset.sidenote = '';
        note.innerHTML = item.innerHTML;
        for (const back of note.querySelectorAll('[data-footnote-backref]')) {
          back.remove();
        }
        const mark = document.createElement('span');
        mark.dataset.sidenoteMark = '';
        mark.textContent = ref.textContent ?? '';
        note.prepend(mark);
        body.append(note);
        const want = ref.getBoundingClientRect().top - top - 4;
        const at = Math.max(want, below);
        note.style.top = `${at}px`;
        below = at + note.offsetHeight + GAP;
        notes.push(note);
      }
    };

    place();
    // Pictures load and fonts swap after the first pass: lines move.
    const resize = new ResizeObserver(place);
    resize.observe(body);
    wide.addEventListener('change', place);
    return () => {
      resize.disconnect();
      wide.removeEventListener('change', place);
      clear();
    };
  }, [target, mode, toc]);

  return null;
}
