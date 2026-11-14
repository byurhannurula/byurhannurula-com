import { PAGES } from '@/config/seo';
import { OG_CONTENT_TYPE, OG_SIZE, renderShareImage } from '@/lib/og';

export const alt = PAGES.home.share.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * The share image of the home page, and of any page in this group without
 * its own. It must sit in this folder: a page that sets `openGraph` drops
 * an image that comes from a parent folder, so the one in src/app alone
 * left the home page with no image.
 */
export default function OpengraphImage() {
  return renderShareImage(PAGES.home.share);
}
