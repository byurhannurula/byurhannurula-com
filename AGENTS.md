# Agent guide — byurhannurula.com

Personal site: Next.js App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, MDX content.
Mirror the conventions in this file and in neighboring code. Do not invent new patterns without a strong reason.

## Project structure

- `src/app/` — App Router routes, layouts, route handlers (`api/`), metadata routes (`robots.ts`, `sitemap.ts`, `rss.xml/`). Frontend-only code lives here or in `src/components/`.
- `src/components/` — shared UI. `ui/` is shadcn; `mdx/` renders content; `icons/` holds local SVG icon components (use these for brand logos, `lucide-react` has none).
- `src/lib/` — backend and shared logic. `src/lib/server/` is server-only (posts, shorts loaders). `src/lib/redis.ts` is the Upstash client with a null fallback.
- `src/config/` — static data and site config: `site.ts`, `metadata.ts` (`createMetadata`), `uses.ts`, `journey.ts`, `skills.ts`.
- `src/hooks/`, `src/types/` — client hooks and shared types.
- `src/env.ts` — validated env (t3-env + zod). Import `env` from `@/env`; never read `process.env` elsewhere.
- `content/blog/*.mdx`, `content/shorts/*.mdx` — MDX content with frontmatter.
- Design tokens live in `src/app/globals.css` (Tailwind v4 `@theme`). There is no `tailwind.config`.

## Code style

- TypeScript everywhere. Prefer `interface` for object shapes. No `enum`; use union literals or `as const` maps.
- Functional and declarative code. No classes. Use the `function` keyword for components and pure functions.
- Named exports only. No default exports except where Next.js requires them (`page.tsx`, `layout.tsx`, route handlers, config files).
- File order: exported component, subcomponents, helpers, static content, types.
- Naming: kebab-case files and directories (`components/auth-wizard/`), camelCase identifiers with auxiliary verbs (`isLoading`, `hasError`, `canSubmit`).
- Prefer iteration and small modules over duplication. Keep components presentational; extract helpers for imperative logic.
- Comments only for rationale, constraints, workarounds. No narration of changes.

## React and Next.js

- Server Components by default. Add `"use client"` only for interactivity or browser APIs, and push it to leaf components.
- Never use client components for data fetching or global state. Use route handlers, Server Actions, or `fetch` with cache tags.
- Wrap client components in `Suspense` with a tailored fallback. Use `next/dynamic` for non-critical components.
- Handle errors with `notFound()`, `redirect()`, or error boundaries, not raw throws.
- Colocate route-specific helpers under the route directory. Share cross-route logic via `src/lib/`.
- Check adjacent files before adding a new caching or revalidation strategy.
- Every page gets metadata through `createMetadata()` from `src/config/metadata.ts`.

## UI and styling

- Compose UI from shadcn/ui, Radix primitives, and Tailwind utilities. Use the local `cn()` helper for class names.
- Mobile-first responsive utilities. Use the design tokens from `globals.css`; do not hardcode colors.
- Accessibility minimum: semantic HTML, keyboard navigation, visible focus, `prefers-reduced-motion` fallbacks, alt text.
- Images: `next/image` with explicit `width`/`height`, WebP where possible, lazy-load non-critical visuals.
- Optimize for Web Vitals (LCP, CLS, INP).

## Tooling

- Package manager: pnpm (version pinned in `package.json` `packageManager`). Node 24 (`.nvmrc`).
- `pnpm dev`, `pnpm build`, `pnpm lint` / `pnpm lint:fix` (Biome), `pnpm format`, `pnpm type-check`, `pnpm test` (Vitest, colocated `*.test.ts`), `pnpm knip`.
- Biome is the only linter and formatter. Do not add ESLint or Prettier.
- Supply-chain settings live in `pnpm-workspace.yaml` (release-age cooldown, trust policy). New packages younger than 48h are refused; add an exclusion only with a reason.
- Git hooks via lefthook (`lefthook.yml`): pre-commit runs Biome on staged files, pre-push runs type-check, lint, test.
- CI (`.github/workflows/`): lint + type-check, unit tests, build, knip, security (audit, CodeQL, TruffleHog, gitleaks), Lighthouse CI on PRs (`lighthouserc.json` thresholds).

## Deployment

- Target: Cloudflare Workers via OpenNext (`open-next.config.ts`, `wrangler.jsonc`). `pnpm preview` runs the worker locally, `pnpm deploy` ships it. Secrets go in via `wrangler secret put`.
- `docker/` keeps a VPS fallback (Dockerfile, compose, deploy script); the GHCR image workflow builds from `docker/Dockerfile`.

## Change management

- Conventional commit messages (`feat:`, `fix:`, `chore:`). Keep commits scoped.
- Prefer incremental, well-scoped changes over sweeping rewrites. Inspect neighboring files before writing new code.
- Ask for clarification on product requirements rather than guessing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
