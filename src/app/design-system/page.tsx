import { ArrowRight, Copy, Mail, Search } from "lucide-react";
import { HighlightedCode } from "@/components/design/highlighted-code";
import { Replay } from "@/components/design/replay";
import { Sample, Spec, Swatch, TokenValue } from "@/components/design/spec";
import { VariantToggles } from "@/components/design/variant-toggles";
import { GithubIcon } from "@/components/icons";
import { Callout } from "@/components/mdx/callout";
import { DoDont } from "@/components/mdx/do-dont";
import { GridImage, ImageGrid, MDXImage } from "@/components/mdx/image";
import { LinkChip, LinkEmbed } from "@/components/mdx/link-embed";
import { ProsCons } from "@/components/mdx/pros-cons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/mdx/table";
import { TOCFloating } from "@/components/mdx/toc-floating";
import { PageWrapper } from "@/components/page-wrapper";
import {
  Button,
  Card,
  CardGrid,
  Chip,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Skeleton,
} from "@/components/ui";
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

const IMAGE_SIZES: [string, string][] = [
  ["default", "the column's width, the common case"],
  ["wide", "past the column on md and up"],
  ["wider", "1040px, what galleries use"],
  ["full", "edge to edge, square corners"],
];

const SAMPLE_IMAGES: [string, number, number, string][] = [
  ["hp-elitedesk-800-g3-mini.JPG", 1280, 653, "HP EliteDesk 800 G3 Mini"],
  ["raspberry-pi-3b.jpg", 1500, 965, "Raspberry Pi 3B"],
  ["unifi-ucg-ultra.jpg", 1200, 921, "Unifi UCG Ultra"],
  ["bambu-lab-a1-combo.png", 1265, 1024, "Bambu Lab A1 Combo"],
  ["trust-ozaa.jpg", 1600, 1280, "Trust Ozaa"],
  ["keyboard.jpg", 1000, 1000, "Keyboard"],
  ["sony-wh1000xm4.jpg", 2500, 2500, "Sony WH-1000XM4"],
];

function SampleImage({ size }: { size?: "wide" | "wider" }) {
  const [file, width, height, alt] = SAMPLE_IMAGES[0];
  return (
    <MDXImage
      alt={alt}
      height={String(height)}
      size={size}
      src={`/assets/images/${file}`}
      width={String(width)}
    />
  );
}

function SampleGallery({ count }: { count: number }) {
  return (
    <ImageGrid>
      {SAMPLE_IMAGES.slice(0, count).map(([file, width, height, alt]) => (
        <GridImage
          alt={alt}
          height={String(height)}
          key={file}
          src={`/assets/images/${file}`}
          width={String(width)}
        />
      ))}
    </ImageGrid>
  );
}

const EMBED_URL =
  "https://wojtek.im/journal/creating-a-link-embed-react-server-component";

const CODE_SAMPLE = `export function modeForHour(hour: number): LightMode {
  if (hour >= 21 || hour < 5) return "night";
  if (hour >= 17) return "evening";
  if (hour >= 11) return "day";
  return "morning";
}`;

const MOTION: [string, string, string][] = [
  ["hover", "150ms", "border-color, color, opacity"],
  ["entry", "250ms", "opacity with a 4px rise"],
  ["light switch", "520ms", "circle from the switcher"],
];

export default async function DesignSystemPage() {
  const allTokens = [...SURFACES, ...TEXT, ...ACCENT, ...LINES];

  return (
    <PageWrapper>
      <div data-mdx-content>
        <header className="pb-2">
          <h1>design system</h1>
          <p className="mt-3 max-w-[62ch] text-[15px] text-muted-foreground">
            Tokens and primitives for this site. Every value below is read from
            the live stylesheet rather than transcribed, so the page cannot
            drift from globals.css. Change the light in the footer and it all
            follows.
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
            <Sample label="with icon — leading, never trailing except on a link">
              <Button size="sm">
                <Mail aria-hidden />
                email me
              </Button>
              <Button size="sm" variant="outline">
                read on
                <ArrowRight aria-hidden />
              </Button>
            </Sample>
            <Sample label="icon only — always carries an aria-label">
              <Button aria-label="Copy" size="icon">
                <Copy aria-hidden />
              </Button>
              <Button aria-label="Search" size="icon" variant="outline">
                <Search aria-hidden />
              </Button>
              <Button aria-label="Copy" size="icon" variant="ghost">
                <Copy aria-hidden />
              </Button>
            </Sample>
            <Sample label="sizes — sm, default, lg">
              <Button size="sm">sm</Button>
              <Button>default</Button>
              <Button size="lg">lg</Button>
            </Sample>
            <Sample label="chip — plain, with a count, with an icon">
              <Chip>homelab</Chip>
              <Chip detail="3" href="#color">
                nextjs
              </Chip>
              <Chip icon={<GithubIcon />}>open source</Chip>
            </Sample>
            <Sample label="chip — detail expands on hover and on focus">
              <Chip detail="16.3.3">next.js</Chip>
              <Chip detail="strict">typescript</Chip>
              <Chip detail="v4">tailwind</Chip>
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
                row — the list primitive; always an anchor, never a click
                handler
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
                key-value — the why line is what stops it reading as a spec
                sheet
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
          title="lists and quotes"
          intro="Rendered by .prose, so what is below is exactly what MDX produces. Markers are accented; task lists come from remark-gfm."
        >
          <div className="prose grid gap-6 sm:grid-cols-2">
            <div>
              <ul>
                <li>unordered, with an accent marker</li>
                <li>second item</li>
                <li>third item</li>
              </ul>
              <span className="font-mono text-[11.5px] text-faint">
                ul — prose default
              </span>
            </div>
            <div>
              <ol>
                <li>ordered, numbers in mono</li>
                <li>second step</li>
                <li>third step</li>
              </ol>
              <span className="font-mono text-[11.5px] text-faint">
                ol — prose default
              </span>
            </div>
          </div>
          <div className="prose mt-6">
            <blockquote>
              A quote is set on the accent rule, indented from the column so it
              reads as an aside rather than a break in the argument.
            </blockquote>
            <span className="not-prose font-mono text-[11.5px] text-faint">
              blockquote — accent left rule
            </span>
          </div>
        </Spec>

        <Spec
          index="08"
          title="tables"
          intro="Mono uppercase headers over dashed row separators. The last row drops its rule so the table ends on content, not on a line."
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>service</TableHead>
                <TableHead>host</TableHead>
                <TableHead>status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>unifi</TableCell>
                <TableCell>ucg-ultra</TableCell>
                <TableCell>up</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>immich</TableCell>
                <TableCell>nas</TableCell>
                <TableCell>up</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>gatus</TableCell>
                <TableCell>nas</TableCell>
                <TableCell>up</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Spec>

        <Spec
          index="09"
          title="code"
          intro="Scrollable, with a copy button that appears on hover. Highlighted by rehype-pretty-code with a dual theme, so every token carries both a light and a dark colour and needs no re-render when the mode changes. A filename strip appears above the block when the MDX fence declares one."
        >
          <HighlightedCode code={CODE_SAMPLE} lang="ts" />
        </Spec>

        <Spec
          index="10"
          title="cards"
          intro="An object on the page rather than a division of it, so a card takes a solid border over a filled surface. Emphasis is a dashed accent edge, never a shadow."
        >
          <CardGrid>
            <Card meta="up" title="immich">
              Photo library. Replaced Google Photos, and the phone backup works
              without thinking about it.
            </Card>
            <Card meta="up" title="gatus">
              Status checks for everything else here.
            </Card>
            <Card featured meta="new" title="featured">
              The same card with a dashed accent border, for the one that should
              catch the eye.
            </Card>
          </CardGrid>
        </Spec>

        <Spec
          index="11"
          title="inputs"
          intro="Nothing on the site collects input yet, so these exist to be correct before something does. The invalid state is driven by aria-invalid, so what is shown and what a screen reader is told cannot diverge."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ds-default">label</Label>
              <Input id="ds-default" placeholder="placeholder text" />
              <span className="font-mono text-[11px] text-faint">default</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ds-filled">with a value</Label>
              <Input defaultValue="hello@byurhannurula.com" id="ds-filled" />
              <span className="font-mono text-[11px] text-faint">filled</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-destructive" htmlFor="ds-invalid">
                email
              </Label>
              <Input
                aria-describedby="ds-invalid-msg"
                aria-invalid="true"
                defaultValue="not-an-email"
                id="ds-invalid"
              />
              <span
                className="text-[12px] text-destructive"
                id="ds-invalid-msg"
              >
                That does not look like an email address.
              </span>
              <span className="font-mono text-[11px] text-faint">
                invalid — aria-invalid plus a described-by message
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ds-icon">with an icon</Label>
              <Input
                icon={<Mail aria-hidden />}
                id="ds-icon"
                placeholder="your@email.com"
                type="email"
              />
              <span className="font-mono text-[11px] text-faint">
                leading icon — decorative, the label carries the meaning
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ds-disabled">disabled</Label>
              <Input disabled id="ds-disabled" placeholder="unavailable" />
              <span className="font-mono text-[11px] text-faint">disabled</span>
            </div>
          </div>
        </Spec>

        <Spec
          index="12"
          title="menus and sheets"
          intro="The light switcher uses this exact dropdown. Radix carries focus trapping, roving focus, typeahead and Escape; only the surface is ours. On touch the same choices open as a bottom sheet instead, which is what the mobile nav and the command palette use."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Sample label="DropdownMenu — anchored, surface-raised">
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-transparent px-2.5 py-1 font-mono text-[12px] text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
                  open menu
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>a group</DropdownMenuLabel>
                  <DropdownMenuItem>first item</DropdownMenuItem>
                  <DropdownMenuItem>second item</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>disabled item</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Sample>
            <Sample label="Drawer — the touch counterpart, vaul">
              <span className="text-[13px] text-muted-foreground">
                Below sm the nav and the command palette both open as a bottom
                sheet, with drag-to-dismiss. Resize the window to try it.
              </span>
            </Sample>
          </div>
        </Spec>

        <Spec
          index="13"
          title="images"
          intro="Real images, at the sizes content can ask for. All four are measured from the column rather than the viewport, and a bled figure paints the page background behind it so the column's dashed side rules are cut cleanly instead of running through the picture."
        >
          <dl className="mb-6 flex flex-col font-mono text-[12px]">
            {IMAGE_SIZES.map(([name, use]) => (
              <div
                className="hairline flex items-baseline justify-between gap-4 py-2"
                key={name}
              >
                <dt className="text-muted-foreground">{name}</dt>
                <dd className="text-right text-faint">{use}</dd>
              </div>
            ))}
          </dl>

          <VariantToggles
            bare
            exclusive
            label="size"
            options={[
              { id: "default", label: "default" },
              { id: "wide", label: "wide" },
              { id: "wider", label: "wider" },
            ]}
            variants={{
              "": <SampleImage />,
              default: <SampleImage />,
              wide: <SampleImage size="wide" />,
              wider: <SampleImage size="wider" />,
            }}
          />
          <span className="mt-2 block font-mono text-[11.5px] text-faint">
            MDXImage — one image; the toggles change its size prop. `full` spans
            the viewport and is left out of the box so it does not break out of
            it.
          </span>

          <p className="mt-8 text-[13px] text-muted-foreground">
            Galleries justify their rows: every image shares a height and takes
            the width its own aspect ratio implies, so a row fills edge to edge
            with nothing cropped. Rows come from the image count, up to three
            across, spread so the last row is never a lonely leftover.
          </p>

          <VariantToggles
            exclusive
            label="image count"
            options={[
              { id: "two", label: "2" },
              { id: "three", label: "3" },
              { id: "four", label: "4" },
              { id: "five", label: "5" },
              { id: "seven", label: "7" },
            ]}
            variants={{
              "": <SampleGallery count={3} />,
              two: <SampleGallery count={2} />,
              three: <SampleGallery count={3} />,
              four: <SampleGallery count={4} />,
              five: <SampleGallery count={5} />,
              seven: <SampleGallery count={7} />,
            }}
          />
          <span className="mt-2 block font-mono text-[11.5px] text-faint">
            ImageGrid — 2 gives one row, 4 gives 2 + 2, 5 gives 3 + 2, 7 gives 3
            + 2 + 2
          </span>
        </Spec>

        <Spec
          index="14"
          title="embeds"
          intro="A link rendered from the target's own Open Graph tags, parsed on the server at build time and cached for a day. It degrades in one direction as less is available: image beside the text when compact, image above it otherwise, and the site's own icon when there is no image at all. Any failure falls back to a plain link, because a preview is an enhancement."
        >
          <div className="flex flex-col gap-5">
            <VariantToggles
              options={[
                { id: "compact", label: "compact", disabledBy: ["noImage"] },
                { id: "noImage", label: "no image" },
              ]}
              variants={{
                "": <LinkEmbed href={EMBED_URL} />,
                compact: <LinkEmbed compact href={EMBED_URL} />,
                noImage: <LinkEmbed href={EMBED_URL} noImage />,
                "compact+noImage": (
                  <LinkEmbed compact href={EMBED_URL} noImage />
                ),
              }}
            />
            <span className="-mt-2 font-mono text-[11.5px] text-faint">
              LinkEmbed — one component; the toggles change props, not specimens
            </span>

            <div>
              <LinkChip href="https://github.com/byurhannurula" />
              <span className="-mt-3 block font-mono text-[11.5px] text-faint">
                LinkChip — icon, domain and path, for a link that needs no
                preview
              </span>
            </div>
          </div>
        </Spec>

        <Spec
          index="15"
          title="verdicts"
          intro="Two columns for a review. The plus and minus signs carry the polarity, so it still reads correctly in monochrome or to anyone who cannot separate the green from the red."
        >
          <ProsCons
            cons={[
              "No free-spin scroll wheel option",
              "Plastic feels cheap",
              "Nowhere to store the dongle",
            ]}
            pros={[
              "Wireless, including a receiver dongle",
              "Up to 8000Hz polling rate",
              "Zero RGB nonsense",
              "Long battery life",
            ]}
          />
        </Spec>

        <Spec
          index="16"
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
          index="17"
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
                <span className="text-[12.5px] text-muted-foreground">
                  {use}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <p className="mb-2 font-mono text-[11px] text-faint uppercase tracking-[0.08em]">
              stagger-children
            </p>
            <Replay label="replay stagger">
              <ul className="stagger-children flex list-none flex-col gap-1.5 p-0">
                {["first", "second", "third", "fourth", "fifth"].map((item) => (
                  <li
                    className="rounded-sm border border-border border-dashed px-3 py-2 font-mono text-[12.5px] text-muted-foreground"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Replay>
            <span className="mt-2 block font-mono text-[11.5px] text-faint">
              40ms per child, applied by the class rather than per-element
              delays
            </span>
          </div>

          <p className="mt-5 text-[13px] text-muted-foreground">
            All of it is cut to 0.01ms under prefers-reduced-motion, and the
            light switch falls back to a 160ms cross-dissolve.
          </p>
        </Spec>

        <Spec
          index="18"
          title="voice and tone"
          intro="Three rules. Be precise. Be lowercase. Be slightly dry. No exclamation marks unless someone is actually on fire."
        >
          <DoDont
            donts={[
              "Welcome to My Personal Blog!!! \u{1F680}",
              "Leveraging synergies across the stack",
              "Click here to learn more \u2192",
              "\u{1F4BB} Software Engineer | \u{1F30D} London | \u2615 Coffee Lover",
            ]}
            dos={[
              "social media is doomed (and that's fine)",
              "last commit \u00b7 37 minutes ago",
              "coffee low",
              "i write a blog, ship open source, and stream code when the lighting's kind.",
            ]}
          />
        </Spec>

        <Spec
          index="19"
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
      </div>

      {/* Doubles as its own specimen: the component documented in 12 is the
          one being used to move through the page. */}
      <TOCFloating />
    </PageWrapper>
  );
}
