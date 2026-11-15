'use client';

import { useRef } from 'react';

import {
  type CanvasScene,
  cssVar,
  useCanvasLoop,
} from '@/hooks/use-canvas-loop';

import { fbm3 } from './noise';
import { trackPointer } from './pointer';

const CW = 11;
const CH = 18;
/** Light to dense. The first one is a space: empty ground. */
const RAMP = ' .·:-=+*#%';
const REACH = 150;

function createScene(): CanvasScene {
  let width = 0;
  let height = 0;
  let time = 0;
  let ink = '';
  let accent = '';
  let font = '';
  const pointer = trackPointer();

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    ctx.font = font;
    ctx.textBaseline = 'top';
    const { x: px, y: py } = pointer.state.present
      ? pointer.local(ctx.canvas)
      : { x: -1e4, y: -1e4 };
    for (let y = 0; y < height; y += CH) {
      // The layer's mask fades the bottom already; this only helps it.
      const fall = 1 - (y / height) * 0.4;
      for (let x = 0; x < width; x += CW) {
        const d = Math.hypot(x - px, y - py);
        const near = d < REACH ? 1 - d / REACH : 0;
        const n = fbm3(x * 0.012, y * 0.02, time) * fall + near * 0.45;
        const index = Math.min(
          RAMP.length - 1,
          Math.floor(Math.max(0, n - 0.3) * RAMP.length * 2.2),
        );
        if (index === 0) continue;
        ctx.fillStyle = near > 0.15 ? accent : ink;
        ctx.globalAlpha = near > 0.15 ? 0.35 + near * 0.5 : 0.22 + fall * 0.22;
        ctx.fillText(RAMP[index], x, y);
      }
    }
    ctx.globalAlpha = 1;
  };

  return {
    setup(_ctx, w, h) {
      width = w;
      height = h;
      ink = cssVar('--soft');
      accent = cssVar('--accent');
      const family = getComputedStyle(document.body)
        .getPropertyValue('--font-mono')
        .trim();
      font = `13px ${family || 'ui-monospace, monospace'}`;
    },
    frame(ctx, dt) {
      time += dt * 0.12;
      draw(ctx);
    },
    still: draw,
    dispose: pointer.dispose,
  };
}

/** A field of text characters, drawn from noise; the pointer lights it up. */
export function AsciiField() {
  const box = useRef<HTMLDivElement>(null);
  useCanvasLoop(box, createScene, 20);
  return <div ref={box} className="absolute inset-0" />;
}
