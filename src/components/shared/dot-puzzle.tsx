'use client';

import { RotateCcw } from 'lucide-react';
import { type KeyboardEvent, type PointerEvent, useRef, useState } from 'react';

import { BOARDS, type Cell, useDotPuzzle } from '@/hooks/use-dot-puzzle';
import { cn } from '@/lib/utils';

import { LINE_COLOURS } from './patterns/palette';

const UNIT = 10;

const MOVES: Record<string, [number, number]> = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

/**
 * A small puzzle for the 404 page: join the dots of each colour. Drag with
 * a pointer, or move with the arrow keys and press Space or Enter to pick
 * up and put down a line.
 */
export function DotPuzzle() {
  const puzzle = useDotPuzzle();
  const { board, paths } = puzzle;
  const { size } = board;
  const svg = useRef<SVGSVGElement>(null);
  const lastCell = useRef<Cell | null>(null);
  const [cursor, setCursor] = useState<Cell>(0);
  const colour = (letter: string) =>
    LINE_COLOURS[board.letters.indexOf(letter) % LINE_COLOURS.length];
  const centre = (cell: Cell) =>
    [
      (cell % size) * UNIT + UNIT / 2,
      Math.floor(cell / size) * UNIT + UNIT / 2,
    ] as const;

  const cellAt = (event: PointerEvent) => {
    const box = svg.current?.getBoundingClientRect();
    if (!box) return null;
    const x = Math.floor(((event.clientX - box.left) / box.width) * size);
    const y = Math.floor(((event.clientY - box.top) / box.height) * size);
    if (x < 0 || y < 0 || x >= size || y >= size) return null;
    return y * size + x;
  };

  const onDown = (event: PointerEvent<SVGSVGElement>) => {
    const cell = cellAt(event);
    if (cell === null) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    lastCell.current = cell;
    setCursor(cell);
    puzzle.start(cell);
  };

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!puzzle.active) return;
    const cell = cellAt(event);
    let from: Cell | null = lastCell.current;
    if (cell === null || from === null || cell === from) return;
    // A fast drag skips cells: walk to the new cell one step at a time.
    while (from !== cell) {
      const dx: number = (cell % size) - (from % size);
      const dy: number = Math.floor(cell / size) - Math.floor(from / size);
      from = dx !== 0 ? from + Math.sign(dx) : from + Math.sign(dy) * size;
      puzzle.extend(from);
    }
    lastCell.current = cell;
    setCursor(cell);
  };

  const onKey = (event: KeyboardEvent) => {
    const move = MOVES[event.key];
    if (move) {
      event.preventDefault();
      const x = Math.min(size - 1, Math.max(0, (cursor % size) + move[0]));
      const y = Math.min(
        size - 1,
        Math.max(0, Math.floor(cursor / size) + move[1]),
      );
      const next = y * size + x;
      setCursor(next);
      if (puzzle.active) puzzle.extend(next);
      return;
    }
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (puzzle.active) puzzle.stop();
      else puzzle.start(cursor);
    }
  };

  const stat = 'font-mono text-xs text-faint';

  return (
    <div className="w-full max-w-[22rem]">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className={stat}>
          board {puzzle.level + 1} / {BOARDS.length}
        </p>
        <p className={stat}>
          joined{' '}
          <span className="text-ink">
            {puzzle.done} / {board.letters.length}
          </span>{' '}
          · moves <span className="text-ink">{puzzle.moves}</span> · filled{' '}
          <span className="text-ink">{Math.round(puzzle.fill * 100)}%</span>
        </p>
      </div>

      {/* A custom widget: the board takes focus and handles its own keys
          (see onKey), which the rule cannot see on an `application`. */}
      {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <svg
        ref={svg}
        viewBox={`0 0 ${size * UNIT} ${size * UNIT}`}
        role="application"
        aria-label={`Dot puzzle, ${size} by ${size}. Join the dots of each colour. Arrow keys move, Space picks up and puts down a line.`}
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={puzzle.stop}
        onPointerCancel={puzzle.stop}
        onKeyDown={onKey}
        onBlur={puzzle.stop}
        className="peer block aspect-square w-full touch-none rounded-xl border border-line bg-card outline-none select-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {Array.from({ length: size - 1 }, (_, i) => (
          <g key={i} className="stroke-line" strokeWidth={0.25}>
            <line
              x1={(i + 1) * UNIT}
              y1={0}
              x2={(i + 1) * UNIT}
              y2={size * UNIT}
            />
            <line
              x1={0}
              y1={(i + 1) * UNIT}
              x2={size * UNIT}
              y2={(i + 1) * UNIT}
            />
          </g>
        ))}

        {Object.entries(paths).map(([letter, path]) => (
          <g key={letter} fill={colour(letter)}>
            {path.map((cell) => (
              <rect
                key={cell}
                x={(cell % size) * UNIT}
                y={Math.floor(cell / size) * UNIT}
                width={UNIT}
                height={UNIT}
                opacity={0.14}
              />
            ))}
            {path.length > 1 ? (
              <polyline
                points={path.map((cell) => centre(cell).join(',')).join(' ')}
                fill="none"
                stroke={colour(letter)}
                strokeWidth={3.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null}
          </g>
        ))}

        {[...board.ends].map(([cell, letter]) => (
          <circle
            key={cell}
            cx={centre(cell)[0]}
            cy={centre(cell)[1]}
            r={3.1}
            fill={colour(letter)}
          />
        ))}

        <rect
          x={(cursor % size) * UNIT + 0.6}
          y={Math.floor(cursor / size) * UNIT + 0.6}
          width={UNIT - 1.2}
          height={UNIT - 1.2}
          rx={1.6}
          fill="none"
          strokeWidth={0.5}
          className="hidden stroke-ink [svg:focus-visible_&]:block"
        />
      </svg>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-soft">
          {puzzle.solved
            ? `Solved in ${puzzle.moves} moves.`
            : 'Join the dots of each colour.'}
        </p>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={puzzle.reset}
            aria-label="Start this board again"
            className="grid size-9 place-items-center rounded-full border border-line-strong text-soft hover:text-ink [&_svg]:size-4"
          >
            <RotateCcw aria-hidden />
          </button>
          <button
            type="button"
            onClick={puzzle.next}
            className={cn(
              'h-9 rounded-full border px-3.5 text-sm font-medium',
              puzzle.solved
                ? 'border-accent bg-accent text-bg'
                : 'border-line-strong text-soft hover:text-ink',
            )}
          >
            Next board
          </button>
        </div>
      </div>
    </div>
  );
}
