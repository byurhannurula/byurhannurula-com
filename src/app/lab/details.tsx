"use client";

/**
 * Micro-detail candidates for the mono-editorial layout. Lab-only until one is
 * picked; nothing here is imported by the real site.
 */

import { useCallback, useEffect, useRef, useState } from "react";

/** Terminal caret. Steady blink, no easing, the way a real one behaves. */
export function Caret({ label = "a developer who tinkers." }) {
  return (
    <p className="font-mono text-lg">
      <span className="text-primary">{label}</span>
      <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.15em] bg-primary motion-safe:animate-[caret_1.06s_steps(1)_infinite]" />
    </p>
  );
}

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789/\\<>[]{}=+*#$%";

/** Scrambles to the real string on hover. Settles left to right. */
export function ScrambleText({ text = "a developer who tinkers." }) {
  const [output, setOutput] = useState(text);
  const frameRef = useRef(0);
  const rafRef = useRef(0);

  const scramble = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    frameRef.current = 0;

    const tick = () => {
      const progress = frameRef.current / 2;
      setOutput(
        text
          .split("")
          .map((char, index) => {
            if (index < progress) return char;
            if (char === " ") return " ";
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      frameRef.current += 1;
      if (progress < text.length) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <button
      type="button"
      onMouseEnter={scramble}
      onFocus={scramble}
      className="cursor-default font-mono text-lg text-primary tabular-nums"
    >
      {output}
    </button>
  );
}

/** Dashed rule that fills in solid, left to right, on row hover. */
export function SweepRow({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="group relative py-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[15px]">{title}</span>
        <span className="font-mono text-[12px] text-muted-foreground">
          {meta}
        </span>
      </div>
      <span className="absolute inset-x-0 bottom-0 border-border-dash border-b border-dashed" />
      <span className="absolute inset-x-0 bottom-0 origin-left scale-x-0 border-primary border-b transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
    </div>
  );
}

/** The `//` marker becomes a real block comment on hover. */
export function CommentHeading({ title }: { title: string }) {
  return (
    <h3 className="group flex items-center gap-2.5 font-mono font-semibold text-[14px] text-muted-foreground lowercase">
      <span className="text-primary">
        <span className="group-hover:hidden">{"//"}</span>
        <span className="hidden group-hover:inline">{"/*"}</span>
      </span>
      {title}
      <span className="hidden text-primary group-hover:inline">{"*/"}</span>
    </h3>
  );
}

/** Thin scroll-progress rule, as it would sit under the nav on a note. */
export function ProgressRule() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="h-px w-full bg-border-dash">
      <div
        className="h-px bg-primary"
        style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
      />
    </div>
  );
}
