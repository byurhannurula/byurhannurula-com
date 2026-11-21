/** True when the reader asked for a still page: the `motion` option or the system setting. */
export const wantsStill = () =>
  document.documentElement.dataset.motion === 'off' ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
