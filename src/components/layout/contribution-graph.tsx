import { GraphReadout } from './graph-readout';
import type { Contributions } from './social-data';

const LEVEL_CLASS = [
  'bg-ink/10',
  'bg-accent-bright/25',
  'bg-accent-bright/45',
  'bg-accent-bright/70',
  'bg-accent-bright',
];

type ContributionGraphProps = Pick<Contributions, 'weeks'>;

/**
 * A year of contributions, one column per week. Each square carries its date
 * and count, so the client readout needs nothing but the markup.
 */
export function ContributionGraph({ weeks }: ContributionGraphProps) {
  return (
    <GraphReadout>
      <div
        className="grid grid-flow-col grid-rows-7 gap-[1.5px]"
        style={{
          gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
        }}
      >
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <div
              // A gap has no date. Its place in the fixed grid is its identity.
              // oxlint-disable-next-line react/no-array-index-key
              key={day?.date ?? `${weekIndex}-${dayIndex}`}
              data-date={day?.date}
              data-count={day?.count}
              className={`aspect-square w-full rounded-[1.5px] ${day ? LEVEL_CLASS[day.level] : ''}`}
            />
          )),
        )}
      </div>
    </GraphReadout>
  );
}
