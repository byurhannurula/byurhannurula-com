# Site Audit & Design Direction

> Deep-dive analysis of `byurhannurula-com`, design direction, and a phased plan.
> Generated 2026-06-01. Status: **planning only — nothing in the codebase has been changed.**
>
> This is a "dump everything" document: full findings, recommendations, concrete
> options, and open decisions. Skim the headers; nothing here is locked in.

---

## 0. TL;DR

- **Engineering foundation is excellent and current.** Next 16, React 19, Tailwind v4,
  TS 5.9, Biome + Knip. There is essentially nothing to "fix" or update here. Your
  worry that packages are old was wrong — the opposite is true.
- **The real problem is the design language**, not the code. The site currently reads
  as a clean *shadcn starter*: default-orange accent, one font (Inter), default type
  scale, flat tokens, generic fade-in animations. It makes no *choices*, which is
  exactly the "I stopped liking it" feeling.
- **You don't need to invent a system from scratch.** This doc gives you concrete,
  ready-to-pick options (colors, fonts, scale, component patterns) — you have the taste
  to choose; you don't have to generate from zero.
- **Direction (per your feedback):** lean **editorial / Arslan-like**, recruiter-friendly.
  Keep Arslan's orange. Avoid Luna's terminal density — it's beautiful but heavy and
  would lose a recruiter/HR visitor.
- **Deployment:** ship on **Cloudflare now via OpenNext**, keep the Docker setup in the
  repo for a **future VPS** migration.
- **Trim the over-engineering** before building more on top.

---

## 1. Current state — technical foundation

### 1.1 Stack & versions (as of audit)

| Area | Package | Installed | Latest | Note |
|---|---|---|---|---|
| Framework | next | 16.1.1 | **16.2** (2026-03-18) | minor bump available, non-urgent |
| UI runtime | react / react-dom | 19.2.3 | 19.x | current |
| Styling | tailwindcss | 4.1.18 (v4, inline `@theme`) | 4.x | current |
| Language | typescript | 5.9.3 | current | strict mode on |
| Lint/format | @biomejs/biome | 2.3.11 | current | replaces ESLint+Prettier |
| Dead code | knip | 5.80.0 | current | |

**Verdict:** modern and healthy. Bumping Next 16.1.1 → 16.2 is the only version action,
and it's optional (16.2 brings faster `next dev`, Turbopack as default bundler).

### 1.2 Content & data pipeline (solid)

- Content is filesystem MDX: `content/blog/*.mdx` (7 dummy posts), `content/shorts/*.mdx` (1).
  - NOTE: in the working tree these are staged at `content1/` (rename in progress) — see git status.
- `gray-matter` (frontmatter) → `next-mdx-remote/rsc` (render) → `remark-gfm` +
  `rehype-pretty-code` (Shiki, `one-dark-pro`).
- Data layer in `src/lib/server/` (`posts.ts`, `shorts.ts`) — clean, typed, sorted,
  grouped-by-date, tags. Reading time helper in `src/lib/utils.ts`.
- `src/lib/redis.ts` — Upstash Redis for views/likes + sliding-window rate limiting,
  with graceful fallback when env vars are absent.

### 1.3 SEO / metadata (genuinely strong)

- Dynamic OG images via `src/app/api/og/route.tsx` (Catppuccin Mocha theme, 1200×630).
- JSON-LD: Article / Breadcrumb / Website / Person (`src/components/json-ld.tsx`).
- `sitemap.ts`, `robots.ts` (blocks GPTBot/Claude-Web etc.), `rss.xml/route.ts`.
- Per-page metadata factory in `src/config/metadata.ts`.

### 1.4 Routes (`src/app/`)

```
/                       home (latest posts + view counts)
/about                  bio, journey timeline, tech stack
/notes                  blog index, grouped by year/month, tag filter
/notes/[slug]           post + TOC (3 variants) + reading progress + like
/notes/tag/[tag]        tag archive (generateStaticParams)
/shorts, /shorts/[slug] code snippets
/projects, /projects/[id]  portfolio (client component, hardcoded data array)
/uses (+ page.backup.tsx)  gear/tools
/links                  link aggregator
/statistics            views/likes dashboard (noindex)
/contact               Resend-backed form
/api/og                dynamic OG
/api/contact           Resend + Zod + rate limit
/api/posts/[slug]/{stats,like,unlike}   Redis counters
robots.ts · sitemap.ts · rss.xml · not-found.tsx
```

### 1.5 SEO/feature gaps (small)

- Shorts are **not** in RSS or sitemap; no OG/JSON-LD for shorts.
- `/notes/[slug]` relies on ISR, no `generateStaticParams` (fine, but worth a decision).
- Projects data is a hardcoded array in the page, not content-driven.
- No content/frontmatter validation — a malformed MDX file can break the build.
- No error boundaries around MDX rendering.

---

## 2. Current state — design system

### 2.1 Tokens (`src/app/globals.css`, Tailwind v4 inline `@theme`)

**Light**
```
--background        hsl(0 0% 100%)
--foreground        hsl(0 0% 10%)
--primary           hsl(15 100% 50%)   <- the "default orange" tell
--muted             hsl(0 0% 96%)
--muted-foreground  hsl(0 0% 45%)
--border            hsl(0 0% 90%)
--radius            0.5rem
```
**Dark**
```
--background        hsl(220 13% 9%)
--foreground        hsl(0 0% 98%)
--primary           hsl(15 100% 50%)   <- identical to light
--muted             hsl(220 13% 14%)
--muted-foreground  hsl(0 0% 65%)
--border            hsl(220 13% 20%)
```

- Font: **Inter** only, via `next/font`, `--font-sans`. Default Tailwind type scale.
- Dark mode: `next-themes`, `attribute="class"`, system default, `disableTransitionOnChange`.
- Animations: pure CSS keyframes (`fadeIn`, `fadeInUp`, `fadeInItem`, `fadeInScale`) +
  a `.stagger-children` system hardcoded to 10 items. No framer-motion (good for bundle).
- `components.json` references a `tailwind.config.ts` that **doesn't exist** (v4 is inline).

### 2.2 Why it feels generic (the honest diagnosis)

1. **Accent is max-saturation default orange, identical in light & dark.** Single biggest
   "template" signal. (Good news: it's already ~Arslan's color — see §4.1.)
2. **No typographic personality.** One sans + default scale. Every inspiration gets its
   identity from type (Arslan serif, Luna mono, Ramkrishna sans+mono-metadata). You use none.
3. **Flat tokens, no opacity tiers.** Arslan derives all hierarchy from one ink color at
   85/65/45% alpha — more cohesive than separate semantic greys.
4. **Generic motion.** All animations are the same fade-up. No signature detail.
5. **No "craft" moments** (marker underline, hairline/dotted dividers, mono section labels,
   terse right-aligned dates, "View all N" digests).

### 2.3 Accessibility notes

- Missing `prefers-reduced-motion` fallback for the CSS animations.
- Some hover states are color-only (e.g. About tech grid) — add a non-color cue.
- Mobile menu uses text buttons rather than an icon affordance.

---

## 3. Inspiration analysis

### 3.1 arslan.io — editorial / serif (the chosen lead)

- Centered single column (~720px), generous gutters, wave hairline under the header.
- **Serif** (Libre Baskerville) for body + post titles; sans/mono reserved for UI/code.
- Restrained type scale (1.2–2.8rem), base 18px.
- Dark surface `#17191e`; text = white at **opacity tiers** (85/65/45%), dividers 12% white.
- Accent: bold orange **`#FF4F00`**.
- Signature details: **highlighter/marker underline** on links, wave separator, subscribe
  button with spinner, **curated digests** ("View all 93 thoughts"), terse dates ("31 May").
- Works page = card grid of product renders. About = plain prose + a single strong photo.
- **Why it works:** one serif, one accent, opacity tiers, whitespace — plus a few crafted
  details. Calm, human, writing-forward, and **immediately legible to a recruiter.**

### 3.2 imlunahey.com — terminal / mono (explicitly NOT the direction)

- Monospace everywhere, lowercase, numbered `01 //section` headers, live data blocks
  (now-playing, GitHub, online dot), sprawling micro-page index, OKLCH lime accent,
  colophon listing data-source refresh intervals.
- **Your call (agreed):** gorgeous but **too heavy / tiring**, and an HR/recruiter visitor
  would get lost. We will **borrow mechanics, not the whole voice** — specifically: mono for
  *metadata only*, and (optionally) one small live "now" touch. Nothing more.

### 3.3 Ramkrishna Swarnkar (screenshots) — recruiter-friendly structure

Great patterns to lift, because they read well to hiring people:

- **Blog list as dense rows:** title + 1-line excerpt + tag chips + date, right-aligned
  "Read more →". Tag **filter bar with counts** ("All 15 · Personal 7 · AI 3").
- **Work Experience page:** company + role + "● Working" status badge + right-aligned date
  range/location, a **"Technologies & Tools" icon row**, then **"What I've done"** bullets,
  separated by hairlines. This is an excellent, scannable resume surface.
- Footer with **NAVIGATE / CONNECT** columns + social icon grid; a small personality touch
  (visitor counter, a quote block).

### 3.4 Transferable pattern shortlist

1. One-color, **opacity-tiered** text (85/65/45%).
2. Single bold accent, used sparingly (= Arslan orange).
3. **Mono for metadata/labels** only (dates, tags, section labels, nav slugs).
4. Hairline dividers (solid + dotted); optional decorative separator.
5. Post list = title + excerpt + tags + **terse right-aligned date** in `<time>`.
6. Subtle, **non-moving** hover (dim title to ~0.8 opacity, fast color transition).
7. **"View all N"** curated digests on the home page, not a firehose.
8. **Marker/highlighter underline** as the signature link detail.
9. Real persisted dark mode via CSS custom properties (already have it).
10. A small **"now"/status** touch (optional, lightweight — not Luna-scale).
11. **Resume/Work page** in the Ramkrishna style (icon rows + bullets + dates).
12. **List-shaped micro-pages** as the brand playground (`/uses`, `/now`, `/homelab`).

---

## 4. Recommended design direction (editorial, recruiter-friendly)

> You have taste but don't want to design a system from scratch — so here are concrete,
> pick-one options with real values. Default picks are marked ★.

### 4.1 Color

Lock the accent to **Arslan's exact orange** (you took it from him anyway):

```
#FF4F00  ≈ hsl(19 100% 50%)  ≈ oklch(0.67 0.24 38)
```
Your current `hsl(15 100% 50%)` is already ~4° off — this is a tiny nudge, not a change of
identity. Recommendation: store it as the hex and derive states.

**Adopt opacity-tiered text** (Arslan model) instead of separate grey tokens:

| Token | Dark | Light |
|---|---|---|
| text primary | `white / 90%` | `#1a1a1a / 92%` |
| text secondary | `white / 65%` | `#1a1a1a / 64%` |
| text tertiary | `white / 45%` | `#1a1a1a / 45%` |
| divider | `white / 12%` | `black / 10%` |
| surface (dark) | `#17191e` (Arslan) or keep `hsl(220 13% 9%)` | `#ffffff` |

Keep accent identical in both themes (it works on both surfaces).

### 4.2 Typography — pick a pairing

- **★ Option A — Editorial warm (closest to Arslan, recruiter-safe):**
  Headings + post titles in a refined serif — **Fraunces** (variable, characterful) or
  **Newsreader** / **Source Serif 4** (calmer). Body in **Inter** (keep). Metadata in
  **JetBrains Mono** or **Geist Mono**.
- **Option B — Modern hybrid (most neutral/safe):** Everything **Geist** (or keep Inter),
  metadata in **Geist Mono**. No serif. Cleanest, most "product" feel.
- **Option C — Distinct sans:** Headings in **Satoshi** / **General Sans**, body Inter,
  mono metadata. More fashion-forward, slightly riskier for recruiters.

**Type scale** (restrained, Arslan-like; base 18px / 1.125rem):
```
xs .75  · sm .875 · base 1.125 · lg 1.25 · xl 1.5 · 2xl 1.875 · 3xl 2.375 · 4xl 3rem
tracking: -0.011em on headings; mono labels uppercase, tracking +0.04em
```

### 4.3 Layout & spacing

- Single centered column, content max-width **640–720px** for prose; wider (1024–1100px)
  container only for grids (projects/works).
- Generous section spacing (Arslan uses ~3.2rem under section headers).
- Hairline dividers between list rows; whitespace does most of the separating.

### 4.4 Signature details (pick 1–2, don't overdo)

- **★ Marker underline** on emphasis links (thick `text-decoration-thickness`, negative
  `text-underline-offset`, soft custom underline color).
- Mono **section labels** ("WRITING", "PROJECTS") in tertiary text, uppercase, tracked.
- **Terse right-aligned dates** in `<time>` ("31 May", year only when not current).
- Optional: a subtle wave/dotted **section separator**.
- Non-moving hover: dim row title to ~0.8.

### 4.5 Component refresh checklist

| Component | Change |
|---|---|
| Navigation | Keep hide-on-scroll; restyle links + active state to new tokens; icon for mobile menu |
| Post list row | Title + excerpt + mono tag chips + right-aligned date; non-moving hover |
| Tag filter | Ramkrishna-style chip bar **with counts** |
| Footer | NAVIGATE / CONNECT columns + social grid (recruiter-friendly) |
| Work/Resume page (new) | Company + role + status badge + date/location + tech-icon row + bullets |
| Cards (projects) | Image + title + subtitle grid, consistent radius/hover |
| Buttons/inputs | Already CVA-based; just retoken. Unify the contact form inputs into the UI primitives |
| Animations | Add `prefers-reduced-motion`; make stagger length-agnostic |

---

## 5. Content & IA strategy

Your concern — *not many jobs / projects / photos* — is solved by **list- and data-shaped
pages**, which also fit the homelab/tinkering brand:

- **Primary nav (recruiter path, keep it tiny):** Home · Writing · Projects · Work/Resume ·
  About · Contact.
- **Playground (tuck in footer or a "More"):** `/uses`, `/now`, `/homelab`, `/links`,
  later `/reading`, `/bookmarks`.
- **Home = curated digest:** short intro + 3–4 latest posts + "View all" + a couple of
  featured projects. Not a firehose.
- **Writing first:** even short homelab notes. Replace the dummy MDX with 2–3 real ones.
- **One strong photo** (workspace/homelab rack) goes a long way (see Arslan About) — you
  don't need a full shoot.
- A light **"now" block** (current focus, maybe last GitHub push) adds life without Luna's weight.

---

## 6. Over-engineering / cleanup (do before building more)

- **Redundant deps:** `react-syntax-highlighter` overlaps with `shiki`/`rehype-pretty-code`
  — drop one. `mermaid` is heavy and currently unused — make it lazy or remove until needed.
- **Three TOC variants** (inline/sidebar/floating) — keep one.
- `global-search.tsx` is **~715 lines / 20KB** — extract its page/action/shortcut config
  into data files; consider trimming scope pre-launch.
- **Likes/unlikes + Redis + `/statistics`** — nice, but heavy for a pre-launch site with
  dummy content. Consider deferring or keeping views-only at first.
- **Leftover files:** `src/app/uses/page.backup.tsx`, commented-out variants in
  `blog/card-home.tsx`, untracked `agents.md` / `claude.md` / `.windsurfrules` (you already
  have `CLAUDE.md`).
- **Home typo:** "View all notessss" in `src/app/page.tsx`.
- **`content1/` rename** in flight — finish the move to `content/` and update any hardcoded paths.
- `components.json` points at a non-existent `tailwind.config.ts`.

---

## 7. Deployment plan

**Decision:** Cloudflare now → VPS later; keep Docker in the repo.

### 7.1 Facts (verified 2026-06-01)

**The official Next.js Adapter API (what you linked):**
- **Next.js 16.2 shipped a *stable* Adapter API** (announced 2026-03-25, "Next.js Across
  Platforms"). It produces a typed, versioned description of your build (routes, prerenders,
  assets, runtime targets, caching, routing) that any platform's adapter consumes. Configured
  via `adapterPath` / `NEXT_ADAPTER_PATH` in `next.config`. Adapters implement two hooks:
  `modifyConfig` + `onBuildComplete`.
- It was **co-designed with OpenNext, Cloudflare, Netlify, AWS Amplify, Google Cloud** — the
  official path and OpenNext are now the *same effort*, not competitors.
- **Adapters shipping today:** only the **Vercel** adapter + a **Bun** reference adapter.
  The **Cloudflare / Netlify / AWS adapters (built *through OpenNext*) are "in active
  development, expected later this year (2026)"** — i.e. the official *verified* Cloudflare
  adapter is **not released yet** as of this audit.

**Practical takeaway for Cloudflare today:**
- Deploy via **`@opennextjs/cloudflare`** now. It supports **Next.js 16** (and latest 14/15),
  uses the **Node runtime** (not Edge), so **your Upstash Redis (REST) and Resend API routes
  work**. It does **not** require `output: "standalone"` — it transforms a normal `next build`.
- This converges into the official **verified Cloudflare adapter** when it lands later in 2026;
  migration should be a config swap, not a rewrite.
- Bumping to **Next 16.2** is worth doing — it's the version that carries the stable Adapter
  API and positions you for the official adapter.
- Limitations to watch: **Node middleware unsupported** (you don't use it); Worker size limits
  (~3 MiB free / 10 MiB paid, compressed) — keep an eye on `mermaid`/`shiki` weight.

### 7.2 Approach

1. Bump to **Next 16.2** (optional but recommended — carries the stable Adapter API).
2. Add `@opennextjs/cloudflare` + a `wrangler.jsonc` (the deleted `wrangler.toml` was
   Pages-style; OpenNext deploys to **Workers**).
3. **Keep Docker untouched** for the future VPS. `output: "standalone"` is needed by Docker
   and is harmless/ignored for OpenNext — if any conflict appears, gate it:
   `output: process.env.DOCKER_BUILD ? "standalone" : undefined`.
4. Set env on Cloudflare: `NEXT_PUBLIC_BASE_URL`, `UPSTASH_REDIS_REST_*`, `RESEND_API_KEY`,
   `NEXT_PUBLIC_UMAMI_*`.
5. Verify the `/api/og` route under Workers (Satori/edge image gen) — most likely fine, test it.
6. CI: add a Cloudflare deploy workflow alongside the existing `docker-publish.yml`.
7. **Later (H2 2026):** when the official **verified Cloudflare adapter** ships, switch to it
   via `adapterPath` in `next.config` — should be a config swap, not a rewrite.

### 7.3 Env vars (current)

```
NEXT_PUBLIC_BASE_URL
UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
RESEND_API_KEY
NEXT_PUBLIC_UMAMI_SRC / NEXT_PUBLIC_UMAMI_ID
```

---

## 8. Testing & docs status

- **No tests** exist despite `CLAUDE.md` mentioning Playwright under `src/tests`. Add a thin
  Playwright smoke suite (loads home, a post, toggles theme, opens ⌘K) once design settles.
- Deployment is documented (`docker/DEPLOYMENT.md`); codebase docs are otherwise light.

---

## 9. Proposed phased roadmap

> Order is a recommendation; we can resequence. Each phase is shippable.

**Phase 0 — Cleanup (small, do first)**
Remove redundant deps, backup files, extra TOCs, fix typo, finish `content1/`→`content/`,
fix `components.json`. Lighter base, no visual change.

**Phase 1 — Design system (the core fix)**
Lock Arslan orange (`#FF4F00`), introduce opacity-tiered tokens, chosen font pairing + type
scale, `prefers-reduced-motion`, length-agnostic stagger. Update globals + a few primitives.

**Phase 2 — Component & page polish**
Post list rows, tag filter w/ counts, footer columns, nav restyle, new **Work/Resume** page,
marker-underline + mono labels + terse dates. Add the signature detail(s).

**Phase 3 — Content & playground**
Replace dummy MDX with 2–3 real homelab notes; build `/uses`, `/now`, `/homelab`; curated
home digest; one strong photo; light "now" block.

**Phase 4 — Deploy**
OpenNext + Cloudflare; keep Docker for VPS; env + CI; smoke tests.

**Phase 5 (later) — Optional**
Re-enable likes/stats if wanted; shorts in RSS/sitemap; consider a CMS (see §10) when
writing cadence justifies it.

---

## 10. CMS — later, not now

You don't want a CMS yet — correct call. When write cadence grows, evaluate (in rough order
of fit for this stack): **Content Collections / keep MDX in-repo** (zero infra, git-based),
**Sanity** (structured, generous free tier, MCP available here), or **Keystatic/Tina**
(git-backed editing UI). MDX-in-repo is likely fine for a long time.

---

## 11. Open decisions (need your pick)

1. **Font pairing:** A (serif headings + Inter + mono) ★ / B (all Geist + mono) / C (distinct sans).
2. **Dark surface:** adopt Arslan `#17191e` ★ or keep current `hsl(220 13% 9%)`.
3. **Signature detail:** marker underline ★ / mono section labels / wave separator (pick 1–2).
4. **First milestone:** Phase 0 cleanup ★ → Phase 1, or jump straight to Phase 1.
5. **Likes/stats:** keep, or defer to Phase 5 to slim the pre-launch build.
6. **Next bump:** 16.1.1 → 16.2 now or later (optional).
