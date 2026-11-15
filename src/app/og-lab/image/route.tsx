import { notFound } from 'next/navigation';

import { PAGES } from '@/config/seo';
import { formatNoteDate, getNote } from '@/lib/notes';
import { OG_STYLES, type OgStyle, renderShareImage } from '@/lib/og';

/** One share image in any style, for the /og-lab page. Dev only. */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') notFound();
  const params = new URL(request.url).searchParams;
  const style = params.get('style') as OgStyle;
  if (!OG_STYLES.includes(style)) notFound();
  const slug = params.get('note');
  if (slug) {
    const note = await getNote(slug);
    if (!note) notFound();
    return renderShareImage(
      {
        kind: 'note',
        eyebrow: 'note',
        title: note.title,
        meta: `${formatNoteDate(note.date)} · ${note.readingMinutes} min read`,
        cover: note.cover,
      },
      style,
    );
  }
  const page = PAGES[params.get('page') as keyof typeof PAGES];
  if (!page) notFound();
  return renderShareImage(page.share, style);
}
