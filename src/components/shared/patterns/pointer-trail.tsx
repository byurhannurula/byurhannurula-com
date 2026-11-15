'use client';

import { useRef } from 'react';

import {
  type CanvasScene,
  cssVar,
  useCanvasLoop,
} from '@/hooks/use-canvas-loop';

import { trackPointer } from './pointer';

const STEP = 28;
const GAP = 3;
/** Seconds a square takes to fade out. */
const LIFE = 1.1;

function createScene(): CanvasScene {
  let cols = 0;
  let rows = 0;
  let width = 0;
  let height = 0;
  let heat = new Float32Array(0);
  let accent = '';
  let line = '';
  let idle = false;
  const pointer = trackPointer();

  const grid = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = line;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    for (let x = 0; x <= cols; x++) {
      ctx.moveTo(x * STEP + 0.5, 0);
      ctx.lineTo(x * STEP + 0.5, height);
    }
    for (let y = 0; y <= rows; y++) {
      ctx.moveTo(0, y * STEP + 0.5);
      ctx.lineTo(width, y * STEP + 0.5);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  };

  return {
    setup(_ctx, w, h) {
      width = w;
      height = h;
      cols = Math.ceil(w / STEP);
      rows = Math.ceil(h / STEP);
      heat = new Float32Array(cols * rows);
      accent = cssVar('--accent');
      line = cssVar('--line');
      idle = false;
    },
    frame(ctx, dt) {
      if (pointer.state.present) {
        const { x, y } = pointer.local(ctx.canvas);
        const cx = Math.floor(x / STEP);
        const cy = Math.floor(y / STEP);
        if (cx >= 0 && cy >= 0 && cx < cols && cy < rows) {
          heat[cy * cols + cx] = 1;
          idle = false;
        }
      }
      if (idle) return;
      grid(ctx);
      let any = false;
      ctx.fillStyle = accent;
      for (let i = 0; i < heat.length; i++) {
        if (heat[i] <= 0) continue;
        any = true;
        heat[i] = Math.max(0, heat[i] - dt / LIFE);
        ctx.globalAlpha = heat[i] * heat[i] * 0.55;
        const x = (i % cols) * STEP;
        const y = Math.floor(i / cols) * STEP;
        ctx.beginPath();
        ctx.roundRect(
          x + GAP,
          y + GAP,
          STEP - GAP * 2 + 1,
          STEP - GAP * 2 + 1,
          4,
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!any) idle = true;
    },
    still: grid,
    dispose: pointer.dispose,
  };
}

/** A faint grid; squares light up under the pointer and fade behind it. */
export function PointerTrail() {
  const box = useRef<HTMLDivElement>(null);
  useCanvasLoop(box, createScene, 60);
  return <div ref={box} className="absolute inset-0" />;
}
