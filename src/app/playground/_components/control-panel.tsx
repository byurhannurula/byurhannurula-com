"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import type React from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { usePlayground } from "../_lib/playground-context";
import { AccentControls } from "./accent-controls";
import { FontSwitcher } from "./font-switcher";
import { PaletteSwatches } from "./palette-swatches";
import { RadiusControl } from "./radius-control";
import { TokenExport } from "./token-export";
import { TypeScaleControl } from "./type-scale-control";

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3 border-border/60 border-t py-5 first:border-t-0 first:pt-0">
      <h3 className="font-medium text-sm">{title}</h3>
      {children}
    </section>
  );
}

export function ControlPanel() {
  const { resetAll } = usePlayground();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-5 left-5 z-40 size-12 rounded-full shadow-lg"
          aria-label="Open design controls"
        >
          <SlidersHorizontal />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Design controls</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <Panel title="Theme">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <span className="text-muted-foreground text-sm">
                Light / dark (global)
              </span>
            </div>
          </Panel>

          <Panel title="Accent">
            <AccentControls />
          </Panel>

          <Panel title="Fonts">
            <FontSwitcher />
          </Panel>

          <Panel title="Type scale">
            <TypeScaleControl />
          </Panel>

          <Panel title="Radius">
            <RadiusControl />
          </Panel>

          <Panel title="Palette">
            <PaletteSwatches />
          </Panel>

          <Panel title="Export">
            <TokenExport />
          </Panel>

          <Panel title="Reset">
            <Button variant="outline" size="sm" onClick={resetAll}>
              <RotateCcw />
              Reset all overrides
            </Button>
          </Panel>
        </div>
      </SheetContent>
    </Sheet>
  );
}
