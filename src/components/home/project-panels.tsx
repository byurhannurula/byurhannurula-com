'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { AppIcon } from '@/components/home/app-icon';
import type { Project } from '@/content/projects';

interface ProjectPanelsProps {
  projects: Project[];
}

/**
 * Three panels; the open one shows the cover and the text. Option:
 * `projects=a`. Text sits on a photo, so its colours are fixed, not tokens.
 */
export function ProjectPanels({ projects }: ProjectPanelsProps) {
  const [open, setOpen] = useState(0);

  return (
    <div
      data-reveal
      className="hidden flex-col gap-3 in-data-[projects=a]:flex md:h-124 md:flex-row"
    >
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          href="/work"
          data-on={index === open ? '' : undefined}
          onPointerEnter={(event) => {
            // Touch has no hover: there the first tap opens the panel.
            if (event.pointerType === 'mouse') setOpen(index);
          }}
          onFocus={() => setOpen(index)}
          onClick={(event) => {
            if (index === open) return;
            event.preventDefault();
            setOpen(index);
          }}
          className="group/panel relative h-19 flex-none overflow-hidden rounded-xl bg-neutral-900 text-white no-underline shadow-[0_0_0_1px_var(--line)] transition-[height,flex] duration-700 ease-soft data-on:h-96 md:h-auto md:min-w-20 md:flex-[1_1_0] md:data-on:h-auto md:data-on:flex-[9_1_0]"
        >
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 768px) 60rem, 100vw"
            className="object-cover object-top-left opacity-35 transition-[opacity,scale] duration-500 ease-soft group-data-on/panel:opacity-100 group-data-on/panel:group-hover/panel:scale-103"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-black/45 group-data-on/panel:bg-transparent group-data-on/panel:bg-linear-to-t group-data-on/panel:from-black/88 group-data-on/panel:via-black/25 group-data-on/panel:via-45% group-data-on/panel:to-transparent group-data-on/panel:to-65%"
          />
          <span
            aria-hidden
            className="absolute top-5 right-5 z-1 grid size-8 place-items-center rounded-full bg-white/16 opacity-0 backdrop-blur-sm transition-[opacity,rotate,background-color] duration-300 ease-soft group-data-on/panel:opacity-100 group-data-on/panel:group-hover/panel:-rotate-45 group-data-on/panel:group-hover/panel:bg-white group-data-on/panel:group-hover/panel:text-neutral-900"
          >
            <ArrowRight className="size-[0.9rem]" />
          </span>
          <span
            aria-hidden
            className="absolute bottom-[1.35rem] left-5 z-1 flex items-center gap-[0.9rem] transition-opacity duration-300 group-data-on/panel:opacity-0 md:inset-x-0 md:bottom-5 md:flex-col"
          >
            <span className="text-lg font-semibold tracking-[-0.01em] md:rotate-180 md:[writing-mode:vertical-rl]">
              {project.name}
            </span>
            <AppIcon src={project.icon} />
          </span>
          <div className="pointer-events-none absolute right-7 bottom-[1.6rem] left-7 z-1 w-[min(30rem,calc(100%-3.5rem))] translate-y-3 opacity-0 [transition:opacity_0.3s,translate_0.5s_var(--ease-out-soft)] group-data-on/panel:translate-y-0 group-data-on/panel:opacity-100 group-data-on/panel:delay-250">
            <span className="font-mono text-xs leading-none font-medium text-green-300">
              {project.kind}
            </span>
            <h3 className="mt-[0.35rem] mb-[0.4rem] flex items-center gap-[0.7rem] text-[2rem] leading-[1.3] font-semibold tracking-[-0.03em]">
              <AppIcon src={project.icon} />
              {project.name}
            </h3>
            {/* The width is held from md up, so the text does not reflow while a
                panel grows. A phone panel is already full width. */}
            <p className="text-white/82 md:min-w-72">{project.short}</p>
            <span className="mt-[0.6rem] block font-mono text-[0.8125rem] leading-[1.6] text-white/55">
              {project.tags.slice(0, 3).join(', ')}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
