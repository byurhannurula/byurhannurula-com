"use client";

import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui";
import {
  LIGHT_MODES,
  type LightPreference,
  MODE_GREETINGS,
  MODE_LABELS,
  msUntilNextMode,
} from "@/config/light-modes";
import {
  applyLightMode,
  readPreference,
  resolvePreference,
  writePreference,
} from "@/lib/light-mode";
import { cn } from "@/lib/utils";

const CHOICES: LightPreference[] = ["auto", ...LIGHT_MODES];

function formatClock(date: Date) {
  return date
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .toLowerCase();
}

export function LightSwitcher() {
  const { theme, setTheme } = useTheme();
  const [preference, setPreference] = useState<LightPreference>("auto");
  const [now, setNow] = useState<Date | null>(null);

  // Deferred to the client: the server has no clock for this visitor, and
  // rendering a time on both sides would be a hydration mismatch.
  useEffect(() => {
    setPreference(readPreference());
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(tick);
  }, []);

  // Under auto the mode has to change on its own when the hour rolls over.
  // Scheduled to the boundary rather than polled, so an open tab at 20:59
  // turns to night at 21:00 exactly.
  useEffect(() => {
    if (preference !== "auto") return;
    const at = new Date();
    const timer = setTimeout(() => {
      const resolved = resolvePreference("auto");
      applyLightMode(
        (theme as (typeof LIGHT_MODES)[number]) ?? resolved,
        resolved,
        () => setTheme(resolved)
      );
      setNow(new Date());
    }, msUntilNextMode(at));
    return () => clearTimeout(timer);
  }, [preference, theme, setTheme]);

  const choose = (next: LightPreference) => {
    writePreference(next);
    setPreference(next);
    const resolved = resolvePreference(next);
    applyLightMode(
      (theme as (typeof LIGHT_MODES)[number]) ?? resolved,
      resolved,
      () => setTheme(resolved)
    );
  };

  const resolved = resolvePreference(preference, now ?? new Date());
  // The greeting is only honest under auto, where the mode follows the clock.
  // Pinned to evening at 11am it would read "11:33 good evening", so a pinned
  // mode names itself instead. Before mount there is no clock at all.
  const label = now
    ? preference === "auto"
      ? `${formatClock(now)} ${MODE_GREETINGS[resolved]}`
      : `${formatClock(now)} ${MODE_LABELS[resolved]}`
    : MODE_LABELS[resolved];

  return (
    <DropdownMenu>
      {/*
       * The name is built from the visible text rather than replacing it: an
       * aria-label of "Change the light" on a control that reads "night" left
       * voice-control users with nothing sayable to activate it.
       * data-light-switch is what the view transition finds -- see
       * lib/light-mode.ts -- so the name is free to change.
       */}
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-transparent px-2.5 py-1 font-mono text-[12px] text-muted-foreground leading-normal transition-colors hover:border-muted-foreground hover:text-foreground data-[state=open]:border-muted-foreground data-[state=open]:text-foreground"
        data-light-switch=""
      >
        <span className="sr-only">Change the light, currently </span>
        <span className="tabular-nums">{label}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="top">
        <DropdownMenuLabel>change the light</DropdownMenuLabel>
        {CHOICES.map((choice) => (
          <DropdownMenuItem
            className={cn(choice === preference && "text-foreground")}
            key={choice}
            onSelect={() => choose(choice)}
          >
            {MODE_LABELS[choice]}
            {choice === preference && (
              <Check aria-hidden className="size-3.5 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
