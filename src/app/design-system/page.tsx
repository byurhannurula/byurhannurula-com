import { Sample, Spec, Swatch, TokenValue } from "@/components/design/spec";
import { Callout } from "@/components/mdx/callout";
import { PageWrapper } from "@/components/page-wrapper";
import { Button, Skeleton } from "@/components/ui";
import { createMetadata } from "@/config";
import { LIGHT_MODES } from "@/config/light-modes";

export const metadata = createMetadata("/design-system", {
  title: "Design system",
  description:
    "Tokens and primitives for byurhannurula.com, rendered from the live stylesheet.",
});

const SURFACES = [
  { token: "--background", label: "background", note: "the page" },
  {
    token: "--background-soft",
    label: "background soft",
    note: "filled objects",
  },
  {
    token: "--surface-raised",
    label: "surface raised",
    note: "floats over the dot field",
  },
  { token: "--card", label: "card" },
];

const TEXT = [
  { token: "--foreground", label: "foreground", note: "body and headings" },
  { token: "--muted-foreground", label: "muted", note: "secondary copy" },
  { token: "--faint", label: "faint", note: "metadata only, never sole copy" },
];

const ACCENT = [
  { token: "--primary", label: "primary", note: "one accent, used sparingly" },
  { token: "--primary-soft", label: "primary soft", note: "callout fill" },
  { token: "--rss", label: "rss", note: "the feed link, nowhere else" },
];

const LINES = [
  { token: "--border", label: "border", note: "solid: things that contain" },
  {
    token: "--border-dash",
    label: "border dash",
    note: "dashed: things that separate",
  },
];

const TYPE_SCALE = [
  {
    name: "page-title",
    size: "26px / 600",
    cls: "font-mono font-semibold text-[26px] tracking-[-0.5px]",
  },
  {
    name: "prose-h2",
    size: "17px / 600",
    cls: "font-mono font-semibold text-[17px]",
  },
  {
    name: "prose-h3",
    size: "15.5px / 600",
    cls: "font-mono font-semibold text-[15.5px]",
  },
  {
    name: "section-heading",
    size: "14px / 600",
    cls: "font-mono font-semibold text-[14px] lowercase",
  },
  { name: "body", size: "15px / 400", cls: "font-sans text-[15px]" },
  {
    name: "row-title",
    size: "15px / 500",
    cls: "font-sans font-medium text-[15px]",
  },
  { name: "row-subtitle", size: "13px / 400", cls: "font-sans text-[13px]" },
  { name: "meta", size: "12.5px / 400", cls: "font-mono text-[12.5px]" },
  { name: "caption", size: "11.5px / 400", cls: "font-mono text-[11.5px]" },
  { name: "chip", size: "11px / 400", cls: "font-mono text-[11px]" },
];

const SPACING: [string, string][] = [
  ["grid-gap", "12px"],
  ["paragraph", "14px"],
  ["card-padding", "14px"],
  ["header-y", "20px"],
  ["column-padding", "24px"],
  ["grid-pitch", "28px"],
  ["section-top", "36px"],
  ["main-top", "48px"],
  ["main-bottom", "64px"],
];

const RADII: [string, string, string, string][] = [
  ["none", "0px", "rounded-none", "full-bleed images, hairlines"],
  ["sm", "4px", "rounded-sm", "chips, nav links"],
  ["md", "6px", "rounded-md", "cards, images, callouts"],
  ["lg", "8px", "rounded-lg", "buttons, code blocks"],
  ["full", "9999px", "rounded-full", "floating controls, dots"],
];

const CHROME_BUTTON =
  "appearance-none rounded-sm border border-border bg-transparent px-2.5 py-1 font-mono text-[12px] text-muted-foreground leading-normal transition-colors hover:border-muted-foreground hover:text-foreground";

const USES_ROWS: [string, string, string][] = [
  ["editor", "Zed", "Fast, and the vim mode is real."],
  ["shell", "zsh + starship", "Prompt shows git state at a glance."],
];

const MOTION: [string, string, string][] = [
  ["hover", "150ms", "border-color, color, opacity"],
  ["entry", "250ms", "opacity with a 4px rise"],
  ["light switch", "520ms", "circle from the switcher"],
];

export default function DesignSystemPage() {
  const allTokens = [...SURFACES, ...TEXT, ...ACCENT, ...LINES];

  return (
    <PageWrapper>
      <header className="pb-2">
        <h1>design system</h1>
        <p className="mt-3 max-w-[62ch] text-[15px] text-muted-foreground">
          Tokens and primitives for this site. Every value below is read from
          the live stylesheet rather than transcribed, so the page cannot drift
          from globals.css. Change the light in the footer and it all follows.
        </p>
        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11.5px] text-faint">
          <div className="flex gap-2">
            <dt>modes</dt>
            <dd className="text-muted-foreground">{LIGHT_MODES.length}</dd>
          </div>
          <div className="flex gap-2">
            <dt>families</dt>
            <dd className="text-muted-foreground">2</dd>
          </div>
          <div className="flex gap-2">
            <dt>spec</dt>
            <dd className="text-muted-foreground">DESIGN.md</dd>
          </div>
        </dl>
      </header>

      <Spec
        index="01"
        title="color"
        intro="Neutral greys and one green. Each light mode redefines the same token names, so nothing below is written per theme."
      >
        <div className="flex flex-col gap-6">
          {(
            [
              ["surfaces", SURFACES],
              ["text", TEXT],
              ["accent", ACCENT],
              ["lines", LINES],
            ] as const
          ).map(([group, items]) => (
            <div key={group}>
              <p className="mb-2 font-mono text-[11px] text-faint uppercase tracking-[0.08em]">
                {group}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {items.map((swatch) => (
                  <Swatch key={swatch.token} {...swatch} outlined />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Spec>

      <Spec
        index="02"
        title="typography"
        intro="Two families, no third. JetBrains Mono carries structure, Geist Sans carries prose. If text is about the page rather than in it, it is mono."
      >
        <div className="flex flex-col">
          {TYPE_SCALE.map((level) => (
            <div
              key={level.name}
              className="hairline flex items-baseline justify-between gap-6 py-3"
            >
              <span className={`${level.cls} min-w-0 truncate`}>
                rewriting design system
              </span>
              <span className="shrink-0 text-right font-mono text-[11.5px] text-faint">
                <span className="block text-muted-foreground">
                  {level.name}
                </span>
                {level.size}
              </span>
            </div>
          ))}
        </div>
      </Spec>

      <Spec
        index="03"
        title="spacing"
        intro="A 4px base grid. The dot field's 28px pitch belongs to the same scale, which is why the backdrop and the theme switch line up."
      >
        <div className="flex flex-col gap-1.5">
          {SPACING.map(([name, size]) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-36 shrink-0 font-mono text-[11.5px] text-muted-foreground">
                {name}
              </span>
              <span className="w-12 shrink-0 font-mono text-[11.5px] text-faint tabular-nums">
                {size}
              </span>
              <span
                aria-hidden
                className="h-2.5 rounded-[2px] bg-primary/70"
                style={{ width: size }}
              />
            </div>
          ))}
        </div>
      </Spec>

      <Spec
        index="04"
        title="borders and radii"
        intro="Dashed separates, solid contains. That one rule decides every border here, and a dashed accent border is the house hover state for any bordered object."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Sample label="1px dashed border-dash — separates">
            <span className="text-[13px] text-muted-foreground">
              column gutters, rows, section rules
            </span>
          </Sample>
          <div className="flex flex-col gap-2">
            <div className="flex min-h-16 items-center gap-3 rounded-md border border-border p-4">
              <span className="text-[13px] text-muted-foreground">
                cards, code blocks, inputs
              </span>
            </div>
            <span className="font-mono text-[11.5px] text-faint">
              1px solid border — contains
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {RADII.map(([name, value, cls, use]) => (
            <div key={name} className="flex flex-col gap-1.5">
              <div
                className={`h-14 border border-border bg-background-soft ${cls}`}
              />
              <span className="font-mono text-[11.5px] text-foreground">
                {name} · {value}
              </span>
              <span className="font-mono text-[11px] text-faint leading-snug">
                {use}
              </span>
            </div>
          ))}
        </div>
      </Spec>

      <Spec
        index="05"
        title="buttons"
        intro="One filled accent surface exists on the whole site — the mail button. Everything else is bordered chrome that lifts to foreground on hover."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Sample label="Button — default, the only filled accent">
            <Button size="sm">email me</Button>
            <Button disabled size="sm">
              disabled
            </Button>
          </Sample>
          <Sample label="Button — outline, secondary, ghost">
            <Button size="sm" variant="outline">
              outline
            </Button>
            <Button size="sm" variant="secondary">
              secondary
            </Button>
            <Button size="sm" variant="ghost">
              ghost
            </Button>
          </Sample>
          <Sample label="chrome — header and footer controls">
            <button className={CHROME_BUTTON} type="button">
              &#8984;k
            </button>
            <button className={CHROME_BUTTON} type="button">
              13:51 evening
            </button>
          </Sample>
          <Sample label="tag — hover gives the dashed accent border">
            <span className="tag">homelab</span>
            <a className="tag" href="#color">
              nextjs · 3
            </a>
          </Sample>
        </div>
      </Spec>

      <Spec
        index="06"
        title="text objects"
        intro="The primitives carrying most of the site: a section heading, a list row, a key-value pair, and an inline link."
      >
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="section-heading !mt-0">
              latest notes
              <span aria-hidden className="hairline-t flex-1" />
            </h3>
            <span className="font-mono text-[11.5px] text-faint">
              section-heading — the {"//"} marker, then a dashed rule filling
              the width
            </span>
          </div>

          <div>
            <div className="hairline flex items-baseline justify-between gap-4 py-3">
              <span className="flex flex-col gap-1">
                <span className="font-medium text-[15px]">
                  Complete Unifi Homelab Setup
                </span>
                <span className="text-[13px] text-muted-foreground">
                  A guide to building a home network with Ubiquiti equipment.
                </span>
              </span>
              <span className="shrink-0 font-mono text-[12px] text-faint tabular-nums">
                12-22
              </span>
            </div>
            <span className="font-mono text-[11.5px] text-faint">
              row — the list primitive; always an anchor, never a click handler
            </span>
          </div>

          <div>
            <dl className="flex flex-col">
              {USES_ROWS.map(([key, value, why]) => (
                <div
                  key={key}
                  className="hairline flex flex-col gap-1 py-[9px] sm:flex-row sm:gap-4"
                >
                  <dt className="w-40 shrink-0 font-mono text-[12.5px] text-primary">
                    {key}
                  </dt>
                  <dd className="flex flex-col gap-0.5">
                    <span className="text-[15px]">{value}</span>
                    <span className="text-[13px] text-muted-foreground">
                      {why}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <span className="font-mono text-[11.5px] text-faint">
              key-value — the why line is what stops it reading as a spec sheet
            </span>
          </div>

          <div>
            <p className="text-[15px]">
              Rows and tables share a hairline, and{" "}
              <a className="link-inline" href="#color">
                an inline link
              </a>{" "}
              wipes a solid underline over a permanent dashed one on hover.
            </p>
            <span className="font-mono text-[11.5px] text-faint">
              link-inline — two stacked backgrounds, since border-style cannot
              transition
            </span>
          </div>
        </div>
      </Spec>

      <Spec
        index="07"
        title="callouts and loading"
        intro="A callout takes a 2px accent edge over a translucent fill. Skeletons hold the shape of what is coming rather than spinning."
      >
        <div className="flex flex-col gap-5">
          <Callout title="Worth knowing" type="info">
            Callouts carry a left rule in the accent and a primary-soft fill,
            composited over the page background.
          </Callout>
          <Sample label="Skeleton — holds layout while content arrives">
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </Sample>
        </div>
      </Spec>

      <Spec
        index="08"
        title="motion"
        intro="Fades and colour changes only. The exception is the light switch, which opens the incoming mode as a circle from the switcher itself."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {MOTION.map(([name, duration, use]) => (
            <div
              key={name}
              className="flex flex-col gap-1 rounded-md border border-border border-dashed p-4"
            >
              <span className="font-mono text-[12.5px] text-foreground">
                {name}
              </span>
              <span className="font-mono text-[11.5px] text-primary tabular-nums">
                {duration}
              </span>
              <span className="text-[12.5px] text-muted-foreground">{use}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-muted-foreground">
          All of it is cut to 0.01ms under prefers-reduced-motion, and the light
          switch falls back to a 160ms cross-dissolve.
        </p>
      </Spec>

      <Spec
        index="09"
        title="tokens"
        intro="The full set, live. Change the light in the footer to watch each palette resolve."
      >
        <dl className="flex flex-col font-mono text-[12px]">
          {allTokens.map((token) => (
            <div
              key={token.token}
              className="hairline flex items-baseline justify-between gap-4 py-2"
            >
              <dt className="text-muted-foreground">{token.token}</dt>
              <dd className="text-faint">
                <TokenValue token={token.token} />
              </dd>
            </div>
          ))}
        </dl>
      </Spec>
    </PageWrapper>
  );
}
