import { notFound } from 'next/navigation';

import { UNLISTED } from '@/content/nav';

/**
 * An unlisted page is a 404 in production, so it cannot leak through an old
 * link or a guess. In dev it still renders, to keep working on it.
 */
export function hideUnlisted(path: string) {
  if (process.env.NODE_ENV === 'production' && UNLISTED.has(path)) notFound();
}
