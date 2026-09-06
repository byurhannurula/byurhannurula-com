/**
 * Every sound the site can make, and the rules for when.
 *
 * There are three ways a sound happens, and only the first is configured here
 * by name:
 *
 * 1. Delegated. `SoundLayer` listens once on the document. An element sounds
 *    when it matches `INTERACTIVE` (or carries `data-sound-target`) and sits
 *    inside something carrying `data-sound`. Nothing else on the site makes a
 *    noise. Four attributes configure it:
 *
 *      data-sound             turn sound on inside here; the value names the
 *                             sample, so data-sound="page" turns the tick into
 *                             a page turn. Empty means click.
 *      data-sound-on          "hover" (the default), "click", or "both".
 *      data-sound-target      this element sounds even though it is not a
 *                             link or a button.
 *      data-no-sound          take one element back out.
 *
 * 2. Panels, explicit. `useOpenSound(open)` plays `open` and `close` when a
 *    flag flips. Used by the command palette and nothing else, because it is
 *    the only panel summoned by a key with no control under the pointer to
 *    stand in for the sound.
 *
 * 3. Mechanisms, explicit. The split-flap and the reel hold `flipper` with
 *    `playLoop` for as long as they are moving.
 *
 * Sound is off until the visitor asks for it, and the preference is theirs
 * alone: see STORAGE_KEY in lib/sound.ts.
 */

export type SoundName = "click" | "open" | "close" | "flipper" | "page";

export interface SoundSpec {
  src: string;
  /**
   * Level in the mix, over samples that all peak within 2 dB of full scale.
   * click is a dry tick and open/close carry a tail, so one volume across
   * both makes the tail dominate.
   */
  gain: number;
  /**
   * Level when this is a hover rather than a deliberate act, as a fraction of
   * `gain`. Under 1 on purpose: pointing at a thing should read as lighter
   * than reaching it.
   */
  hover: number;
}

export const SOUNDS: Record<SoundName, SoundSpec> = {
  click: { src: "/sounds/click.webm", gain: 0.8, hover: 0.32 },
  open: { src: "/sounds/open.webm", gain: 0.55, hover: 0.5 },
  close: { src: "/sounds/close.webm", gain: 0.55, hover: 0.5 },
  flipper: { src: "/sounds/flipper.webm", gain: 0.35, hover: 0.5 },
  page: { src: "/sounds/page.webm", gain: 0.45, hover: 0.9 },
};

/** What the delegated layer plays when a scope does not name a sound. */
export const DEFAULT_HOVER_SOUND: SoundName = "click";

/**
 * Detune in cents for the hover tick, so it sits above the pitch of the same
 * sample played as a press.
 */
export const HOVER_DETUNE = 260;

/**
 * Hover fires far more often than a click and can retrigger on every pixel of
 * travel along a row. Anything sooner than this is dropped rather than queued.
 */
export const HOVER_THROTTLE_MS = 90;

/**
 * What counts as something you can point at.
 *
 * The two roles are there for overlays: cmdk gives its rows role="option" and
 * Radix gives menu rows role="menuitem", so a selector of tags alone would
 * leave any marked menu silent.
 */
export const INTERACTIVE =
  "a, button, [role='button'], [role='menuitem'], [role='option']";

/** Opt in by putting this on the element or on any ancestor of it. */
export const SCOPE_ATTRIBUTE = "data-sound";

/**
 * Makes one element a target even though it is not a control.
 *
 * A book cover is a span, not a link, so nothing in INTERACTIVE matches it.
 * Kept separate from the scope attribute on purpose: a scope usually sits on a
 * container, and treating containers as targets would fire a sound every time
 * the pointer crossed the padding around a row of links.
 */
export const TARGET_ATTRIBUTE = "data-sound-target";

/** Set beside a scope to change when it fires. Hover unless it says otherwise. */
export const TRIGGER_ATTRIBUTE = "data-sound-on";

export type SoundTrigger = "hover" | "click" | "both";

export const DEFAULT_TRIGGER: SoundTrigger = "hover";

export function isTrigger(value: string): value is SoundTrigger {
  return value === "hover" || value === "click" || value === "both";
}

/** Opt one element back out of a scope that would otherwise cover it. */
export const MUTE_ATTRIBUTE = "data-no-sound";

export function isSoundName(value: string): value is SoundName {
  return value in SOUNDS;
}
