import { ChevronRight } from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";
import type { ReactNode } from "react";

import { HeroLinks } from "@/components/hero-links";
import {
  ElectronicsWord,
  ReCheckLink,
  SelfHostingLink,
} from "@/components/home/hero-words";
import { RssIcon } from "@/components/icons";
import { PersonJsonLd, WebsiteJsonLd } from "@/components/json-ld";
import { PageWrapper } from "@/components/page-wrapper";
import { RowLink } from "@/components/row-link";
import { Scramble } from "@/components/scramble";
import { SocialCards } from "@/components/social-cards";
import { createMetadata } from "@/config";
import { getFeaturedProjects, hasDetailPage } from "@/config/projects";
import { shortDate } from "@/lib/date";
import { getAllPosts } from "@/lib/server";
import { cn } from "@/lib/utils";

export const metadata = createMetadata("/");

const LATEST_NOTES_COUNT = 3;

// Straight from the geist package rather than `geist/font/pixel`: that module
// declares all five pixel variants, and every one of them gets preloaded on
// any page that imports it. Only Square is used, and only for the name.
const pixel = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2",
  variable: "--font-geist-pixel-square",
  display: "swap",
});

export default function Home() {
  const projects = getFeaturedProjects();
  const notes = getAllPosts().slice(0, LATEST_NOTES_COUNT);

  return (
    <>
      <WebsiteJsonLd />
      <PersonJsonLd />
      <PageWrapper>
        <Scramble
          as="h1"
          auto
          replayOnHover={false}
          className={cn(
            pixel.variable,
            "hero-name mb-6 text-[42px] leading-[1.1] sm:mb-7 sm:text-[56px]"
          )}
        >
          Byurhan Nurula.
        </Scramble>
        {/*
         * Four plain statements, one per line on a desktop. On a phone every
         * line wraps, so the gap between them is what keeps four sentences from
         * reading as one paragraph.
         */}
        <div className="space-y-2.5 text-[18px] text-foreground leading-[1.55] tracking-[-0.2px] sm:space-y-0.5 sm:text-[21px] sm:leading-[1.7] sm:tracking-[-0.4px]">
          <p>I&apos;m an engineer with a passion for design and technology.</p>
          <p>
            I like tinkering with <ElectronicsWord />, <SelfHostingLink /> and
            more.
          </p>
          <p>
            Here I write about the things I try and what I learn along the way.
          </p>
          <p>
            Currently team lead at <ReCheckLink />.
          </p>
        </div>

        <HeroLinks className="mt-8" socials={<SocialCards />} />

        {notes.length > 0 ? (
          <>
            <HomeSectionHeading
              extra={
                <Link
                  aria-label="RSS feed"
                  className="text-rss no-underline transition-opacity hover:opacity-80"
                  href="/rss.xml"
                >
                  <RssIcon className="size-4" />
                </Link>
              }
              href="/notes"
              linkLabel="all notes"
            >
              latest notes
            </HomeSectionHeading>
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
          </>
        ) : null}

        <HomeSectionHeading href="/projects" linkLabel="all projects">
          projects
        </HomeSectionHeading>
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
      </PageWrapper>
    </>
  );
}

interface HomeSectionHeadingProps {
  children: ReactNode;
  href: string;
  linkLabel: string;
  /** Sits against the title, such as the feed icon beside "latest notes". */
  extra?: ReactNode;
}

/**
 * The homepage's own heading: no leader, the way to the full list on the right.
 *
 * The list pages keep the dashed leader from SectionHeading. Here the rule gave
 * way to the link, which used to sit under the list and was easy to miss.
 */
function HomeSectionHeading({
  children,
  href,
  linkLabel,
  extra,
}: HomeSectionHeadingProps) {
  return (
    <div className="section-heading justify-between">
      <div className="flex items-center gap-2">
        <h2 className="font-mono font-semibold text-[14px] text-muted-foreground">
          {children}
        </h2>
        {extra}
      </div>
      <Link className="group row-button" href={href}>
        {linkLabel}
        <ChevronRight
          aria-hidden="true"
          className="size-3.5 transition-[translate] duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </Link>
    </div>
  );
}
