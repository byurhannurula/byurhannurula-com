"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-transparent px-2.5 py-1 font-mono text-[12px] text-muted-foreground leading-normal transition-colors hover:border-muted-foreground hover:text-foreground data-[state=open]:border-muted-foreground data-[state=open]:text-foreground"
        aria-label="Change the light"
      >
        <span className="tabular-nums">{label}</span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="top"
          align="end"
          sideOffset={6}
          collisionPadding={12}
          className="z-50 min-w-[176px] rounded-md border border-border bg-surface-raised p-1 shadow-lg"
        >
          <DropdownMenu.Label className="px-2 py-1.5 font-mono text-[11px] text-faint uppercase tracking-[0.08em]">
            change the light
          </DropdownMenu.Label>
          {CHOICES.map((choice) => (
            <DropdownMenu.Item
              key={choice}
              onSelect={() => choose(choice)}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 font-mono text-[13px] outline-none",
                "focus:bg-background-soft data-[highlighted]:bg-background-soft",
                choice === preference
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {MODE_LABELS[choice]}
              {choice === preference && (
                <Check aria-hidden className="size-3.5 text-primary" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
