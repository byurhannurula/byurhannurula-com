import type { JourneyItem } from "@/config";

export function TimelineItem({ emoji, title, description, year }: JourneyItem) {
  return (
    <div className="relative pb-5 pl-8">
      <div className="absolute top-1 left-0 flex h-3.5 w-3.5 items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="flex items-start gap-2">
        <span className="text-base">{emoji}</span>
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-medium text-sm">{title}</p>
            {year && (
              <span className="shrink-0 text-muted-foreground/60 text-xs">
                {year}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
