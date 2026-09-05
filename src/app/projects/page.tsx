import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GithubIcon } from "@/components/icons/social";
import { PageWrapper } from "@/components/page-wrapper";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/config";
import { hasDetailPage, PROJECTS } from "@/config/projects";
import { cn } from "@/lib/utils";

export const metadata = createMetadata("/projects");

export default function ProjectsPage() {
  const shipped = PROJECTS.filter(hasDetailPage);
  const rest = PROJECTS.filter((project) => !hasDetailPage(project));

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1>Projects</h1>
        <p className="mt-2 text-muted-foreground">
          Things I have built, tinkered with, and experimented on.
        </p>
      </div>

      <section>
        <SectionHeading>apps and extensions</SectionHeading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {shipped.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative block aspect-[16/10] overflow-hidden rounded-xl border border-border no-underline"
            >
              {(project.cardImage ?? project.shots?.[0]?.src) && (
                <Image
                  src={(project.cardImage ?? project.shots?.[0]?.src) as string}
                  alt=""
                  width={2000}
                  height={1406}
                  sizes="(max-width: 640px) 100vw, 336px"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover object-top",
                    "transition-[scale] duration-300 ease-out group-hover:scale-[1.03]",
                    "motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  )}
                />
              )}

              {/* The label sits on the artwork, so it needs its own ground to
                  stay legible whatever the screenshot happens to be. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-background/95 via-background/70 to-transparent"
              />

              <span className="relative flex h-full flex-col p-3.5">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {project.platforms?.[0] ?? project.status}
                </span>
                <span className="mt-0.5 font-semibold text-[15px] text-foreground">
                  {project.title}
                </span>

                <span className="mt-auto flex items-end justify-end">
                  <ArrowRight
                    aria-hidden="true"
                    className={cn(
                      "size-4 shrink-0 -translate-x-1.5 text-primary opacity-0",
                      "transition-[opacity,translate] duration-200 ease-out",
                      "group-hover:translate-x-0 group-hover:opacity-100",
                      "motion-reduce:translate-x-0 motion-reduce:transition-none"
                    )}
                  />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>repositories</SectionHeading>
        <div>
          {rest.map((project) => (
            <a
              key={project.slug}
              href={project.github ?? project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline group flex items-center gap-3 px-2 py-3 no-underline transition-colors duration-150 ease-out hover:bg-background-soft motion-reduce:transition-none"
            >
              <GithubIcon
                aria-hidden="true"
                className="size-4 shrink-0 text-faint transition-colors group-hover:text-foreground motion-reduce:transition-none"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-[15px] text-foreground transition-colors group-hover:text-primary motion-reduce:transition-none">
                  {project.title}
                </span>
                <span className="mt-0.5 block text-[13px] text-muted-foreground">
                  {project.tagline}
                </span>
              </span>
              <span className="label-mono hidden shrink-0 sm:block">
                {project.status}
              </span>
              <ArrowRight
                aria-hidden="true"
                className={cn(
                  "size-4 shrink-0 -translate-x-1.5 text-primary opacity-0",
                  "transition-[opacity,translate] duration-200 ease-out",
                  "group-hover:translate-x-0 group-hover:opacity-100",
                  "motion-reduce:translate-x-0 motion-reduce:transition-none"
                )}
              />
            </a>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
