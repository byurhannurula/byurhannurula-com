'use client';

import { useRef } from 'react';

import { LINE_COLOURS } from '@/components/shared/patterns/palette';
import {
  type CanvasScene,
  cssVar,
  useCanvasLoop,
} from '@/hooks/use-canvas-loop';

/** Same grid and line as the hero's connecting dots. */
const STEP = 22;
const LINE = 2.5;
const END = 3.5;
/** Cells a line draws per second. */
const SPEED = 9;
const HOLD = 0.8;
const FADE = 0.7;
const MOST = 3;

type Cell = readonly [x: number, y: number];

interface Flow {
  path: Cell[];
  colour: string;
  age: number;
  /** True when it found the home dot. */
  home: boolean;
}

/**
 * A walk from the left towards the home dot. A lost one turns the wrong way
 * near the end and stops short; a found one goes all the way.
 */
function walk(cols: number, rows: number, home: Cell, find: boolean): Cell[] {
  const path: Cell[] = [[0, Math.floor(Math.random() * rows)]];
  const seen = new Set([`${path[0][0]},${path[0][1]}`]);
  const giveUp = 4 + Math.floor(Math.random() * 4);
  for (let guard = 0; guard < cols * rows; guard++) {
    const [x, y] = path[path.length - 1];
    const left = Math.abs(home[0] - x) + Math.abs(home[1] - y);
    if (left === 0 || (!find && left <= giveUp && Math.random() < 0.5)) break;
    const towards: [number, number][] = [];
    if (home[0] !== x) towards.push([Math.sign(home[0] - x), 0]);
    if (home[1] !== y) towards.push([0, Math.sign(home[1] - y)]);
    const astray: [number, number][] = [
      [0, 1],
      [0, -1],
      [1, 0],
    ];
    // Lost lines wander more the closer they get.
    const wander = find ? 0.12 : left < 8 ? 0.6 : 0.25;
    const order = Math.random() < wander ? [...astray, ...towards] : towards;
    const next = order
      .map(([dx, dy]) => [x + dx, y + dy] as const)
      .find(
        ([nx, ny]) =>
          nx >= 0 &&
          ny >= 0 &&
          nx < cols &&
          ny < rows &&
          !seen.has(`${nx},${ny}`),
      );
    if (!next) break;
    path.push(next);
    seen.add(`${next[0]},${next[1]}`);
  }
  return path;
}

function createScene(): CanvasScene {
  let cols = 0;
  let rows = 0;
  let width = 0;
  let height = 0;
  let home: Cell = [0, 0];
  let flows: Flow[] = [];
  let wait = 0;
  let dotColour = '';
  let accent = '';
  let pulse = 0;

  // Pointing at "Go to the home page" sends the next lines home.
  const wantsHome = () =>
    document.querySelector('[data-home-link]:is(:hover, :focus-visible)') !==
    null;

  const centre = ([x, y]: Cell) =>
    [x * STEP + STEP / 2, y * STEP + STEP / 2] as const;
  const life = (flow: Flow) => (flow.path.length - 1) / SPEED + HOLD + FADE;

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = dotColour;
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        ctx.beginPath();
        ctx.arc(...centre([x, y]), 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.lineWidth = LINE;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const flow of flows) {
      const drawn = Math.min(flow.path.length - 1, flow.age * SPEED);
      const fadeAt = life(flow) - FADE;
      ctx.globalAlpha =
        flow.age > fadeAt ? Math.max(0, 1 - (flow.age - fadeAt) / FADE) : 1;
      ctx.strokeStyle = flow.colour;
      ctx.fillStyle = flow.colour;
      ctx.beginPath();
      ctx.moveTo(...centre(flow.path[0]));
      const whole = Math.floor(drawn);
      for (let i = 1; i <= whole; i++) ctx.lineTo(...centre(flow.path[i]));
      const part = drawn - whole;
      if (part > 0 && whole + 1 < flow.path.length) {
        const [ax, ay] = centre(flow.path[whole]);
        const [bx, by] = centre(flow.path[whole + 1]);
        ctx.lineTo(ax + (bx - ax) * part, ay + (by - ay) * part);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(...centre(flow.path[0]), END, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    // The home dot, with a ring that grows when a line arrives.
    const [hx, hy] = centre(home);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(hx, hy, 6, 0, Math.PI * 2);
    ctx.fill();
    if (pulse > 0) {
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.globalAlpha = pulse;
      ctx.beginPath();
      ctx.arc(hx, hy, 6 + (1 - pulse) * 16, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  };

  const spawn = () => {
    const find = wantsHome();
    flows.push({
      path: walk(cols, rows, home, find),
      colour: LINE_COLOURS[Math.floor(Math.random() * LINE_COLOURS.length)],
      age: 0,
      home: find,
    });
  };

  return {
    setup(_ctx, w, h) {
      width = w;
      height = h;
      cols = Math.floor(w / STEP);
      rows = Math.floor(h / STEP);
      home = [cols - 2, Math.floor(rows / 2)];
      dotColour = cssVar('--line-strong');
      accent = cssVar('--accent');
      flows = [];
      wait = 0;
    },
    frame(ctx, dt) {
      for (const flow of flows) {
        const before = flow.age * SPEED;
        flow.age += dt;
        const arrived = flow.path.length - 1;
        if (flow.home && before < arrived && flow.age * SPEED >= arrived) {
          pulse = 1;
        }
      }
      pulse = Math.max(0, pulse - dt * 1.6);
      flows = flows.filter((flow) => flow.age < life(flow));
      wait -= dt;
      if (flows.length < MOST && wait <= 0) {
        spawn();
        wait = 0.5 + Math.random() * 0.9;
      }
      draw(ctx);
    },
    still(ctx) {
      flows = [];
      for (let i = 0; i < MOST; i++) spawn();
      for (const flow of flows) flow.age = (flow.path.length - 1) / SPEED;
      draw(ctx);
    },
  };
}

/**
 * Lines that set out for the home dot and lose their way. While the reader
 * points at "Go to the home page", they find it.
 */
export function LostLines() {
  const box = useRef<HTMLDivElement>(null);
  useCanvasLoop(box, createScene, 60);
  return <div ref={box} aria-hidden className="h-44 w-full max-w-[34rem]" />;
}
