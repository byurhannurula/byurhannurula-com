"use client";

import { useEffect, useRef, useState } from "react";

import {
  DEFAULT_HOVER_SOUND,
  DEFAULT_TRIGGER,
  HOVER_DETUNE,
  INTERACTIVE,
  isSoundName,
  isTrigger,
  MUTE_ATTRIBUTE,
  SCOPE_ATTRIBUTE,
  SOUNDS,
  type SoundTrigger,
  TARGET_ATTRIBUTE,
  TRIGGER_ATTRIBUTE,
} from "@/config/sound";
import { isSoundOn, playSound, setSoundOn, subscribeSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

/** Reads the shared preference and re-renders when any toggle changes it. */
function useSoundEnabled() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(isSoundOn());
    const unsubscribe = subscribeSound(setOn);
    return () => {
      unsubscribe();
    };
  }, []);
  return on;
}

/**
 * The hover tick, for the few places that ask for it.
 *
 * Opt in rather than out: a tick under every link and button on the site was
 * more sound than the site has interactions, and layering it under the click
 * of the same control made one press into two noises. Put data-sound on a
 * container and everything in it ticks; give it a value to choose the sample.
 * data-no-sound takes a single element back out of a marked container.
 *
 * The names, levels and selectors are all in config/sound.ts.
 *
 * Delegated from the document and mounted once in the root layout, so the
 * whole idea is this file: unmount it and the site is exactly as it was.
 */
export function SoundLayer() {
  useEffect(() => {
    const target = (event: Event) =>
      (event.target as HTMLElement | null)?.closest?.(
        `${INTERACTIVE}, [${TARGET_ATTRIBUTE}]`
      ) ?? null;

    /**
     * What this element should play, and when, read off the nearest scope.
     * Null when nothing has opted it in.
     */
    const settings = (el: Element) => {
      if (el.hasAttribute(MUTE_ATTRIBUTE)) return null;
      const scope = el.closest(`[${SCOPE_ATTRIBUTE}]`);
      if (!scope) return null;

      const named = scope.getAttribute(SCOPE_ATTRIBUTE) ?? "";
      const on = scope.getAttribute(TRIGGER_ATTRIBUTE) ?? "";
      return {
        name: isSoundName(named) ? named : DEFAULT_HOVER_SOUND,
        trigger: (isTrigger(on) ? on : DEFAULT_TRIGGER) as SoundTrigger,
      };
    };

    let last: Element | null = null;

    const onOver = (event: PointerEvent) => {
      const el = target(event);
      if (!el || el === last) return;
      last = el;
      const found = settings(el);
      if (!found || found.trigger === "click") return;

      // Detuned up: a tick at the sample's own pitch reads as a press.
      playSound(found.name, {
        hover: true,
        volume: SOUNDS[found.name].hover,
        detune: HOVER_DETUNE,
      });
    };

    const onOut = (event: PointerEvent) => {
      if (target(event) !== last) return;
      // pointerout also fires crossing between the children of one link, where
      // the pointer never actually left it. Clearing on those let the next
      // pointerover count as a fresh arrival, so a nav item with an icon or a
      // marker span inside it ticked again on every step across its own label.
      const to = event.relatedTarget as Node | null;
      if (to && last?.contains(to)) return;
      last = null;
    };

    const onClick = (event: MouseEvent) => {
      const el = target(event);
      if (!el) return;
      const found = settings(el);
      if (!found || found.trigger === "hover") return;
      playSound(found.name);
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}

/**
 * The panel sounds. Used by the command palette, and nothing else.
 *
 * Every dialog and menu on the site having them was too much: the ones reached
 * by pointing at a control already had the control, and only the palette is
 * summoned out of nowhere by a key. Driven by the open flag rather than by a
 * trigger's click, so the shortcut sounds the same as the button, and every
 * way out of it (escape, a click outside, a chosen item) closes on one note.
 *
 * Silent on the first render: a panel that is already open when it mounts was
 * opened by a reload or a link, not by the person reading, and should not
 * announce itself.
 */
export function useOpenSound(open: boolean) {
  const previous = useRef(open);

  useEffect(() => {
    if (previous.current === open) return;
    previous.current = open;
    playSound(open ? "open" : "close");
  }, [open]);
}

/** Three bars that grow with the wave, flat when muted. */
function Speaker({ on }: { on: boolean }) {
  return (
    <span aria-hidden="true" className="flex items-end gap-[2px]">
      {[5, 9, 6].map((height, index) => (
        <span
          // Drawn at full height and scaled down, so the bars grow on the
          // compositor rather than laying the row out three times per toggle.
          className="w-[2px] origin-bottom rounded-full bg-current transition-transform duration-200 ease-out motion-reduce:transition-none"
          key={height}
          style={{
            height,
            scale: on ? "1 1" : `1 ${2 / height}`,
            transitionDelay: `${index * 40}ms`,
          }}
        />
      ))}
    </span>
  );
}

export function SoundToggle({ className }: { className?: string }) {
  const on = useSoundEnabled();

  return (
    <button
      aria-pressed={on}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border border-border bg-transparent px-2.5 py-1 font-mono text-[12px] text-muted-foreground leading-normal transition-colors hover:border-muted-foreground hover:text-foreground",
        on && "border-primary/50 text-foreground",
        className
      )}
      data-no-sound=""
      onClick={() => {
        const next = !on;
        setSoundOn(next);
        // Fires after the flag flips, so turning it on is audible and turning
        // it off is silent, which is the honest signal in both directions.
        if (next) playSound("open");
      }}
      type="button"
    >
      <Speaker on={on} />
      sound {on ? "on" : "off"}
    </button>
  );
}
