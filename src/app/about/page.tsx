import { CareerItem } from "@/components/about/career-item";
import { KvTable } from "@/components/about/kv-table";
import { TechChip } from "@/components/about/tech-chip";
import { HeroLinks } from "@/components/hero-links";
import { Chip, HoverNote } from "@/components/inline";
import { PageWrapper } from "@/components/page-wrapper";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/config";
import { CAPABILITIES, EDUCATION, STACK, WORK } from "@/config/about";

export const metadata = createMetadata("/about");

export default function AboutPage() {
  return (
    <PageWrapper>
      <h1 className="mb-4">
        About <span className="text-primary">— a bit about me.</span>
      </h1>
      <p className="mb-3.5">
        I&apos;m <strong>Byurhan</strong> — a full-stack engineer, tinkerer, and
        lifelong tab-hoarder. I write software for a living and break hardware
        for fun.
      </p>
      <p className="mb-3.5">
        I didn&apos;t start with code. In 6th grade I started learning from{" "}
        <HoverNote note="A Bulgarian video tutorials site that taught a generation of devs the basics.">
          videotutorials-bg.com
        </HoverNote>
        , and the first thing we built was a site about the{" "}
        <Chip tone="accent">albatross</Chip> — yes, the bird. That tiny static
        site is the reason this one exists.
      </p>
      <p className="mb-3.5">
        Since then: informatics olympiads, Pascal → C → VB, an M.Sc. at the
        University of Ruse, and 5+ years shipping web apps. On the side I tinker
        with hardware and a small homelab. I also co-organized{" "}
        <a
          href="https://aihack.startupfactory.bg/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-inline"
        >
          RUSE AI HACK &apos;26
        </a>
        , the city&apos;s first 48-hour AI hackathon.
      </p>
      <p className="mb-3.5 text-muted-foreground">
        I care about software that respects the people who use it: small,
        private, owned, repairable. The web should feel less like a mall and
        more like a workshop.
      </p>

      <SectionHeading>work</SectionHeading>
      <div className="[&>*:last-child]:border-b-0">
        {WORK.map((item) => (
          <CareerItem key={`${item.role}-${item.org}`} {...item} />
        ))}
      </div>

      <SectionHeading>education</SectionHeading>
      <div className="[&>*:last-child]:border-b-0">
        {EDUCATION.map((item) => (
          <CareerItem key={`${item.role}-${item.org}`} {...item} />
        ))}
      </div>

      <SectionHeading>capabilities</SectionHeading>
      <KvTable
        rows={CAPABILITIES.map((capability) => ({
          key: capability.name,
          value: (
            <>
              {capability.description}
              {capability.why ? (
                <div className="text-[13px] text-muted-foreground">
                  {capability.why}
                </div>
              ) : null}
            </>
          ),
        }))}
      />

      <SectionHeading>stack</SectionHeading>
      <KvTable
        rows={STACK.map((group) => ({
          key: group.name,
          value: (
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <TechChip key={item.name} showLabel {...item} />
              ))}
            </div>
          ),
        }))}
      />

      <SectionHeading>contact</SectionHeading>
      <HeroLinks all className="mt-2" />
    </PageWrapper>
  );
}
