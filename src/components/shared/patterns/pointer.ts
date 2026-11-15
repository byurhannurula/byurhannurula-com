/**
 * The mouse position in screen pixels, for canvas scenes that react to it.
 * Touch is left out: a finger on the page is scrolling, not pointing.
 */
export function trackPointer() {
  const state = { x: -1e4, y: -1e4, present: false, moved: 0 };
  const onMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    state.x = event.clientX;
    state.y = event.clientY;
    state.present = true;
    state.moved = performance.now();
  };
  const onLeave = () => {
    state.present = false;
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  return {
    state,
    /** The pointer in the canvas's own pixels. */
    local(canvas: HTMLCanvasElement) {
      const box = canvas.getBoundingClientRect();
      return { x: state.x - box.left, y: state.y - box.top };
    },
    dispose() {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    },
  };
}
