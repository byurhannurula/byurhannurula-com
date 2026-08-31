"use client";

/**
 * Throwaway comparison route for footer backdrop options. Delete with the
 * directory once a variant is picked.
 */

import {
  Caret,
  CommentHeading,
  ProgressRule,
  ScrambleText,
  SweepRow,
} from "@/app/lab/details";
import { cn } from "@/lib/utils";

const FADE_UP = {
  maskImage: "linear-gradient(to top, black, transparent)",
  WebkitMaskImage: "linear-gradient(to top, black, transparent)",
} as const;

export default function LabPage() {
  return (
    <div className="py-12">
      <h1 className="mb-8 font-mono text-lg">footer backdrop lab</h1>

      <Section title="1 — interactive grid" />
      <Band label="interactive grid · cell 16px — hover to light cells">
        <InteractiveGrid cell={16} />
      </Band>

      <Section title="2 — micro details" />

      <Detail label="terminal caret — CSS only, steps(1), no easing">
        <Caret />
      </Detail>

      <Detail label="scramble text — hover or focus the line">
        <ScrambleText />
      </Detail>

      <Detail label="sweep rule — dashed fills solid on row hover">
        <SweepRow title="signature-generator" meta="open source" />
        <SweepRow title="gatsby-source-gitlab" meta="published" />
        <SweepRow title="dotfiles" meta="ongoing" />
      </Detail>

      <Detail label="comment heading — // becomes /* */ on hover">
        <CommentHeading title="selected projects" />
      </Detail>

      <Detail label="progress rule — tracks this page's scroll">
        <ProgressRule />
      </Detail>
    </div>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <p className="mb-2 font-mono text-[11.5px] text-muted-foreground">
        {label}
      </p>
      <div className="border border-border-dash border-dashed p-5">
        {children}
      </div>
    </div>
  );
}

function Section({ title }: { title: string }) {
  return (
    <h2 className="hairline-t mt-10 pt-4 font-mono text-[13px] text-primary">
      {title}
    </h2>
  );
}

function Band({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <p className="mb-1 font-mono text-[11.5px] text-muted-foreground">
        {label}
      </p>
      <div className="relative h-[140px] overflow-hidden border border-border-dash border-dashed">
        <div className="absolute inset-0" style={FADE_UP}>
          {children}
        </div>
      </div>
    </div>
  );
}

function InteractiveGrid({ cell = 24 }: { cell?: number }) {
  const cols = Math.ceil(720 / cell);
  const rows = Math.ceil(140 / cell);
  const width = cell;
  const height = cell;
  return (
    <svg
      aria-hidden
      className="h-full w-full"
      viewBox={`0 0 ${cols * width} ${rows * height}`}
      preserveAspectRatio="none"
    >
      <title>interactive grid</title>
      {Array.from({ length: cols * rows }).map((_, index) => {
        const x = (index % cols) * width;
        const y = Math.floor(index / cols) * height;
        return (
          <rect
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed-size static grid
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "fill-transparent stroke-[0.5] stroke-border-dash",
              "transition-[fill] duration-150 hover:fill-primary/30 hover:duration-0"
            )}
          />
        );
      })}
    </svg>
  );
}
