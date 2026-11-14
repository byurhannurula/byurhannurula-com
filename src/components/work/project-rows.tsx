import Image from 'next/image';

import { AppIcon } from '@/components/uses/app-icon';
import { PreviewRows } from '@/components/work/preview-rows';
import { ProjectKind, ProjectLinks } from '@/components/work/project-bits';
import type { Project } from '@/content/projects';

interface ProjectRowsProps {
  projects: Project[];
}

/** The cover is one of the shots, so it has that shot's caption. */
const coverCaption = (project: Project) =>
  project.shots.find((shot) => shot.src === project.cover)?.caption ??
  `${project.name}, a screenshot.`;

/**
 * `work: rows`. Compact rows. A wide screen has one preview window beside
 * them; a phone has a small cover in each row.
 */
export function ProjectRows({ projects }: ProjectRowsProps) {
  return (
    <PreviewRows
      items={projects.map((project) => ({
        id: project.slug,
        picture: {
          src: project.cover,
          alt: coverCaption(project),
          ...project.coverSize,
        },
        row: (
          <article className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
            <AppIcon
              src={project.icon}
              size={40}
              className="mt-0.5 size-10 rounded-[0.75rem]"
            />
            <div>
              <h3 className="flex flex-wrap items-baseline gap-x-3 text-xl leading-[1.3] font-semibold tracking-[-0.02em]">
                {project.name}
                <ProjectKind>{project.kind}</ProjectKind>
              </h3>
              <p className="mt-1 max-w-[34rem] text-soft">{project.short}</p>
              <ProjectLinks
                links={project.links}
                className="text-[0.9375rem]"
              />
            </div>
            <Image
              src={project.cover}
              alt={coverCaption(project)}
              {...project.coverSize}
              sizes="auto, 100vw"
              className="col-span-full mt-4 aspect-16/10 w-full rounded-lg object-cover object-top shadow-[0_0_0_1px_var(--line)] in-data-[shots=small]:col-span-1 in-data-[shots=small]:col-start-2 in-data-[shots=small]:max-w-64 md:hidden"
            />
          </article>
        ),
      }))}
    />
  );
}
