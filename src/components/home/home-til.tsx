import { SampleTag } from '@/components/shared/sample-tag';
import { Section } from '@/components/shared/section';
import { TIL, TIL_SECTION } from '@/content/til';
import { cn } from '@/lib/utils';

// Fixed locale and time zone: the server and every reader get the same text.
const DAY = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
});

/** One-line learnings with a date, in two loose columns. Option: `til`. */
export function HomeTil() {
  return (
    <Section
      title={TIL_SECTION.title}
      sub={<SampleTag className="mt-1">{TIL_SECTION.sample}</SampleTag>}
      className="hidden in-data-[til=on]:block"
    >
      <ul
        data-reveal
        className="grid gap-x-16 gap-y-7 md:grid-cols-2 md:gap-y-9"
      >
        {TIL.map((item) => (
          <li
            key={item.date}
            className="group/til grid grid-cols-[3.75rem_1fr] items-baseline gap-x-4"
          >
            <time
              dateTime={item.date}
              className="font-mono text-xs leading-none whitespace-nowrap text-faint transition-colors duration-200 group-hover/til:text-ink"
            >
              {DAY.format(new Date(item.date))}
            </time>
            <div>
              <span
                className={cn(
                  'mb-1.5 block font-mono text-xs leading-none',
                  item.tone,
                )}
              >
                {item.topic}
              </span>
              <p className="max-w-[26rem] text-pretty text-soft transition-colors duration-200 group-hover/til:text-ink">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
