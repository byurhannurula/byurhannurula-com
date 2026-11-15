'use client';

import { useRef } from 'react';

import {
  type CanvasScene,
  cssVar,
  useCanvasLoop,
} from '@/hooks/use-canvas-loop';

import { fbm3 } from './noise';

const CELL = 12;
const LEVELS = 9;
const SCALE = 0.0042;
/** Noise units per second: the map drifts, it does not boil. */
const SPEED = 0.035;

// Marching squares: for each corner pattern, the cell edges a line joins.
// Edges: 0 top, 1 right, 2 bottom, 3 left.
const SEGMENTS: number[][] = [
  [],
  [3, 2],
  [2, 1],
  [3, 1],
  [0, 1],
  [3, 0, 2, 1],
  [0, 2],
  [3, 0],
  [3, 0],
  [0, 2],
  [0, 1, 3, 2],
  [0, 1],
  [3, 1],
  [2, 1],
  [3, 2],
  [],
];

function createScene(): CanvasScene {
  let cols = 0;
  let rows = 0;
  let width = 0;
  let height = 0;
  let field = new Float32Array(0);
  let time = 0;
  let line = '';
  let accent = '';

  const sample = () => {
    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        field[y * (cols + 1) + x] = fbm3(
          x * CELL * SCALE,
          y * CELL * SCALE,
          time,
        );
      }
    }
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    sample();
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    for (let level = 0; level < LEVELS; level++) {
      const t = 0.22 + (level / (LEVELS - 1)) * 0.56;
      const major = level % 4 === 2;
      ctx.strokeStyle = major ? accent : line;
      ctx.globalAlpha = major ? 0.55 : 0.9;
      ctx.beginPath();
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * (cols + 1) + x;
          const a = field[i];
          const b = field[i + 1];
          const c = field[i + cols + 2];
          const d = field[i + cols + 1];
          const shape =
            (a > t ? 8 : 0) |
            (b > t ? 4 : 0) |
            (c > t ? 2 : 0) |
            (d > t ? 1 : 0);
          const segs = SEGMENTS[shape];
          if (segs.length === 0) continue;
          const px = x * CELL;
          const py = y * CELL;
          const point = (edge: number): [number, number] => {
            if (edge === 0) return [px + ((t - a) / (b - a)) * CELL, py];
            if (edge === 1) return [px + CELL, py + ((t - b) / (c - b)) * CELL];
            if (edge === 2) return [px + ((t - d) / (c - d)) * CELL, py + CELL];
            return [px, py + ((t - a) / (d - a)) * CELL];
          };
          for (let s = 0; s < segs.length; s += 2) {
            const [x1, y1] = point(segs[s]);
            const [x2, y2] = point(segs[s + 1]);
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
        }
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  return {
    setup(_ctx, w, h) {
      width = w;
      height = h;
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      field = new Float32Array((cols + 1) * (rows + 1));
      line = cssVar('--line-strong');
      accent = cssVar('--accent');
    },
    frame(ctx, dt) {
      time += dt * SPEED;
      draw(ctx);
    },
    still: draw,
  };
}

/** A topographic map that drifts slowly. One line in four takes the accent. */
export function ContourLines() {
  const box = useRef<HTMLDivElement>(null);
  useCanvasLoop(box, createScene, 15);
  return <div ref={box} className="absolute inset-0" />;
}
