"use client";

import { useEffect, useRef, useState } from "react";

import { playLoop } from "@/lib/sound";
import { cn } from "@/lib/utils";

/**
 * The drum, in the order a real board carries it.
 *
 * A column cannot jump to its letter: it steps forward one flap at a time and
 * stops when the right one arrives. That is why the columns of a departure
 * board finish at different moments.
 */
const DRUM = " ABCDEFGHIJKLMNOPQRSTUVWXYZ-.";

/** One flap. Real boards sit around 60 to 90ms. */
const STEP_MS = 78;

function drumIndex(char: string) {
  const at = DRUM.indexOf(char);
  return at < 0 ? 0 : at;
}

/**
 * How many flaps this column has to turn.
 *
 * A column whose letter is not changing still turns: it goes all the way round
 * the drum and comes back to the same letter. On a real board nothing holds a
 * column still while its neighbours move, and a board with three frozen columns
 * reads as broken rather than as clever.
 */
function stepsBetween(from: string, to: string) {
  const gap = (drumIndex(to) - drumIndex(from) + DRUM.length) % DRUM.length;
  return gap === 0 ? DRUM.length : gap;
}

function Half({
  char,
  side,
  className,
}: {
  char: string;
  side: "top" | "bottom";
  className?: string;
}) {
  return (
    <span className={cn("sf-half", `sf-${side}`, className)}>
      <span className="sf-glyph">{char}</span>
    </span>
  );
}

/**
 * One column of the board.
 *
 * Four layers, which is how the mechanism actually works: the leaf that falls
 * carries the old top, the leaf that rises carries the new bottom, and the two
 * static halves behind them are already showing the new top and the old bottom.
 * Anything less than four and the glyph tears halfway through the flip.
 *
 * The parent gives it a starting letter and a number of flaps rather than a
 * destination, so the column never has to work out whether it is allowed to
 * stand still.
 */
function Column({ from, steps }: { from: string; steps: number }) {
  const [done, setDone] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const start = drumIndex(from);
  const char = DRUM[(start + done) % DRUM.length] ?? " ";
  const turning = done < steps;
  const next = turning ? (DRUM[(start + done + 1) % DRUM.length] ?? " ") : null;

  useEffect(() => {
    if (!turning) return;
    if (reduced) {
      setDone(steps);
      return;
    }
    // Reads `done` rather than using the updater form: the effect has to re-run
    // after every flap to schedule the next one, so the dependency is
    // load-bearing and must be visible as one.
    const timer = setTimeout(() => setDone(done + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [done, turning, reduced, steps]);

  return (
    <span className="sf-tile">
      <Half char={next ?? char} side="top" />
      <Half char={char} side="bottom" />
      {next ? (
        <>
          {/* Keyed on the flap count so each step restarts the animation. */}
          <Half char={char} className="sf-fall" key={`f${done}`} side="top" />
          <Half
            char={next}
            className="sf-rise"
            key={`r${done}`}
            side="bottom"
          />
        </>
      ) : null}
    </span>
  );
}

interface Run {
  index: number;
  from: string;
  /** Bumped on every change so the columns remount and start a fresh run. */
  gen: number;
}

/**
 * A split-flap board, in a sentence.
 *
 * It does not change on its own. A board that shuffles by itself is an
 * advertisement; a board that only moves when you touch it is a thing you
 * found. Every word is padded to the width of the longest, so the board is a
 * fixed object the paragraph is set around rather than something that resizes
 * and reflows the line under it.
 */
export function SplitFlap({
  words,
  className,
}: {
  words: readonly string[];
  className?: string;
}) {
  const size = words.reduce((max, word) => Math.max(max, word.length), 0);
  const board = words.map((word) => word.toUpperCase().padEnd(size, " "));
  const blank = " ".repeat(size);

  const [run, setRun] = useState<Run>({ index: 0, from: blank, gen: 0 });
  const stopSound = useRef<(() => void) | null>(null);

  const word = board[run.index] ?? blank;
  const columns = [...word].map((char, position) => ({
    id: `column-${position}`,
    from: run.from[position] ?? " ",
    steps: stepsBetween(run.from[position] ?? " ", char),
  }));
  const settleMs =
    columns.reduce((max, column) => Math.max(max, column.steps), 0) * STEP_MS;

  // Keyed on the run counter, not on the duration: two flips in a row can take
  // exactly the same time, and depending on the number would skip the second.
  //
  // The clatter runs for as long as the slowest column. Anything shorter and
  // the board is still moving in silence.
  // biome-ignore lint/correctness/useExhaustiveDependencies: settleMs is read for the timer, run.gen is what identifies a run
  useEffect(() => {
    stopSound.current?.();
    stopSound.current = playLoop("flipper");
    const timer = setTimeout(() => {
      stopSound.current?.();
      stopSound.current = null;
    }, settleMs);
    return () => {
      clearTimeout(timer);
      stopSound.current?.();
      stopSound.current = null;
    };
  }, [run.gen, settleMs]);

  const advance = () =>
    setRun((previous) => ({
      index: (previous.index + 1) % board.length,
      from: board[previous.index] ?? blank,
      gen: previous.gen + 1,
    }));

  return (
    <button
      aria-label={`${word.trim().toLowerCase()}. Flip the board.`}
      className={cn("sf-board", className)}
      data-no-sound=""
      onClick={advance}
      type="button"
    >
      <span aria-hidden="true" className="sf">
        {columns.map((column) => (
          <Column
            from={column.from}
            key={`${column.id}-${run.gen}`}
            steps={column.steps}
          />
        ))}
      </span>
    </button>
  );
}
