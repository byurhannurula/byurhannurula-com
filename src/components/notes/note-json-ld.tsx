import { JsonLd } from '@/components/json-ld';
import { brand } from '@/lib/brand';
import type { NoteMeta } from '@/lib/notes';
import { absoluteUrl } from '@/lib/site';

/**
 * Structured data for a note: the post itself and its place in the site.
 * A sample note is not real writing, so it gets the breadcrumb only.
 */
export function NoteJsonLd({ note }: { note: NoteMeta }) {
  const url = absoluteUrl(`/notes/${note.slug}`);
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { name: 'Home', item: absoluteUrl('/') },
      { name: 'Notes', item: absoluteUrl('/notes') },
      { name: note.title, item: url },
    ].map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      ...entry,
    })),
  };
  const posting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: note.title,
    description: note.excerpt,
    datePublished: note.date,
    author: { '@type': 'Person', name: brand.name, url: absoluteUrl('/') },
    url,
    mainEntityOfPage: url,
    keywords: note.tags.join(', '),
    wordCount: note.wordCount,
    inLanguage: 'en',
  };
  return <JsonLd data={note.sample ? [breadcrumb] : [posting, breadcrumb]} />;
}
