import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { GithubIcon } from "@/components/icons/social";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageWrapper } from "@/components/page-wrapper";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { SectionHeading } from "@/components/section-heading";
import { BackLink } from "@/components/ui";
import { createMetadata } from "@/config";
import { getProject, hasDetailPage, PROJECTS } from "@/config/projects";
import { cn } from "@/lib/utils";

// The project set is fixed, so anything outside generateStaticParams is a real
// 404 rather than a soft one rendered at request time.
export const dynamicParams = false;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.filter(hasDetailPage).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return createMetadata("/projects");

  return createMetadata(`/projects/${slug}`, {
    title: `${project.title} | Byurhan`,
    description: project.tagline,
  });
}

/**
 * The arrow grows the button instead of sitting in reserved space.
 *
 * A hidden-until-hover icon inside a fixed box leaves a gap that reads as a
 * mistake. This is the grid 0fr -> 1fr trick the tech chips already use, since
 * width alone cannot be animated.
 */
function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center rounded-sm border px-3 py-1.5",
        "border-border bg-background-soft font-mono text-[12px] text-muted-foreground",
        "no-underline transition-colors duration-150",
        "hover:border-primary hover:border-dashed hover:text-foreground",
        "motion-reduce:transition-none"
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "grid grid-cols-[0fr] transition-[grid-template-columns] duration-200 ease-out",
          "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]",
          "motion-reduce:transition-none"
        )}
      >
        <span className="min-w-0 overflow-hidden">
          <ArrowUpRight className="ml-1.5 size-3.5 shrink-0 text-primary" />
        </span>
      </span>
    </a>
  );
}

function TechChips({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-sm border border-border bg-background-soft px-2 py-[3px] font-mono text-[11px] text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!(project && hasDetailPage(project))) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
          { name: project.title, url: `/projects/${project.slug}` },
        ]}
      />
      <PageWrapper>
        <div className="mb-4">
          <BackLink href="/projects">back to projects</BackLink>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3">
            {project.icon && (
              <Image
                src={project.icon}
                alt=""
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-lg"
              />
            )}
            <h1 className="min-w-0">{project.title}</h1>
          </div>
          <p className="mt-2 text-muted-foreground">{project.tagline}</p>

          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11.5px] text-faint">
            <div className="flex gap-2">
              <dt>status</dt>
              <dd className="text-muted-foreground">{project.status}</dd>
            </div>
            {project.platforms && (
              <div className="flex gap-2">
                <dt>runs on</dt>
                <dd className="text-muted-foreground">
                  {project.platforms.join(", ")}
                </dd>
              </div>
            )}
            {project.license && (
              <div className="flex gap-2">
                <dt>license</dt>
                <dd className="text-muted-foreground">{project.license}</dd>
              </div>
            )}
          </dl>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.url && <LinkButton href={project.url}>website</LinkButton>}
            {project.chromeStore && (
              <LinkButton href={project.chromeStore}>
                chrome web store
              </LinkButton>
            )}
            {project.firefoxAddon && (
              <LinkButton href={project.firefoxAddon}>
                firefox add-ons
              </LinkButton>
            )}
            {project.github && (
              <LinkButton href={project.github}>
                <GithubIcon aria-hidden="true" className="mr-1.5 size-3.5" />
                source
              </LinkButton>
            )}
          </div>

          <div className="mt-3">
            <TechChips tags={project.tags} />
          </div>
        </div>

        {project.description && (
          <p className="max-w-[62ch] text-[15px] leading-[1.7]">
            {project.description}
          </p>
        )}

        {project.shots?.length ? (
          <section>
            <SectionHeading>screenshots</SectionHeading>
            <ProjectGallery shots={project.shots} />
          </section>
        ) : null}

        {project.features?.length ? (
          <section>
            <SectionHeading>what it does</SectionHeading>
            <ul className="flex flex-col">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="hairline flex items-start gap-2.5 py-2.5 text-[14px] leading-[1.6]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1 shrink-0 rounded-full bg-primary"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.aside && (
          <section>
            <SectionHeading>{project.aside.heading}</SectionHeading>
            <p className="max-w-[62ch] text-[14.5px] leading-[1.7]">
              {project.aside.body}
            </p>
            {project.aside.link && (
              <div className="mt-4">
                <LinkButton href={project.aside.link.href}>
                  <GithubIcon aria-hidden="true" className="mr-1.5 size-3.5" />
                  {project.aside.link.label}
                </LinkButton>
              </div>
            )}
          </section>
        )}
      </PageWrapper>
    </>
  );
}
