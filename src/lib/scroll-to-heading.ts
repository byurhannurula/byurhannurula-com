/** Matches the `scroll-margin-top` on prose headings in globals.css. */
const SCROLL_MARGIN = 80;
/** How long to wait for images to settle before scrolling anyway. */
const PRELOAD_TIMEOUT_MS = 1200;
/** How long to keep correcting afterwards, for anything that lands late. */
const SETTLE_TIMEOUT_MS = 4000;
const TOLERANCE_PX = 1;
/** Frames of no movement before a correction is considered safe. */
const STILL_FRAMES = 2;

let cancelSettle: (() => void) | null = null;

/**
 * Keeps a heading pinned while late content changes the layout.
 *
 * Corrects only once the page has stopped moving. A smooth scroll moves it
 * every frame, and correcting mid-animation jumps straight to the target,
 * which silently turns every smooth scroll into an instant one.
 */
export function settleOnHeading(id: string) {
  cancelSettle?.();

  let frame = 0;
  let cancelled = false;
  let lastY = Number.NaN;
  let stillFrames = 0;
  const deadline = performance.now() + SETTLE_TIMEOUT_MS;

  const stop = () => {
    cancelled = true;
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
    cancelSettle = null;
  };
  cancelSettle = stop;

  const tick = () => {
    if (cancelled) return;
    const target = document.getElementById(id);
    if (!target || performance.now() > deadline) return stop();

    const y = window.scrollY;
    stillFrames = y === lastY ? stillFrames + 1 : 0;
    lastY = y;

    // Two still frames means nothing is animating, so a remaining offset is
    // real drift from late content rather than a scroll in progress.
    if (stillFrames >= STILL_FRAMES) {
      const drift = target.getBoundingClientRect().top - SCROLL_MARGIN;
      if (Math.abs(drift) > TOLERANCE_PX) {
        window.scrollBy({ top: drift, behavior: "instant" });
        stillFrames = 0;
      }
    }
    frame = requestAnimationFrame(tick);
  };

  const passive = { passive: true } as const;
  window.addEventListener("wheel", stop, passive);
  window.addEventListener("touchstart", stop, passive);
  window.addEventListener("keydown", stop);
  frame = requestAnimationFrame(tick);

  return stop;
}

/**
 * Forces every lazy image above the target to load, and waits for them.
 *
 * Post images are remote and carry no real dimensions, so each one reserves a
 * default 3:2 box and resizes when it loads. Jumping first and correcting after
 * produces a visible snap; loading first means the page has already stopped
 * moving by the time we scroll.
 */
function preloadImagesAbove(target: Element): Promise<void> {
  const targetTop = target.getBoundingClientRect().top + window.scrollY;

  const pending = Array.from(document.querySelectorAll("img"))
    .filter((img) => {
      if (img.complete) return false;
      return img.getBoundingClientRect().top + window.scrollY < targetTop;
    })
    .map((img) => {
      img.loading = "eager";
      img.fetchPriority = "high";
      return new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
      });
    });

  if (pending.length === 0) return Promise.resolve();

  // Never block the click on a slow network; settleOnHeading covers stragglers.
  return Promise.race([
    Promise.all(pending).then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, PRELOAD_TIMEOUT_MS)),
  ]);
}

/** Scrolls to a heading once the page above it has stopped moving. */
export function scrollToHeading(id: string, smooth = true) {
  const target = document.getElementById(id);
  if (!target) return;

  preloadImagesAbove(target).then(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
      block: "start",
    });
    settleOnHeading(id);
  });
}
