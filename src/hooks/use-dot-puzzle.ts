'use client';

import { useCallback, useMemo, useState } from 'react';

/** A cell as `y * size + x`. */
export type Cell = number;

/**
 * Boards: a letter is one end of a line, a dot is an empty cell. Every
 * board has a solution that fills all cells (drawn by hand, see git history).
 */
export const BOARDS = [
  ['A..BC', '.BD..', '..E..', 'AEFD.', 'GG.FC'],
  ['A..B.', '.CAD.', '..E..', '..FD.', 'CE.FB'],
  ['A...B.', 'C.D.E.', '..FA..', '.D.F..', '.G.GEB', '.CH..H'],
] as const;

export interface Board {
  size: number;
  /** Letter at each end cell. */
  ends: Map<Cell, string>;
  letters: string[];
}

function parse(rows: readonly string[]): Board {
  const ends = new Map<Cell, string>();
  rows.forEach((row, y) => {
    [...row].forEach((char, x) => {
      if (char !== '.') ends.set(y * rows.length + x, char);
    });
  });
  return { size: rows.length, ends, letters: [...new Set(ends.values())] };
}

const touching = (a: Cell, b: Cell, size: number) => {
  const ax = a % size;
  const bx = b % size;
  const ay = Math.floor(a / size);
  const by = Math.floor(b / size);
  return Math.abs(ax - bx) + Math.abs(ay - by) === 1;
};

/**
 * Rules of the dot puzzle: join the two ends of each letter with a line
 * through free cells. Drawing over another line cuts it. Lines cannot pass
 * an end of another letter.
 */
export function useDotPuzzle() {
  const [level, setLevel] = useState(0);
  const board = useMemo(() => parse(BOARDS[level]), [level]);
  const [paths, setPaths] = useState<Record<string, Cell[]>>({});
  const [active, setActive] = useState<string | null>(null);
  const [moves, setMoves] = useState(0);

  const owner = useCallback(
    (cell: Cell) =>
      Object.entries(paths).find(([, path]) => path.includes(cell))?.[0],
    [paths],
  );

  const isDone = useCallback(
    (letter: string, path: Cell[] | undefined) => {
      if (!path || path.length < 2) return false;
      const first = board.ends.get(path[0]);
      const last = board.ends.get(path[path.length - 1]);
      return first === letter && last === letter && path[0] !== path.at(-1);
    },
    [board],
  );

  /** Start a line at an end, or pick up a line at one of its cells. */
  const start = useCallback(
    (cell: Cell) => {
      const end = board.ends.get(cell);
      if (end) {
        setPaths((all) => ({ ...all, [end]: [cell] }));
        setActive(end);
        setMoves((n) => n + 1);
        return;
      }
      const letter = owner(cell);
      if (!letter) return;
      setPaths((all) => ({
        ...all,
        [letter]: all[letter].slice(0, all[letter].indexOf(cell) + 1),
      }));
      setActive(letter);
      setMoves((n) => n + 1);
    },
    [board, owner],
  );

  /** Extend the active line to `cell`, if the rules allow it. */
  const extend = useCallback(
    (cell: Cell) => {
      if (!active) return;
      setPaths((all) => {
        const path = all[active] ?? [];
        const last = path.at(-1);
        if (last === undefined || cell === last) return all;
        if (!touching(last, cell, board.size)) return all;
        // Back over its own line: shorten it.
        const own = path.indexOf(cell);
        if (own !== -1) return { ...all, [active]: path.slice(0, own + 1) };
        // A finished line goes no further.
        if (isDone(active, path)) return all;
        const end = board.ends.get(cell);
        if (end && end !== active) return all;
        const next: Record<string, Cell[]> = {
          ...all,
          [active]: [...path, cell],
        };
        // Through another line: that line is cut where it was crossed.
        for (const [letter, other] of Object.entries(all)) {
          if (letter === active) continue;
          const at = other.indexOf(cell);
          if (at !== -1) next[letter] = other.slice(0, at);
        }
        return next;
      });
    },
    [active, board, isDone],
  );

  const stop = useCallback(() => setActive(null), []);

  const done = board.letters.filter((letter) =>
    isDone(letter, paths[letter]),
  ).length;
  const filled = new Set(Object.values(paths).flat()).size;
  const solved = done === board.letters.length;

  const go = useCallback((next: number) => {
    setLevel((next + BOARDS.length) % BOARDS.length);
    setPaths({});
    setActive(null);
    setMoves(0);
  }, []);

  return {
    board,
    level,
    paths,
    active,
    moves,
    done,
    solved,
    fill: filled / (board.size * board.size),
    start,
    extend,
    stop,
    reset: () => go(level),
    next: () => go(level + 1),
  };
}
