'use client';

import { useCallback, useRef, useState, type CSSProperties } from 'react';

const SCREEN_MARGIN_PX = 16;

interface TravelCardState {
  open: boolean;
  /** Stays set after a close, so the body is still there while it fades. */
  active: number;
  /** False for the first show, so the card does not fly in from x = 0. */
  live: boolean;
  box?: Pick<CSSProperties, 'left' | 'width' | 'height'>;
}

const CLOSED: TravelCardState = { open: false, active: -1, live: false };

/** One hover card that moves between the items of a row and swaps its body. */
export function useTravelCard<Item extends HTMLElement>() {
  const rowRef = useRef<HTMLDivElement>(null);
  const items = useRef<(Item | null)[]>([]);
  const bodies = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(-1);
  const [state, setState] = useState(CLOSED);

  const point = useCallback((index: number) => {
    const row = rowRef.current;
    const item = items.current[index];
    const body = bodies.current[index];
    if (!row || !item || !body) return;

    const previous = activeRef.current;
    if (previous >= 0 && previous !== index) {
      // The old body leaves to one side and the new one comes from the other.
      // `--dir` must be in place before the new body turns on, so it is set
      // here and not through React state.
      const direction = Math.sign(index - previous);
      bodies.current[previous]?.style.setProperty('--dir', String(-direction));
      body.style.setProperty('--dir', String(direction));
      void body.offsetWidth;
    }

    const width = body.offsetWidth;
    const rowLeft = row.getBoundingClientRect().left;
    const centre = Math.min(
      Math.max(
        item.offsetLeft + item.offsetWidth / 2,
        SCREEN_MARGIN_PX - rowLeft + width / 2,
      ),
      window.innerWidth - SCREEN_MARGIN_PX - rowLeft - width / 2,
    );
    activeRef.current = index;
    setState({
      open: true,
      active: index,
      live: previous >= 0,
      box: { left: centre, width, height: body.offsetHeight },
    });
  }, []);

  const close = useCallback(() => {
    activeRef.current = -1;
    setState((current) => ({ ...current, open: false, live: false }));
  }, []);

  const registerItem = useCallback((index: number, el: Item | null) => {
    items.current[index] = el;
  }, []);
  const registerBody = useCallback((index: number, el: HTMLElement | null) => {
    bodies.current[index] = el;
  }, []);

  return { rowRef, registerItem, registerBody, point, close, ...state };
}
