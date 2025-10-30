"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { SkillItem } from "@/components/skill-item"
import { SKILLS_DATA } from "@/lib"

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="animate-fade-in mb-12">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
            About
          </h2>
        </div>
        <h1 className="text-3xl font-semibold md:text-4xl">
          Hey, I&apos;m <span className="text-primary">Byurhan</span>.{" "}
          <span className="text-2xl">👋</span>
        </h1>
      </div>

      <div className="stagger-children mb-12 space-y-4 text-sm leading-relaxed">
        <p className="text-base">
          Software engineer with 5 years of experience building web applications.
        </p>
        <p className="text-base">
          I started as a front-end developer but as I gained more experience, I expanded my skills
          to become a full-stack developer.
        </p>
        <p className="text-base">
          I believe in minimalism, both in design and code. My approach focuses on solving problems
          with the simplest solution possible, avoiding unnecessary complexity. I&apos;m always
          eager to learn new technologies and improve my skills.
        </p>
      </div>

      <div className="animate-fade-in mb-12" style={{ animationDelay: "0.2s" }}>
        <div className="mb-6 flex items-center gap-2">
          <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:gap-4 md:grid-cols-4">
          {SKILLS_DATA.map((category, categoryIndex) => (
            <div key={category.title}>
              <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider">
                {category.title}
              </h3>
              <div className="flex flex-col gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skill}
                    name={skill}
                    delay={skillIndex * 0.05 + categoryIndex * 0.1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
