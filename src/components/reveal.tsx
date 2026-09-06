"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useId,
  useState,
} from "react";

import { cn } from "@/lib/utils";

interface RevealState {
  open: boolean;
  toggle: () => void;
  panelId: string;
}

const RevealContext = createContext<RevealState | null>(null);

/**
 * A phrase in a sentence that has more behind it.
 *
 * Split in two because the panel cannot live inside the paragraph: it is a
 * block, and a block in the middle of a <p> pushes the rest of the sentence
 * onto its own line. So the trigger stays in the flow and the panel opens
 * under the whole paragraph, which is also where it belongs to read.
 *
 * Underneath rather than in a popover, because the point is that it is part of
 * the sentence, and a card floating over the page would say the opposite.
 */
export function Reveal({
  children,
  detail,
}: {
  children: ReactNode;
  detail: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <RevealContext.Provider
      value={{ open, panelId, toggle: () => setOpen((was) => !was) }}
    >
      {children}
      {/* 0fr to 1fr animates to the content's real height, unlike max-height,
          which eases across a range the content never fills. */}
      <div
        className={cn(
          "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open && "grid-rows-[1fr]"
        )}
        id={panelId}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "mb-3.5 border-primary/40 border-l-2 pl-3.5 text-[14px] text-muted-foreground leading-[1.6] transition-opacity duration-200",
              open ? "opacity-100 delay-100" : "opacity-0"
            )}
          >
            {detail}
          </div>
        </div>
      </div>
    </RevealContext.Provider>
  );
}

/** The phrase itself. Reads as text until it is pointed at. */
export function RevealTrigger({ children }: { children: ReactNode }) {
  const state = useContext(RevealContext);
  if (!state) throw new Error("RevealTrigger must be used inside Reveal");

  return (
    <button
      aria-controls={state.panelId}
      aria-expanded={state.open}
      className={cn(
        "-mx-1 rounded-sm px-1 font-inherit text-inherit transition-colors",
        "hover:bg-primary-soft hover:text-foreground",
        state.open && "bg-primary-soft text-foreground"
      )}
      onClick={state.toggle}
      type="button"
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "ml-1 inline-block align-[0.08em] font-mono text-[0.72em] text-primary transition-transform duration-200 ease-out motion-reduce:transition-none",
          state.open && "rotate-90"
        )}
      >
        ›
      </span>
    </button>
  );
}
