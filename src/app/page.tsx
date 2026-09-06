import Link from "next/link";

import { HeroLinks } from "@/components/hero-links";
import { RssIcon } from "@/components/icons";
import { Brand } from "@/components/inline";
import { PersonJsonLd, WebsiteJsonLd } from "@/components/json-ld";
import { PageWrapper } from "@/components/page-wrapper";
import { Reveal, RevealTrigger } from "@/components/reveal";
import { RowLink } from "@/components/row-link";
import { SectionHeading } from "@/components/section-heading";
import { SocialCards } from "@/components/social-cards";
import { createMetadata } from "@/config";
import { getFeaturedProjects, hasDetailPage } from "@/config/projects";
import { getStackItem } from "@/config/stack";
import { shortDate } from "@/lib/date";
import { getAllPosts } from "@/lib/server";

export const metadata = createMetadata("/");

const LATEST_NOTES_COUNT = 3;

const DAY_JOB = [
  getStackItem("react"),
  getStackItem("typescript"),
  getStackItem("node"),
];

export default function Home() {
  const projects = getFeaturedProjects();
  const notes = getAllPosts().slice(0, LATEST_NOTES_COUNT);

  return (
    <>
      <WebsiteJsonLd />
      <PersonJsonLd />
      <PageWrapper>
        <h1 className="mb-4">
          Hi, I&apos;m Byurhan,{" "}
          <span className="text-primary">a developer.</span>
        </h1>
        <Reveal
          detail={
            <>
              Intern in January 2020, then software developer, then full-stack,
              then team lead in 2024. Six years is long enough to have shipped
              every layer of it: the apps, the services under them, and the
              deployments and monitoring under those.
            </>
          }
        >
          <p className="mb-3.5">
            I started writing code when I was 12 and have been learning ever
            since. Currently Team Lead at{" "}
            <a
              className="link-inline"
              href="https://recheck.io/"
              rel="noopener noreferrer"
              target="_blank"
            >
              ReCheck
            </a>
            , where I have <RevealTrigger>worked since 2020</RevealTrigger>.
          </p>
        </Reveal>
        <p className="mb-3.5">
          I mostly work with <Brand logo={DAY_JOB[0].icon}>React</Brand>,{" "}
          <Brand logo={DAY_JOB[1].icon}>TypeScript</Brand> and{" "}
          <Brand logo={DAY_JOB[2].icon}>Node</Brand>. I also look after the
          infrastructure the apps run on.
        </p>
        <Reveal
          detail={
            <>
              Proxmox and Docker on hardware I can reach with a screwdriver, a
              reverse proxy in front, VLANs behind, and backups I restore from
              twice a year. Home Assistant and ESPHome handle the rest of the
              house.
            </>
          }
        >
          <p className="mb-3.5 text-muted-foreground">
            Outside work I try to be a more conscious user of technology. I care
            about privacy, so I{" "}
            <RevealTrigger>self-host most of the services I use</RevealTrigger>,
            which is also how I experiment and learn.
          </p>
        </Reveal>

        <HeroLinks socials={<SocialCards />} />

        {notes.length > 0 ? (
          <>
            <SectionHeading
              action={
                <Link
                  href="/rss.xml"
                  className="inline-flex items-center gap-1 font-mono font-semibold text-[11px] text-rss uppercase tracking-[0.08em] no-underline transition-opacity hover:opacity-80"
                >
                  rss
                  <RssIcon className="size-3.5" />
                </Link>
              }
            >
              latest notes
            </SectionHeading>
            <div>
              {notes.map((post) => (
                <RowLink
                  href={`/notes/${post.slug}`}
                  key={post.slug}
                  meta={
                    <time dateTime={post.frontmatter.date}>
                      {shortDate(post.frontmatter.date)}
                    </time>
                  }
                  subtitle={post.frontmatter.excerpt}
                  title={post.frontmatter.title}
                />
              ))}
            </div>
            <Link href="/notes" className="row-button mt-3">
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
              href={
                hasDetailPage(project)
                  ? `/projects/${project.slug}`
                  : (project.github ?? project.url ?? "/projects")
              }
              external={!hasDetailPage(project)}
              title={project.title}
              subtitle={project.tagline}
              meta={project.status}
            />
          ))}
        </div>
        <Link href="/projects" className="row-button mt-3">
          all projects
          <span aria-hidden="true">→</span>
        </Link>
      </PageWrapper>
    </>
  );
}
