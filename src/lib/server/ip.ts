import "server-only";

import type { NextRequest } from "next/server";

/**
 * Trusted IP extraction.
 *
 * Cloudflare Workers sets `cf-connecting-ip` (cannot be spoofed). Fall back to
 * `x-real-ip`, then the first entry of `x-forwarded-for`. If none present,
 * returns a per-request random anonymous id so the global
 * `like:anonymous` bucket is not shared across all anon users.
 */
export function getClientIp(request: NextRequest): string {
  const cf = request.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;

  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const ip = (request as unknown as { ip?: string }).ip;
  if (ip) return ip;

  return `anonymous:${crypto.randomUUID()}`;
}
