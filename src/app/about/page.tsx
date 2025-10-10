"use client"

import { motion } from "framer-motion"
import { SkillItem } from "@/components/skill-item"

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-screen-md px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground font-mono">About</h2>
          </div>
          <h1 className="text-3xl font-semibold md:text-4xl">
            Hey, I&apos;m <span className="text-primary">Byurhan</span>. 👋
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 space-y-4 text-sm leading-relaxed"
        >
          <p className="text-base">
            Software engineer with 5 years of experience building web applications.
          </p>
          <p className="text-base">
            I started as a front-end developer but as I gained more experience, I expanded my skills to become a full-stack
            developer.
          </p>
          <p className="text-base">
            I believe in minimalism, both in design and code. My approach focuses on solving problems with the simplest
            solution possible, avoiding unnecessary complexity. I'm always eager to learn new technologies and improve
            my skills.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-2">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground font-mono">Skills</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-4">
            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-wider font-mono">Frontend</h3>
              <div className="flex flex-col gap-2">
                <SkillItem name="HTML/CSS" delay={0.1} />
                <SkillItem name="React" delay={0.15} />
                <SkillItem name="Next.js" delay={0.2} />
                <SkillItem name="TypeScript" delay={0.25} />
                <SkillItem name="JavaScript" delay={0.3} />
                <SkillItem name="TailwindCSS" delay={0.35} />
                <SkillItem name="Shadcn UI" delay={0.4} />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-wider font-mono">Backend</h3>
              <div className="flex flex-col gap-2">
                <SkillItem name="Node.js" delay={0.1} />
                <SkillItem name="Express" delay={0.15} />
                <SkillItem name="MongoDB" delay={0.2} />
                <SkillItem name="MySQL" delay={0.25} />
                <SkillItem name="PostgreSQL" delay={0.3} />
                <SkillItem name="REST APIs" delay={0.35} />
                <SkillItem name="GraphQL" delay={0.4} />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-wider font-mono">Applications</h3>
              <div className="flex flex-col gap-2">
                <SkillItem name="Figma" delay={0.1} />
                <SkillItem name="Postman" delay={0.15} />
                <SkillItem name="Notion" delay={0.2} />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-wider font-mono">Tools & Others</h3>
              <div className="flex flex-col gap-2">
                <SkillItem name="Git" delay={0.1} />
                <SkillItem name="Docker" delay={0.15} />
                <SkillItem name="Nginx/Apache" delay={0.25} />
                <SkillItem name="Linux" delay={0.2} />
                <SkillItem name="CI/CD" delay={0.35} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
