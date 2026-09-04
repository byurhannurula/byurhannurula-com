import "server-only";
import { Redis } from "@upstash/redis";
import { env } from "@/env";

// Create Redis client only if env vars are available
const createRedisClient = () => {
  if (!(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN)) {
    return null;
  }
  try {
    return new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch {
    return null;
  }
};

export const redis = createRedisClient();

// Export for direct server-side usage
export { Redis };

// In-memory fallback when Redis is not configured (local dev). Not
// shared across workers but prevents fail-open on a misconfigured deploy.
const memoryStore = new Map<string, number[]>();

function memoryRateLimit(
  identifier: string,
  limit: number,
  window: number
): { success: boolean; remaining: number } {
  const key = `rate_limit:${identifier}`;
  const now = Date.now();
  const windowStart = now - window * 1000;
  const timestamps = memoryStore.get(key) ?? [];
  const valid = timestamps.filter((t) => t > windowStart);
  if (valid.length >= limit) {
    memoryStore.set(key, valid);
    return { success: false, remaining: 0 };
  }
  valid.push(now);
  memoryStore.set(key, valid);
  return { success: true, remaining: limit - valid.length };
}

// Rate limiting helper
export async function rateLimit(
  identifier: string,
  limit: number = 10,
  window: number = 60
): Promise<{ success: boolean; remaining: number }> {
  if (!redis) {
    // Fail-open would let a misconfigured prod skip all limits. Keep a
    // local counter instead and warn once so the misconfig is visible.
    if (process.env.NODE_ENV === "production") {
      console.warn("[redis] UPSTASH_* not set — using in-memory rate limit");
    }
    return memoryRateLimit(identifier, limit, window);
  }

  try {
    const key = `rate_limit:${identifier}`;
    const now = Date.now();
    const windowStart = now - window * 1000;

    // Pipeline reduces round-trips; the window is still not strictly atomic
    // but the unique member prevents the same-ms collision that dropped
    // concurrent requests before. For strict atomicity use Upstash Ratelimit
    // or an EVAL Lua script.
    const pipeline = redis.pipeline();
    pipeline.zremrangebyscore(key, 0, windowStart);
    pipeline.zcard(key);
    const results = (await pipeline.exec()) as unknown as [unknown, number][];
    const count = (results[1] as unknown as number) ?? 0;

    if (count >= limit) {
      return { success: false, remaining: 0 };
    }

    // Unique member so two requests in the same ms don't overwrite each other.
    const member = `${now}:${Math.random().toString(36).slice(2, 8)}`;
    await redis
      .pipeline()
      .zadd(key, { score: now, member })
      .expire(key, window)
      .exec();

    return { success: true, remaining: limit - count - 1 };
  } catch (_error) {
    return { success: true, remaining: limit };
  }
}

// Post stats helpers - with error handling
export async function getPostStats(slug: string) {
  if (!redis) {
    return { views: 0, likes: 0 };
  }

  try {
    const [views, likes] = await Promise.all([
      redis.get<number>(`post:${slug}:views`),
      redis.get<number>(`post:${slug}:likes`),
    ]);

    return { views: views || 0, likes: likes || 0 };
  } catch (_error) {
    return { views: 0, likes: 0 };
  }
}

export async function incrementViews(slug: string) {
  if (!redis) return 0;
  try {
    return await redis.incr(`post:${slug}:views`);
  } catch (_error) {
    return 0;
  }
}

export async function incrementLikes(slug: string) {
  if (!redis) return 0;
  try {
    return await redis.incr(`post:${slug}:likes`);
  } catch (_error) {
    return 0;
  }
}

export async function decrementLikes(slug: string) {
  if (!redis) return 0;
  try {
    const value = await redis.decr(`post:${slug}:likes`);
    if (value < 0) {
      await redis.set(`post:${slug}:likes`, 0);
      return 0;
    }
    return value;
  } catch (_error) {
    return 0;
  }
}
