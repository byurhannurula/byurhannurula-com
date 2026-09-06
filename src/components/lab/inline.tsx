"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { OPEN_COMMAND_PALETTE_EVENT } from "@/components/command-palette";
import { playSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Inline hover card
 * ------------------------------------------------------------------ */

/**
 * A phrase that has an object behind it.
 *
 * The card is absolutely positioned and centred on the phrase, so a long
 * paragraph never reflows when one opens. It is held in the DOM at zero opacity
 * rather than mounted on hover, so the image is already decoded when it appears.
 */
function InlineCard({
  children,
  card,
  className,
  width = 232,
}: {
  children: ReactNode;
  card: ReactNode;
  className?: string;
  width?: number;
}) {
  return (
    <span className={cn("group relative inline-block", className)}>
      <span className="cursor-help underline decoration-border-dash decoration-dashed underline-offset-4 transition-colors group-hover:decoration-primary">
        {children}
      </span>
      <span
        className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-30 block origin-bottom -translate-x-1/2 translate-y-1 rotate-[-1.5deg] scale-95 rounded-lg border border-border bg-background p-1.5 opacity-0 shadow-xl transition-[opacity,translate,scale,rotate] duration-200 ease-out group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none"
        style={{ width }}
      >
        {card}
      </span>
    </span>
  );
}

/** A phrase that reveals a photograph. */
export function PhotoPhrase({
  children,
  src,
  alt,
  caption,
}: {
  children: ReactNode;
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <InlineCard
      card={
        <>
          <Image
            alt={alt}
            className="block h-auto w-full rounded-md"
            height={160}
            src={src}
            width={232}
          />
          {caption ? (
            <span className="mt-1.5 block px-1 pb-0.5 font-mono text-[11px] text-faint">
              {caption}
            </span>
          ) : null}
        </>
      }
    >
      {children}
    </InlineCard>
  );
}

/* ------------------------------------------------------------------ *
 * Small facts
 * ------------------------------------------------------------------ */

/**
 * A phrase whose number is only shown when someone leans in.
 *
 * Expanded with a 0fr -> 1fr grid, the same trick the link embeds use, because
 * `width: auto` cannot be animated.
 */
export function Aside({
  children,
  detail,
}: {
  children: ReactNode;
  detail: string;
}) {
  return (
    <span className="group inline-flex items-baseline">
      <span className="underline decoration-border-dash decoration-dashed underline-offset-4 transition-colors group-hover:decoration-primary">
        {children}
      </span>
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover:grid-cols-[1fr] motion-reduce:transition-none">
        <span className="min-w-0 overflow-hidden">
          <span className="block whitespace-nowrap pl-1.5 font-mono text-[0.8em] text-primary">
            {detail}
          </span>
        </span>
      </span>
    </span>
  );
}

/** Live count with a slow pulse, so the number reads as current. */
export function LiveCount({
  count,
  label,
  href,
}: {
  count: number;
  label: string;
  href?: string;
}) {
  const Tag = href ? "a" : "span";
  return (
    <Tag
      className="group inline-flex items-center gap-1.5 rounded-sm border border-border bg-background-soft px-1.5 py-px align-[0.1em] font-mono text-[0.78em] text-muted-foreground no-underline transition-colors hover:border-primary hover:text-foreground"
      href={href}
    >
      <span
        aria-hidden="true"
        className="lab-pulse size-1.5 rounded-full bg-primary"
      />
      <span className="text-foreground tabular-nums">{count}</span>
      {label}
    </Tag>
  );
}

/** A real key, in the sentence, that opens the palette it names. */
export function PaletteKey() {
  const [pressed, setPressed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  return (
    <button
      className={cn(
        "inline-flex translate-y-[-0.05em] items-center gap-1 rounded-[5px] border border-border border-b-2 bg-background-soft px-1.5 py-px align-baseline font-mono text-[0.8em] text-foreground transition-[translate,border,background] duration-100 hover:border-primary hover:bg-primary-soft",
        pressed && "translate-y-[0.05em] border-b"
      )}
      data-no-sound=""
      onClick={() => {
        setPressed(true);
        playSound("open");
        window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE_EVENT));
        timer.current = setTimeout(() => setPressed(false), 140);
      }}
      type="button"
    >
      <span aria-hidden="true">&#8984;</span>K
    </button>
  );
}
