## Claude Coding Guide

### Purpose

- Use this doc whenever you generate or update code in this repository.
- Mirror the existing project conventions; do not invent new patterns without a strong reason.

### Architecture Overview

- Frontend lives in the Next.js App Router at `src/`; prefer React Server Components by default.
- Backend logic resides in `src/lib`:
  - `server` for server-side code.

### Core Coding Principles

- Write TypeScript everywhere; use interfaces over type aliases when describing object shapes.
- Export React components as named functions; avoid default exports and classes.
- Prefer pure functions declared with the `function` keyword.
- Avoid enums; use maps/records or union literals.
- Keep components declarative and presentational; extract helpers for imperative logic.
- Use descriptive camelCase identifiers (`isLoading`, `canSubmit`); directories use kebab-case.

### React & Next.js Patterns

- Favor React Server Components; only add `"use client"` when interactivity or browser APIs demand it.
- Wrap client components in `Suspense` with a tailored fallback.
- Use Next.js data-fetching primitives (Route Handlers, Server Actions, `fetch` with caching tags).
- colocate route-specific helpers under the route directory; share cross-route logic via `src/lib`.
- Handle errors with `notFound()`, `redirect()`, or custom error boundaries instead of throwing raw errors.

### Styling & UI

- Compose UI with Shadcn UI, Radix primitives, and Tailwind CSS utilities.
- Import and use the local `cn` helper for conditional class names.
- Follow mobile-first responsive utility ordering; respect the design tokens from `src/app/global.css`.
- Keep assets optimized (`next/image` with explicit `width`/`height`, WebP when possible, lazy-load non-critical visuals).

### State & Forms

- Reuse existing form abstractions (e.g., zod validators, form components) before adding new ones.
- Use react-hook-form for forms and zod as the schema & validation library.

### Data & APIs

- If possible, add all the API and data fetching logic to the `src/lib/api` package, to sustain a single source of truth for the API and a reusable API.
- Group logic in the API routes in the `src/app/api` directory into meaningful modules.
- Honor caching and revalidation patterns already in the repo (check adjacent files before introducing new cache strategies).

### Authentication & Authorization

### Internationalization

### Tooling & Quality

- Package manager: pnpm. Run workspace-wide commands via Turbo (`pnpm dev`, `pnpm build`, `pnpm lint`).
- Linting and formatting use Eslint and Prettier (`pnpm lint`, `pnpm format`).
- Target Node.js ≥ 20. Use ESM-compatible imports.
- Tests (Playwright) live under `src/tests`.

### Documentation & Change Management

- Log noteworthy changes in `CHANGELOG.md` if the tweak impacts consumers.
- Keep commit messages concise and conventional (`feat:`, `fix:`, etc.) if you prepare commits.

### When in Doubt

- Inspect neighboring files for patterns before writing new code.
- Ask for clarification on product requirements rather than guessing.
- Prefer incremental, well-scoped changes over sweeping rewrites.
- Ensure any new feature has a corresponding server and client story (UI, API, data layer, emails if needed).

