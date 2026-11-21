'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { getOptions } from '@/lib/options-store';
import { wantsStill } from '@/lib/motion';

interface ZoomedPicture {
  src: string;
  alt: string;
  /** The file the page already shows, as a stand-in until `src` loads. */
  thumb: string;
  width: number;
  height: number;
}

/** Shared by the picture in the text and the large one, never at one time. */
const TRANSITION_NAME = 'zoom-picture';

const canMorph = () =>
  typeof document.startViewTransition === 'function' && !wantsStill();

function describe(trigger: HTMLElement, src: string): ZoomedPicture {
  const thumb = trigger.querySelector('img');
  // next/image writes the real file size into the attributes; a remote
  // picture only knows its size after it loads.
  const width = Number(thumb?.getAttribute('width')) || thumb?.naturalWidth;
  const height = Number(thumb?.getAttribute('height')) || thumb?.naturalHeight;
  return {
    src,
    alt: trigger.dataset.zoomAlt ?? '',
    thumb: thumb?.currentSrc ?? '',
    width: width || 1200,
    height: height || 800,
  };
}

/**
 * Open a native dialog with the picture of any clicked `[data-zoom-src]`.
 * With view transitions the picture travels from its place in the text and
 * back. Without them, or when motion is off, the dialog gets `data-fade`
 * and CSS does a plain fade (src/components/mdx/image-zoom.css).
 */
export function useImageZoom() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const [picture, setPicture] = useState<ZoomedPicture | null>(null);
  // The pictures of the same figure, for `zoomnav: browse`.
  const groupRef = useRef<HTMLElement[]>([]);
  const [place, setPlace] = useState({ index: 0, count: 1 });

  const step = useCallback((delta: number) => {
    const group = groupRef.current;
    const current = triggerRef.current;
    if (group.length < 2 || !current) return;
    const index =
      (group.indexOf(current) + delta + group.length) % group.length;
    const next = group[index];
    const src = next.dataset.zoomSrc;
    if (!src) return;
    current.removeAttribute('data-zoomed');
    next.dataset.zoomed = '';
    triggerRef.current = next;
    setPicture(describe(next, src));
    setPlace({ index, count: group.length });
  }, []);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    if (!dialog?.open) return;
    const thumb = trigger?.querySelector('img');

    const hide = () => {
      // First, so the picture in the text can take the focus back.
      trigger?.removeAttribute('data-zoomed');
      dialog.close();
    };
    if (!thumb || 'fade' in dialog.dataset || !canMorph()) {
      hide();
      return;
    }
    const transition = document.startViewTransition(() => {
      hide();
      thumb.style.viewTransitionName = TRANSITION_NAME;
    });
    void transition.finished.finally(() => {
      thumb.style.viewTransitionName = '';
    });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const open = (trigger: HTMLElement, src: string) => {
      if (dialog.open) return;
      triggerRef.current = trigger;
      const group =
        getOptions().zoomnav === 'browse'
          ? [
              ...(trigger
                .closest('figure')
                ?.querySelectorAll<HTMLElement>('[data-zoom-src]') ?? []),
            ]
          : [];
      groupRef.current = group;
      setPlace({
        index: Math.max(0, group.indexOf(trigger)),
        count: Math.max(1, group.length),
      });
      const next = describe(trigger, src);
      const thumb = trigger.querySelector('img');

      if (!thumb || !canMorph()) {
        dialog.dataset.fade = '';
        flushSync(() => setPicture(next));
        dialog.showModal();
        return;
      }
      delete dialog.dataset.fade;
      thumb.style.viewTransitionName = TRANSITION_NAME;
      document.startViewTransition(() => {
        thumb.style.viewTransitionName = '';
        // The large picture must be in the page before the browser takes
        // the "after" snapshot.
        flushSync(() => setPicture(next));
        // Hides the picture in the text: it reads as one picture that moved.
        trigger.dataset.zoomed = '';
        dialog.showModal();
      });
    };

    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as Element).closest<HTMLElement>(
        '[data-zoom-src]',
      );
      const src = trigger?.dataset.zoomSrc;
      if (trigger && src) open(trigger, src);
    };
    // Escape closes a dialog at once. Take it over so the picture travels back.
    const onCancel = (event: Event) => {
      event.preventDefault();
      close();
    };
    // A second Escape cannot be stopped; the picture in the text must still
    // come back.
    const onClose = () => triggerRef.current?.removeAttribute('data-zoomed');

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    // A sideways swipe of more than 50 px goes to the next or last picture.
    let swipeFrom: number | null = null;
    const onDown = (event: PointerEvent) => {
      swipeFrom = event.clientX;
    };
    const onUp = (event: PointerEvent) => {
      if (swipeFrom === null) return;
      const dx = event.clientX - swipeFrom;
      swipeFrom = null;
      if (Math.abs(dx) <= 50 || groupRef.current.length < 2) return;
      step(dx < 0 ? 1 : -1);
      // The click that ends a swipe must not close the picture.
      dialog.addEventListener('click', (click) => click.stopPropagation(), {
        capture: true,
        once: true,
      });
    };

    document.addEventListener('click', onClick);
    dialog.addEventListener('cancel', onCancel);
    dialog.addEventListener('close', onClose);
    dialog.addEventListener('keydown', onKey);
    dialog.addEventListener('pointerdown', onDown);
    dialog.addEventListener('pointerup', onUp);
    return () => {
      document.removeEventListener('click', onClick);
      dialog.removeEventListener('cancel', onCancel);
      dialog.removeEventListener('close', onClose);
      dialog.removeEventListener('keydown', onKey);
      dialog.removeEventListener('pointerdown', onDown);
      dialog.removeEventListener('pointerup', onUp);
    };
  }, [close, step]);

  return { dialogRef, picture, close, step, place };
}
