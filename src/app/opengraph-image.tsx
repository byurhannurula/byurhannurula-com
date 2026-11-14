import { PAGES } from '@/config/seo';
import { OG_CONTENT_TYPE, OG_SIZE, renderShareImage } from '@/lib/og';

export const alt = PAGES.home.share.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** The default share image, used by the home page and any page without one. */
export default function OpengraphImage() {
  return renderShareImage(PAGES.home.share);
}
