'use client';

import { type RefObject, useEffect } from 'react';

export interface CanvasScene {
  /**
   * Start, size change, or new colours (light, accent). Read colour tokens
   * here. Sizes are CSS pixels.
   */
  setup(ctx: CanvasRenderingContext2D, width: number, height: number): void;
  /** One frame. `dt` is seconds since the last one. */
  frame(ctx: CanvasRenderingContext2D, dt: number): void;
  /** One finished picture, for readers who asked for a still page. */
  still(ctx: CanvasRenderingContext2D): void;
  /** Remove listeners the scene added. */
  dispose?(): void;
}

const isStill = () =>
  document.documentElement.dataset.motion === 'off' ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Run a canvas animation that fills `container`. It sizes for the screen's
 * pixel density, runs only while on screen and the tab is visible, at most
 * `fps` frames a second, and draws one still frame when motion is off.
 * `createScene` must be a module-level function: a new one restarts the loop.
 */
export function useCanvasLoop(
  container: RefObject<HTMLElement | null>,
  createScene: () => CanvasScene,
  fps = 30,
) {
  useEffect(() => {
    const box = container.current;
    if (!box) return;
    const el = document.createElement('canvas');
    el.style.display = 'block';
    const ctx = el.getContext('2d');
    if (!ctx) return;
    box.append(el);
    const scene = createScene();

    let frame = 0;
    let last = 0;
    // CSS can swap a still first-paint copy for the canvas (options.css).
    const live = () => {
      if (!('live' in box.dataset)) box.dataset.live = '';
    };
    let onScreen = false;
    const minStep = 1000 / fps;

    const tick = (time: number) => {
      frame = requestAnimationFrame(tick);
      if (last && time - last < minStep) return;
      // A long gap (tab came back) counts as one normal step, not a jump.
      const dt = last ? Math.min(time - last, 100) / 1000 : 0;
      last = time;
      scene.frame(ctx, dt);
      live();
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const start = () => {
      if (isStill()) {
        stop();
        scene.still(ctx);
        live();
        return;
      }
      if (frame || !onScreen || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const setup = () => {
      const width = box.clientWidth;
      const height = box.clientHeight;
      if (!(width && height)) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scene.setup(ctx, width, height);
      if (isStill()) scene.still(ctx);
    };

    setup();
    const resize = new ResizeObserver(() => {
      stop();
      setup();
      start();
    });
    resize.observe(box);
    const view = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    view.observe(el);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    // Options can change while the page is open: motion, and the colours.
    const options = new MutationObserver(() => {
      stop();
      setup();
      start();
    });
    options.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion', 'data-light'],
    });

    return () => {
      stop();
      resize.disconnect();
      view.disconnect();
      options.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      scene.dispose?.();
      el.remove();
      delete box.dataset.live;
    };
  }, [container, createScene, fps]);
}

/** The value of a CSS custom property on <html>, e.g. `cssVar('--accent')`. */
export function cssVar(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}
