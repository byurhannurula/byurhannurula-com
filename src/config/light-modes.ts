/**
 * Light modes, darkest last.
 *
 * The site does not switch between two extremes. It follows the day: warm and
 * soft first thing, plain daylight in the middle, lamp-lit at dusk, and only
 * properly dark at night -- so opening it at 7am does not blast white, and
 * opening it at noon does not force a black page.
 */
export const LIGHT_MODES = ["morning", "day", "evening", "night"] as const;

export type LightMode = (typeof LIGHT_MODES)[number];
/** `auto` is a preference, not a palette: it resolves to a mode by the clock. */
export type LightPreference = LightMode | "auto";

/** Hour each mode begins, local time. Read as ranges up to the next entry. */
const MODE_START_HOUR: Record<LightMode, number> = {
  morning: 5,
  day: 11,
  evening: 17,
  night: 21,
};

export const MODE_LABELS: Record<LightPreference, string> = {
  auto: "auto",
  morning: "morning",
  day: "day",
  evening: "evening",
  night: "night",
};

/** Greeting beside the clock, matching the resolved mode. */
export const MODE_GREETINGS: Record<LightMode, string> = {
  morning: "good morning",
  day: "good day",
  evening: "good evening",
  night: "good night",
};

/** Storage key for the preference. Held apart from the resolved mode so that
 *  reloading under `auto` re-reads the clock instead of pinning yesterday. */
export const PREFERENCE_KEY = "light-preference";
/** next-themes owns this one; the head script corrects it before first paint. */
export const RESOLVED_KEY = "theme";

export function modeForHour(hour: number): LightMode {
  if (hour >= MODE_START_HOUR.night || hour < MODE_START_HOUR.morning) {
    return "night";
  }
  if (hour >= MODE_START_HOUR.evening) return "evening";
  if (hour >= MODE_START_HOUR.day) return "day";
  return "morning";
}

/** Milliseconds until the mode would next change, for re-resolving under auto. */
export function msUntilNextMode(now: Date): number {
  const next = new Date(now);
  next.setMinutes(0, 0, 0);
  do {
    next.setHours(next.getHours() + 1);
  } while (modeForHour(next.getHours()) === modeForHour(now.getHours()));
  return next.getTime() - now.getTime();
}

/** Position in the light-to-dark order, used to aim the switch animation. */
export function lightRank(mode: LightMode): number {
  return LIGHT_MODES.indexOf(mode);
}

/**
 * Blocking script for the document head, ahead of the theme provider's own.
 *
 * Under `auto` the stored mode is whatever the clock said last visit, so it is
 * rewritten here from the current hour. Resolving in the provider instead
 * would paint last night's palette for a frame first.
 *
 * Built from MODE_START_HOUR rather than hardcoded: a classic script cannot
 * import, and two copies of the boundaries would drift.
 */
export const LIGHT_MODE_SCRIPT = `(function(){try{
var s=${JSON.stringify(MODE_START_HOUR)};
var p=localStorage.getItem(${JSON.stringify(PREFERENCE_KEY)})||"auto";
var m=p;
if(p==="auto"){var h=new Date().getHours();
m=(h>=s.night||h<s.morning)?"night":h>=s.evening?"evening":h>=s.day?"day":"morning";}
localStorage.setItem(${JSON.stringify(RESOLVED_KEY)},m);
document.documentElement.setAttribute("data-light",m);
}catch(e){}})();`;
