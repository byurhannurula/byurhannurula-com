import { cn } from "@/lib/utils";

/**
 * The two pieces every vaul sheet on this site shares.
 *
 * Written out twice before, once in the command palette and once in the mobile
 * nav, which meant the backdrop blur and the grab handle could drift apart on
 * the two surfaces a reader sees most on a phone.
 */
export const DRAWER_OVERLAY =
  "fixed inset-0 z-50 bg-background/60 backdrop-blur-[2px]";

/** The bar at the top of a sheet that says it can be dragged. */
export function DrawerGrabber({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-border",
        className
      )}
    />
  );
}
