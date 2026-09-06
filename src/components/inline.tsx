import type { ComponentType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ChipProps {
  children: ReactNode;
  tone?: "default" | "accent";
  className?: string;
}

/**
 * Small inline pill for highlighting a word inside running text.
 *
 * The accent tone carries no border. A green ring around a word in the middle
 * of a paragraph read as a focused control rather than as emphasis, and the
 * border plus its padding made the box tall enough to crowd the line above.
 */
export function Chip({ children, tone = "default", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 align-[0.08em] font-mono text-[0.78em] leading-[1.5] transition-colors",
        tone === "accent"
          ? "bg-primary-soft text-primary"
          : "border border-border bg-background-soft text-muted-foreground hover:border-primary/50 hover:text-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

interface HoverNoteProps {
  children: ReactNode;
  note: string;
}

/** Dashed-underlined phrase with a CSS-only tooltip; also opens on focus. */
export function HoverNote({ children, note }: HoverNoteProps) {
  return (
    <span className="group relative inline-block">
      <button
        type="button"
        data-sound=""
        className="cursor-help appearance-none border-muted-foreground border-b border-dashed bg-transparent p-0 font-inherit text-inherit"
      >
        {children}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 w-56 -translate-x-1/2 translate-y-1 rounded-md border border-border bg-background-soft px-3 py-2 font-mono text-[11.5px] text-muted-foreground leading-snug opacity-0 shadow-lg transition-[opacity,translate] duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
      >
        {note}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Inline brand mark
 * ------------------------------------------------------------------ */

interface BrandProps {
  children: ReactNode;
  href?: string;
  /** A local SVG component, as returned by getStackItem(). */
  logo?: ComponentType<{ className?: string }>;
  /** Fallback tile when there is no mark: one letter on a brand colour. */
  letter?: string;
  tint?: string;
  className?: string;
}

/**
 * A 1em brand mark in front of a word, the Pedro Marques move.
 *
 * Grey at rest and colour on hover, which is the same rule the /uses shelf
 * already follows, so a page full of marks stays quiet until it is read.
 */
export function Brand({
  children,
  href,
  logo: Logo,
  letter,
  tint,
  className,
}: BrandProps) {
  const mark = Logo ? (
    <Logo className="size-full" />
  ) : (
    <span
      className="flex size-full items-center justify-center font-mono font-semibold text-[0.62em] text-white"
      style={{ background: tint ?? "var(--primary)" }}
    >
      {letter ?? String(children).charAt(0)}
    </span>
  );

  const body = (
    <>
      <span
        aria-hidden="true"
        className="mr-1 inline-flex size-[1.05em] shrink-0 translate-y-[0.16em] overflow-hidden rounded-[3px] opacity-90 grayscale transition-[filter,opacity,scale] duration-200 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none"
      >
        {mark}
      </span>
      {children}
    </>
  );

  if (!href) {
    return <span className={cn("group", className)}>{body}</span>;
  }

  return (
    <a
      className={cn("group link-inline", className)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {body}
    </a>
  );
}
