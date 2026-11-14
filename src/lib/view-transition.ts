/**
 * Whole-page view transitions for the `themefx` and `pagefx` options.
 * `data-vt` on <html> names the running kind, so the CSS of one kind never
 * styles another (the picture zoom has its own transition too).
 */

type Kind = 'theme' | 'page';

let running = false;
let lastPress: { x: number; y: number; at: number } | null = null;
let lastSwitch: Element | null = null;

if (typeof window !== 'undefined') {
  // Where the reader last pressed: the light change grows from there. A
  // press in the light menu counts as the button that opened the menu.
  window.addEventListener(
    'pointerdown',
    (event) => {
      const target = event.target as Element;
      if (target.closest('[role="menu"]')) return;
      lastSwitch = target.closest('[data-light-switch]');
      lastPress = { x: event.clientX, y: event.clientY, at: Date.now() };
    },
    { capture: true, passive: true },
  );
}

export function canTransition() {
  return (
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function' &&
    document.documentElement.dataset.motion !== 'off' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * The point a light change opens from: the control the reader just pressed,
 * else the light button in the nav, else the middle of the screen (the
 * command menu and keys have no point).
 */
function origin(): { x: number; y: number } {
  const centre = (el: Element | null) => {
    const box = el?.getBoundingClientRect();
    return box && box.width > 0
      ? { x: box.left + box.width / 2, y: box.top + box.height / 2 }
      : null;
  };
  const press =
    lastPress && Date.now() - lastPress.at < 8000 ? lastPress : null;
  if (press && lastSwitch?.isConnected) return centre(lastSwitch) ?? press;
  if (press) return press;
  return (
    centre(document.querySelector('[data-light-switch]')) ?? {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
  );
}

/**
 * Run `update` inside a view transition of `kind`. `update` may return a
 * promise: the browser keeps the old picture until it settles. Without
 * support, with motion off, or with one already running, it just updates.
 */
export function transition(kind: Kind, update: () => void | Promise<void>) {
  if (running || !canTransition()) {
    void update();
    return;
  }
  const root = document.documentElement;
  if (kind === 'theme') {
    const { x, y } = origin();
    // The circle must clear the furthest corner, or a wedge of the old
    // mode stays behind.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.style.setProperty('--vt-r', `${Math.ceil(radius)}px`);
  }
  running = true;
  root.dataset.vt = kind;
  const done = () => {
    running = false;
    delete root.dataset.vt;
  };
  const vt = document.startViewTransition(update);
  // All three promises reject when the browser skips or aborts the
  // animation (tab hidden, a second transition). The update still lands.
  vt.ready.catch(() => {});
  vt.updateCallbackDone.catch(() => {});
  vt.finished.then(done, done);
}
