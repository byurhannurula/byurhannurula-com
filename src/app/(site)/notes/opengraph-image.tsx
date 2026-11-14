import { OG_CONTENT_TYPE, OG_SIZE, renderShareImage } from '@/lib/og';

export const alt = 'Notes by Byurhan Nurula';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderShareImage({
    kind: 'notes',
    eyebrow: 'notes',
    title: 'Notes on things I build, fix and run.',
    meta: 'One idea for each post.',
  });
}
