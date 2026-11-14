'use client';

import { useRef } from 'react';

import {
  type CanvasScene,
  cssVar,
  useCanvasLoop,
} from '@/hooks/use-canvas-loop';

/** Same spacing as the `dots` background. */
const STEP = 22;
const DOT = 1;
/** Extra radius of a dot right under the pointer. */
const GROW = 2.2;
/** How far from the pointer dots react, in CSS pixels. */
const REACH = 130;
/** How fast the glow follows the pointer: higher is tighter. */
const FOLLOW = 9;

function createScene(): CanvasScene {
  let width = 0;
  let height = 0;
  let accent = '';
  let dots: HTMLCanvasElement | null = null;
  // Pointer in page pixels; the glow eases after it.
  const target = { x: -1e4, y: -1e4 };
  const glow = { x: -1e4, y: -1e4, strength: 0 };
  let present = false;
  let idle = false;

  const onMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    target.x = event.clientX;
    target.y = event.clientY;
    present = true;
    idle = false;
  };
  const onLeave = () => {
    present = false;
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);

  const centre = (i: number) => i * STEP + STEP / 2;

  const drawBase = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    if (dots) ctx.drawImage(dots, 0, 0, width, height);
  };

  return {
    setup(ctx, w, h) {
      width = w;
      height = h;
      accent = cssVar('--accent');
      idle = false;
      const scale = ctx.getTransform().a;
      dots = document.createElement('canvas');
      dots.width = Math.round(w * scale);
      dots.height = Math.round(h * scale);
      const dctx = dots.getContext('2d');
      if (!dctx) return;
      dctx.scale(scale, scale);
      dctx.fillStyle = cssVar('--line-strong');
      for (let x = 0; x * STEP < w; x++) {
        for (let y = 0; y * STEP < h; y++) {
          dctx.beginPath();
          dctx.arc(centre(x), centre(y), DOT, 0, Math.PI * 2);
          dctx.fill();
        }
      }
    },
    frame(ctx, dt) {
      const ease = Math.min(1, dt * FOLLOW);
      const box = ctx.canvas.getBoundingClientRect();
      const tx = target.x - box.left;
      const ty = target.y - box.top;
      glow.x += (tx - glow.x) * ease;
      glow.y += (ty - glow.y) * ease;
      glow.strength += ((present ? 1 : 0) - glow.strength) * ease;
      // Nothing moves and nothing glows: keep the last frame.
      if (glow.strength < 0.01) {
        if (!idle) drawBase(ctx);
        idle = true;
        return;
      }
      drawBase(ctx);
      ctx.fillStyle = accent;
      const fromX = Math.max(0, Math.floor((glow.x - REACH) / STEP));
      const toX = Math.ceil((glow.x + REACH) / STEP);
      const fromY = Math.max(0, Math.floor((glow.y - REACH) / STEP));
      const toY = Math.ceil((glow.y + REACH) / STEP);
      for (let x = fromX; x <= toX; x++) {
        for (let y = fromY; y <= toY; y++) {
          const d = Math.hypot(centre(x) - glow.x, centre(y) - glow.y);
          if (d >= REACH) continue;
          const near = (1 - d / REACH) ** 2 * glow.strength;
          ctx.globalAlpha = near;
          ctx.beginPath();
          ctx.arc(centre(x), centre(y), DOT + GROW * near, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    },
    still: drawBase,
    dispose() {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    },
  };
}

/** The `dots` grid, but the dots near the pointer grow and take the accent. */
export function CursorDots() {
  const box = useRef<HTMLDivElement>(null);
  useCanvasLoop(box, createScene, 60);
  return <div ref={box} className="absolute inset-0" />;
}
