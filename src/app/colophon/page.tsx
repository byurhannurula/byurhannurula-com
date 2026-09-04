import { PageWrapper } from "@/components/page-wrapper";
import { createMetadata } from "@/config";

export const metadata = createMetadata("/colophon");

interface KeyValueRow {
  label: string;
  /** Rendered in foreground; the part after an em dash is muted by <Detail>. */
  value: React.ReactNode;
}

const STACK: KeyValueRow[] = [
  {
    label: "framework",
    value: (
      <Detail lead="Next.js 16" rest="App Router, React Server Components" />
    ),
  },
  { label: "language", value: "TypeScript, strict" },
  {
    label: "styling",
    value: (
      <Detail
        lead="Tailwind CSS v4"
        rest={
          <>
            tokens inline via <Mono>@theme</Mono>, no config file
          </>
        }
      />
    ),
  },
  {
    label: "content",
    value: <Detail lead="MDX from the filesystem" rest="no CMS, on purpose" />,
  },
  { label: "tooling", value: "Biome · Knip · Vitest · pnpm" },
  {
    label: "motion",
    value: (
      <Detail
        lead="Pure CSS keyframes"
        rest={
          <>
            no animation library, respects <Mono>prefers-reduced-motion</Mono>
          </>
        }
      />
    ),
  },
  {
    label: "stats",
    value: "Views & likes in Upstash Redis · analytics via self-hosted Umami",
  },
  {
    label: "icons",
    value: "selfh.st/icons for the homelab · Lucide for the interface",
  },
  {
    label: "hosting",
    value: (
      <Detail
        lead="Cloudflare Workers for now"
        rest="moving to my own VPS eventually, because of course"
      />
    ),
  },
];

const TYPE_AND_COLOR: KeyValueRow[] = [
  {
    label: "mono",
    value: (
      <Detail
        lead="JetBrains Mono"
        rest="headings, metadata, anything structural"
      />
    ),
  },
  { label: "sans", value: <Detail lead="Geist" rest="body text" /> },
  {
    label: "palette",
    value:
      "Near-black, quiet grays, one green accent. Dark-first with a light mode.",
  },
];

const INSPIRATION = [
  {
    href: "https://barisozcan.com",
    name: "barisozcan.com",
    why: "craft & warmth",
  },
  {
    href: "https://emilycampbell.co",
    name: "emilycampbell.co",
    why: "signature details",
  },
  { href: "https://ouassim.tech", name: "ouassim.tech", why: "mono editorial" },
  {
    href: "https://www.juliacodes.com",
    name: "juliacodes.com",
    why: "clarity",
  },
  { href: "https://ebrukaya.me", name: "ebrukaya.me", why: "voice" },
  {
    href: "https://wesbos.com/uses",
    name: "wesbos.com",
    why: "the uses idea — and the courses that started everything",
  },
  {
    href: "https://colinlienard.com",
    name: "colinlienard.com",
    why: "the travelling social card, ported from his MIT source",
  },
];

const LINEAGE = [
  {
    version: "v4 — this one",
    years: "2026",
    description: "Next.js, mono editorial, dark-first. Built to finally ship.",
  },
  {
    version: "v3 — the unshipped redesigns",
    years: "2025 — 2026",
    description:
      "Theme experiments, a design playground, a Lovable prototype. Great research, never launched.",
  },
  {
    version: "v2 — byurhannurula.com",
    years: "2022 — 2025",
    description:
      "The Next.js era begins; name change from Beyzat to Nurula. Wordmark survives.",
  },
  {
    version: "v1 — byurhanbeyzat.com",
    years: "2019 — 2022",
    description:
      "Gatsby, GitLab, a blog and a Supporters page. Where byurhan. was born.",
  },
];

function Mono({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[0.92em]">{children}</span>;
}

function Detail({ lead, rest }: { lead: string; rest: React.ReactNode }) {
  return (
    <>
      {lead} — {rest}
    </>
  );
}

function KeyValueTable({ rows }: { rows: KeyValueRow[] }) {
  return (
    <dl>
      {rows.map((row) => (
        <div
          key={row.label}
          // px-2 matches the mockup's `.kv td { padding: 9px 8px }`: the text
          // is inset from the section heading while the rule spans the row.
          className="flex flex-col gap-0.5 border-border-dash border-b border-dashed px-2 py-[9px] sm:flex-row sm:gap-4"
        >
          <dt className="shrink-0 font-mono text-[12.5px] text-primary sm:w-40">
            {row.label}
          </dt>
          <dd className="min-w-0 text-[14px] text-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ColophonPage() {
  return (
    <PageWrapper>
      <div className="mb-10">
        <h1>Colophon</h1>
        <p className="mt-2 text-muted-foreground">
          How this site is made, and why it looks the way it does.
        </p>
      </div>

      <h2 className="section-heading">
        stack
        <span className="hairline flex-1" />
      </h2>
      <KeyValueTable rows={STACK} />

      <h2 className="section-heading">
        type &amp; color
        <span className="hairline flex-1" />
      </h2>
      <KeyValueTable rows={TYPE_AND_COLOR} />

      <h2 className="section-heading">
        inspiration
        <span className="hairline flex-1" />
      </h2>
      <p className="text-[14px] text-muted-foreground">
        Sites that shaped this one, in ways big and small:{" "}
        {INSPIRATION.map((site, index) => (
          <span key={site.href}>
            {index > 0 ? ", " : null}
            <a
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              {site.name}
            </a>{" "}
            ({site.why})
          </span>
        ))}
        .
      </p>

      <h2 className="section-heading">
        lineage
        <span className="hairline flex-1" />
      </h2>
      <div className="space-y-4">
        {LINEAGE.map((entry) => (
          <div key={entry.version}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-medium text-[14px]">{entry.version}</span>
              <span className="label-mono whitespace-nowrap">
                {entry.years}
              </span>
            </div>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              {entry.description}
            </p>
          </div>
        ))}
      </div>

      <h2 className="section-heading">
        process
        <span className="hairline flex-1" />
      </h2>
      <p className="text-[13.5px] text-muted-foreground">
        Design direction explored in conversation with Claude; every decision
        second-guessed by me, extensively. The <Mono>byurhan.</Mono> wordmark
        has survived a name change and three rebuilds — some things are worth
        keeping. The source is on{" "}
        <a
          href="https://github.com/byurhannurula/byurhannurula-com"
          target="_blank"
          rel="noopener noreferrer"
          className="link-inline"
        >
          GitHub
        </a>
        , and clicking the year in the footer shows which commit you are looking
        at.
      </p>
    </PageWrapper>
  );
}
