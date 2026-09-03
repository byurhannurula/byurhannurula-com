import { cn } from "@/lib";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    // bg-border, not bg-muted: --muted is one step from --background, which
    // reads as nothing on the dim palettes. --border is the first token with
    // real separation in all four modes.
    <div
      className={cn("animate-pulse rounded-md bg-border", className)}
      {...props}
    />
  );
}

export { Skeleton };
