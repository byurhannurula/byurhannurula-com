"use client";

import Image from "next/image";
import { useState } from "react";

import type { UseItem } from "@/config";
import { cn } from "@/lib";

interface UsesGearItemProps {
  item: UseItem;
  index: number;
}

export function UsesGearItem({ item, index }: UsesGearItemProps) {
  const [showImage, setShowImage] = useState(false);

  return (
    <div
      className={cn(
        `relative animate-fade-in-item cursor-default select-none opacity-0`,
        showImage ? "z-50" : "z-0"
      )}
      style={{
        animationDelay: `${0.3 + index * 0.05}s`,
        animationFillMode: "forwards",
      }}
      onMouseEnter={() => setShowImage(true)}
      onMouseLeave={() => setShowImage(false)}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm">{item.name}</span>
        <span className="h-1 w-1 rounded-full bg-muted-foreground" />
        <p className="text-muted-foreground text-xs leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Hover Image */}
      {item.image && showImage && (
        <div className="pointer-events-none absolute bottom-full left-0 z-[9999] mb-2 animate-fade-in">
          <div className="overflow-hidden rounded-lg border border-border bg-background shadow-2xl">
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={200}
              className="h-auto w-[200px] object-cover"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
