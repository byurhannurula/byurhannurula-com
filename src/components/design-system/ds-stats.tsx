import { OPTION_KEYS, OPTIONS } from '@/config/options';
import {
  countComponents,
  countTokens,
  type DesignChange,
} from '@/lib/design-log';

const choiceCount = OPTION_KEYS.reduce(
  (sum, key) => sum + OPTIONS[key].choices.length,
  0,
);

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

/**
 * Counts read from the code at build time. "Open decisions" goes down as
 * options are settled, so the strip shows the system closing in.
 */
export function DsStats({ log }: { log: DesignChange[] }) {
  const stats = [
    { value: countTokens(), label: 'tokens' },
    { value: countComponents(), label: 'components' },
    { value: OPTION_KEYS.length, label: 'open decisions' },
    { value: choiceCount, label: 'choices in them' },
  ];
  return (
    <div className="mt-10">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-line bg-card px-5 py-4"
          >
            <dt className="label-mono text-faint">{stat.label}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-[-0.03em] tabular-nums">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      {log[0] ? (
        <p className="mt-3 font-mono text-xs text-faint">
          Last change {formatDate(log[0].date)} · {log.length} recent changes
          below
        </p>
      ) : null}
    </div>
  );
}
