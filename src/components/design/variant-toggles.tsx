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

/** One row of the toggle list, pulled out to keep the list itself readable. */
function Option({
  option,
  checked,
  disabled,
  exclusive,
  name,
  onChange,
}: {
  option: ToggleOption;
  checked: boolean;
  disabled: boolean;
  exclusive?: boolean;
  name?: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em]",
        disabled
          ? "cursor-not-allowed text-faint/50"
          : "cursor-pointer text-muted-foreground"
      )}
    >
      <input
        checked={checked}
        className="sr-only"
        disabled={disabled}
        name={name}
        onChange={(event) => onChange(event.target.checked)}
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
        <Mark checked={checked} exclusive={exclusive} />
      </span>
      {option.label}
    </label>
  );
}

function Mark({
  checked,
  exclusive,
}: {
  checked: boolean;
  exclusive?: boolean;
}) {
  if (!checked) return null;
  if (exclusive) {
    return <span className="size-1.5 rounded-full bg-primary-foreground" />;
  }
  return <Check className="size-3" />;
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
  initial,
  bare,
}: {
  options: ToggleOption[];
  variants: Record<string, ReactNode>;
  label?: string;
  /**
   * Option selected on load. An exclusive group needs one: a radio cannot be
   * cleared, so without a default option to go back to, the first choice is
   * final and the other side of the comparison is gone.
   */
  initial?: string;
  /** One at a time, for props that cannot combine -- a size, for instance. */
  exclusive?: boolean;
  /**
   * Drop the surrounding frame. Required for anything that bleeds past the
   * column: a bordered box implies containment that a bled figure exists to
   * break, so framing one makes correct behaviour look broken.
   */
  bare?: boolean;
}) {
  const [active, setActive] = useState<Record<string, boolean>>(
    initial ? { [initial]: true } : {}
  );

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
        <span className="label-micro">{label}</span>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {options.map((option) => {
            const disabled = isDisabled(option);
            return (
              <Option
                checked={Boolean(active[option.id]) && !disabled}
                disabled={disabled}
                exclusive={exclusive}
                key={option.id}
                name={exclusive ? label : undefined}
                onChange={(next) =>
                  setActive((current) =>
                    exclusive
                      ? { [option.id]: next }
                      : { ...current, [option.id]: next }
                  )
                }
                option={option}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
