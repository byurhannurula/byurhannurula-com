"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type FlickeringGridProps = {
  /** Side of each square, in CSS pixels. */
  squareSize?: number;
  /** Space between squares, in CSS pixels. */
  gridGap?: number;
  /** Chance per second that a square picks a new opacity. */
  flickerChance?: number;
  /** Any CSS color, or a custom property such as `var(--foreground)`. */
  color?: string;
  maxOpacity?: number;
  className?: string;
};

/** Split a CSS color into an `rgba(r, g, b,` prefix so per-square alpha can be appended. */
function toRgbaPrefix(color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "rgba(0, 0, 0,";

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgba(${r}, ${g}, ${b},`;
}

function resolveColor(color: string) {
  const match = color.match(/^var\((--[\w-]+)\)$/);
  if (!match) return color;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(match[1])
    .trim();
  return value || "#000000";
}

export function FlickeringGrid({
  squareSize = 2,
  gridGap = 2,
  flickerChance = 0.25,
  color = "var(--foreground)",
  maxOpacity = 0.18,
  className,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rgbaPrefix, setRgbaPrefix] = useState<string | null>(null);

  const readColor = useCallback(() => {
    setRgbaPrefix(toRgbaPrefix(resolveColor(color)));
  }, [color]);

  // next-themes swaps the theme by toggling a class on <html>, which changes the
  // resolved value of --foreground without re-rendering this component.
  useEffect(() => {
    readColor();
    const observer = new MutationObserver(readColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    return () => observer.disconnect();
  }, [readColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!(canvas && container && rgbaPrefix)) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const step = squareSize + gridGap;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cols = 0;
    let rows = 0;
    let squares = new Float32Array(0);
    let dpr = 1;
    let frame = 0;
    let lastTime = 0;
    let visible = false;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          ctx.fillStyle = `${rgbaPrefix}${squares[x * rows + y]})`;
          ctx.fillRect(
            x * step * dpr,
            y * step * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }
    };

    const setup = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!(width && height)) return;

      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      cols = Math.floor(width / step);
      rows = Math.floor(height / step);
      squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      draw();
    };

    const animate = (time: number) => {
      // First frame has no previous timestamp; a 0 delta simply skips one tick.
      const delta = lastTime ? (time - lastTime) / 1000 : 0;
      lastTime = time;

      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * delta) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
      draw();
      frame = requestAnimationFrame(animate);
    };

    const start = () => {
      if (reducedMotion || frame) return;
      lastTime = 0;
      frame = requestAnimationFrame(animate);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    setup();

    const resizeObserver = new ResizeObserver(() => {
      setup();
      if (visible) start();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [rgbaPrefix, squareSize, gridGap, flickerChance, maxOpacity]);

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)}>
      <canvas ref={canvasRef} className="pointer-events-none block" />
    </div>
  );
}
