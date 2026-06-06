"use client";

import { Bell, Plus } from "lucide-react";

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "../_data/showcase";
import { Section, SubBlock } from "./section";

export function UiPrimitivesSection() {
  return (
    <Section
      id="ui"
      title="UI Primitives"
      description="The shadcn/Radix building blocks, every variant and state."
      className="space-y-12"
    >
      <SubBlock label="Buttons — variants × sizes" className="space-y-3">
        {BUTTON_VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            {BUTTON_SIZES.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {variant}
              </Button>
            ))}
            <Button variant={variant} size="icon" aria-label="icon button">
              <Plus />
            </Button>
            <Button variant={variant} disabled>
              disabled
            </Button>
          </div>
        ))}
      </SubBlock>

      <div className="grid gap-12 sm:grid-cols-2">
        <SubBlock label="Input & Label">
          <div className="max-w-sm space-y-2">
            <Label htmlFor="pg-input">Email address</Label>
            <Input id="pg-input" type="email" placeholder="you@example.com" />
          </div>
        </SubBlock>

        <SubBlock label="Toggle">
          <div className="flex gap-3">
            <Toggle aria-label="toggle bell">
              <Bell />
            </Toggle>
            <Toggle variant="outline" aria-label="toggle outline">
              Outline
            </Toggle>
          </div>
        </SubBlock>

        <SubBlock label="Separator">
          <div className="max-w-sm">
            <p className="text-sm">Above the line</p>
            <Separator className="my-3" />
            <p className="text-sm">Below the line</p>
          </div>
        </SubBlock>

        <SubBlock label="Skeleton">
          <div className="max-w-sm space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
        </SubBlock>

        <SubBlock label="Tooltip">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>A helpful tooltip</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SubBlock>

        <SubBlock label="Dialog & Sheet">
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog title</DialogTitle>
                  <DialogDescription>
                    A modal dialog rendered via Radix.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sheet title</SheetTitle>
                  <SheetDescription>A slide-over panel.</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </SubBlock>
      </div>

      <SubBlock label="Command palette">
        <div className="max-w-sm overflow-hidden rounded-lg border">
          <Command>
            <CommandInput placeholder="Type a command…" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Pages">
                <CommandItem>Home</CommandItem>
                <CommandItem>Notes</CommandItem>
                <CommandItem>About</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem>Toggle theme</CommandItem>
                <CommandItem>Copy link</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </SubBlock>
    </Section>
  );
}
