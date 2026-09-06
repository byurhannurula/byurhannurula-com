declare global {
  interface Window {
    /** Safari before 14.1 only exposes the prefixed constructor. */
    webkitAudioContext?: typeof AudioContext;
  }
}

export type SoundName = "click" | "open" | "close" | "flipper" | "page";

const STORAGE_KEY = "sound";
const SOURCES: Record<SoundName, string> = {
  click: "/sounds/click.webm",
  open: "/sounds/open.webm",
  close: "/sounds/close.webm",
  flipper: "/sounds/flipper.webm",
  page: "/sounds/page.webm",
};

/**
 * Per-sound gain, over samples that all peak within 2 dB of full scale.
 *
 * click, open, close and page were mastered around -21 dBFS, which left a
 * hover tick near -32 dBFS once this gain was applied: inaudible in a room
 * with anything else happening in it. They are peak-normalised now, so these
 * numbers are the mix rather than a rescue. click is a dry tick and open/close
 * carry a tail, so one volume across the two makes the tail dominate; flipper
 * came in loud already and is held down instead.
 */
const GAIN: Record<SoundName, number> = {
  click: 0.8,
  open: 0.55,
  close: 0.55,
  flipper: 0.35,
  page: 0.45,
};

/**
 * Hover, as a fraction of the click it borrows its sample from.
 *
 * Kept under 1 on purpose: pointing at a link should read as lighter than
 * committing to it.
 */
export const HOVER_VOLUME = 0.32;

/**
 * Hover fires far more often than a click and can retrigger on every pixel of
 * travel along a row. Anything below this is dropped rather than queued.
 */
const HOVER_THROTTLE_MS = 90;

/** How long a sound waits for a suspended context before giving up on itself. */
const RESUME_TIMEOUT_MS = 250;

let context: AudioContext | null = null;
let enabled = false;
let hydrated = false;
let lastHoverAt = 0;
const buffers = new Map<SoundName, AudioBuffer>();
const pending = new Map<SoundName, Promise<AudioBuffer | null>>();
const listeners = new Set<(on: boolean) => void>();

function read(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

/**
 * Off unless the visitor has asked for it. Sound is the one enhancement that
 * cannot be ignored by someone who did not want it, so it never defaults on.
 */
export function isSoundOn(): boolean {
  if (typeof window === "undefined") return false;
  if (!hydrated) {
    enabled = read();
    hydrated = true;
  }
  return enabled;
}

export function setSoundOn(on: boolean) {
  enabled = on;
  hydrated = true;
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // Private mode. The preference lasts for the session and no longer.
  }
  if (on) void load("click");
  for (const listener of listeners) listener(on);
}

export function subscribeSound(listener: (on: boolean) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Opens the context if it is closed, and says whether it can be played into.
 *
 * A context created outside a gesture starts suspended, and stays that way
 * until one arrives. Awaiting that resume outright would park every sound in
 * the meantime and then fire the whole queue on the first click; the race puts
 * a ceiling on the wait so the ones that cannot play are dropped instead.
 * Safari also suspends a backgrounded tab and does not always resume it alone.
 */
async function ready(ctx: AudioContext) {
  // Read through a function on both sides: an inline check narrows `state` for
  // the rest of the body, and the await is exactly when it changes.
  const isRunning = (target: AudioContext) => target.state === "running";
  if (isRunning(ctx)) return true;
  await Promise.race([
    // A refusal here just means no sound; it must not reject upward.
    ctx.resume().catch(() => undefined),
    new Promise((resolve) => setTimeout(resolve, RESUME_TIMEOUT_MS)),
  ]);
  return isRunning(ctx);
}

/**
 * WebAudio rather than an <audio> element: a single element cannot overlap with
 * itself, so a fast run down a list of links drops every sound but the first.
 * The context is created on first play, which is always inside a gesture, so
 * it never starts suspended by autoplay policy.
 */
function ensureContext(): AudioContext | null {
  if (context) return context;
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? window.webkitAudioContext;
  if (!Ctor) return null;
  context = new Ctor();
  return context;
}

async function load(name: SoundName): Promise<AudioBuffer | null> {
  const cached = buffers.get(name);
  if (cached) return cached;

  const inFlight = pending.get(name);
  if (inFlight) return inFlight;

  const task = (async () => {
    const ctx = ensureContext();
    if (!ctx) return null;
    try {
      const response = await fetch(SOURCES[name]);
      const buffer = await ctx.decodeAudioData(await response.arrayBuffer());
      buffers.set(name, buffer);
      return buffer;
    } catch {
      // A missing or undecodable file must not break the interaction it decorates.
      return null;
    } finally {
      pending.delete(name);
    }
  })();

  pending.set(name, task);
  return task;
}

interface PlayOptions {
  /** Rate-limited and skipped on coarse pointers, where hover is a tap. */
  hover?: boolean;
  /** Detune in cents, so repeated ticks in a row are not identical. */
  detune?: number;
  volume?: number;
}

export function playSound(name: SoundName, options: PlayOptions = {}) {
  if (!isSoundOn()) return;

  if (options.hover) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const now = performance.now();
    if (now - lastHoverAt < HOVER_THROTTLE_MS) return;
    lastHoverAt = now;
  }

  void (async () => {
    const ctx = ensureContext();
    const buffer = await load(name);
    if (!(ctx && buffer)) return;
    if (!(await ready(ctx))) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    if (options.detune) source.detune.value = options.detune;

    const gain = ctx.createGain();
    gain.gain.value = (options.volume ?? 1) * GAIN[name];

    source.connect(gain).connect(ctx.destination);
    source.start();
  })();
}

/**
 * Holds a looping sound for as long as something is happening, then lets go.
 *
 * The split-flap clatter is a continuous recording, not a single flap, so it is
 * gated rather than triggered: it starts from a random offset when the board
 * begins and rides a short release when it settles. Cutting it dead at the end
 * sounds like a tape stopping; the ramp sounds like the last flap landing.
 *
 * Returns a stop function that is safe to call more than once, and safe to call
 * before the buffer has even finished loading.
 */
export function playLoop(
  name: SoundName,
  { volume = 1, attackMs = 25, releaseMs = 160 } = {}
): () => void {
  let stopped = false;
  let stop = () => {
    stopped = true;
  };

  if (!isSoundOn()) return () => undefined;

  void (async () => {
    const ctx = ensureContext();
    const buffer = await load(name);
    if (!(ctx && buffer) || stopped) return;
    if (!(await ready(ctx))) return;
    if (stopped) return;

    const peak = volume * GAIN[name];
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    // A fixed start point makes every flip open on the same flap, which the ear
    // picks up after two or three goes.
    source.loopStart = 0;
    source.loopEnd = buffer.duration;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(peak, ctx.currentTime + attackMs / 1000);

    source.connect(gain).connect(ctx.destination);
    source.start(0, Math.random() * buffer.duration);

    stop = () => {
      if (stopped) return;
      stopped = true;
      const end = ctx.currentTime + releaseMs / 1000;
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, end);
      source.stop(end + 0.02);
    };
  })();

  return () => stop();
}
