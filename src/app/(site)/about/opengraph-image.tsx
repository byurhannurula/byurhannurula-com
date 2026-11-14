import { OG_CONTENT_TYPE, OG_SIZE, renderShareImage } from '@/lib/og';

export const alt = 'About Byurhan Nurula';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderShareImage({
    kind: 'about',
    eyebrow: 'about',
    title: 'Six years, one company, every layer of the product.',
  });
}
