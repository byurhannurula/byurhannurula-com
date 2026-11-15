import type { DesignChange } from '@/lib/design-log';
import { cn } from '@/lib/utils';

const TYPE_STYLE: Record<string, string> = {
  feat: 'text-[#16a34a] dark:text-[#4ade80]',
  fix: 'text-[#dc2626] dark:text-[#f87171]',
  perf: 'text-[#d97706] dark:text-[#facc15]',
  style: 'text-[#7c3aed] dark:text-[#a78bfa]',
  refactor: 'text-[#2563eb] dark:text-[#60a5fa]',
};

const TYPE_NAME: Record<string, string> = {
  feat: 'new',
  fix: 'fix',
  perf: 'speed',
  style: 'look',
  refactor: 'tidy',
};

const month = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

/** The design changes as a timeline, grouped by month, newest first. */
export function ChangesSection({ log }: { log: DesignChange[] }) {
  if (log.length === 0) {
    return <p className="text-soft">No history in this build.</p>;
  }
  const groups = Map.groupBy(log, (change) => month(change.date));
  return (
    <div className="grid gap-10">
      {[...groups].map(([name, changes]) => (
        <section key={name}>
          <h3 className="label-mono text-faint">{name}</h3>
          <ol className="mt-4 border-l border-line">
            {changes.map((change) => (
              <li
                key={change.hash}
                className="relative grid gap-x-4 py-2 pl-6 sm:grid-cols-[4.5rem_3.5rem_1fr]"
              >
                <span
                  aria-hidden
                  className="absolute top-[1.05rem] -left-[3.5px] size-1.5 rounded-full bg-line-strong"
                />
                <time
                  dateTime={change.date}
                  className="font-mono text-xs leading-6 text-faint"
                >
                  {change.date.slice(5).replace('-', '/')}
                </time>
                <span
                  className={cn(
                    'font-mono text-xs leading-6',
                    TYPE_STYLE[change.type] ?? 'text-soft',
                  )}
                >
                  {TYPE_NAME[change.type] ?? change.type}
                </span>
                <span className="text-pretty text-soft first-letter:uppercase">
                  {change.text}
                </span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
