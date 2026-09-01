---
version: alpha
name: Mono Editorial
description: >-
  Dark-first monospace editorial design system for byurhannurula.com. Tokens
  below are the dark (default) theme; the light theme is a value-for-value swap
  documented in the Colors section and implemented in src/app/globals.css.
colors:
  background: "#0a0a0a"
  background-soft: "#111111"
  surface-raised: "#1c1c1c"
  foreground: "#e6e6e6"
  muted-foreground: "#8f8f8f"
  faint: "#5c5c5c"
  primary: "#4ade80"
  on-primary: "#0a0a0a"
  primary-soft: "rgb(74 222 128 / 0.12)"
  border: "#1f1f1f"
  border-dash: "#262626"
  ring: "#4ade80"
  rss: "#f97316"
  code-string: "#e0af68"
typography:
  hero:
    fontFamily: JetBrains Mono
    fontSize: 30px
    fontWeight: "600"
    lineHeight: 1.35
    letterSpacing: -0.5px
  page-title:
    fontFamily: JetBrains Mono
    fontSize: 26px
    fontWeight: "600"
    lineHeight: 1.3
    letterSpacing: -0.5px
  section-heading:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 1.4
  prose-h2:
    fontFamily: JetBrains Mono
    fontSize: 17px
    fontWeight: "600"
    lineHeight: 1.4
  prose-h3:
    fontFamily: JetBrains Mono
    fontSize: 15.5px
    fontWeight: "600"
    lineHeight: 1.4
  prose-h4:
    fontFamily: JetBrains Mono
    fontSize: 14.5px
    fontWeight: "600"
    lineHeight: 1.4
  body:
    fontFamily: Geist Sans
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 1.65
  lede:
    fontFamily: Geist Sans
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 1.6
  row-title:
    fontFamily: Geist Sans
    fontSize: 15px
    fontWeight: "500"
    lineHeight: 1.5
  row-subtitle:
    fontFamily: Geist Sans
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 1.5
  meta:
    fontFamily: JetBrains Mono
    fontSize: 12.5px
    fontWeight: "400"
    lineHeight: 1.5
  chip:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: "400"
    lineHeight: 1.4
  table-header:
    fontFamily: JetBrains Mono
    fontSize: 10.5px
    fontWeight: "600"
    lineHeight: 1.4
    letterSpacing: 0.08em
  caption:
    fontFamily: JetBrains Mono
    fontSize: 11.5px
    fontWeight: "400"
    lineHeight: 1.5
  code:
    fontFamily: JetBrains Mono
    fontSize: 12.5px
    fontWeight: "400"
    lineHeight: 1.7
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  full: 9999px
spacing:
  unit: 4px
  column-max: 720px
  column-padding: 24px
  grid-pitch: 28px
  main-top: 48px
  main-bottom: 64px
  header-y: 20px
  footer-top: 24px
  section-top: 36px
  section-bottom: 14px
  paragraph: 14px
  row-y: 12px
  cell-y: 9px
  card-padding: 14px
  grid-gap: 12px
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    width: "{spacing.column-max}"
    padding: "{spacing.column-padding}"
  header:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.meta}"
    padding: "{spacing.header-y}"
  wordmark:
    textColor: "{colors.foreground}"
    typography: "{typography.meta}"
  nav-link:
    backgroundColor: transparent
    textColor: "{colors.muted-foreground}"
    typography: "{typography.meta}"
    rounded: "{rounded.sm}"
  nav-link-hover:
    backgroundColor: "{colors.background-soft}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
  nav-link-active:
    textColor: "{colors.primary}"
    typography: "{typography.meta}"
  theme-toggle:
    backgroundColor: transparent
    textColor: "{colors.muted-foreground}"
    typography: "{typography.meta}"
    rounded: "{rounded.sm}"
  focus-ring:
    textColor: "{colors.ring}"
    size: 2px
  page-title:
    textColor: "{colors.foreground}"
    typography: "{typography.page-title}"
  hero-accent-line:
    textColor: "{colors.primary}"
    typography: "{typography.hero}"
  lede:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.lede}"
  section-heading:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.section-heading}"
  section-heading-marker:
    textColor: "{colors.primary}"
    typography: "{typography.section-heading}"
  hairline:
    backgroundColor: "{colors.border-dash}"
    height: 1px
  object-outline:
    backgroundColor: "{colors.border}"
    height: 1px
  row:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    typography: "{typography.row-title}"
    padding: "{spacing.row-y}"
  row-hover:
    backgroundColor: "{colors.background-soft}"
    textColor: "{colors.foreground}"
    padding: "{spacing.row-y}"
  row-subtitle:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.row-subtitle}"
  row-meta:
    textColor: "{colors.faint}"
    typography: "{typography.meta}"
  kv-key:
    textColor: "{colors.primary}"
    typography: "{typography.meta}"
    padding: "{spacing.cell-y}"
    width: 160px
  kv-value:
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    padding: "{spacing.cell-y}"
  kv-why:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.row-subtitle}"
  chip:
    backgroundColor: "{colors.background-soft}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.chip}"
    rounded: "{rounded.sm}"
    padding: 3px 8px
  chip-hover:
    backgroundColor: "{colors.background-soft}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
  service-card:
    backgroundColor: "{colors.background-soft}"
    textColor: "{colors.foreground}"
    typography: "{typography.meta}"
    rounded: "{rounded.md}"
    padding: "{spacing.card-padding}"
  service-card-description:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.row-subtitle}"
  work-item-role:
    textColor: "{colors.foreground}"
    typography: "{typography.row-title}"
    padding: "{spacing.paragraph}"
  work-item-company:
    textColor: "{colors.primary}"
    typography: "{typography.row-title}"
  work-item-years:
    textColor: "{colors.faint}"
    typography: "{typography.meta}"
  callout:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.row-subtitle}"
    rounded: "{rounded.md}"
    padding: "{spacing.grid-gap}"
  callout-rule:
    textColor: "{colors.primary}"
    width: 2px
  code-block:
    backgroundColor: "{colors.background-soft}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  code-block-header:
    backgroundColor: "{colors.background-soft}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.chip}"
  code-keyword:
    textColor: "{colors.primary}"
    typography: "{typography.code}"
  code-string:
    textColor: "{colors.code-string}"
    typography: "{typography.code}"
  code-line-highlight:
    backgroundColor: "{colors.primary-soft}"
    width: 2px
  terminal-tree:
    backgroundColor: "{colors.background-soft}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: 16px 18px
  terminal-tree-host:
    textColor: "{colors.foreground}"
    typography: "{typography.code}"
  terminal-tree-note:
    textColor: "{colors.primary}"
    typography: "{typography.code}"
  button-mail:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.meta}"
    rounded: "{rounded.lg}"
    padding: 8px 14px
  icon-button:
    backgroundColor: "{colors.background-soft}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.lg}"
    size: 36px
  icon-button-hover:
    backgroundColor: "{colors.background-soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
  link-inline:
    textColor: "{colors.primary}"
    typography: "{typography.body}"
  toc-pill:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.chip}"
    rounded: "{rounded.full}"
    padding: 9px 18px
  toc-panel:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.meta}"
    rounded: 12px
    padding: 10px
  toc-panel-item-active:
    textColor: "{colors.primary}"
    typography: "{typography.meta}"
  reading-progress:
    backgroundColor: "{colors.primary}"
    height: 2px
  status-table-header:
    textColor: "{colors.faint}"
    typography: "{typography.table-header}"
  status-dot-up:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
    size: 7px
  image-placeholder:
    backgroundColor: "{colors.background-soft}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.chip}"
    rounded: "{rounded.lg}"
  image-caption:
    textColor: "{colors.faint}"
    typography: "{typography.caption}"
  footer:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.meta}"
    padding: "{spacing.footer-top}"
  footer-link-rss:
    textColor: "{colors.rss}"
    typography: "{typography.meta}"
---

# Mono Editorial

Design system for byurhannurula.com. Extracted from
`claude-lab/variant-a4-mono-editorial.html`, with the image system from
`variant-a5-mono-editorial.html`. Implemented in `src/app/globals.css`
(Tailwind v4 `@theme`); there is no `tailwind.config`.

Supersedes `docs/site-audit-and-direction.md` (June 2026).

## Overview

A dark-first, monospace-accented editorial page. One narrow column of text on a
dotted field, cut by dashed hairlines, with a single green accent. It must read
like a well-set document, not like an app.

Six rules hold everywhere:

1. **Mono is structural.** Headings, metadata, labels, dates, table keys, chips,
   and the footer are all mono. Body prose is sans. If text carries meaning
   about the page rather than in the page, it is mono.
2. **Dashed for structure, solid for objects.** Every separator, gutter, and
   section rule is `1px dashed border-dash`. Cards, code blocks, and inputs get a
   solid `1px border`.
3. **One accent, used sparingly.** Green marks the `//` on a section heading, the
   key column of a table, links, the active nav item, and up-state dots. Never a
   large filled area except the single mail button.
4. **Hover is a dashed accent border.** The house hover state for any bordered
   object is a dashed `primary` border plus a lift from `muted-foreground` to
   `foreground`. No shadows, no scale.
5. **Lowercase for chrome.** Nav, section headings, chips, and footer links are
   lowercase. Page titles and prose keep sentence case.
6. **No decorative motion.** Fades and border-color transitions only.

## Colors

Neutral grays plus one green. Dark is the default and is what the frontmatter
encodes. The light theme swaps the same token names value for value.

| Token | Dark (frontmatter) | Light |
|---|---|---|
| `background` | `#0a0a0a` | `#fafafa` |
| `background-soft` | `#111111` | `#f1f1f1` |
| `surface-raised` | `#1c1c1c` | `#ffffff` |
| `foreground` | `#e6e6e6` | `#1a1a1a` |
| `muted-foreground` | `#8f8f8f` | `#666666` |
| `faint` | `#5c5c5c` | `#9a9a9a` |
| `primary` | `#4ade80` | `#16a34a` |
| `on-primary` | `#0a0a0a` | `#fafafa` |
| `primary-soft` | `rgb(74 222 128 / 0.12)` | `rgb(22 163 74 / 0.10)` |
| `border` | `#1f1f1f` | `#e4e4e4` |
| `border-dash` | `#262626` | `#d9d9d9` |
| `ring` | `#4ade80` | `#16a34a` |
| `rss` | `#f97316` | `#ea580c` |
| `code-string` | `#e0af68` | `#b45309` |

`surface-raised` is deliberately not equal to `background-soft`: floating
elements sit over the dot field, where a fill matching the page reads as
transparent.

`border-dash` sits one step lighter than `border` in dark and one step darker in
light, because dashes lose weight against the dot field.

`faint` is the one token that does not clear WCAG AA against `background`
(roughly 3.5:1 in dark). Two rules keep it safe: it is restricted to
non-essential metadata — dates, captions, counts, table headers — and never
carries the only copy of an idea; and it never sits on `background-soft`, where
it drops to 2.8:1. Labels on a filled surface, such as a code-block filename,
take `muted-foreground` instead.

`--destructive` and `--destructive-foreground` exist in `globals.css` for
shadcn, but no component in this system uses them. They are omitted here rather
than documented as part of the design.

`primary-soft` is a translucent overlay and is always composited over
`background`. Tools that read it as a flat colour will report a false contrast
failure for the callout; the real ratio of `muted-foreground` over a composited
callout is about 5:1 in both themes.

## Typography

Two families, no third: **JetBrains Mono** for structure and **Geist Sans** for
prose. Fifteen levels, all listed in the frontmatter.

- `hero` and `page-title` are the only negative-tracked levels.
- `section-heading` is the most repeated element on the site: mono 14px,
  lowercase, `muted-foreground`, prefixed `//` in `primary`, followed by a dashed
  rule that fills the remaining width.
- `meta` covers dates, read times, view counts, and the mono footer.
- `table-header` is the only uppercase level, at `0.08em` tracking.
- Prose paragraphs are separated by `spacing.paragraph` (14px), not by
  line-height alone.

Prose headings carry their own markdown prefix — `## ` on `prose-h2`, `### ` on
`prose-h3` — in `primary` at 55% opacity, rising to full on hover. MDX content
starts at `h2`, so the prefix always mirrors the real markdown level.

## Layout

- **Column:** `spacing.column-max` (720px), centered, with
  `spacing.column-padding` (24px) inline padding.
- **Gutters:** the column carries `border-inline: 1px dashed border-dash` over an
  opaque `background` fill. This is the signature of the design — the dot field
  shows only outside the column.
- **Dot field:** fixed full-viewport `radial-gradient(border-dash 1px,
  transparent 1px)` at `spacing.grid-pitch` (28px), `opacity: 0.35`,
  `pointer-events: none`, painted behind the column.
- **Vertical rhythm:** `main` takes `spacing.main-top` (48px) and
  `spacing.main-bottom` (64px). Sections take `spacing.section-top` (36px) above
  and `spacing.section-bottom` (14px) below their heading.
- **Full-bleed escape:** `width: 100vw; position: relative; left: 50%;
  transform: translateX(-50%)`, which requires `overflow-x: clip` on `html` and
  `body`.

Two breakpoints only:

- `<= 900px` — 4-up and 3-up image grids collapse to 2 columns.
- `<= 600px` — the header stacks, `kv-key` loses its 160px width, all image grids
  collapse to 1 column, and wide images become `calc(100vw - 32px)`.

Image size modes: default (column width, `aspect-ratio: 16/8`), `wide`
(`min(80vw, 1000px)`), `full` (`100vw`, square corners, no side borders), and
grids of 2, 3, or 4 at `spacing.grid-gap` with `aspect-ratio: 4/3` (`1/1` at
4-up). A grid may also be `wide`.

## Elevation & Depth

Depth comes from border style and fill, never from shadow — with one exception.

- **Level 0** — the dot field, fixed behind everything.
- **Level 1** — the column, an opaque `background` fill with dashed side gutters.
  This is what makes the dots read as a margin.
- **Level 2** — inline objects on `background-soft` with a solid `border`: chips,
  service cards, code blocks, the terminal tree.
- **Level 3** — floating chrome on `surface-raised`: the TOC pill and its panel.
  These are the only elements with a shadow (`0 6px 24px rgb(0 0 0 / 0.45)` on
  the pill, `0 10px 32px rgb(0 0 0 / 0.5)` on the panel), because they must
  detach from a page they can scroll over.

Nothing else casts a shadow. A card that needs emphasis gets a dashed accent
border, not elevation.

## Shapes

| Level | Value | Used by |
|---|---|---|
| `none` | `0px` | full-bleed images, hairlines |
| `sm` | `4px` | chips, nav links, theme toggle |
| `md` | `6px` | service cards, terminal tree, callouts |
| `lg` | `8px` | buttons, icon buttons, code blocks, images |
| `full` | `9999px` | TOC pill, status dots |

The format has no border sub-token, so border colour is documented here rather
than in the frontmatter; `hairline` and `object-outline` carry the two values as
1px fills.

Border language:

- `1px dashed border-dash` — column gutters, row separators, table cells, section
  rules, code-block header strip, default image frame.
- `1px solid border` — anything that behaves as an object with a fill.
- `1px dashed primary` — the universal hover state for a bordered object.
- `2px solid primary` on the left edge — callouts and highlighted code lines.

Icons are line-drawn at 2px with rounded terminals. Brand marks come from
simple-icons (stack, socials) and selfh.st (homelab services); dark-authored
marks such as next.js, express, linux, and prisma must be recolored per theme.

## Components

Every component below is defined in the frontmatter. Notes here cover the
behaviour that tokens cannot express.

### Header

Flex row: wordmark, nav, theme toggle, over a dashed bottom hairline. The
wordmark is `byurhan.` with the period in `primary` — it has survived a name
change and three rebuilds; do not restyle it. The active nav item turns
`primary` and gains a `./` prefix at 60% opacity. Detail routes mark their
parent, so a post marks `notes` and a project marks `projects`.

### Row

The list primitive for notes and projects. Flex, space-between, baseline-aligned,
with a dashed bottom hairline: `row-title` on the left, optional `row-subtitle`
beneath it, and `row-meta` on the right holding a date, a year, or a short label
such as `oss`. Hover fills the whole row. Rows are anchors, never click-handled
divs.

### Key-value table

The workhorse for uses, homelab machines, capabilities, and the colophon.
`kv-key` is mono, accent, and non-wrapping at 160px; `kv-value` is sans and
top-aligned, with an optional `kv-why` line beneath it. That second line — why I
use the thing, not what it is — is what makes the page read as a person rather
than a spec sheet.

### Chip

Mono 11px at 85% opacity with an optional 12px icon. Renders as a `span` for a
label and an `a` for a filter link. On a tag index it carries a count suffix
(`homelab · 3`), and the selected tag holds the hover state.

### Service card

Auto-fill grid at `minmax(200px, 1fr)`. The name takes a 17px service icon; the
line beneath says what the service does for me, not what the software is.

### Work item

Roles, education, projects, and site lineage. A space-between head row —
`work-item-role` with `work-item-company` in accent, `work-item-years` on the
right — over a description and optional chips.

### Terminal tree

Preformatted mono block with real box-drawing characters, horizontally
scrollable. Hosts render in `foreground`, annotations in `primary` (upright, not
italic).

### Code block

A header strip carrying the filename and a `copy` button over a scrollable body.
Highlighted lines take a `primary` left border and a `primary-soft` fill.
Rendered by rehype-pretty-code with a dual theme, so each token carries both
light and dark colors.

### Socials

`button-mail` is the only filled accent surface on the site; hover is
`filter: brightness(1.12)`. `icon-button` is a 36px square whose icon sits at 75%
opacity and rises to full on hover.

### Floating TOC

A pill fixed at the bottom center holding an accent dot, the current section
title (truncated), and a caret. It slides up from `translateY(80px)` over 0.3s on
article pages only, and opens a panel whose active item is accent with a `→ `
prefix. Scroll spy takes the last heading whose top is above 140px; headings need
`scroll-margin-top: 80px`.

### Reading progress

A 2px accent bar at the top of the viewport, article pages only. It fades in
rather than appearing at zero width.

### Footer

A dashed top hairline over two mono groups: copyright and "built by hand in
Ruse" on the left, a `·`-separated list of secondary routes on the right. Links
turn accent on hover; the RSS link is the one place `rss` orange appears.

### Motion

CSS only, no animation library. Entry is `opacity 0 → 1` with `translateY(4px)`
over 0.25s. Hover transitions run 0.15s on `border-color`, `color`, and
`opacity`. The theme change is a view-transition dot bloom keyed to
`spacing.grid-pitch`, which degrades to a 160ms cross-dissolve under
`prefers-reduced-motion`, where every other animation is cut to 0.01ms.

## Do's and Don'ts

**Do**

- Use `border-dash` for anything that separates and `border` for anything that
  contains.
- Give every bordered object the same hover: a dashed `primary` border and a
  lift to `foreground`.
- Keep `faint` for metadata only, and never as the only copy of an idea.
- Put the `//` marker and the trailing dashed rule on every section heading, and
  keep the rule as a child element so an action link can sit after it.
- Write a `kv-why` line wherever a key-value row deserves an opinion.
- Preserve `:focus-visible` as a 2px `ring` outline at 2px offset.
- Use semantic HTML: `header`, `nav`, `main`, `footer`, `table`, `figure`,
  `figcaption`.
- Give decorative icons an empty `alt` and label the control instead.
- Apply the theme before first paint, from `localStorage`.

**Don't**

- Don't add a third font family, or set body prose in mono.
- Don't fill a large area with `primary`. The mail button is the only exception.
- Don't add shadows outside the floating TOC, and don't scale or translate on
  hover.
- Don't let the dashed hover border stand in for a focus ring.
- Don't hardcode a color. Every value comes from a token in
  `src/app/globals.css`.
- Don't ship the green `layout a` / `layout b` badges from the mockups; they are
  comparison markers.
- Don't leave dark-authored brand marks unrecolored in dark mode.

## Pages

| Route | Contents |
|---|---|
| `/` | Hero (name plus one accent line), two intro paragraphs, socials. Variant a4 also carried "right now", latest notes, and selected projects; a5 cut those and left the hero alone. |
| `/notes` | Lede with a link to tags, then rows grouped under year headings. |
| `/notes/[slug]` | Backlink, meta line, title, excerpt, chips, cover figure, prose, previous/next nav. Reading progress and floating TOC on. |
| `/notes/tag` | All tags as chips with counts, then rows for the selected tag. |
| `/projects` | Grouped as open source, tools and ongoing, early days. |
| `/projects/[id]` | Backlink, meta line, title, excerpt, chips, source and demo links, cover, prose, image grids. |
| `/uses` | Key-value tables: workstation, 3d printing, development, productivity, services. |
| `/homelab` | Machines table, service card grid, parked-services line, topology tree, status table. |
| `/about` | Story paragraphs, capabilities table, stack table of chips, work, education, contact. |
| `/colophon` | Stack table, type and color table, inspiration links, version lineage, process note. |

## Deltas from the mockup

Decisions already taken in code that the mockup does not show.

| Mockup | Shipped | Reason |
|---|---|---|
| Inter | Geist Sans | Font trial; fall back to Inter if disliked. |
| 700px column | 720px | Slightly easier line length at 15px. |
| `data-theme="light"` on `<html>` | `.dark` class variant | Matches Tailwind v4 and shadcn. |
| `--accent` for the green | `--primary` | shadcn names `--accent` for a neutral hover fill. |
| 44px / 16px section margins | 36px / 14px | Tightened in the port. |
| Instant theme swap | Dot-bloom view transition | Extension; cross-dissolves under reduced motion. |
| `h3` in prose | `h2` in prose | MDX starts at `h2`, so the `## ` prefix mirrors the source. |

Open questions the mockup leaves unanswered: the real years for the ReCheck
role, whether the homelab status table reads a live Gatus endpoint or stays
static, and whether the a4 home sections return under the a5 hero.
