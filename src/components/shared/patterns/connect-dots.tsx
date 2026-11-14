'use client';

import { useRef } from 'react';

import {
  type CanvasScene,
  cssVar,
  useCanvasLoop,
} from '@/hooks/use-canvas-loop';

import { LINE_COLOURS } from './palette';

/** Same spacing as the `dots` background, so the two read as one family. */
const STEP = 22;
const DOT = 1;
const LINE = 2.5;
const END = 3.5;
/** Cells a line draws per second. */
const SPEED = 7;
const HOLD = 2.2;
const FADE = 0.9;
const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;

type Cell = readonly [x: number, y: number];

interface Flow {
  path: Cell[];
  colour: string;
  /** Seconds since it started. */
  age: number;
}

const pick = <T,>(items: readonly T[]) =>
  items[Math.floor(Math.random() * items.length)];

/**
 * A walk on the grid that turns now and then and never crosses itself or
 * another live line, like two dots joined by a pipe.
 */
function walk(cols: number, rows: number, taken: Set<number>): Cell[] | null {
  const key = (x: number, y: number) => y * cols + x;
  const start: Cell = [
    Math.floor(Math.random() * cols),
    Math.floor(Math.random() * rows),
  ];
  if (taken.has(key(...start))) return null;
  const length = 3 + Math.floor(Math.random() * 8);
  const path: Cell[] = [start];
  const seen = new Set([key(...start)]);
  let dir = pick(DIRS);
  while (path.length < length) {
    const [x, y] = path[path.length - 1];
    const turn = Math.random() < 0.35;
    const options = (
      turn ? DIRS.toSorted(() => Math.random() - 0.5) : [dir, ...DIRS]
    )
      .map(([dx, dy]) => [x + dx, y + dy, dx, dy] as const)
      .filter(
        ([nx, ny]) =>
          nx >= 0 &&
          ny >= 0 &&
          nx < cols &&
          ny < rows &&
          !seen.has(key(nx, ny)) &&
          !taken.has(key(nx, ny)),
      );
    if (options.length === 0) break;
    const [nx, ny, dx, dy] = options[0];
    dir = DIRS.find(([a, b]) => a === dx && b === dy) ?? dir;
    path.push([nx, ny]);
    seen.add(key(nx, ny));
  }
  if (path.length < 3) return null;
  for (const k of seen) taken.add(k);
  return path;
}

function createScene(): CanvasScene {
  let strength = 0.55;
  let cols = 0;
  let rows = 0;
  let width = 0;
  let height = 0;
  let most = 3;
  let dots: HTMLCanvasElement | null = null;
  let flows: Flow[] = [];
  let wait = 0;

  const centre = ([x, y]: Cell) =>
    [x * STEP + STEP / 2, y * STEP + STEP / 2] as const;

  const life = (flow: Flow) => (flow.path.length - 1) / SPEED + HOLD + FADE;

  const taken = () => {
    const cells = new Set<number>();
    for (const flow of flows) {
      for (const [x, y] of flow.path) cells.add(y * cols + x);
    }
    return cells;
  };

  const spawn = () => {
    const used = taken();
    for (let tries = 0; tries < 12; tries++) {
      const path = walk(cols, rows, used);
      if (path) {
        flows.push({ path, colour: pick(LINE_COLOURS), age: 0 });
        return;
      }
    }
  };

  const drawFlow = (ctx: CanvasRenderingContext2D, flow: Flow) => {
    const drawn = Math.min(flow.path.length - 1, flow.age * SPEED);
    const fadeAt = life(flow) - FADE;
    const fade = flow.age > fadeAt ? 1 - (flow.age - fadeAt) / FADE : 1;
    ctx.globalAlpha = Math.max(0, fade) * strength;
    ctx.strokeStyle = flow.colour;
    ctx.fillStyle = flow.colour;

    ctx.beginPath();
    const [sx, sy] = centre(flow.path[0]);
    ctx.moveTo(sx, sy);
    const whole = Math.floor(drawn);
    for (let i = 1; i <= whole; i++) ctx.lineTo(...centre(flow.path[i]));
    const part = drawn - whole;
    if (part > 0 && whole + 1 < flow.path.length) {
      const [ax, ay] = centre(flow.path[whole]);
      const [bx, by] = centre(flow.path[whole + 1]);
      ctx.lineTo(ax + (bx - ax) * part, ay + (by - ay) * part);
    }
    ctx.stroke();

    const ends =
      drawn >= flow.path.length - 1
        ? [flow.path[0], flow.path[flow.path.length - 1]]
        : [flow.path[0]];
    for (const cell of ends) {
      ctx.beginPath();
      ctx.arc(...centre(cell), END, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    if (dots) ctx.drawImage(dots, 0, 0, width, height);
    ctx.lineWidth = LINE;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const flow of flows) drawFlow(ctx, flow);
    ctx.globalAlpha = 1;
  };

  return {
    setup(ctx, w, h) {
      // Quieter on a light page, where saturated colour shouts.
      strength =
        document.documentElement.dataset.theme === 'dark' ? 0.75 : 0.55;
      width = w;
      height = h;
      cols = Math.floor(w / STEP);
      rows = Math.floor(h / STEP);
      // About one line per 40 000 square pixels: a few on a phone, more on
      // a wide screen, never a crowd.
      most = Math.max(2, Math.min(9, Math.round((w * h) / 40_000)));
      flows = [];
      wait = 0;
      // The dot grid never changes: paint it once, copy it each frame.
      const scale = ctx.getTransform().a;
      dots = document.createElement('canvas');
      dots.width = Math.round(w * scale);
      dots.height = Math.round(h * scale);
      const dctx = dots.getContext('2d');
      if (dctx) {
        dctx.scale(scale, scale);
        dctx.fillStyle = cssVar('--line-strong');
        for (let x = 0; x < cols; x++) {
          for (let y = 0; y < rows; y++) {
            dctx.beginPath();
            dctx.arc(...centre([x, y]), DOT, 0, Math.PI * 2);
            dctx.fill();
          }
        }
      }
    },
    frame(ctx, dt) {
      for (const flow of flows) flow.age += dt;
      flows = flows.filter((flow) => flow.age < life(flow));
      wait -= dt;
      if (flows.length < most && wait <= 0) {
        spawn();
        // Staggered starts, so lines never appear in step.
        wait = 0.3 + Math.random() * 1.2;
      }
      draw(ctx);
    },
    still(ctx) {
      flows = [];
      for (let i = 0; i < most; i++) spawn();
      // Fully drawn, before any fade.
      for (const flow of flows) flow.age = (flow.path.length - 1) / SPEED;
      draw(ctx);
    },
  };
}

/**
 * A grid of faint dots where coloured lines join two dots at random places,
 * stay a moment, and fade. Several run at once, spread over the area.
 */
export function ConnectDots() {
  const box = useRef<HTMLDivElement>(null);
  useCanvasLoop(box, createScene, 60);
  return <div ref={box} className="absolute inset-0" />;
}
