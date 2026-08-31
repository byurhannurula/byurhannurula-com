import { Skeleton } from "@/components/ui";

/**
 * Without this the App Router holds the old page until the whole RSC payload
 * lands, which reads as a blank stall on click.
 */
export default function Loading() {
  return (
    <div className="pt-12 pb-16">
      <Skeleton className="h-4 w-28" />

      <div className="mt-8 space-y-3">
        <Skeleton className="h-3.5 w-52" />
        <Skeleton className="h-8 w-full max-w-lg" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <div className="mt-4 flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-14" />
      </div>

      <Skeleton className="mt-10 aspect-[1200/630] w-full rounded-xl" />

      <div className="mt-10 space-y-3">
        {["a", "b", "c", "d", "e", "f"].map((key) => (
          <Skeleton key={key} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
