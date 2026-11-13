import { Section } from '@/components/shared/section';
import { EARLIER } from '@/content/career';

/** Work and study before the current job. */
export function EarlierSection() {
  return (
    <Section title="Before that">
      <ol>
        {EARLIER.map((item) => (
          <li
            key={item.title}
            className="grid gap-1 border-t border-rule py-[1.15rem] md:grid-cols-[8.5rem_1fr] md:gap-4"
          >
            <span className="label-mono leading-[1.9] text-faint">
              {item.period}
            </span>
            <div>
              <h3 className="text-lg leading-[1.3] font-semibold tracking-[-0.015em]">
                {item.title}
              </h3>
              <p className="mt-[0.2rem] text-soft">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
