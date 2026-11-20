import 'server-only';

import { Redis } from '@upstash/redis';

/**
 * Data seam for views and likes. Nothing else touches the store, so a move to
 * D1 later changes only this file.
 *
 * Upstash Redis over REST: it runs the same in `next dev`, in Node and on
 * Workers. The keys are the ones the old site used, `post:<slug>:views` and
 * `post:<slug>:likes`, so its counts carry over.
 */

export interface NoteCounts {
  slug: string;
  views: number;
  likes: number;
}

let client: Redis | null | undefined;

/**
 * Made lazily: on Workers, OpenNext fills `process.env` per request, so a
 * module-scope read can see it empty.
 */
function redis(): Redis | null {
  if (client !== undefined) return client;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  client = url && token ? new Redis({ url, token }) : null;
  return client;
}

/** True when no store is set up and the numbers are made up. */
export function statsAreSample() {
  return redis() === null;
}

/** The same made-up numbers on every build, from the slug. */
function sample(slug: string): NoteCounts {
  const seed = [...slug].reduce(
    (sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0,
    7,
  );
  const views = 120 + (seed % 2400);
  return { slug, views, likes: Math.round(views * (0.02 + (seed % 7) / 100)) };
}

const none = (slug: string): NoteCounts => ({ slug, views: 0, likes: 0 });

const viewsKey = (slug: string) => `post:${slug}:views`;
const likesKey = (slug: string) => `post:${slug}:likes`;

export async function getNoteCounts(slugs: string[]): Promise<NoteCounts[]> {
  const store = redis();
  if (!store) return slugs.map(sample);
  if (!slugs.length) return [];
  try {
    const values = await store.mget<(number | null)[]>(
      ...slugs.flatMap((slug) => [viewsKey(slug), likesKey(slug)]),
    );
    return slugs.map((slug, index) => ({
      slug,
      views: Number(values[index * 2] ?? 0),
      likes: Number(values[index * 2 + 1] ?? 0),
    }));
  } catch {
    // A build must not fail because the counter is down.
    return slugs.map(none);
  }
}

/**
 * For one note page. Without a store it is zero, not a sample: a made-up
 * count under a real note would look true.
 */
export async function getCounts(slug: string): Promise<NoteCounts> {
  if (!redis()) return none(slug);
  const [counts] = await getNoteCounts([slug]);
  return counts;
}

export async function addView(slug: string): Promise<NoteCounts> {
  const store = redis();
  if (!store) return none(slug);
  const [views, likes] = await store
    .pipeline()
    .incr(viewsKey(slug))
    .get<number>(likesKey(slug))
    .exec<[number, number | null]>();
  return { slug, views, likes: Number(likes ?? 0) };
}

/** Add or take back one like. The count never goes below zero. */
export async function changeLikes(slug: string, by: 1 | -1): Promise<number> {
  const store = redis();
  if (!store) return 0;
  const likes = await store.incrby(likesKey(slug), by);
  if (likes >= 0) return likes;
  await store.set(likesKey(slug), 0);
  return 0;
}

/**
 * Fixed window: at most `limit` calls per `seconds` for one key. Without a
 * store it allows everything, because then nothing is written anywhere.
 */
export async function allow(key: string, limit: number, seconds: number) {
  const store = redis();
  if (!store) return true;
  const name = `rate:${key}`;
  const [count] = await store
    .pipeline()
    .incr(name)
    .expire(name, seconds, 'NX')
    .exec<[number, number]>();
  return count <= limit;
}
