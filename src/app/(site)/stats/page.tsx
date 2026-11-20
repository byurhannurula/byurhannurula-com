import { Heart } from 'lucide-react';
import Link from 'next/link';

import { ScoreRing } from '@/components/colophon/score-ring';
import { ContributionGraph } from '@/components/layout/contribution-graph';
import { getContributions } from '@/components/layout/social-data';
import { PageHero } from '@/components/shared/page-hero';
import { SampleTag } from '@/components/shared/sample-tag';
import { Section } from '@/components/shared/section';
import { BigNumbers } from '@/components/stats/big-numbers';
import { Bars } from '@/components/stats/bars';
import { OPTION_KEYS } from '@/config/options';
import { PAGES } from '@/config/seo';
import { SITE_SCORES } from '@/content/colophon';
import { SHELF, SHELF_KINDS } from '@/content/shelf';
import { STATS_COPY } from '@/content/stats';
import { countCommits } from '@/lib/design-log';
import { getNotes } from '@/lib/notes';
import { pageMetadata } from '@/lib/seo';
import { getNoteCounts, statsAreSample } from '@/lib/stats';
import { hideUnlisted } from '@/lib/unlisted';

export const metadata = pageMetadata(PAGES.stats);

/** The same hues as the share images and section marks. */
const HUE = {
  notes: '#fb923c',
  words: '#f472b6',
  shelf: '#f87171',
  code: '#4ade80',
  site: '#facc15',
  book: '#f87171',
  film: '#60a5fa',
  show: '#a78bfa',
} as const;

const tagged = (on: boolean, text: string) =>
  on ? (
    <span className="flex flex-wrap items-center gap-2">
      {text} <SampleTag />
    </span>
  ) : (
    text
  );

export default async function StatsPage() {
  hideUnlisted('/stats');
  const notes = await getNotes();
  const counts = await getNoteCounts(notes.map((note) => note.slug));
  const contributions = await getContributions();

  const words = notes.reduce((sum, note) => sum + note.wordCount, 0);
  const years = Map.groupBy(notes, (note) => note.date.slice(0, 4));
  const byViews = counts.toSorted((a, b) => b.views - a.views).slice(0, 8);
  const titleOf = new Map(notes.map((note) => [note.slug, note.title]));
  const done = SHELF.filter((item) => item.status !== 'now');

  return (
    <>
      <PageHero
        title={STATS_COPY.title}
        titleEnd={STATS_COPY.titleEnd}
        lead={STATS_COPY.lead}
        eyebrow={<SampleTag>{STATS_COPY.sample}</SampleTag>}
      />
      <BigNumbers
        items={[
          { label: 'notes', value: notes.length, colour: HUE.notes },
          {
            label: 'words',
            value: words,
            sub: `${Math.round(words / Math.max(1, notes.length))} a note`,
            colour: HUE.words,
          },
          {
            label: 'on the shelf',
            value: SHELF.length,
            sub: `${SHELF.filter((i) => i.status === 'again').length} more than once`,
            colour: HUE.shelf,
          },
          {
            label: 'commits',
            value: countCommits(),
            sub: 'to this site',
            colour: HUE.code,
          },
          {
            label: 'open decisions',
            value: OPTION_KEYS.length,
            sub: <Link href="/design-system">in the design system</Link>,
            colour: HUE.site,
          },
        ]}
      />

      <Section title={STATS_COPY.writing} sub={STATS_COPY.writingSub}>
        <Bars
          bars={[...years]
            .toSorted(([a], [b]) => b.localeCompare(a))
            .map(([year, list]) => ({
              key: year,
              label: year,
              value: list.length,
              note: `${list.length} ${list.length === 1 ? 'note' : 'notes'}`,
              colour: HUE.notes,
            }))}
        />
      </Section>

      <Section
        title={STATS_COPY.read}
        sub={tagged(statsAreSample(), STATS_COPY.readSub)}
      >
        <Bars
          bars={byViews.map((row) => ({
            key: row.slug,
            label: (
              <Link href={`/notes/${row.slug}`} className="hover:text-ink">
                {titleOf.get(row.slug)}
              </Link>
            ),
            value: row.views,
            note: (
              <span className="inline-flex items-center gap-3">
                {row.views.toLocaleString('en')}
                <span className="inline-flex items-center gap-1 text-faint">
                  <Heart aria-label="likes" className="size-3" />
                  {row.likes}
                </span>
              </span>
            ),
          }))}
        />
      </Section>

      <Section title={STATS_COPY.shelf} sub={STATS_COPY.shelfSub}>
        <div className="grid gap-12 md:grid-cols-2">
          <Bars
            bars={SHELF_KINDS.map(({ kind, label }) => ({
              key: kind,
              label,
              value: SHELF.filter((item) => item.kind === kind).length,
              colour: HUE[kind],
            }))}
          />
          <Bars
            bars={[5, 4, 3, 2, 1].map((stars) => ({
              key: String(stars),
              label: `${'●'.repeat(stars)}${'○'.repeat(5 - stars)}`,
              value: done.filter((item) => item.rating === stars).length,
              colour: HUE.site,
            }))}
          />
        </div>
      </Section>

      {contributions ? (
        <Section title={STATS_COPY.code} sub={STATS_COPY.codeSub}>
          <div
            data-reveal
            className="rounded-xl border border-line bg-card p-5"
          >
            <ContributionGraph
              labelled
              weeks={contributions.weeks}
              total={contributions.total}
            />
          </div>
        </Section>
      ) : null}

      <Section title={STATS_COPY.site} sub={STATS_COPY.siteSub}>
        <div data-reveal className="flex flex-wrap gap-8">
          {SITE_SCORES.scores.map((score) => (
            <ScoreRing key={score.label} {...score} />
          ))}
        </div>
        <p className="mt-6 label-mono text-faint">
          Last run: {SITE_SCORES.ranOn}
        </p>
      </Section>
    </>
  );
}
