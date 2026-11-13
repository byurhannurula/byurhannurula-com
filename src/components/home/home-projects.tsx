import { ProjectPanels } from '@/components/home/project-panels';
import { ProjectRows } from '@/components/home/project-rows';
import { ProjectStrips } from '@/components/home/project-strips';
import { ProjectTiles } from '@/components/home/project-tiles';
import { ArrowLink } from '@/components/shared/arrow-link';
import { Section } from '@/components/shared/section';
import { PROJECTS_SECTION } from '@/content/home';
import { PROJECTS } from '@/content/projects';

/** Side projects, low on the page. The `projects` option picks the view. */
export function HomeProjects() {
  return (
    <Section
      id="made"
      title={PROJECTS_SECTION.title}
      sub={PROJECTS_SECTION.sub}
      action={<ArrowLink href="/work">{PROJECTS_SECTION.action}</ArrowLink>}
      className="in-data-[projects=off]:hidden"
    >
      <ProjectPanels projects={PROJECTS} />
      <ProjectStrips />
      <ProjectTiles />
      <ProjectRows />
    </Section>
  );
}
