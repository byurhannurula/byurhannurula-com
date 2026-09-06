"use client";

import { useState } from "react";

import { Brand } from "@/components/inline";
import {
  Aside,
  LiveCount,
  PaletteKey,
  PhotoPhrase,
} from "@/components/lab/inline";
import { TerminalChip } from "@/components/lab/loose-parts";
import { Reel } from "@/components/lab/reel";
import { SplitFlap } from "@/components/lab/split-flap";
import { Scramble } from "@/components/lab/text-effects";
import { LAB_FLIP_WORDS, LAB_SPEC } from "@/config/lab";
import { getStackItem } from "@/config/stack";
import { playSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

const CODING_SINCE = 2012;
const SELF_HOSTED_COUNT = 17;

const react = getStackItem("react");
const typescript = getStackItem("typescript");
const node = getStackItem("node");

/* ================================================================== *
 * A. The living paragraph
 * ================================================================== */

/**
 * Pedro Marques' inline marks plus one Emily Campbell object per paragraph.
 *
 * The restraint is the design: marks are grey until hovered, only three phrases
 * hold anything, and the copy is the copy that was already on the homepage.
 */
export function HeroLiving() {
  const years = new Date().getFullYear() - CODING_SINCE;

  return (
    <div>
      <h2 className="mb-4 text-[26px] leading-[1.35] tracking-[-0.5px]">
        Hi, I&apos;m Byurhan, a developer who{" "}
        <SplitFlap className="text-primary" words={LAB_FLIP_WORDS} />
      </h2>

      <p className="mb-3.5">
        I have been writing code{" "}
        <Aside detail={`${years} years`}>since 6th grade</Aside>. Days are{" "}
        <Brand logo={react.icon}>React</Brand>,{" "}
        <Brand logo={typescript.icon}>TypeScript</Brand> and{" "}
        <Brand logo={node.icon}>Node</Brand>; nights are a soldering iron, a 3D
        printer, and{" "}
        <LiveCount count={SELF_HOSTED_COUNT} href="/uses" label="services" />{" "}
        nobody asked for.
      </p>

      <p className="mb-3.5">
        I care about software that is small, private, owned and repairable, the
        kind you run on{" "}
        <PhotoPhrase
          alt="An HP EliteDesk 800 G3 Mini"
          caption="the whole homelab, 65 watts"
          src="/assets/images/hp-elitedesk-800-g3-mini.jpg"
        >
          a machine you can actually touch
        </PhotoPhrase>
        .
      </p>

      <p className="text-muted-foreground">
        Everything on this site is one keystroke away. Try <PaletteKey />.
      </p>
    </div>
  );
}

/* ================================================================== *
 * B. The spec sheet
 * ================================================================== */

/**
 * The same facts in two voices, with a real switch in the sentence.
 *
 * The swap runs inside a view transition, so the browser morphs between two
 * completely different trees for about five lines of code. Falls back to an
 * instant swap where the API is missing, which is correct rather than degraded.
 */
export function HeroSpec() {
  const [spec, setSpec] = useState(false);

  const toggle = () => {
    playSound(spec ? "close" : "open");
    const run = () => setSpec((value) => !value);
    if (document.startViewTransition) {
      document.startViewTransition(run);
      return;
    }
    run();
  };

  return (
    <div>
      <h2 className="mb-4 text-[26px] leading-[1.35] tracking-[-0.5px]">
        Hi, I&apos;m Byurhan, a developer who tinkers.
      </h2>

      <p className="mb-4 text-muted-foreground">
        Read this as{" "}
        <button
          aria-pressed={spec}
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-background-soft px-2 py-[3px] align-[0.05em] font-mono text-[0.8em] text-foreground transition-colors hover:border-primary"
          data-no-sound=""
          onClick={toggle}
          type="button"
        >
          <span
            aria-hidden="true"
            className={cn(
              "relative block h-3 w-6 rounded-full transition-colors duration-200",
              spec ? "bg-primary" : "bg-border"
            )}
          >
            <span
              className={cn(
                "absolute top-[2px] left-[2px] block size-2 rounded-full bg-background transition-[translate] duration-200 ease-out motion-reduce:transition-none",
                spec && "translate-x-3"
              )}
            />
          </span>
          {spec ? "a spec sheet" : "a paragraph"}
        </button>
      </p>

      <div style={{ viewTransitionName: "lab-bio" }}>
        {spec ? (
          <dl className="hairline-t">
            {LAB_SPEC.map((row) => (
              <div
                className="hairline flex gap-4 py-2 text-[13.5px]"
                key={row.key}
              >
                <dt className="w-24 shrink-0 font-mono text-[12px] text-primary">
                  {row.key}
                </dt>
                <dd className="text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <>
            <p className="mb-3.5">
              I have been writing code since 6th grade. Days are React,
              TypeScript and Node; nights are a soldering iron, a 3D printer,
              and one more service nobody asked for.
            </p>
            <p className="text-muted-foreground">
              I care about software that is small, private, owned and
              repairable, the kind you run on a machine you can actually touch.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ================================================================== *
 * C. Four ways to change a word
 * ================================================================== */

const MECHANISMS = [
  {
    name: "split-flap",
    note: "Steps the drum one flap at a time and stops when the letter arrives, so the columns settle at different moments. A column whose letter is not changing goes all the way round rather than standing still.",
  },
  {
    name: "reel",
    note: "Throws twelve throwaway letters past the window and lands the real one. Every slot moves on every change, which is what the mechanism buys you over the flap.",
  },
  {
    name: "scramble",
    note: "Resolves out of noise from left to right. No element moves, so it is a string on a timer and needs no animation library at all.",
  },
  {
    name: "terminal",
    note: "Types itself and erases itself, sized to its longest line from the start so a paragraph is never re-flowed a character at a time.",
  },
] as const;

const TERMINAL_LINES = [
  "reading: kleppmann, ch. 5",
  "learning: optical sizing",
  "building: this page",
  "stuck on: naming things",
] as const;

/**
 * The same job done three ways, side by side, because the only way to choose
 * between them is to watch them next to each other.
 *
 * None of them runs on its own. Something that changes while it is being read
 * is an advertisement; something that changes when it is touched is a thing
 * the reader found.
 */
export function HeroText() {
  return (
    <div>
      <h2 className="mb-5 text-[26px] leading-[1.35] tracking-[-0.5px]">
        Four ways to change a word.
      </h2>

      <div className="hairline-t">
        <div className="hairline flex flex-wrap items-baseline gap-x-4 gap-y-2 py-4">
          <span className="w-24 shrink-0 font-mono text-[12px] text-primary">
            {MECHANISMS[0].name}
          </span>
          <SplitFlap className="text-foreground" words={LAB_FLIP_WORDS} />
          <p className="w-full text-[13px] text-muted-foreground leading-snug">
            {MECHANISMS[0].note}
          </p>
        </div>

        <div className="hairline flex flex-wrap items-baseline gap-x-4 gap-y-2 py-4">
          <span className="w-24 shrink-0 font-mono text-[12px] text-primary">
            {MECHANISMS[1].name}
          </span>
          <Reel className="text-[26px] text-foreground" word="rebuilds" />
          <p className="w-full text-[13px] text-muted-foreground leading-snug">
            {MECHANISMS[1].note}
          </p>
        </div>

        <div className="hairline flex flex-wrap items-baseline gap-x-4 gap-y-2 py-4">
          <span className="w-24 shrink-0 font-mono text-[12px] text-primary">
            {MECHANISMS[2].name}
          </span>
          <Scramble className="text-[20px] text-foreground">
            over-engineers
          </Scramble>
          <p className="w-full text-[13px] text-muted-foreground leading-snug">
            {MECHANISMS[2].note}
          </p>
        </div>

        <div className="hairline flex flex-wrap items-baseline gap-x-4 gap-y-2 py-4">
          <span className="w-24 shrink-0 font-mono text-[12px] text-primary">
            {MECHANISMS[3].name}
          </span>
          <TerminalChip lines={TERMINAL_LINES} />
          <p className="w-full text-[13px] text-muted-foreground leading-snug">
            {MECHANISMS[3].note}
          </p>
        </div>
      </div>
    </div>
  );
}
