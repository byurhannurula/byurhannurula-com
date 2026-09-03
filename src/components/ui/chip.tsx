"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ChipProps {
  /** A brand mark or icon. Decorative: the label carries the meaning. */
  icon?: ReactNode;
  /**
   * Revealed on hover and focus. The chip stays at its resting width until
   * then, so a row of them reads as a list rather than as sentences.
   */
  detail?: string;
  href?: string;
  className?: string;
  children: ReactNode;
}

/**
 * A label for a technology, tag or count.
 *
 * The detail expands with a grid `1fr` transition rather than `width: auto`,
 * which cannot be animated. Nothing around the chip reflows because the growth
 * is inline-level and the row wraps.
 */
export function Chip({
  icon,
  detail,
  href,
  className = "",
  children,
}: ChipProps) {
  const content = (
    <>
      {icon ? (
        <span aria-hidden className="flex size-3.5 shrink-0 items-center">
          {icon}
        </span>
      ) : null}
      <span className="whitespace-nowrap">{children}</span>
      {detail ? (
        <span
          className={cn(
            "grid grid-cols-[0fr] transition-[grid-template-columns] duration-200 ease-out motion-reduce:transition-none",
            "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]"
          )}
        >
          <span className="min-w-0 overflow-hidden">
            <span className="whitespace-nowrap pl-1.5 text-faint">
              {detail}
            </span>
          </span>
        </span>
      ) : null}
    </>
  );

  const classes = cn(
    "group inline-flex items-center gap-1.5 rounded-sm border border-border bg-background-soft px-2 py-[3px] font-mono text-[11px] text-muted-foreground no-underline transition-colors",
    "hover:border-primary hover:border-dashed hover:text-foreground",
    className
  );

  return href ? (
    <a className={classes} href={href}>
      {content}
    </a>
  ) : (
    <span className={classes}>{content}</span>
  );
}
