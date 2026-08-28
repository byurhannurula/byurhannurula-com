import Link from "next/link";

import { HeroLinks } from "@/components/hero-links";
import { RssIcon } from "@/components/icons";
import { PersonJsonLd, WebsiteJsonLd } from "@/components/json-ld";
import { PageWrapper } from "@/components/page-wrapper";
import { RowLink } from "@/components/row-link";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/config";
import { getFeaturedProjects } from "@/config/projects";
import { getAllPosts } from "@/lib/server";

export const metadata = createMetadata("/");

const LATEST_NOTES_COUNT = 3;

export default function Home() {
  const projects = getFeaturedProjects();
  const notes = getAllPosts().slice(0, LATEST_NOTES_COUNT);

  return (
    <>
      <WebsiteJsonLd />
      <PersonJsonLd />
      <PageWrapper>
        <h1 className="mb-4 text-[30px] leading-[1.35]">
          Hi, I&apos;m Byurhan —{" "}
          <span className="text-primary">a developer who tinkers.</span>
        </h1>
        <p className="mb-3.5">
          I&apos;m a full-stack engineer who&apos;s been writing code since 6th
          grade. Days are React, TypeScript and Node; nights are soldering
          irons, 3D printers, and another self-hosted service nobody asked for.
        </p>
        <p className="mb-3.5 text-muted-foreground">
          I care about software that&apos;s small, private, owned, and
          repairable — the kind you run on a machine you can actually touch.
          Building from Ruse, Bulgaria — on the Danube.
        </p>

        <HeroLinks />

        {notes.length > 0 ? (
          <>
            <SectionHeading
              action={
                <Link
                  href="/rss.xml"
                  className="inline-flex items-center gap-1.5 font-mono font-semibold text-[11px] text-rss uppercase tracking-[0.08em] no-underline transition-opacity hover:opacity-80"
                >
                  rss
                  <RssIcon className="size-3.5" />
                </Link>
              }
            >
              latest notes
            </SectionHeading>
            <div>
              {notes.map((post, index) => (
                <RowLink
                  key={post.slug}
                  href={`/notes/${post.slug}`}
                  title={post.frontmatter.title}
                  subtitle={index === 0 ? post.frontmatter.excerpt : undefined}
                  meta={post.frontmatter.date}
                />
              ))}
            </div>
            <Link
              href="/notes"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background-soft px-3 py-2.5 font-mono text-[12.5px] text-muted-foreground no-underline transition-colors hover:border-primary hover:border-dashed hover:text-foreground"
            >
              all notes
              <span aria-hidden="true">→</span>
            </Link>
          </>
        ) : null}

        <SectionHeading>selected projects</SectionHeading>
        <div>
          {projects.map((project) => (
            <RowLink
              key={project.slug}
              href={project.github ?? project.url ?? "/projects"}
              external={Boolean(project.github ?? project.url)}
              title={project.title}
              subtitle={project.description}
              meta={project.status}
            />
          ))}
        </div>
      </PageWrapper>
    </>
  );
}
