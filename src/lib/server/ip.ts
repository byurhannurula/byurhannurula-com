import "server-only";

import type { NextRequest } from "next/server";

/**
 * Trusted IP extraction.
 *
 * Cloudflare Workers sets `cf-connecting-ip` (cannot be spoofed). Fall back to
 * `x-real-ip`, then the last entry of `x-forwarded-for` that is not empty. If
 * none present, return "anonymous" but caller should treat it as untrusted
 * (separate bucket, not shared across users via a single key).
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

  // Next 15 exposes request.ip in some runtimes; fallback to anonymous.
  const ip = (request as unknown as { ip?: string }).ip;
  if (ip) return ip;

  return "anonymous";
}
