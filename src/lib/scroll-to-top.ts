/** Scroll to the page top, smooth unless the reader asked for a still page. */
export function scrollToTop() {
  const still =
    document.documentElement.dataset.motion === 'off' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
}
