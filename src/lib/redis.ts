import { Redis } from "@upstash/redis";

// Create Redis client only if env vars are available
const createRedisClient = () => {
  if (
    !(
      process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    )
  ) {
    return null;
  }
  try {
    return new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch {
    return null;
  }
};

export const redis = createRedisClient();

// Export for direct server-side usage
export { Redis };

// Rate limiting helper
export async function rateLimit(
  identifier: string,
  limit: number = 10,
  window: number = 60
): Promise<{ success: boolean; remaining: number }> {
  if (!redis) {
    return { success: true, remaining: limit };
  }

  try {
    const key = `rate_limit:${identifier}`;
    const now = Date.now();
    const windowStart = now - window * 1000;

    // Remove old entries
    await redis.zremrangebyscore(key, 0, windowStart);

    // Count current requests
    const count = await redis.zcard(key);

    if (count >= limit) {
      return { success: false, remaining: 0 };
    }

    // Add new request
    await redis.zadd(key, { score: now, member: `${now}` });
    await redis.expire(key, window);

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
    return await redis.decr(`post:${slug}:likes`);
  } catch (_error) {
    return 0;
  }
}
