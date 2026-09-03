"use client";

import { Check } from "lucide-react";
import { type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

export interface ToggleOption {
  id: string;
  label: string;
  /** Options this one makes meaningless, shown dimmed and unclickable. */
  disabledBy?: string[];
}

/**
 * Checkbox row that switches between pre-rendered variants of one component.
 *
 * Showing each variant as its own static specimen hides the thing worth
 * understanding -- that they are one component reacting to props.
 *
 * Variants arrive already rendered, keyed by their active options sorted and
 * joined with `+`, because the components being demonstrated are async server
 * components and a client boundary cannot await one.
 */
export function VariantToggles({
  options,
  variants,
  label = "toggle options",
  exclusive,
  bare,
}: {
  options: ToggleOption[];
  variants: Record<string, ReactNode>;
  label?: string;
  /** One at a time, for props that cannot combine -- a size, for instance. */
  exclusive?: boolean;
  /**
   * Drop the surrounding frame. Required for anything that bleeds past the
   * column: a bordered box implies containment that a bled figure exists to
   * break, so framing one makes correct behaviour look broken.
   */
  bare?: boolean;
}) {
  const [active, setActive] = useState<Record<string, boolean>>({});

  const isDisabled = (option: ToggleOption) =>
    Boolean(option.disabledBy?.some((id) => active[id]));

  const key = options
    .filter((option) => active[option.id] && !isDisabled(option))
    .map((option) => option.id)
    .sort()
    .join("+");

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        !bare && "rounded-md border border-border bg-background-soft p-4"
      )}
    >
      <div className="[&>*]:my-0">{variants[key] ?? variants[""]}</div>

      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-[11px] text-faint uppercase tracking-[0.08em]">
          {label}
        </span>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {options.map((option) => {
            const disabled = isDisabled(option);
            const checked = Boolean(active[option.id]) && !disabled;
            return (
              <label
                className={cn(
                  "flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em]",
                  disabled
                    ? "cursor-not-allowed text-faint/50"
                    : "cursor-pointer text-muted-foreground"
                )}
                key={option.id}
              >
                <input
                  checked={checked}
                  className="sr-only"
                  disabled={disabled}
                  name={exclusive ? label : undefined}
                  onChange={(event) =>
                    setActive((current) =>
                      exclusive
                        ? { [option.id]: event.target.checked }
                        : { ...current, [option.id]: event.target.checked }
                    )
                  }
                  type={exclusive ? "radio" : "checkbox"}
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-4 items-center justify-center border transition-colors",
                    exclusive ? "rounded-full" : "rounded-[4px]",
                    checked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  )}
                >
                  {checked ? (
                    exclusive ? (
                      <span className="size-1.5 rounded-full bg-primary-foreground" />
                    ) : (
                      <Check className="size-3" />
                    )
                  ) : null}
                </span>
                {option.label}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
