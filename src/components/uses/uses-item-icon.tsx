"use client";

import Image from "next/image";
import { useState } from "react";

import type { UseItem } from "@/config";
import { cn } from "@/lib/utils";

import { iconFor, isMonoBlack } from "./uses-icons";

function LetterTile({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center bg-background-soft font-mono font-semibold text-muted-foreground",
        className
      )}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

/**
 * One thumb shape for every row: photo for gear, brand mark for
 * apps and services, letter tile when neither exists or the mark 404s.
 */
export function ItemIcon({
  item,
  className,
  dimmed = false,
}: {
  item: UseItem;
  className?: string;
  /** Grayscale until the row is hovered: the shelf rests, then wakes up. */
  dimmed?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const icon = iconFor(item.name);
  const mono = isMonoBlack(item.name);
  const box = cn(
    "relative block size-11 shrink-0 overflow-hidden rounded-md border border-border bg-background-soft",
    className
  );
  const tone = cn(
    "h-full w-full transition-[filter,opacity,scale] duration-200 ease-out motion-reduce:transition-none",
    dimmed &&
      "opacity-80 grayscale group-hover:scale-[1.06] group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:group-hover:scale-100"
  );

  if (item.image) {
    return (
      <span className={box}>
        <Image
          src={item.image}
          alt=""
          width={88}
          height={88}
          loading="lazy"
          className={cn(tone, "object-cover")}
        />
      </span>
    );
  }

  if (icon && !failed) {
    return (
      <span className={cn(box, "p-2")}>
        {/* biome-ignore lint/performance/noImgElement: brand marks must not use /_next/image */}
        <img
          alt=""
          decoding="async"
          loading="lazy"
          src={icon}
          onError={() => setFailed(true)}
          className={cn(tone, "object-contain", mono && "dark:invert")}
        />
      </span>
    );
  }

  return (
    <LetterTile name={item.name} className={cn(box, "flex text-[15px]")} />
  );
}
