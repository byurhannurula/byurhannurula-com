import Image from 'next/image';
import Link from 'next/link';

import { AppIcon } from '@/components/home/app-icon';
import { PROJECTS } from '@/content/projects';

/**
 * Tall tiles with the cover behind the text. Option: `projects=tiles`.
 * Text sits on a photo, so its colours are fixed, not tokens.
 */
export function ProjectTiles() {
  return (
    <div className="hidden grid-cols-1 gap-4 in-data-[projects=tiles]:grid md:grid-cols-3">
      {PROJECTS.map((project) => (
        <Link
          key={project.slug}
          href="/work"
          className="group/tile relative aspect-4/3 overflow-hidden rounded-xl bg-neutral-900 text-white no-underline shadow-[0_0_0_1px_var(--line)] md:aspect-3/4"
        >
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 768px) 24rem, 100vw"
            className="object-cover object-top-left transition-[scale] duration-1200 ease-soft group-hover/tile:scale-106"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-b from-black/80 to-transparent to-55%"
          />
          <div className="absolute inset-x-[1.4rem] top-[1.4rem] z-1">
            <small className="font-mono text-xs leading-none text-white/70">
              {project.kind}
            </small>
            <h3 className="mt-[0.4rem] mb-[0.3rem] text-2xl leading-[1.3] font-semibold tracking-[-0.03em]">
              {project.name}
            </h3>
            <p className="text-[0.9375rem] text-white/80">{project.short}</p>
          </div>
          <AppIcon
            src={project.icon}
            className="absolute bottom-[1.4rem] left-[1.4rem] z-1 size-10 rounded-[0.7rem]"
          />
        </Link>
      ))}
    </div>
  );
}
