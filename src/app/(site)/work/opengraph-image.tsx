import { OG_CONTENT_TYPE, OG_SIZE, renderShareImage } from '@/lib/og';

export const alt = 'Side projects by Byurhan Nurula';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderShareImage({
    kind: 'work',
    eyebrow: 'work',
    title: 'Small tools that do one job well.',
    meta: 'Open source. No tracking.',
  });
}
