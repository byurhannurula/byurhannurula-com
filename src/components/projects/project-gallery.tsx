"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";

import type { ProjectShot } from "@/config/projects";
import { cn } from "@/lib/utils";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

/**
 * Screenshots for a project page, in the same justified rows the MDX galleries
 * use: a lone shot runs full width, pairs sit side by side.
 *
 * The lightbox only mounts once opened, so a closed gallery creates no portal.
 */
export function ProjectGallery({ shots }: { shots: ProjectShot[] }) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  // A trailing odd shot gets the full width rather than a half-empty row.
  const rows: ProjectShot[][] = [];
  for (let i = 0; i < shots.length; i += 2) {
    const pair = shots.slice(i, i + 2);
    rows.push(pair.length === 2 ? pair : [pair[0] as ProjectShot]);
  }

  let index = -1;

  return (
    <>
      <div className="flex flex-col gap-3">
        {rows.map((row) => {
          const rowKey = row.map((shot) => shot.src).join("|");
          return (
            <div
              key={rowKey}
              className={cn(
                "grid gap-3",
                row.length === 2 ? "sm:grid-cols-2" : "grid-cols-1"
              )}
            >
              {row.map((shot) => {
                index += 1;
                const at = index;
                return (
                  <figure key={shot.src}>
                    <button
                      type="button"
                      onClick={() => setOpenAt(at)}
                      aria-label={`Enlarge: ${shot.alt}`}
                      className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-background-soft p-0 transition-colors duration-150 hover:border-primary hover:border-dashed motion-reduce:transition-none"
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={2000}
                        height={1406}
                        sizes="(max-width: 640px) 100vw, 336px"
                        className="h-auto w-full"
                      />
                    </button>
                    {shot.caption && (
                      <figcaption className="mt-2 font-mono text-[11.5px] text-faint leading-snug">
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          );
        })}
      </div>

      {openAt !== null && (
        <Lightbox
          open
          close={() => setOpenAt(null)}
          index={openAt}
          slides={shots.map((shot) => ({ src: shot.src, alt: shot.alt }))}
          carousel={{ finite: true }}
        />
      )}
    </>
  );
}
