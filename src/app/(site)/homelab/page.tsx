import { LabLists } from '@/components/homelab/lab-lists';
import { RackSection } from '@/components/homelab/rack-section';
import { RequestHops } from '@/components/homelab/request-hops';
import { RulesList } from '@/components/homelab/rules-list';
import { StatusSection } from '@/components/homelab/status-section';
import { PageHero } from '@/components/shared/page-hero';
import { PAGES } from '@/config/seo';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(PAGES.homelab);

// No `revalidate` export here, on purpose. A segment value must be a literal,
// so it cannot depend on the environment. The status fetch carries its own
// 60 s (src/lib/homelab-status.ts) and Next takes the page's refresh time
// from it. With no status URL there is no fetch, and the page is fully
// static: on Cloudflare through OpenNext a timed refresh needs a cache
// binding, and sample data needs neither.

export default function HomelabPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <>
            <span
              aria-hidden
              className="size-2 rounded-full bg-accent-bright shadow-[0_0_0_0_var(--accent-bright)] motion-safe:animate-lab-pulse"
            />
            hobby, not my job
          </>
        }
        title="A small homelab"
        titleEnd="that I run like production."
        lead="One mini PC, one Raspberry Pi and a 10 inch rack. It is where I learn about networks, backups and failure, with my own data as the test."
      />
      <div className="hidden in-data-[lab=lists]:block">
        <LabLists />
      </div>
      <div className="hidden in-data-[lab=rack]:block">
        <RackSection />
        <StatusSection />
        <RequestHops />
      </div>
      <RulesList />
    </>
  );
}
