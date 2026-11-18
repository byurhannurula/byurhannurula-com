import { SampleTag } from '@/components/shared/sample-tag';
import { Section } from '@/components/shared/section';
import { AppIcon } from '@/components/uses/app-icon';
import {
  BEAT_COUNT,
  getHomelabStatus,
  type Beat,
  type ServiceState,
} from '@/lib/homelab-status';
import { cn } from '@/lib/utils';

const STATE_DOT: Record<ServiceState, string> = {
  up: 'bg-hue-6',
  slow: 'bg-hue-7',
  down: 'bg-hue-1',
};

const BEAT_BAR: Record<Beat, string> = {
  // Full strength on a light page: at 75% the green is under 3:1 there.
  up: 'bg-hue-6 dark:opacity-75',
  slow: 'bg-hue-7',
  down: 'bg-hue-1',
  none: 'bg-line-strong',
};

const LEGEND: [Beat, string][] = [
  ['up', 'up'],
  ['slow', 'slow'],
  ['down', 'down'],
  ['none', 'no check'],
];

/** The bars as one sentence, for a screen reader. */
function beatSummary(beats: Beat[]) {
  const count = (kind: Beat) => beats.filter((beat) => beat === kind).length;
  const checks = beats.length - count('none');
  if (!checks) return 'No checks yet.';
  const parts = [`${count('up')} up`];
  if (count('slow')) parts.push(`${count('slow')} slow`);
  if (count('down')) parts.push(`${count('down')} down`);
  return `Last ${checks} checks: ${parts.join(', ')}.`;
}

const checkedTime = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'UTC',
  timeZoneName: 'short',
});

/**
 * "Status": each service with its uptime, state and last 30 checks. The
 * data is live or sample (src/lib/homelab-status.ts); sample data is marked.
 */
export async function StatusSection() {
  const { source, checkedAt, services } = await getHomelabStatus();
  const upCount = services.filter(({ state }) => state !== 'down').length;
  // A green dot beside "13 of 14" says the opposite of the text.
  const allUp = upCount === services.length;

  return (
    <Section
      id="status"
      title="Status"
      sub={
        <>
          {source === 'sample' ? (
            <SampleTag>sample data</SampleTag>
          ) : checkedAt ? (
            <span className="label-mono text-faint">
              checked{' '}
              <time dateTime={checkedAt}>
                {checkedTime.format(new Date(checkedAt))}
              </time>
            </span>
          ) : null}{' '}
          The last {BEAT_COUNT} checks for each service.
        </>
      }
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <p className="flex items-center gap-[0.6rem] font-medium">
          <span
            aria-hidden
            className={cn(
              'size-[0.6rem] rounded-full',
              allUp
                ? 'bg-hue-6 shadow-[0_0_0_4px_color-mix(in_srgb,var(--hue-6)_22%,transparent)]'
                : 'bg-hue-7 shadow-[0_0_0_4px_color-mix(in_srgb,var(--hue-7)_22%,transparent)]',
            )}
          />
          {upCount} of {services.length} services are up
        </p>
        {/* For the eye only: each service has its counts as text below. */}
        <p
          aria-hidden
          className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs leading-none text-faint"
        >
          {LEGEND.map(([beat, label]) => (
            <span key={beat} className="flex items-center gap-1.5">
              <span
                className={cn('h-3 w-[0.3rem] rounded-[2px]', BEAT_BAR[beat])}
              />
              {label}
            </span>
          ))}
          <span>{BEAT_COUNT} checks, newest at the right</span>
        </p>
      </div>
      <ul data-reveal className="grid gap-x-10 gap-y-7 md:grid-cols-3">
        {services.map((service) => (
          <li
            key={service.name}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-[0.15rem]"
          >
            <AppIcon
              src={service.icon}
              size={34}
              className="row-span-2 size-[2.1rem]"
            />
            <b className="leading-tight font-medium">{service.name}</b>
            <span className="font-mono text-xs leading-none text-faint">
              {service.uptime === undefined ? (
                ''
              ) : (
                <>
                  <span className="sr-only">uptime </span>
                  {service.uptime.toFixed(1)}%
                </>
              )}
            </span>
            <span className="col-span-2 col-start-2 flex items-center gap-2 font-mono text-xs leading-none text-soft">
              <span
                aria-hidden
                className={cn(
                  'size-[0.45rem] rounded-full',
                  STATE_DOT[service.state],
                )}
              />
              {service.detail}
            </span>
            <span
              aria-hidden
              className="col-span-full mt-2 flex h-[1.1rem] gap-0.5"
            >
              {service.beats.map((beat, index) => (
                <span
                  // The bars have no identity except their place in time.
                  // oxlint-disable-next-line react/no-array-index-key
                  key={index}
                  className={cn('flex-1 rounded-[2px]', BEAT_BAR[beat])}
                />
              ))}
            </span>
            <span className="sr-only">{beatSummary(service.beats)}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
