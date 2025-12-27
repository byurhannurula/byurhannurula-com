import { type JourneyItem } from "@/data"

export function TimelineItem({ emoji, title, description, year }: JourneyItem) {
  return (
    <div className="relative pb-5 pl-8">
      <div className="absolute left-0 top-1 flex h-3.5 w-3.5 items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="flex items-start gap-2">
        <span className="text-base">{emoji}</span>
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-medium">{title}</p>
            {year && <span className="shrink-0 text-xs text-muted-foreground/60">{year}</span>}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}
