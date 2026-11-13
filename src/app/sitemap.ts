import type { MetadataRoute } from 'next';

import { getNotes } from '@/lib/notes';
import { absoluteUrl, routes } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Sample notes are placeholders: keep them away from crawlers.
  const notes = (await getNotes()).filter((note) => !note.sample);
  return [
    ...routes.map((path) => ({ url: absoluteUrl(path) })),
    ...notes.map((note) => ({
      url: absoluteUrl(`/notes/${note.slug}`),
      lastModified: note.date,
    })),
  ];
}
