import { flushSync } from "react-dom";

import {
  LIGHT_MODES,
  type LightMode,
  type LightPreference,
  lightRank,
  modeForHour,
  PREFERENCE_KEY,
} from "@/config/light-modes";

export function readPreference(): LightPreference {
  try {
    const stored = localStorage.getItem(PREFERENCE_KEY);
    if (
      stored === "auto" ||
      stored === "morning" ||
      stored === "day" ||
      stored === "evening" ||
      stored === "night"
    ) {
      return stored;
    }
  } catch {
    // Private mode, or storage disabled. Auto is the right default anyway.
  }
  return "auto";
}

export function writePreference(preference: LightPreference) {
  try {
    localStorage.setItem(PREFERENCE_KEY, preference);
  } catch {
    // Nothing to do: the choice lasts for this page view only.
  }
}

export function resolvePreference(
  preference: LightPreference,
  now = new Date()
): LightMode {
  return preference === "auto" ? modeForHour(now.getHours()) : preference;
}

/** True while a bloom is on screen; a second one would restart the keyframes. */
let inFlight = false;

/**
 * Where the circle opens from.
 *
 * The switcher's own centre, so the change comes from the control that caused
 * it. The `t` shortcut and the command palette carry no coordinates, so they
 * find the same control; if it is not on the page, the circle opens from the
 * middle rather than from a corner.
 */
function switchOrigin() {
  const trigger = document.querySelector('[aria-label="Change the light"]');
  const box = trigger?.getBoundingClientRect();
  if (!box || box.width === 0) {
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }
  // Clamped to the viewport: the switcher lives in the footer, so it is
  // usually scrolled off when the shortcut fires. An origin far below the fold
  // would open an arc so wide its curve never reads -- clamping keeps it a
  // circle growing from the nearest edge.
  return {
    x: clamp(box.left + box.width / 2, 0, window.innerWidth),
    y: clamp(box.top + box.height / 2, 0, window.innerHeight),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Apply `next`, opening it as a circle from the switcher.
 *
 * Falls back to an unanimated switch wherever the transition cannot run -- no
 * View Transition API, no change, or a switch already in flight -- so the mode
 * always lands even when the effect does not play.
 */
export function applyLightMode(
  from: LightMode,
  next: LightMode,
  apply: () => void
) {
  const root = document.documentElement;

  if (!document.startViewTransition || inFlight || from === next) {
    apply();
    return;
  }

  const { x, y } = switchOrigin();
  // The circle has to clear the furthest corner or a wedge of the old mode is
  // left behind; from a control near one edge that is most of the diagonal.
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
  root.style.setProperty("--switch-x", `${x}px`);
  root.style.setProperty("--switch-y", `${y}px`);
  root.style.setProperty("--switch-max", `${Math.ceil(radius)}px`);

  inFlight = true;
  // Unused by the circle; kept so the up/down wipe is a CSS-only restore.
  root.dataset.lightSwitching =
    lightRank(next) < lightRank(from) ? "lighter" : "darker";

  // flushSync: startViewTransition snapshots the DOM when the callback
  // returns, and a React state update scheduled inside it would not have
  // landed yet -- the transition would capture two identical frames.
  const transition = document.startViewTransition(() => flushSync(apply));

  const clear = () => {
    inFlight = false;
    delete root.dataset.lightSwitching;
  };
  // `finished` rejects on a skipped transition, which is still a finished one.
  transition.finished.then(clear, clear);
}

/**
 * Step to the next mode along the day, wrapping at night.
 *
 * Stepping is an explicit choice, so it also pins the preference: an `auto`
 * page that is stepped would otherwise snap back at the next hour boundary.
 */
export function cycleLightMode(
  current: LightMode | undefined,
  setMode: (mode: LightMode) => void
) {
  const from = current ?? resolvePreference("auto");
  const next = LIGHT_MODES[(lightRank(from) + 1) % LIGHT_MODES.length];
  writePreference(next);
  applyLightMode(from, next, () => setMode(next));
}
