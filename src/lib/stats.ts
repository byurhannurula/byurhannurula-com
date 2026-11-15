/**
 * Data seam for views and likes. The stats page and the like button read
 * only this file. The store is not chosen yet: D1 on Workers is the plan
 * (an atomic `UPDATE ... SET views = views + 1`, one query for the list).
 * Until then it returns a fixed sample and `STATS_ARE_SAMPLE` is true.
 */

export interface NoteCounts {
  slug: string;
  views: number;
  likes: number;
}

export const STATS_ARE_SAMPLE = true;

/** The same made-up numbers on every build, from the slug. */
function sample(slug: string): NoteCounts {
  const seed = [...slug].reduce(
    (sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0,
    7,
  );
  const views = 120 + (seed % 2400);
  return { slug, views, likes: Math.round(views * (0.02 + (seed % 7) / 100)) };
}

export async function getNoteCounts(slugs: string[]): Promise<NoteCounts[]> {
  return slugs.map(sample);
}
