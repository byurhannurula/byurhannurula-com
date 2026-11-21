import { wantsStill } from '@/lib/motion';

/**
 * Scrolls the page to a heading of the note and puts it in the address.
 *
 * The scroll starts two frames later, after the contents list has closed
 * and the focus has moved. Started in the click itself, a smooth scroll was
 * cancelled by that focus change and the page did not move at all.
 */
export function jumpToHeading(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  // First, so the router's reaction to the new address cannot land on top
  // of the scroll.
  history.replaceState(history.state, '', `#${id}`);

  const calm = wantsStill();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const margin = Number.parseFloat(
        getComputedStyle(target).scrollMarginTop,
      );
      const top =
        target.getBoundingClientRect().top + window.scrollY - (margin || 0);
      window.scrollTo({ top, behavior: calm ? 'auto' : 'smooth' });
    });
  });
}
