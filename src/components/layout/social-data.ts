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

/*
 * A public mirror of GitHub's own graph. GitHub gives this data only
 * through GraphQL, which needs a token; the mirror needs none.
 */
const API = 'https://github-contributions-api.jogruber.de/v4';
const GITHUB_USER = 'byurhannurula';
const REVALIDATE_SECONDS = 60 * 60 * 24;
const TIMEOUT_MS = 5000;

interface ApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

/**
 * The first row is a Sunday, so a year that opens mid-week starts with
 * blanks. Without them every column sits on the wrong weekday.
 */
function toWeeks(days: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];
  const leading = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  let week: (ContributionDay | null)[] = Array.from(
    { length: leading },
    () => null,
  );
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    weeks.push([
      ...week,
      ...Array.from({ length: 7 - week.length }, () => null),
    ]);
  }
  return weeks;
}

/** The newest day in the data, `2026-11-20`, or '' when there is none. */
export function lastDay(data: Contributions) {
  return data.weeks.flat().findLast(Boolean)?.date ?? '';
}

/**
 * The last year of GitHub contributions. Null on any failure: the footer
 * card then shows its short fallback and the stats page leaves the graph out.
 */
export async function getContributions(): Promise<Contributions | null> {
  try {
    const response = await fetch(`${API}/${GITHUB_USER}?y=last`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: REVALIDATE_SECONDS },
      // On Workers the edge keeps the answer this long, so a busy day makes
      // few calls to the mirror. Node ignores `cf`.
      ...({
        cf: { cacheTtl: REVALIDATE_SECONDS / 4, cacheEverything: true },
      } as RequestInit),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as ApiResponse;
    const days = data.contributions;
    if (!days?.length) return null;
    return { total: data.total.lastYear ?? 0, weeks: toWeeks(days) };
  } catch {
    return null;
  }
}
