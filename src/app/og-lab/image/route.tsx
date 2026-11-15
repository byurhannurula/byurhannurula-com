import { notFound } from 'next/navigation';

import { PAGES } from '@/config/seo';
import { OG_STYLES, type OgStyle, renderShareImage } from '@/lib/og';

/** One share image in any style, for the /og-lab page. Dev only. */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') notFound();
  const params = new URL(request.url).searchParams;
  const style = params.get('style') as OgStyle;
  const page = PAGES[params.get('page') as keyof typeof PAGES];
  if (!OG_STYLES.includes(style) || !page) notFound();
  return renderShareImage(page.share, style);
}
