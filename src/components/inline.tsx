import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ChipProps {
  children: ReactNode;
  tone?: "default" | "accent";
  className?: string;
}

/** Small inline pill for highlighting a word inside running text. */
export function Chip({ children, tone = "default", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-px align-[0.1em] font-mono text-[0.78em] transition-colors",
        tone === "accent"
          ? "border-primary/40 bg-primary-soft text-primary"
          : "border-border bg-background-soft text-muted-foreground hover:border-primary/50 hover:text-foreground",
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
        className="cursor-help appearance-none border-muted-foreground border-b border-dashed bg-transparent p-0 font-inherit text-inherit"
      >
        {children}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 w-56 -translate-x-1/2 translate-y-1 rounded-md border border-border bg-background-soft px-3 py-2 font-mono text-[11.5px] text-muted-foreground leading-snug opacity-0 shadow-lg transition-[opacity,transform] duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
      >
        {note}
      </span>
    </span>
  );
}
