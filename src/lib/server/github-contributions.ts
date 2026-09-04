import "server-only";

/**
 * Contribution counts, from a public mirror of GitHub's own graph.
 *
 * GitHub exposes this only through the GraphQL API, which needs a personal
 * access token on every request. The mirror needs none, and the graph is
 * decoration on a hover card -- not worth a secret to rotate. Swapping it for
 * `contributionsCollection` later is a change to this one function.
 */
const API = "https://github-contributions-api.jogruber.de/v4";
/*
 * A week. The graph is a texture, not a readout: nobody hovering a social icon
 * is checking whether yesterday is filled in, and a year of squares looks the
 * same either way. Weekly keeps the fetch off almost every build.
 */
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7;
const TIMEOUT_MS = 5000;

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface Contributions {
  total: number;
  /** Columns of seven, Sunday first. Leading and trailing gaps are null. */
  weeks: (ContributionDay | null)[][];
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

/**
 * Returns null on any failure, so a card renders without its graph rather
 * than failing the page it sits on.
 */
export async function getContributions(
  username: string
): Promise<Contributions | null> {
  try {
    const response = await fetch(
      `${API}/${encodeURIComponent(username)}?y=last`,
      {
        signal: AbortSignal.timeout(TIMEOUT_MS),
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );
    if (!response.ok) return null;

    const data = (await response.json()) as ApiResponse;
    const days = data.contributions;
    if (!days?.length) return null;

    return { total: data.total.lastYear ?? 0, weeks: toWeeks(days) };
  } catch {
    return null;
  }
}

/**
 * The first row is a Sunday, so a year that opens mid-week starts with blanks.
 * Without them every column after the first would sit on the wrong weekday.
 */
function toWeeks(days: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];
  const leading = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  let week: (ContributionDay | null)[] = Array.from(
    { length: leading },
    () => null
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
