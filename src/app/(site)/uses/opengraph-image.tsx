import { OG_CONTENT_TYPE, OG_SIZE, renderShareImage } from '@/lib/og';

export const alt = 'What Byurhan Nurula uses';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderShareImage({
    kind: 'uses',
    eyebrow: 'uses',
    title: 'What I use every day.',
    meta: 'Hardware and software on my desk.',
  });
}
