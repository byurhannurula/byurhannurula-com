import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Table({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
      <table
        {...props}
        className={cn("w-full border-collapse text-[13.5px]", className)}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead {...props} className={cn("bg-background-soft", className)}>
      {children}
    </thead>
  );
}

export function TableBody({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"tbody">) {
  return (
    <tbody {...props} className={className}>
      {children}
    </tbody>
  );
}

export function TableRow({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      {...props}
      className={cn(
        // Separators between rows only. A border on the last row would sit a
        // hairline above the wrapper's own edge and read as an empty strip.
        "transition-colors last:border-0 hover:bg-background-soft/60",
        "border-border-dash border-b border-dashed",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      {...props}
      className={cn(
        "px-3.5 py-2.5 text-left font-mono text-[11px] text-faint uppercase tracking-[0.08em]",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      {...props}
      className={cn(
        "px-3.5 py-2.5 align-top text-muted-foreground first:font-mono first:text-foreground",
        className
      )}
    >
      {children}
    </td>
  );
}
