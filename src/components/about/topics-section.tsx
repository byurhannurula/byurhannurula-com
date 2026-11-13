import { Say } from '@/components/about/say';
import { Section } from '@/components/shared/section';
import { TOPICS_SENTENCE } from '@/content/about';

/** Things I like to talk about. Shown when the `ask` option is on. */
export function TopicsSection() {
  return (
    <Section title="Good topics" className="hidden in-data-[ask=on]:block">
      <Say parts={TOPICS_SENTENCE} />
    </Section>
  );
}
