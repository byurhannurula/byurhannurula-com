import { brand } from '@/lib/brand';
import { OG_CONTENT_TYPE, OG_SIZE, renderShareImage } from '@/lib/og';

export const alt = `${brand.name}, ${brand.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** The default share image, used by the home page and any page without one. */
export default function OpengraphImage() {
  return renderShareImage({
    kind: 'home',
    eyebrow: 'home',
    title:
      'Full-stack engineer. I build web products from the first commit to the server.',
  });
}
