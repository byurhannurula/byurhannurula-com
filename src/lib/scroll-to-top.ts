import { wantsStill } from '@/lib/motion';

/** Scroll to the page top, smooth unless the reader asked for a still page. */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: wantsStill() ? 'auto' : 'smooth' });
}
