"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Section, SubBlock } from "./section";

const ANIMATIONS = [
  "animate-fade-in",
  "animate-fade-in-delayed",
  "animate-fade-in-up",
  "animate-fade-in-item",
  "animate-fade-in-scale",
];

export function AnimationSection() {
  // Remounting via key re-triggers the CSS entrance animations.
  const [runId, setRunId] = useState(0);

  return (
    <Section
      id="animation"
      title="Animations"
      description="Entrance utilities and the stagger-children cascade."
    >
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRunId((n) => n + 1)}
        >
          Replay animations
        </Button>
      </div>

      <div key={runId} className="space-y-10">
        <SubBlock label="Entrance utilities">
          <div className="flex flex-wrap gap-4">
            {ANIMATIONS.map((cls) => (
              <div
                key={cls}
                className={`${cls} pg-mono flex h-20 w-40 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground text-xs`}
              >
                {cls}
              </div>
            ))}
          </div>
        </SubBlock>

        <SubBlock label=".stagger-children">
          <div className="stagger-children flex flex-wrap gap-3">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={`stagger-${i}`}
                className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/15 text-primary text-sm"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </SubBlock>
      </div>
    </Section>
  );
}
