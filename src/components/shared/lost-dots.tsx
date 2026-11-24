'use client';

import { useRef } from 'react';

import { trackPointer } from '@/components/shared/patterns/pointer';
import {
  type CanvasScene,
  cssVar,
  useCanvasLoop,
} from '@/hooks/use-canvas-loop';

/** Grid step of the dots that make the number, in CSS pixels. */
const STEP = 9;
const RADIUS = 3;
/** How far the pointer reaches, and how hard it pushes at its centre. */
const REACH = 80;
const PUSH = 3000;
/** Share of the mouse's own speed that drags dots along: a quick swipe
    throws them, a slow pass only parts them. */
const DRAG = 6;
const MAX_SPEED = 900;
/** Spring back home, and how fast motion dies down. A little bounce. */
const PULL = 34;
const DAMPING = 5.2;
/** Displacement in px at which a dot is fully lit and fully grown. */
const LIT = 28;

interface Dot {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  accent: boolean;
}

/** Dot positions that draw "404." in the page font, centred in the box. */
function layout(width: number, height: number): Dot[] {
  const text = '404.';
  const font = getComputedStyle(document.body).fontFamily;
  const size = Math.min(height * 0.95, width / 2.4);
  const probe = document.createElement('canvas');
  probe.width = Math.ceil(width);
  probe.height = Math.ceil(height);
  const ctx = probe.getContext('2d');
  if (!ctx) return [];
  ctx.font = `700 ${size}px ${font}`;
  ctx.textBaseline = 'middle';
  const full = ctx.measureText(text).width;
  const digits = ctx.measureText('404').width;
  const left = 0;
  ctx.fillText(text, left, height / 2);
  const pixels = ctx.getImageData(0, 0, probe.width, probe.height).data;

  const dots: Dot[] = [];
  for (let y = STEP / 2; y < height; y += STEP) {
    for (let x = STEP / 2; x < Math.min(width, full + STEP); x += STEP) {
      const alpha =
        pixels[(Math.floor(y) * probe.width + Math.floor(x)) * 4 + 3];
      if (alpha < 128) continue;
      dots.push({
        hx: x,
        hy: y,
        // They start scattered and gather into the number.
        x: x + (Math.random() - 0.5) * width * 0.6,
        y: y + (Math.random() - 0.5) * height * 1.2,
        vx: 0,
        vy: 0,
        accent: x > left + digits,
      });
    }
  }
  return dots;
}

function createScene(): CanvasScene {
  let dots: Dot[] = [];
  let ink = '';
  let accent = '';
  let width = 0;
  let height = 0;
  let canvas: HTMLCanvasElement | null = null;
  const pointer = trackPointer();
  let burst: { x: number; y: number } | null = null;
  let last: { x: number; y: number } | null = null;
  const speed = { x: 0, y: 0 };

  // A tap has no hover: it scatters the dots around the finger instead.
  const onDown = (event: PointerEvent) => {
    if (!canvas || event.pointerType === 'mouse') return;
    const box = canvas.getBoundingClientRect();
    burst = { x: event.clientX - box.left, y: event.clientY - box.top };
  };
  window.addEventListener('pointerdown', onDown, { passive: true });

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    for (const dot of dots) {
      // A moved dot grows a little and turns accent, so the trail of the
      // mouse reads as light passing through the number.
      const lit = Math.min(1, Math.hypot(dot.x - dot.hx, dot.y - dot.hy) / LIT);
      const radius = RADIUS + lit * 1.2;
      ctx.fillStyle = dot.accent ? accent : ink;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      ctx.fill();
      if (lit > 0.05 && !dot.accent) {
        ctx.fillStyle = accent;
        ctx.globalAlpha = lit;
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  };

  return {
    setup(ctx, w, h) {
      canvas = ctx.canvas;
      width = w;
      height = h;
      ink = cssVar('--ink');
      accent = cssVar('--accent');
      dots = layout(w, h);
    },
    frame(ctx, dt) {
      const local = canvas ? pointer.local(canvas) : { x: -1e4, y: -1e4 };
      const near = pointer.state.present;
      // The mouse's speed, smoothed, for the drag.
      if (near && last && dt > 0) {
        const k = Math.min(1, dt * 12);
        speed.x += ((local.x - last.x) / dt - speed.x) * k;
        speed.y += ((local.y - last.y) / dt - speed.y) * k;
      } else {
        speed.x = 0;
        speed.y = 0;
      }
      // Capped, so a flick parts the number but never tears it apart.
      const fast = Math.hypot(speed.x, speed.y);
      if (fast > MAX_SPEED) {
        speed.x *= MAX_SPEED / fast;
        speed.y *= MAX_SPEED / fast;
      }
      last = near ? local : null;
      for (const dot of dots) {
        let ax = (dot.hx - dot.x) * PULL;
        let ay = (dot.hy - dot.y) * PULL;
        for (const from of [near ? local : null, burst]) {
          if (!from) continue;
          const reach = from === burst ? REACH * 1.6 : REACH;
          const dx = dot.x - from.x;
          const dy = dot.y - from.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance >= reach) continue;
          // Smooth falloff: strong at the centre, nothing at the edge.
          const falloff = (1 - distance / reach) ** 2;
          const force = falloff * PUSH * (from === burst ? 12 : 1);
          ax += (dx / distance) * force;
          ay += (dy / distance) * force;
          if (from !== burst) {
            ax += speed.x * DRAG * falloff;
            ay += speed.y * DRAG * falloff;
          }
        }
        dot.vx = (dot.vx + ax * dt) * Math.exp(-DAMPING * dt);
        dot.vy = (dot.vy + ay * dt) * Math.exp(-DAMPING * dt);
        dot.x += dot.vx * dt;
        dot.y += dot.vy * dt;
      }
      burst = null;
      draw(ctx);
    },
    still(ctx) {
      for (const dot of dots) {
        dot.x = dot.hx;
        dot.y = dot.hy;
      }
      draw(ctx);
    },
    dispose() {
      pointer.dispose();
      window.removeEventListener('pointerdown', onDown);
    },
  };
}

/**
 * "404." drawn in dots. They gather on load, part around the mouse, light
 * up where it passes, are thrown by a quick swipe, and settle back with a
 * small bounce; a tap scatters them. The real heading stays in the page for
 * screen readers.
 */
export function LostDots() {
  const box = useRef<HTMLDivElement>(null);
  useCanvasLoop(box, createScene, 60);
  return (
    <div
      ref={box}
      aria-hidden
      className="h-[clamp(7rem,22vw,12rem)] w-full max-w-[34rem]"
    />
  );
}
