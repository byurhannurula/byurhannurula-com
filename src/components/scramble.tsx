"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

const NOISE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$*";
const FRAME_MS = 34;

/**
 * Texts that have finished playing. Module scope outlives a client-side
 * navigation but not a reload, so going back to a page does not replay it and
 * a fresh visit does. Marked on completion, not on start: an effect that is
 * torn down mid-run (Strict Mode does this on purpose) has not played.
 */
const played = new Set<string>();

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
 *
 * Under reduced motion the text never churns: noise standing in for a word is
 * the whole effect, and there is no gentler version of it to fall back to.
 */
export function Scramble({
  children,
  className,
  as: Tag = "span",
  auto = false,
  replayOnHover = true,
}: {
  children: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "p";
  /** Run once when the page first loads, instead of waiting for a pointer. */
  auto?: boolean;
  /** Run again whenever the pointer arrives. */
  replayOnHover?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(children);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const run = useCallback(() => {
    if (timer.current || reduced) return;
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
        played.add(text);
      }
    }, FRAME_MS);
  }, [children, reduced, stop]);

  useEffect(() => {
    if (auto && !played.has(children)) run();
    return stop;
  }, [auto, children, run, stop]);

  return (
    <Tag
      className={cn("scramble", className)}
      onPointerEnter={replayOnHover ? run : undefined}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
