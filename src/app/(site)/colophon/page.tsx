import { ColophonArt } from '@/components/colophon/colophon-art';
import { ColourModes } from '@/components/colophon/colour-modes';
import { ScoreRing } from '@/components/colophon/score-ring';
import { TextLink } from '@/components/links/text-link';
import { CareerTrack } from '@/components/shared/career-track';
import { PageHero } from '@/components/shared/page-hero';
import { Section } from '@/components/shared/section';
import { TechList } from '@/components/shared/tech';
import { PAGES } from '@/config/seo';
import {
  BUILT_WITH,
  COLOPHON_HERO,
  DECISIONS,
  ICON_CREDITS,
  INSPIRATION,
  LINEAGE,
  PROCESS,
  SITE_SCORES,
  TYPEFACES,
} from '@/content/colophon';
import { brand } from '@/lib/brand';
import { pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata = pageMetadata(PAGES.colophon);

// The page is static, so this is the day of the last build.
const BUILT_ON = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date());

export default function ColophonPage() {
  return (
    <>
      <PageHero
        title={COLOPHON_HERO.title}
        titleEnd={COLOPHON_HERO.titleEnd}
        lead={COLOPHON_HERO.lead}
        art={<ColophonArt />}
      />

      <Section title="Built with">
        <p className="max-w-[40rem] text-[1.1875rem] leading-[1.55] text-pretty">
          {BUILT_WITH.text}
        </p>
        <TechList names={[...BUILT_WITH.tech]} className="mt-6" />
        <ol
          data-reveal
          className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {DECISIONS.map(({ title, text, tone }, index) => (
            <li key={title}>
              <span className={cn('label-mono font-medium', tone)}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-1.5 text-[1.0625rem] font-semibold tracking-[-0.015em]">
                {title}
              </h3>
              <p className="mt-1 text-soft">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Scores" sub={SITE_SCORES.sub}>
        <div data-reveal className="flex flex-wrap gap-8">
          {SITE_SCORES.scores.map((score) => (
            <ScoreRing key={score.label} {...score} />
          ))}
        </div>
        <p className="mt-6 label-mono text-faint">
          Last run: {SITE_SCORES.ranOn}
        </p>
      </Section>

      <Section title="Type" sub="Three faces, each with one job.">
        <ul data-reveal className="grid gap-x-12 gap-y-10 sm:grid-cols-3">
          {TYPEFACES.map(({ name, role, font, sample }) => (
            <li key={name}>
              <span
                aria-hidden
                className={cn(
                  'block text-[5.5rem] leading-none font-semibold tracking-[-0.04em]',
                  font,
                )}
              >
                {sample}
              </span>
              <b className="mt-4 block font-semibold">{name}</b>
              <span className="text-soft">{role}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Colour"
        sub="The light follows the clock. These are the four modes, side by side."
      >
        <ColourModes />
      </Section>

      <Section
        title="Four versions"
        sub="One site, rebuilt three times. The wordmark is the part that stayed."
      >
        <CareerTrack roles={LINEAGE} className="mt-0 md:mt-0" />
      </Section>

      <Section title="Learned from">
        <p className="max-w-[44rem] text-[1.1875rem] leading-[1.7] text-pretty text-soft">
          Sites that shaped this one, in large and small ways:{' '}
          {INSPIRATION.map(({ name, href, why }, index) => (
            <span key={href}>
              {index > 0 ? ', ' : null}
              <TextLink href={href}>{name}</TextLink> ({why})
            </span>
          ))}
          . The icons come from{' '}
          {ICON_CREDITS.map(({ name, href, why }, index) => (
            <span key={href}>
              {index > 0
                ? index === ICON_CREDITS.length - 1
                  ? ' and '
                  : ', '
                : null}
              <TextLink href={href}>{name}</TextLink> ({why})
            </span>
          ))}
          .
        </p>
      </Section>

      <Section title="Process">
        <p className="max-w-[40rem] text-soft">{PROCESS.text}</p>
        <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <TextLink href={brand.repository}>{PROCESS.source}</TextLink>
          <span className="label-mono text-faint">Last build: {BUILT_ON}</span>
        </p>
      </Section>
    </>
  );
}
