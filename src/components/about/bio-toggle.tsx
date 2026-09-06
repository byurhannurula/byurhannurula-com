"use client";

import { type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

const LENGTHS = [
  { id: "short", label: "short" },
  { id: "long", label: "the long way" },
] as const;

type Length = (typeof LENGTHS)[number]["id"];

/**
 * Two lengths of the same story, with a switch between them.
 *
 * Both versions are rendered on the server and one is hidden, rather than the
 * long one being fetched or mounted on demand. It costs a few hundred bytes of
 * HTML and buys three things: the copy is in the page for a reader with no
 * JavaScript, it is in the page for a crawler, and the switch is instant.
 *
 * `hidden` rather than a class, so assistive technology skips the version that
 * is not on screen instead of reading the story twice.
 */
export function BioToggle({
  short,
  long,
}: {
  short: ReactNode;
  long: ReactNode;
}) {
  const [length, setLength] = useState<Length>("short");

  const choose = (next: Length) => {
    if (next === length) return;
    const run = () => setLength(next);
    // Cross-fades two blocks of text of very different heights. Without it the
    // page below jumps by a screen and a half with no explanation.
    if (document.startViewTransition) {
      document.startViewTransition(run);
      return;
    }
    run();
  };

  return (
    <>
      <fieldset className="mb-5 inline-flex rounded-md border border-border bg-background-soft p-0.5 font-mono text-[12px]">
        <legend className="sr-only">How much of the story to read</legend>
        {LENGTHS.map((option) => (
          <button
            aria-pressed={length === option.id}
            className={cn(
              "rounded-[5px] px-2.5 py-1 transition-colors",
              length === option.id
                ? "bg-primary-soft text-foreground shadow-[inset_0_0_0_1px_var(--primary)]"
                : "text-muted-foreground hover:text-foreground"
            )}
            key={option.id}
            onClick={() => choose(option.id)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </fieldset>

      <div style={{ viewTransitionName: "about-bio" }}>
        <div hidden={length !== "short"}>{short}</div>
        <div hidden={length !== "long"}>{long}</div>
      </div>
    </>
  );
}
