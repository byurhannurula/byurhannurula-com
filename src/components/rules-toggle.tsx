"use client";

import { useEffect, useState } from "react";

import { RULES_KEY } from "@/config/page-rules";
import { cn } from "@/lib/utils";

/**
 * Switch for the page's dashed rules.
 *
 * The state lives on the document element, where the head script has already
 * put it, and this only catches the button up on mount: the server has no way
 * to know the preference, so it always renders the switch on.
 */
export function RulesToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(document.documentElement.dataset.rules !== "off");
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.dataset.rules = next ? "on" : "off";
    try {
      localStorage.setItem(RULES_KEY, next ? "on" : "off");
    } catch {
      // Private mode, or storage disabled. The choice lasts this page view.
    }
  };

  return (
    <button
      aria-checked={on}
      className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-transparent px-2.5 py-1 font-mono text-[12px] text-muted-foreground leading-normal transition-colors hover:border-muted-foreground hover:text-foreground"
      onClick={toggle}
      role="switch"
      type="button"
    >
      lines
      <span
        aria-hidden
        className={cn(
          "relative block h-3 w-5 rounded-full border transition-colors",
          on ? "border-primary bg-primary-soft" : "border-border"
        )}
      >
        <span
          className={cn(
            // translate, not transform: Tailwind v4 emits the discrete
            // translate property, which transition-transform does not cover.
            "absolute top-px left-px size-2 rounded-full transition-[translate] duration-150 ease-out motion-reduce:transition-none",
            on ? "translate-x-2.5 bg-primary" : "bg-muted-foreground"
          )}
        />
      </span>
    </button>
  );
}
