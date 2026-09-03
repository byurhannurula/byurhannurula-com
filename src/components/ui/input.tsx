import * as React from "react";

import { cn } from "@/lib";

interface InputProps extends React.ComponentProps<"input"> {
  /** Decorative leading icon; padding is adjusted to clear it. */
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    if (icon) {
      return (
        <span className="relative block">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground [&_svg]:size-4"
          >
            {icon}
          </span>
          <InputBase
            className={cn("pl-9", className)}
            ref={ref}
            type={type}
            {...props}
          />
        </span>
      );
    }
    return <InputBase className={className} ref={ref} type={type} {...props} />;
  }
);
Input.displayName = "Input";

const InputBase = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // Driven by aria-invalid so the styling cannot drift from what a
        // screen reader is told.
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
InputBase.displayName = "InputBase";

export { Input };
