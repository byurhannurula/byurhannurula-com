'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Matches the body swap keyframes in src/components/layout/social-row.css. */
const SWAP_MS = 300;
/** Room between a clamped card and the edge of the screen. */
const SCREEN_MARGIN_PX = 16;

interface TravelCardState {
  open: boolean;
  index: number;
  /** Set while the old body leaves. `dir` is 1 when the card moves right. */
  swap?: { from: number; dir: number };
  /** Counts swaps. It keys the bodies, so each swap mounts a new pair. */
  generation: number;
  /** False for the first card of a hover: it appears at its final place. */
  travels: boolean;
  box: { left: number; width: number; height: number };
}

const CLOSED: TravelCardState = {
  open: false,
  index: 0,
  generation: 0,
  travels: false,
  box: { left: 0, width: 0, height: 0 },
};

/**
 * Keep a card on screen when it is wider than the room beside its item.
 * `left` is the card centre, relative to the row. The limits are in screen
 * coordinates, hence the row offset on both sides.
 */
function clampLeft(left: number, width: number, row: HTMLElement | null) {
  if (!row || !width) return left;
  const rowLeft = row.getBoundingClientRect().left;
  const min = SCREEN_MARGIN_PX - rowLeft + width / 2;
  const max = window.innerWidth - SCREEN_MARGIN_PX - rowLeft - width / 2;
  // Wider than the screen allows: centre it.
  if (min > max) return window.innerWidth / 2 - rowLeft;
  return Math.min(Math.max(left, min), max);
}

/** One hover card that moves between the items of a row and swaps its body. */
export function useTravelCard() {
  const rowRef = useRef<HTMLDivElement>(null);
  // The unclamped centre. It is set before the body is measured.
  const rawLeft = useRef(0);
  const swapTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // Handlers read the state here, so two events in one frame see each other.
  const latest = useRef(CLOSED);
  const [state, setState] = useState(CLOSED);

  const commit = useCallback((patch: Partial<TravelCardState>) => {
    latest.current = { ...latest.current, ...patch };
    setState(latest.current);
  }, []);

  useEffect(() => () => clearTimeout(swapTimer.current), []);

  /** Ref for the body that comes in. Each swap mounts a new one. */
  const measure = useCallback(
    (body: HTMLElement | null) => {
      if (!body) return;
      const width = body.offsetWidth;
      commit({
        box: {
          left: clampLeft(rawLeft.current, width, rowRef.current),
          width,
          height: body.offsetHeight,
        },
      });
    },
    [commit],
  );

  const point = useCallback(
    (next: number, anchor: HTMLElement) => {
      const { open, index, generation, box } = latest.current;
      const left = anchor.offsetLeft + anchor.offsetWidth / 2;
      rawLeft.current = left;
      const moved = open && next !== index;
      if (moved) {
        clearTimeout(swapTimer.current);
        swapTimer.current = setTimeout(
          () => commit({ swap: undefined }),
          SWAP_MS,
        );
      }
      commit({
        open: true,
        index: next,
        travels: open,
        box: { ...box, left: clampLeft(left, box.width, rowRef.current) },
        ...(moved && {
          generation: generation + 1,
          swap: { from: index, dir: Math.sign(next - index) },
        }),
      });
    },
    [commit],
  );

  const close = useCallback(() => {
    if (!latest.current.open) return;
    clearTimeout(swapTimer.current);
    commit({ open: false, swap: undefined, travels: false });
  }, [commit]);

  return { rowRef, measure, point, close, ...state };
}
