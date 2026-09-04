"use client";

import type { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * A phrase that has a number behind it.
 *
 * The dashed underline says there is more without saying what, which is the
 * point: the line stays readable at a glance and the detail is there for
 * anyone who wants it. The question mark is held at zero opacity rather than
 * inserted on hover, so nothing reflows when it appears.
 *
 * Radix rather than the CSS-only HoverNote because these sit in a list where a
 * fixed-position tooltip would clip, and because it opens on focus and closes
 * on Escape without any of it being written here.
 */
export function Annotated({
  children,
  note,
  className,
}: {
  children: ReactNode;
  note: string;
  className?: string;
}) {
  return (
    <TooltipProvider delayDuration={120}>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "group cursor-help text-left decoration-dashed underline-offset-4",
            "underline decoration-border-dash decoration-from-font",
            "hover:decoration-muted-foreground focus-visible:decoration-muted-foreground",
            className
          )}
          type="button"
        >
          {children}
          <span
            aria-hidden="true"
            className="ml-1 inline-flex size-3.5 translate-y-px items-center justify-center rounded-full border border-border-dash font-mono text-[9px] text-faint opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
          >
            ?
          </span>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-64 border-0 bg-foreground px-3 py-2 text-[12.5px] text-background leading-snug shadow-lg"
          side="top"
        >
          {note}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
