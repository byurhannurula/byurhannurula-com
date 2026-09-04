import { GithubGraphHover } from "@/components/github-graph-hover";
import type { Contributions } from "@/lib/server/github-contributions";

/**
 * A year of contributions as a grid of columns, one per week.
 *
 * Server-rendered on purpose. Each square carries its own date and count, so
 * the client wrapper needs nothing but the markup to build a readout from.
 */
const LEVELS = [
  "bg-foreground/10",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
];

export function GithubGraph({ weeks }: Pick<Contributions, "weeks">) {
  return (
    <GithubGraphHover>
      <div
        className="grid grid-flow-col grid-rows-7 gap-[1.5px]"
        style={{
          gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
        }}
      >
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <div
              className={`aspect-square w-full rounded-[1.5px] ${day ? LEVELS[day.level] : ""}`}
              data-count={day?.count}
              data-date={day?.date}
              key={day?.date ?? `${weekIndex}-${dayIndex}`}
            />
          ))
        )}
      </div>
    </GithubGraphHover>
  );
}
