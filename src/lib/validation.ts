export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function assertValidSlug(slug: string) {
  if (!SLUG_RE.test(slug)) throw new Error(`Invalid slug "${slug}"`);
}
