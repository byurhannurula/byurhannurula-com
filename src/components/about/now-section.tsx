import { NowBlock } from '@/components/shared/now-block';
import { Section } from '@/components/shared/section';
import { NOW_DATE } from '@/content/now';

/** The "now" lines. Shown when the `now` option is `about` or `both`. */
export function NowSection() {
  return (
    <Section
      title="Now"
      sub={NOW_DATE}
      className="hidden in-data-[now=about]:block in-data-[now=both]:block"
    >
      <NowBlock />
    </Section>
  );
}
