import 'server-only';

/**
 * The visitor's address, for rate limits. On Cloudflare `cf-connecting-ip`
 * is set by the edge and cannot be forged. Without any header, all requests
 * share one bucket, which fails safe.
 */
export function clientIp(request: Request) {
  return (
    request.headers.get('cf-connecting-ip')?.trim() ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

/** Lowercase words joined by single hyphens, like the MDX file names. */
export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const isSlug = (value: string) =>
  value.length <= 100 && SLUG.test(value);
