/** Data seam for the social hover cards. The cards read only these types. */

export interface ContributionDay {
  /** ISO day, `2026-11-07`. */
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface Contributions {
  total: number;
  /** Columns of seven, Sunday first. Gaps at the two ends are null. */
  weeks: (ContributionDay | null)[][];
}

const SAMPLE_WEEKS = 53;
/** A fixed Saturday, so the sample is the same on every render. */
const SAMPLE_LAST_DAY = Date.UTC(2026, 10, 7);
const DAY_MS = 86_400_000;

/** Small fixed generator: the same "random" numbers on every run. */
function sampleNoise(seed: number) {
  const x = Math.imul(seed + 1, 2_654_435_761) >>> 0;
  return (((x ^ (x >>> 15)) >>> 0) % 1000) / 1000;
}

function levelFor(count: number): ContributionDay['level'] {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 9) return 3;
  return 4;
}

function sampleContributions(): Contributions {
  const days = SAMPLE_WEEKS * 7;
  let total = 0;
  const weeks = Array.from({ length: SAMPLE_WEEKS }, (_week, w) =>
    Array.from({ length: 7 }, (_day, d): ContributionDay => {
      const i = w * 7 + d;
      const noise = sampleNoise(i);
      const weekend = d === 0 || d === 6;
      const quiet = noise < (weekend ? 0.6 : 0.25);
      const count = quiet ? 0 : Math.ceil(noise * noise * (weekend ? 6 : 13));
      total += count;
      return {
        date: new Date(SAMPLE_LAST_DAY - (days - 1 - i) * DAY_MS)
          .toISOString()
          .slice(0, 10),
        count,
        level: levelFor(count),
      };
    }),
  );
  return { total, weeks };
}

/**
 * SAMPLE DATA: a fixed pattern, not real GitHub contributions.
 *
 * Real data goes here. The old site read a public mirror of the GitHub graph
 * (`github-contributions-api.jogruber.de/v4/<user>?y=last`) with a weekly
 * `revalidate`, and returned null on any failure. Keep that contract: null
 * makes the card show the short fallback and not break the footer.
 */
export async function getContributions(): Promise<Contributions | null> {
  return sampleContributions();
}

/** True while `getContributions` returns the sample. The card shows a tag. */
export const CONTRIBUTIONS_ARE_SAMPLE = true;
