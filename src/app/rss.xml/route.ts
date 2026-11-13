import { brand } from '@/lib/brand';
import { getNotes } from '@/lib/notes';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function GET() {
  // Sample notes are test content: they stay out of the feed.
  const notes = (await getNotes()).filter((note) => !note.sample);

  const items = notes.map((note) => {
    const url = absoluteUrl(`/notes/${note.slug}`);
    return [
      '<item>',
      `<title>${escapeXml(note.title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<pubDate>${new Date(note.date).toUTCString()}</pubDate>`,
      `<description>${escapeXml(note.excerpt)}</description>`,
      ...note.tags.map((tag) => `<category>${escapeXml(tag)}</category>`),
      '</item>',
    ].join('');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>',
    `<title>${escapeXml(brand.name)}</title>`,
    `<link>${absoluteUrl('/notes')}</link>`,
    `<description>${escapeXml(brand.description)}</description>`,
    '<language>en</language>',
    `<atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml"/>`,
    ...items,
    '</channel></rss>',
  ].join('');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
