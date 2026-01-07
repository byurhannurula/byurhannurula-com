import Link from "next/link";
import { TimelineItem } from "@/components/about";
import * as TechLogos from "@/components/icons";
import { PageWrapper } from "@/components/page-wrapper";
import {
  createMetadata,
  journeyData,
  SITE_CONFIG,
  SKILLS_DATA,
} from "@/config";
import { cn } from "@/lib";

export const metadata = createMetadata("/about");

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="space-y-12">
        <div className="animate-fade-in">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="font-medium font-mono text-muted-foreground text-xs uppercase tracking-wider">
              About
            </h2>
          </div>
          <h1 className="font-bold text-3xl md:text-4xl">
            Hey, I&apos;m <span className="text-primary">Byurhan</span>.
          </h1>
        </div>

        <div className="stagger-children space-y-4">
          <p className="text-base text-muted-foreground leading-relaxed">
            Software engineer with 5+ years of experience building web
            applications. I started as a front-end developer and expanded into
            full-stack development over time.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            I believe in minimalism - both in design and code. My approach
            focuses on solving problems with the simplest solution possible,
            avoiding unnecessary complexity.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            Outside of work, I enjoy tinkering with my homelab, 3D printing, and
            exploring new technologies. I&apos;m passionate about privacy,
            self-hosting, and building tools that make life easier.
          </p>
        </div>

        {/* Current Focus */}
        <div className="animate-fade-in-up">
          <h2 className="mb-4 font-medium font-mono text-muted-foreground text-xs uppercase tracking-wider">
            Current Focus
          </h2>
          <div className="stagger-children space-y-2">
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground">→</span> Building and
              documenting my homelab setup
            </p>
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground">→</span> Learning more about
              networking and infrastructure
            </p>
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground">→</span> Writing technical
              articles and sharing knowledge
            </p>
          </div>
        </div>

        {/* Journey */}
        <div className="animate-fade-in-up">
          <h2 className="mb-6 font-medium font-mono text-muted-foreground text-xs uppercase tracking-wider">
            Journey
          </h2>
          <div className="relative space-y-0">
            {/* Timeline line */}
            <div className="absolute top-2 left-[7px] h-[calc(100%-16px)] w-px bg-border" />

            {journeyData.map((section) => (
              <div key={section.label}>
                {/* Section label */}
                <div
                  className={cn(
                    "relative pb-4 pl-8",
                    section.type === "past" && "pt-2"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1.5 left-0 h-3.5 w-3.5 rounded-full border-2 bg-background",
                      section.type === "now"
                        ? "border-primary"
                        : "border-muted-foreground/50"
                    )}
                  />
                  <p
                    className={cn(
                      "font-medium text-xs uppercase tracking-wider",
                      section.type === "now"
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {section.label}
                  </p>
                </div>

                {/* Section items */}
                {section.items.map((item, index) => (
                  <TimelineItem key={`${section.label}-${index}`} {...item} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="animate-fade-in-up">
          <h2 className="mb-6 font-medium font-mono text-muted-foreground text-xs uppercase tracking-wider">
            Tech Stack
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {SKILLS_DATA.map((category) => (
              <div key={category.title}>
                <h3 className="mb-3 font-medium">{category.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => {
                    const LogoComponent = skill.logo
                      ? TechLogos[skill.logo as keyof typeof TechLogos]
                      : null;
                    return (
                      <span
                        key={skill.name}
                        className="group flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-2 text-muted-foreground text-xs transition-colors hover:cursor-default hover:bg-muted/80 hover:text-foreground"
                      >
                        {LogoComponent && (
                          <span className="h-4 w-4 transition-transform group-hover:scale-110">
                            <LogoComponent />
                          </span>
                        )}
                        <span>{skill.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="animate-fade-in-up">
          <h2 className="mb-4 font-medium font-mono text-muted-foreground text-xs uppercase tracking-wider">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-sm">
            Feel free to reach out via{" "}
            <a
              href={SITE_CONFIG.social.email}
              className="text-foreground underline-offset-4 hover:underline"
            >
              email
            </a>{" "}
            , use{" "}
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/contact"
            >
              contact form
            </Link>{" "}
            or connect on{" "}
            <a
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
