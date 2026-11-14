import { getOptions } from '@/lib/options-store';

/** Scroll the page to a heading and put its id in the address bar. */
export function jumpToHeading(id: string) {
  const calm =
    getOptions().motion === 'off' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth' });
  history.replaceState(null, '', `#${id}`);
}
