import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    UPSTASH_REDIS_REST_URL: z.url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
    // Read directly by next.config.mjs, which cannot import this module.
    // Declared here so a malformed value fails the build rather than quietly
    // dropping the rewrites and 404ing every analytics request.
    UMAMI_HOST: z.url().optional(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.url().default("http://localhost:3000"),
    NEXT_PUBLIC_UMAMI_ID: z.string().min(1).optional(),
  },
  // Next.js inlines NEXT_PUBLIC_* at build time, so client vars must be listed explicitly.
  runtimeEnv: {
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    UMAMI_HOST: process.env.UMAMI_HOST,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_UMAMI_ID: process.env.NEXT_PUBLIC_UMAMI_ID,
  },
  emptyStringAsUndefined: true,
});
