import { OG_CONTENT_TYPE, OG_SIZE, renderShareImage } from '@/lib/og';

export const alt = 'The homelab of Byurhan Nurula';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderShareImage({
    kind: 'homelab',
    eyebrow: 'homelab',
    title: 'A small homelab that I run like production.',
    meta: 'A hobby, not my job.',
  });
}
