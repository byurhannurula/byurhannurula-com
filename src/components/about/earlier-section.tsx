import { Section } from '@/components/shared/section';
import { ALONGSIDE, EARLIER } from '@/content/career';

interface Item {
  period: string;
  title: string;
  text: string;
  href?: string;
}

function Rows({ title, items }: { title: string; items: Item[] }) {
  return (
    <Section title={title}>
      <ol>
        {items.map((item) => (
          <li
            key={item.title}
            className="grid gap-1 border-t border-rule py-[1.15rem] md:grid-cols-[8.5rem_1fr] md:gap-4"
          >
            <span className="label-mono leading-[1.9] text-faint">
              {item.period}
            </span>
            <div>
              <h3 className="text-lg leading-[1.3] font-semibold tracking-[-0.015em]">
                {item.href ? (
                  <a
                    href={item.href}
                    className="underline decoration-line-strong underline-offset-[0.2em] hover:decoration-accent-bright"
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              <p className="mt-[0.2rem] text-soft">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** Work next to the current job. */
export function AlongsideSection() {
  if (!ALONGSIDE.length) return null;
  return <Rows title="Alongside" items={ALONGSIDE} />;
}

/** Work and study before the current job. */
export function EarlierSection() {
  return <Rows title="Before that" items={EARLIER} />;
}
