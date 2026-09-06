"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 * Terminal chip
 * ------------------------------------------------------------------ */

const TYPE_MS = 55;
const ERASE_MS = 26;
const READ_MS = 1900;

/**
 * A prompt in the sentence, typing itself.
 *
 * The other half of the Emily Campbell reference. It is set at the width of the
 * longest line from the start, so a paragraph is never re-flowed a character at
 * a time while it types, which is what makes most typewriter effects unusable
 * in running text.
 */
export function TerminalChip({ lines }: { lines: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [erasing, setErasing] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced.current) setCount(lines[0]?.length ?? 0);
  }, [lines]);

  const line = lines[index] ?? "";
  const widest = lines.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (reduced.current) return;

    if (!erasing && count < line.length) {
      const timer = setTimeout(() => setCount(count + 1), TYPE_MS);
      return () => clearTimeout(timer);
    }
    if (!erasing && count === line.length) {
      const timer = setTimeout(() => setErasing(true), READ_MS);
      return () => clearTimeout(timer);
    }
    if (erasing && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), ERASE_MS);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setErasing(false);
      setIndex((i) => (i + 1) % lines.length);
    }, 260);
    return () => clearTimeout(timer);
  }, [count, erasing, line.length, lines.length]);

  return (
    <span className="lp-term">
      <span aria-hidden="true" className="lp-term-prompt">
        &gt;_
      </span>
      <span className="lp-term-slot">
        <span aria-hidden="true" className="lp-term-sizer">
          {widest}
        </span>
        <span className="lp-term-text">
          {line.slice(0, count)}
          <span aria-hidden="true" className="lp-caret" />
        </span>
      </span>
    </span>
  );
}
