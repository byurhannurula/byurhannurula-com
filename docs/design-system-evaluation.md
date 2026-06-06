# Design System Evaluation

> What we actually have right now, judged as a design system — what's good, what
> needs work, and a concrete font direction. Inspirations deliberately excluded
> (separate, later). Generated 2026-06-02 on `design/theme-experiments`.
>
> **Method:** read the live tokens (`src/app/globals.css`), the component code,
> and the `/playground` kitchen-sink, plus screenshots in light + dark
> (`docs/light.png`, `docs/dark.png`, and the playground typography/UI captures).
> Components that come straight from shadcn/Radix/Tailwind defaults are noted but
> not deeply critiqued (per request).

---

## Scorecard

| Area | State | Verdict |
|---|---|---|
| Token architecture | Semantic CSS vars, Tailwind v4 `@theme`, light/dark | **Good** — keep |
| Color / accent | One hot orange used everywhere + hot-red destructive | **Needs work** — too saturated, two warm signals collide |
| Typography (shipped) | Inter only, default Tailwind scale | **Weakest area** — no voice |
| Typography (potential) | Serif headings look great in playground | **High-leverage win** |
| Spacing / layout | Tailwind defaults, capped measure | **Good enough** |
| Radius | `0.5rem` flat | OK, slightly generic |
| Components | CVA + Radix, consistent | **Good** with gaps |
| Icons | ~23 of 36 dev icons ignore `className` | **Needs work** (real bug) |
| Motion | CSS-only, lightweight | **Good** but missing reduced-motion |
| Dark mode | Works, class-based | **Good**, bg slightly cold |
| Accessibility | Focus rings yes; reduced-motion no | **Partial** |

---

## 1. Color & tokens

**What's good**
- Clean semantic token layer in `globals.css`: `--background/foreground/primary/
  muted/border/ring…` mapped through Tailwind v4 `@theme inline`. Light + dark
  pairs are complete and consistent. This is the right foundation — don't rebuild.
- Dark mode via `next-themes` (`attribute="class"`) is wired correctly.

**What needs work**
1. **The accent is over-saturated and over-used.** `--primary: hsl(15 100% 50%)`
   is max-saturation orange, and it drives *primary buttons, links, blockquote
   border (4px), nav underline, focus ring, like-heart…* everywhere at full
   intensity. In the screenshots the blockquote's solid orange bar and the
   primary buttons read as "loud." Recommend: keep orange as the single brand
   color (lock to Arslan `#FF4F00` ≈ `hsl(19 100% 50%)` as decided), but **use it
   more sparingly** and consider a slightly calmer tint for large fills
   (blockquote bar, big buttons) vs. the pure accent for small marks.
2. **Primary (orange) and destructive (red `hsl(0 84% 60%)`) are both hot warm
   colors.** Side by side (see UI section screenshot) they're close enough to
   blur the "brand vs danger" signal. Keep destructive clearly distinct (more red,
   less orange) or desaturate primary a touch.
3. **Token duplication:** in both themes `--accent === --secondary === --muted`
   (`hsl(0 0% 96%)` light / `hsl(220 13% 14%)` dark). Three tokens, one value —
   they can diverge later but right now add no expressive range.
4. **No opacity-tiered text.** Hierarchy comes only from `--foreground` vs
   `--muted-foreground`. An Arslan-style one-ink-at-3-alphas system would give
   more cohesive hierarchy and trivial theming. Optional, nice-to-have.
5. **Dark surface is slightly cold:** `hsl(220 13% 9%)` (blue-tinted). Fine, but a
   warmer near-black (e.g. `#17191e`) pairs better with an orange accent. Minor.

## 2. Typography — the biggest opportunity

**Shipped state:** Inter everywhere + default Tailwind type scale + default mono
stack for code. That's exactly why the site reads "generic shadcn starter" — it
makes no typographic choice.

**Playground proof:** with serif headings (Fraunces) + Inter body + mono metadata
labels, the same content immediately looks like a *designed* editorial site — see
`ds-typography-light.png` / `ds-typography-dark.png`. The heading scale renders
cleanly from 16→36px and the uppercase mono section labels give a tasteful
dev/editorial signal. **Adopting a real heading face + mono-for-metadata is the
single highest-leverage change.**

**Strategy: serif as a display accent, not site-wide.** Serif used on *every*
heading reads like a generic "serif+sans template" — and the reference sites
don't do it (Arslan is serif-led editorial; Luna is pure mono). Better fit here:
**one sans (or mono) as the system font everywhere**, and a **display serif
reserved for large moments only — post/article titles, maybe the home hero.**
Body, nav, UI, section headings stay sans. This keeps the serif special instead of
wallpaper. (Instrument Serif and DM Serif Display are purpose-built display
serifs for exactly this; Fraunces also works restrained.)

**Recommendations**
- Introduce two new roles globally: `--font-serif` (display accent — post titles
  only) and `--font-mono` (dates, tags, section labels, nav slugs). Keep
  `--font-sans` for body + UI. Consider swapping the system sans from Inter to a
  font with a bit more character (Hanken Grotesk, Geist). Wire via `next/font` in
  the root layout like the playground does.
- Apply serif via a narrow selector (e.g. article `h1`/post title), **not** a
  global heading rule — so the rest of the site stays sans.
- Keep a **restrained scale** (base 18px, headings tracking ~-0.011em).
- Use mono **only for metadata** — not body — so it stays an accent, not Luna-style
  density.
- Also consider a **mono-led / no-serif** route (Luna-style) where mono carries
  headings + metadata and sans carries body — viable if you want a pure dev feel
  with no serif at all.

**Font options now in the playground** (expanded this round, swap live):
- Sans: Inter · Geist · Poppins · DM Sans · Plus Jakarta Sans · **Hanken Grotesk**
- Serif: Fraunces · Newsreader · Source Serif 4 · Libre Baskerville · Playfair
  Display · Lora · DM Serif Display · **Instrument Serif** (display)
- Mono: JetBrains Mono · Geist Mono · IBM Plex Mono · Space Mono · Fragment Mono ·
  Source Code Pro · DM Mono

**Curated pairings to try** (one-click presets in the panel; research-backed):
1. **Editorial Warm** — Fraunces + Inter + JetBrains Mono *(current default, safe, recommended)*
2. **Literary** — Playfair Display + Source Serif + IBM Plex Mono
3. **DM Harmony** — DM Serif Display + DM Sans + DM Mono *(one family, zero-clash)*
4. **Vercel Modern** — Fraunces + Geist + Geist Mono
5. **Book** — Lora + Inter + Source Code Pro
6. **Dev Brand** — Libre Baskerville + Plus Jakarta + Space Mono

Notes from current guidance: **Playfair Display + Inter** and **DM Serif Display +
DM Sans** are the most-cited editorial pairings; **JetBrains Mono** is the
consensus best coding mono and **Geist Mono / IBM Plex Mono** the top design-led
alternatives. Hard rule: **two typefaces max** for headings+body, mono only as a
metadata accent; create variety with weight, not more families.
Sources: madegooddesigns "Best Monospace Fonts 2026", curious.page "Best Fonts for
Personal Websites 2026", thecrit.co portfolio pairings.

## 3. Spacing, layout, radius

- **Good:** capped reading measure (`max-w-2xl` on prose), consistent section
  rhythm via `space-y-*`, `PageWrapper` padding. Nothing broken.
- `--radius: 0.5rem` flat is fine but a touch generic; `0.375rem` reads slightly
  more editorial/tight. Try the radius slider in the panel.
- `.columns-2/3/4` masonry utilities work (verified in playground).

## 4. Components

**What's good**
- All UI primitives use CVA variants + Radix (`button`, `dialog`, `sheet`,
  `tooltip`, `command`, etc.) — accessible, consistent tokens, focus rings present
  (visible in UI screenshot). Form validation uses zod + react-hook-form.
- Blog/about/uses components are coherent and reusable.

**What needs work**
1. **Icon components are inconsistent (real bug).** ~23 of 36 in
   `src/components/icons/dev/` take **no `className`** and their `<svg>` has no
   width/height, so they can't be sized or recolored and collapse outside a
   forcing wrapper (this is why they vanished in the playground until a scoped
   `svg{width/height}` rule was added). Fix: normalize every dev icon to
   `({ className }) => <svg className={className} …>` and use `currentColor` where
   the logo is monochrome. Affects the About tech grid too.
2. **Buttons look default-shadcn.** Functional but no personality; the primary
   fill is the over-saturated orange. Will improve once accent + radius + type are
   tuned.
3. **Form inputs aren't unified** — contact form uses raw `<input>` styling rather
   than the `Input` primitive; consolidate.
4. **Carry-overs from the earlier audit still apply:** three TOC variants (keep
   one), `.stagger-children` hard-capped at 10 items, `react-syntax-highlighter`
   redundant with Shiki, `mermaid` heavy/unused-by-default.

## 5. Motion

- **Good:** pure-CSS keyframes (`fade-in`, `fade-in-up`, `stagger-children`), no
  framer-motion — light bundle. Verified working (replay in playground).
- **Gap:** no `prefers-reduced-motion` fallback (accessibility). Add a media-query
  guard that disables the entrance animations.
- Entrances are all the same fade-up; once the system has a voice, one signature
  motion detail (e.g., marker-underline on links) would add craft.

## 6. Dark mode

- Works correctly; serif headings + orange accent look good on the dark surface
  (see `ds-typography-dark.png`).
- Only nit: the blue-tinted near-black; a warmer base would flatter the orange.

## 7. Accessibility

- Focus-visible rings exist on buttons/inputs (good). Keyboard nav via Radix.
- **Missing:** `prefers-reduced-motion`. Some hovers are color-only (e.g. About
  tech grid) — add a non-color cue. Body ≥16px is satisfied (18px even better).

---

## Prioritized changes

**P0 — define the voice (high impact, low risk)**
- Lock accent to `#FF4F00`; introduce `--font-serif` + `--font-mono`; apply serif
  headings + mono metadata in the real layout. (Use the playground to pick the
  pairing first.)

**P1 — tighten**
- Reduce accent over-use (calmer large fills), ensure destructive ≠ primary at a
  glance; add `prefers-reduced-motion`; normalize the dev icon components.

**P2 — cleanup (from prior audit)**
- One TOC variant; length-agnostic stagger; drop `react-syntax-highlighter`; lazy
  or remove `mermaid`; unify form inputs; optional opacity-tiered text + warmer
  dark base + `0.375rem` radius.

---

## How to use the playground to decide

Open `/playground` → controls (bottom-left). Try each **curated pairing**, nudge
the **accent** toward `#FF4F00`, test **radius** `0.375`–`0.5`, toggle **dark**,
then **Copy tokens** and paste the result here — I'll bake the winning tokens +
fonts into `globals.css` and the root layout as the P0 change.
