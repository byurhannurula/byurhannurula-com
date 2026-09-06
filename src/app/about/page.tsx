import { LongBio, ShortBio } from "@/components/about/bio";
import { BioToggle } from "@/components/about/bio-toggle";
import { CareerItem } from "@/components/about/career-item";
import { KvTable } from "@/components/about/kv-table";
import { TechChip } from "@/components/about/tech-chip";
import { HeroLinks } from "@/components/hero-links";
import { PageWrapper } from "@/components/page-wrapper";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/config";
import { CAPABILITIES, EDUCATION, STACK, WORK } from "@/config/about";

export const metadata = createMetadata("/about");

export default function AboutPage() {
  return (
    <PageWrapper>
      <h1 className="mb-4">
        About <span className="text-primary">/ a bit about me.</span>
      </h1>
      <BioToggle long={<LongBio />} short={<ShortBio />} />

      <SectionHeading>work</SectionHeading>
      <div>
        {WORK.map((item) => (
          <CareerItem key={`${item.role}-${item.org}`} {...item} />
        ))}
      </div>

      <SectionHeading>education</SectionHeading>
      <div>
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
                <TechChip key={item} item={item} showLabel />
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
