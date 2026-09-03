import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  /** Mono, sits above the body. Omit for a card that is only a body. */
  title?: ReactNode;
  /** Right-aligned on the title row: a count, a status, a year. */
  meta?: ReactNode;
  /**
   * Marks the card without filling it. Depth here comes from border style,
   * never from a shadow, so emphasis is a dashed accent edge instead.
   */
  featured?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * A filled panel: an object on the page rather than a division of it, so it
 * takes a solid border over `background-soft`.
 *
 * Used for service and project grids, and for anything in prose that needs to
 * sit apart from the column without becoming a callout.
 */
export function Card({
  title,
  meta,
  featured,
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-md border bg-background-soft p-3.5",
        featured ? "border-primary border-dashed" : "border-border",
        className
      )}
    >
      {(title || meta) && (
        <div className="flex items-baseline justify-between gap-3">
          {title ? (
            <span className="font-mono text-[12.5px] text-foreground">
              {title}
            </span>
          ) : null}
          {meta ? (
            <span className="shrink-0 font-mono text-[11px] text-faint">
              {meta}
            </span>
          ) : null}
        </div>
      )}
      <div className="text-[13px] text-muted-foreground leading-[1.55]">
        {children}
      </div>
    </div>
  );
}

/**
 * Auto-filling grid for cards. `minmax(200px, 1fr)` rather than a fixed column
 * count, so a row reflows instead of leaving a stranded last card.
 */
export function CardGrid({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3",
        className
      )}
    >
      {children}
    </div>
  );
}
