import { LINE_COLOURS } from '@/components/shared/patterns/palette';

interface BurstOptions {
  /** Pieces in the burst. */
  count?: number;
  /** Farthest a piece flies, in pixels. */
  reach?: number;
  /** Direction in degrees (0 is up) and the spread around it. */
  angle?: number;
  spread?: number;
  /** Pull down after the burst, in pixels. */
  fall?: number;
  duration?: number;
}

const still = () =>
  document.documentElement.dataset.motion === 'off' ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Small pieces of colour that fly out from a point on the screen and fade.
 * Plain elements and the Web Animations API, so it costs no library and
 * cleans up after itself. Nothing happens when motion is off.
 */
export function confetti(
  x: number,
  y: number,
  {
    count = 16,
    reach = 70,
    angle = 0,
    spread = 360,
    fall = 30,
    duration = 900,
  }: BurstOptions = {},
) {
  if (still()) return;
  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.cssText =
    'position:fixed;inset:0;pointer-events:none;z-index:90;overflow:hidden';
  document.body.append(layer);

  const runs: Promise<unknown>[] = [];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    const size = 4 + Math.random() * 5;
    const round = Math.random() < 0.4;
    piece.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${round ? size : size * 0.45}px;border-radius:${round ? '50%' : '1px'};background:${LINE_COLOURS[i % LINE_COLOURS.length]}`;
    layer.append(piece);
    const turn =
      ((angle - spread / 2 + Math.random() * spread - 90) * Math.PI) / 180;
    const far = reach * (0.45 + Math.random() * 0.55);
    const dx = Math.cos(turn) * far;
    const dy = Math.sin(turn) * far;
    const spin = (Math.random() - 0.5) * 720;
    const time = duration * (0.75 + Math.random() * 0.5);
    runs.push(
      piece.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.4)', opacity: 1 },
          {
            transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${spin / 2}deg) scale(1)`,
            opacity: 1,
            offset: 0.45,
          },
          {
            transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy * 1.15 + fall}px)) rotate(${spin}deg) scale(0.8)`,
            opacity: 0,
          },
        ],
        { duration: time, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
      ).finished,
    );
  }
  void Promise.allSettled(runs).then(() => layer.remove());
}
