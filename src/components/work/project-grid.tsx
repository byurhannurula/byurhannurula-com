import Image from 'next/image';

import { AppIcon } from '@/components/uses/app-icon';
import { ProjectKind, ProjectLinks } from '@/components/work/project-bits';
import { shotSize } from '@/components/work/shot-sizes';
import type { Project } from '@/content/projects';

interface ProjectGridProps {
  projects: Project[];
}

/** `work: grid`. Two columns: cover, name, one line and links. */
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
      {projects.map((project) => (
        <article key={project.slug}>
          <div className="overflow-hidden rounded-xl bg-sunk shadow-[0_0_0_1px_var(--line)]">
            <Image
              src={project.cover}
              alt=""
              {...shotSize(project.cover)}
              sizes="(min-width: 768px) 32rem, 100vw"
              className="aspect-16/10 w-full object-cover object-top"
            />
          </div>
          <h3 className="mt-[1.1rem] mb-[0.4rem] flex items-center gap-[0.6rem] text-[1.375rem] leading-[1.3] font-semibold tracking-[-0.025em]">
            <AppIcon src={project.icon} />
            {project.name}
            <ProjectKind>{project.kind}</ProjectKind>
          </h3>
          <p className="text-soft">{project.short}</p>
          <ProjectLinks links={project.links} />
        </article>
      ))}
    </div>
  );
}
