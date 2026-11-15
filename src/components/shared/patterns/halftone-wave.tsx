'use client';

import { useRef } from 'react';

import {
  type CanvasScene,
  cssVar,
  useCanvasLoop,
} from '@/hooks/use-canvas-loop';

import { trackPointer } from './pointer';

const STEP = 16;
const MAX_R = 3.4;
/** How far the pointer swells the dots, in CSS pixels. */
const REACH = 180;

function createScene(): CanvasScene {
  let width = 0;
  let height = 0;
  let time = 0;
  let accent = '';
  const pointer = trackPointer();
  const lens = { x: -1e4, y: -1e4, strength: 0 };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = accent;
    for (let y = STEP / 2; y < height; y += STEP) {
      // The layer's mask fades the bottom already; this only helps it.
      const fall = 1 - (y / height) * 0.5;
      for (let x = STEP / 2; x < width; x += STEP) {
        // Three slow waves that cross: an interference pattern, not a ripple.
        const wave =
          (Math.sin(x * 0.011 + time) +
            Math.sin(y * 0.017 - time * 0.7) +
            Math.sin((x + y) * 0.0065 + time * 0.45)) /
            6 +
          0.5;
        const d = Math.hypot(x - lens.x, y - lens.y);
        const near = d < REACH ? (1 - d / REACH) ** 2 * lens.strength : 0;
        const r = MAX_R * Math.min(1, wave ** 1.6 * fall + near * 0.9);
        if (r < 0.35) continue;
        ctx.globalAlpha = 0.3 + 0.25 * fall + near * 0.4;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  };

  return {
    setup(_ctx, w, h) {
      width = w;
      height = h;
      accent = cssVar('--accent');
    },
    frame(ctx, dt) {
      time += dt * 0.6;
      const target = pointer.local(ctx.canvas);
      const ease = Math.min(1, dt * 8);
      lens.x += (target.x - lens.x) * ease;
      lens.y += (target.y - lens.y) * ease;
      lens.strength += ((pointer.state.present ? 1 : 0) - lens.strength) * ease;
      draw(ctx);
    },
    still: draw,
    dispose: pointer.dispose,
  };
}

/** A halftone print in the accent, its dots swelling with slow waves. */
export function HalftoneWave() {
  const box = useRef<HTMLDivElement>(null);
  useCanvasLoop(box, createScene, 30);
  return <div ref={box} className="absolute inset-0" />;
}
