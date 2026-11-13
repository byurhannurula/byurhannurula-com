import { ScoreRing } from '@/components/home/score-ring';
import { ArrowLink } from '@/components/shared/arrow-link';
import { SampleTag } from '@/components/shared/sample-tag';
import { Section } from '@/components/shared/section';
import { SITE_SCORES, SITE_SECTION } from '@/content/home';
import { brand } from '@/lib/brand';

/** A few lines about the site and its audit scores. Option: `site`. */
export function HomeSite() {
  return (
    <Section
      title={SITE_SECTION.title}
      action={
        <ArrowLink href={brand.repository}>{SITE_SECTION.action}</ArrowLink>
      }
      className="hidden in-data-[site=on]:block"
    >
      <div
        data-reveal
        className="grid items-center gap-12 md:grid-cols-[1fr_auto]"
      >
        <p className="max-w-[34rem] text-soft">{SITE_SECTION.text}</p>
        <div>
          <div className="flex flex-wrap gap-6">
            {SITE_SCORES.map((score) => (
              <ScoreRing key={score.label} {...score} />
            ))}
          </div>
          <SampleTag className="mt-4">{SITE_SECTION.sample}</SampleTag>
        </div>
      </div>
    </Section>
  );
}
