"use client";

import { useEffect, useRef, useState } from "react";

import { playLoop } from "@/lib/sound";
import { cn } from "@/lib/utils";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/** Blanks passed before the real one arrives. Emily Campbell's board uses 12. */
const FILLERS = 12;
const BASE_MS = 620;
/**
 * Slot height, in the reel's own em. Shared by the cell height and the travel
 * distance so the strip always lands a whole number of slots from the window;
 * splitting it between CSS and this file is how a reel ends up half a letter off.
 */
const CELL_EM = 1.2;
const STAGGER_MS = 90;

const CELL_STYLE = {
  height: `${CELL_EM}em`,
  lineHeight: `${CELL_EM}em`,
};

function randomLetters(count: number) {
  return Array.from(
    { length: count },
    () => LETTERS[Math.floor(Math.random() * LETTERS.length)] ?? "A"
  );
}

/**
 * One slot of the reel.
 *
 * The strip holds twelve throwaway letters and then the real one, and the whole
 * strip is slid up by exactly twelve slot heights. Nothing is measured and
 * nothing is timed per letter: one transform, one transition, and the letter
 * that stops in the window is the letter that was always last.
 *
 * The filler letters are only generated on a click, so the server and the first
 * client render agree on a settled word and there is nothing to hydrate around.
 */
function Slot({
  target,
  fillers,
  spinning,
  duration,
}: {
  target: string;
  fillers: string[];
  spinning: boolean;
  duration: number;
}) {
  // Built outside the JSX: a filler's identity is its place on the strip, and
  // the letters repeat by design, so position must not appear inside a key.
  const cells = fillers.map((letter, position) => ({
    letter,
    id: `pass-${position}`,
  }));

  return (
    <span className="reel-slot" style={{ height: `${CELL_EM}em` }}>
      <span
        className="reel-strip"
        style={{
          translate: spinning
            ? "0 0"
            : `0 -${(fillers.length * CELL_EM).toFixed(3)}em`,
          transitionDuration: spinning ? "0ms" : `${duration}ms`,
        }}
      >
        {cells.map((cell) => (
          <span
            className="reel-cell reel-cell--pass"
            key={cell.id}
            style={CELL_STYLE}
          >
            {cell.letter}
          </span>
        ))}
        <span className="reel-cell" style={CELL_STYLE}>
          {target}
        </span>
      </span>
      <span className="reel-shade reel-shade--top" />
      <span className="reel-shade reel-shade--bottom" />
    </span>
  );
}

/**
 * A word on a slot reel, the mechanism behind the Emily Campbell board.
 *
 * Where a split-flap steps through the alphabet and stops when the right letter
 * arrives, this one throws twelve letters past the window and lands the real
 * one. Every slot moves on every change, including the ones whose letter is not
 * changing, which is the difference the reel is worth having for.
 *
 * It only runs when it is clicked.
 */
export function Reel({
  word,
  className,
}: {
  word: string;
  className?: string;
}) {
  // Built outside the JSX so a slot's identity, which is its position in the
  // window, never has to read as an array index inside a key.
  const slots = [...word.toUpperCase()].map((letter, position) => ({
    letter,
    id: `slot-${position}`,
    duration: BASE_MS + position * STAGGER_MS,
    position,
  }));
  const [fillers, setFillers] = useState<string[][]>([]);
  const [spinning, setSpinning] = useState(false);
  const frames = useRef<number[]>([]);
  const stopSound = useRef<(() => void) | null>(null);

  const longest = BASE_MS + (slots.length - 1) * STAGGER_MS;

  useEffect(
    () => () => {
      for (const id of frames.current) cancelAnimationFrame(id);
      stopSound.current?.();
    },
    []
  );

  const spin = () => {
    if (spinning) return;
    setFillers(slots.map(() => randomLetters(FILLERS)));
    setSpinning(true);

    stopSound.current?.();
    stopSound.current = playLoop("flipper", { volume: 0.8 });

    // Two frames: the first paints the strip back at the top with no
    // transition, the second turns the transition on so it actually travels.
    const outer = requestAnimationFrame(() => {
      const inner = requestAnimationFrame(() => setSpinning(false));
      frames.current.push(inner);
    });
    frames.current.push(outer);

    window.setTimeout(() => {
      stopSound.current?.();
      stopSound.current = null;
    }, longest);
  };

  return (
    <button
      aria-label={`${word}. Spin the reel.`}
      className={cn("reel", className)}
      data-no-sound=""
      onClick={spin}
      type="button"
    >
      <span aria-hidden="true" className="reel-window">
        {slots.map((slot) => (
          <Slot
            duration={slot.duration}
            fillers={fillers[slot.position] ?? []}
            key={slot.id}
            spinning={spinning}
            target={slot.letter}
          />
        ))}
      </span>
    </button>
  );
}
