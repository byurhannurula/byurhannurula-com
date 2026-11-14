'use client';

import { useRef } from 'react';

import {
  type CanvasScene,
  cssVar,
  useCanvasLoop,
} from '@/hooks/use-canvas-loop';

const SQUARE = 3;
const STEP = 6;
const MAX_ALPHA = 0.24;
/** Chance per second that one square picks a new strength. */
const FLICKER = 0.3;

function createScene(): CanvasScene {
  let cols = 0;
  let rows = 0;
  let alpha = new Float32Array(0);
  let colour = '';

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, cols * STEP, rows * STEP);
    ctx.fillStyle = colour;
    for (let i = 0; i < alpha.length; i++) {
      ctx.globalAlpha = alpha[i];
      ctx.fillRect(
        Math.floor(i / rows) * STEP,
        (i % rows) * STEP,
        SQUARE,
        SQUARE,
      );
    }
    ctx.globalAlpha = 1;
  };

  return {
    setup(_ctx, width, height) {
      colour = cssVar('--accent');
      cols = Math.ceil(width / STEP);
      rows = Math.ceil(height / STEP);
      alpha = new Float32Array(cols * rows);
      for (let i = 0; i < alpha.length; i++) {
        alpha[i] = Math.random() * MAX_ALPHA;
      }
    },
    frame(ctx, dt) {
      const chance = FLICKER * dt;
      for (let i = 0; i < alpha.length; i++) {
        if (Math.random() < chance) alpha[i] = Math.random() * MAX_ALPHA;
      }
      draw(ctx);
    },
    still: draw,
  };
}

/** A field of small accent squares that fade in and out at random. */
export function FlickerDots() {
  const box = useRef<HTMLDivElement>(null);
  useCanvasLoop(box, createScene, 20);
  return <div ref={box} className="absolute inset-0" />;
}
