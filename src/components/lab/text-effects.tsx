"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Scramble
 * ------------------------------------------------------------------ */

const NOISE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$*";
const FRAME_MS = 34;

/**
 * Text that resolves out of noise, left to right.
 *
 * Written against `setInterval` rather than the usual framer-motion recipe: the
 * animation is a string being rebuilt on a timer, no element ever moves, and
 * pulling a 40 KB motion library into the shared chunk to hold that timer would
 * cost more than the effect is worth.
 *
 * The label is carried by an `sr-only` copy of the real text. Announcing the
 * noise as it churns would be unusable, so the churn is `aria-hidden`.
 */
export function Scramble({
  children,
  className,
  as: Tag = "span",
  auto = false,
}: {
  children: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "p";
  /** Run once on mount instead of waiting for a pointer. */
  auto?: boolean;
}) {
  const [display, setDisplay] = useState(children);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const run = useCallback(() => {
    if (timer.current) return;
    const text = children;
    const total = Math.ceil(text.length * 1.6);
    let frame = 0;

    timer.current = setInterval(() => {
      frame += 1;
      const settled = (frame / total) * text.length;
      setDisplay(
        [...text]
          .map((char, position) => {
            if (char === " " || position < settled) return char;
            return NOISE[Math.floor(Math.random() * NOISE.length)] ?? char;
          })
          .join("")
      );
      if (frame >= total) {
        stop();
        setDisplay(text);
      }
    }, FRAME_MS);
  }, [children, stop]);

  useEffect(() => {
    if (auto) run();
    return stop;
  }, [auto, run, stop]);

  return (
    <Tag className={cn("scramble", className)} onPointerEnter={run}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
