import { brand } from '@/lib/brand';
import { getNotes } from '@/lib/notes';
import { absoluteUrl, routes } from '@/lib/site';

export const dynamic = 'force-static';

// https://llmstxt.org: a plain summary and page list for AI crawlers.
export async function GET() {
  const notes = await getNotes();
  const lines = [
    `# ${brand.name}`,
    '',
    `> ${brand.description}`,
    '',
    '## Pages',
    '',
    ...routes.map((path) => `- [${path}](${absoluteUrl(path)})`),
    '',
    '## Notes',
    '',
    ...notes.map(
      (note) =>
        `- [${note.title}](${absoluteUrl(`/notes/${note.slug}`)}): ${note.excerpt}`,
    ),
    '',
    '## Contact',
    '',
    `- Email: ${brand.email}`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
