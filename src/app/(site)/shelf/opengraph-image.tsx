import { PAGES } from '@/config/seo';
import { OG_CONTENT_TYPE, OG_SIZE, renderShareImage } from '@/lib/og';

export const alt = PAGES.shelf.share.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderShareImage(PAGES.shelf.share);
}
