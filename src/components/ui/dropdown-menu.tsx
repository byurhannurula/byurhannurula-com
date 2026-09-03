"use client";

import * as Primitive from "@radix-ui/react-dropdown-menu";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Menu anchored to a trigger, on `surface-raised` so it reads as detached from
 * a page it can scroll over.
 *
 * Radix carries focus trapping, roving focus, typeahead, Escape and outside
 * click; only the styling lives here.
 */
export const DropdownMenu = Primitive.Root;
export const DropdownMenuTrigger = Primitive.Trigger;
export const DropdownMenuGroup = Primitive.Group;

export function DropdownMenuContent({
  className,
  sideOffset = 6,
  collisionPadding = 12,
  ...props
}: ComponentPropsWithoutRef<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        className={cn(
          "z-50 min-w-[176px] rounded-md border border-border bg-surface-raised p-1 shadow-lg",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=open]:animate-in",
          className
        )}
        collisionPadding={collisionPadding}
        sideOffset={sideOffset}
        {...props}
      />
    </Primitive.Portal>
  );
}

export function DropdownMenuLabel({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Primitive.Label>) {
  return (
    <Primitive.Label
      className={cn(
        "px-2 py-1.5 font-mono text-[11px] text-faint uppercase tracking-[0.08em]",
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 rounded-sm px-2 py-1.5 font-mono text-[13px] text-muted-foreground outline-none",
        "data-[highlighted]:bg-background-soft data-[highlighted]:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Primitive.Separator>) {
  return (
    <Primitive.Separator
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  );
}
