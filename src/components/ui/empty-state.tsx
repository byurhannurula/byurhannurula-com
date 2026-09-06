import { cn } from "@/lib/utils";

/** Nothing here yet, said the same way on every list that can be empty. */
export function EmptyState({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      {children}
    </div>
  );
}
