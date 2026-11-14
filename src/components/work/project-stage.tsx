import { AppIcon } from '@/components/uses/app-icon';
import {
  ProjectKind,
  ProjectLinks,
  ProjectTags,
} from '@/components/work/project-bits';
import { StageSwitch } from '@/components/work/stage-switch';
import type { Project } from '@/content/projects';

interface ProjectStageProps {
  projects: Project[];
}

/** `work: stage`. One project at a time: its text and one large screenshot. */
export function ProjectStage({ projects }: ProjectStageProps) {
  return (
    <StageSwitch
      items={projects.map((project) => ({
        id: project.slug,
        name: project.name,
        shots: project.shots,
        icon: (
          <AppIcon
            src={project.icon}
            size={28}
            className="size-7 rounded-[0.5rem]"
          />
        ),
        text: (
          <>
            <h3 className="flex flex-wrap items-baseline gap-x-3 text-[1.625rem] leading-[1.3] font-semibold tracking-[-0.03em]">
              {project.name}
              <ProjectKind>{project.kind}</ProjectKind>
            </h3>
            <p className="mt-2 text-soft">{project.text}</p>
            <p className="mt-3">
              <ProjectTags tags={project.tags} />
            </p>
            <ProjectLinks links={project.links} className="mt-4" />
          </>
        ),
      }))}
    />
  );
}
