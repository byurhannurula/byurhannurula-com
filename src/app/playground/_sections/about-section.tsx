import { SkillItem } from "@/components/about";
import { TimelineItem } from "@/components/about/timeline-item";
import { journeyData, SKILLS_DATA } from "@/config";

import { Section, SubBlock } from "./section";

export function AboutSection() {
  const timeline = journeyData.flatMap((group) => group.items).slice(0, 5);

  return (
    <Section
      id="about"
      title="About Components"
      description="Timeline and skill list building blocks."
      className="grid gap-12 sm:grid-cols-2"
    >
      <SubBlock label="Timeline">
        <div>
          {timeline.map((item) => (
            <TimelineItem key={`${item.title}-${item.year}`} {...item} />
          ))}
        </div>
      </SubBlock>

      <SubBlock label="Skill items">
        <div className="space-y-2">
          {SKILLS_DATA[0].skills.map((skill, i) => (
            <SkillItem key={skill.name} name={skill.name} delay={i * 0.05} />
          ))}
        </div>
      </SubBlock>
    </Section>
  );
}
