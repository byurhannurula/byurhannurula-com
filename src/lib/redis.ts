import { Redis } from "@upstash/redis"

// Create Redis client only if env vars are available
const createRedisClient = () => {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }
  try {
    return new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  } catch {
    return null
  }
}

export const redis = createRedisClient()

// Export for direct server-side usage
export { Redis }

// Rate limiting helper
export async function rateLimit(
  identifier: string,
  limit: number = 10,
  window: number = 60
): Promise<{ success: boolean; remaining: number }> {
  if (!redis) {
    return { success: true, remaining: limit }
  }

  try {
    const key = `rate_limit:${identifier}`
    const now = Date.now()
    const windowStart = now - window * 1000

    // Remove old entries
    await redis.zremrangebyscore(key, 0, windowStart)

    // Count current requests
    const count = await redis.zcard(key)

    if (count >= limit) {
      return { success: false, remaining: 0 }
    }

    // Add new request
    await redis.zadd(key, { score: now, member: `${now}` })
    await redis.expire(key, window)

    return { success: true, remaining: limit - count - 1 }
  } catch (error) {
    console.error("Rate limit error:", error)
    return { success: true, remaining: limit }
  }
}

// Post stats helpers - with error handling
export async function getPostStats(slug: string) {
  if (!redis) {
    return { views: 0, likes: 0 }
  }

  try {
    const [views, likes] = await Promise.all([
      redis.get<number>(`post:${slug}:views`),
      redis.get<number>(`post:${slug}:likes`),
    ])

    return { views: views || 0, likes: likes || 0 }
  } catch (error) {
    console.error("Failed to get post stats:", error)
    return { views: 0, likes: 0 }
  }
}

export async function incrementViews(slug: string) {
  if (!redis) return 0
  try {
    return await redis.incr(`post:${slug}:views`)
  } catch (error) {
    console.error("Failed to increment views:", error)
    return 0
  }
}

export async function incrementLikes(slug: string) {
  if (!redis) return 0
  try {
    return await redis.incr(`post:${slug}:likes`)
  } catch (error) {
    console.error("Failed to increment likes:", error)
    return 0
  }
}

// Clap system - track user claps (up to 5 per user)
export async function addClap(
  slug: string,
  userId: string
): Promise<{ userClaps: number; totalClaps: number }> {
  if (!redis) return { userClaps: 0, totalClaps: 0 }

  try {
    const userKey = `post:${slug}:claps:${userId}`
    const totalKey = `post:${slug}:claps`

    // Get current user claps
    const currentUserClaps = (await redis.get<number>(userKey)) || 0

    // Max 5 claps per user
    if (currentUserClaps >= 5) {
      const totalClaps = (await redis.get<number>(totalKey)) || 0
      return { userClaps: currentUserClaps, totalClaps }
    }

    // Increment user claps and total claps
    const newUserClaps = currentUserClaps + 1
    await redis.set(userKey, newUserClaps)
    const totalClaps = await redis.incr(totalKey)

    return { userClaps: newUserClaps, totalClaps }
  } catch (error) {
    console.error("Failed to add clap:", error)
    return { userClaps: 0, totalClaps: 0 }
  }
}

export async function getUserClaps(slug: string, userId: string): Promise<number> {
  if (!redis) return 0

  try {
    const userKey = `post:${slug}:claps:${userId}`
    return (await redis.get<number>(userKey)) || 0
  } catch (error) {
    console.error("Failed to get user claps:", error)
    return 0
  }
}

export async function getTotalClaps(slug: string): Promise<number> {
  if (!redis) return 0

  try {
    const totalKey = `post:${slug}:claps`
    return (await redis.get<number>(totalKey)) || 0
  } catch (error) {
    console.error("Failed to get total claps:", error)
    return 0
  }
}
