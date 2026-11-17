import { cn } from '@/lib/utils';

import { GraphReadout } from './graph-readout';
import type { Contributions } from './social-data';

/** GitHub's own five greens, light and dark. */
const LEVEL_CLASS = [
  'bg-ink/8',
  'bg-[#9be9a8] dark:bg-[#0e4429]',
  'bg-[#40c463] dark:bg-[#006d32]',
  'bg-[#30a14e] dark:bg-[#26a641]',
  'bg-[#216e39] dark:bg-[#39d353]',
];

const monthFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: 'UTC',
});

/** Rows 1, 3 and 5 of a Sunday-first week, as GitHub labels them. */
const WEEKDAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

/**
 * The first week of each month gets its name. A month that starts less than
 * three weeks before the next one has no room, so it gets none.
 */
function monthLabels(weeks: Contributions['weeks']) {
  const labels: { week: number; name: string }[] = [];
  let last = -1;
  weeks.forEach((week, index) => {
    const first = week.find(Boolean);
    if (!first) return;
    const date = new Date(`${first.date}T00:00:00Z`);
    if (date.getUTCMonth() === last) return;
    last = date.getUTCMonth();
    labels.push({ week: index, name: monthFormat.format(date) });
  });
  return labels.filter(
    (label, i) => (labels[i + 1]?.week ?? weeks.length) - label.week >= 3,
  );
}

function Squares({
  weeks,
  gap,
}: Pick<Contributions, 'weeks'> & { gap: string }) {
  return (
    <div
      className={cn('grid grid-flow-col grid-rows-7', gap)}
      style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
    >
      {weeks.map((week, weekIndex) =>
        week.map((day, dayIndex) => (
          <div
            // A gap has no date. Its place in the fixed grid is its identity.
            // oxlint-disable-next-line react/no-array-index-key
            key={day?.date ?? `${weekIndex}-${dayIndex}`}
            data-date={day?.date}
            data-count={day?.count}
            className={cn(
              'aspect-square w-full rounded-[2px]',
              day && LEVEL_CLASS[day.level],
            )}
          />
        )),
      )}
    </div>
  );
}

interface ContributionGraphProps extends Pick<Contributions, 'weeks'> {
  /** Month and weekday names and a legend, as on a GitHub profile. */
  labelled?: boolean;
  total?: number;
}

/**
 * A year of contributions, one column per week. Each square carries its date
 * and count, so the client readout needs nothing but the markup.
 */
export function ContributionGraph({
  weeks,
  labelled = false,
  total,
}: ContributionGraphProps) {
  if (!labelled) {
    return (
      <GraphReadout>
        <Squares weeks={weeks} gap="gap-[1.5px]" />
      </GraphReadout>
    );
  }

  const label = 'font-mono text-[0.625rem] leading-none text-faint';
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex flex-col">
          <div className="h-5" />
          <div className="grid flex-1 grid-rows-7 gap-[3px]">
            {WEEKDAYS.map((day, index) => (
              // oxlint-disable-next-line react/no-array-index-key
              <span key={index} className={cn(label, 'flex items-center')}>
                {day}
              </span>
            ))}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="grid h-5 gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
            }}
          >
            {monthLabels(weeks).map(({ week, name }) => (
              <span
                key={week}
                style={{ gridColumnStart: week + 1 }}
                className={cn(label, 'whitespace-nowrap')}
              >
                {name}
              </span>
            ))}
          </div>
          <GraphReadout>
            <Squares weeks={weeks} gap="gap-[3px]" />
          </GraphReadout>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 pl-9">
        {total === undefined ? (
          <span />
        ) : (
          <span className="text-sm text-soft">
            {total.toLocaleString('en')} contributions in the last year
          </span>
        )}
        <span className={cn(label, 'flex items-center gap-1')}>
          Less
          {LEVEL_CLASS.map((level) => (
            <span key={level} className={cn('size-2.5 rounded-[2px]', level)} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}
