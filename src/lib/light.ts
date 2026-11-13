/**
 * Light modes, darkest last. The page follows the day: warm white in the
 * morning, plain white at noon, warm dark in the evening, black at night.
 */
export const LIGHT_MODES = ['morning', 'day', 'evening', 'night'] as const;

export type LightMode = (typeof LIGHT_MODES)[number];
export type LightPreference = LightMode | 'auto';

/** Hour each mode begins, local time. */
export const MODE_START_HOUR: Record<LightMode, number> = {
  morning: 5,
  day: 11,
  evening: 17,
  night: 21,
};

export function modeForHour(hour: number): LightMode {
  if (hour >= MODE_START_HOUR.night || hour < MODE_START_HOUR.morning) {
    return 'night';
  }
  if (hour >= MODE_START_HOUR.evening) return 'evening';
  if (hour >= MODE_START_HOUR.day) return 'day';
  return 'morning';
}

export function resolveLight(
  preference: string,
  now: Date = new Date(),
): LightMode {
  return (LIGHT_MODES as readonly string[]).includes(preference)
    ? (preference as LightMode)
    : modeForHour(now.getHours());
}

export const isDarkMode = (mode: LightMode) =>
  mode === 'evening' || mode === 'night';
