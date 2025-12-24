# GitHub Copilot / AI Agent Instructions — EinCode

Quick orienting notes for AI agents working in this repository.

## Goal
Help contributors rapidly make safe, small improvements and fixes in a Next.js 16 + TypeScript + Tailwind project focused on UI components and a small content site.

## How the project is structured (big picture)
- `app/` — Next.js App Router pages and layouts (server components by default). See `app/layout.tsx` for global fonts, metadata and the `ThemeProvider` wrapper.
- `components/` — Reusable UI primitives. Many components are client components and include the `"use client"` directive (e.g. `components/header.tsx`, `components/theme-toggle.tsx`).
- `lib/` — Single-source utilities and data (e.g. `lib/utils.ts`, `lib/blog-data.tsx` which contains the site's blog posts as in-repo content).
- `styles/` and `app/globals.css` — Tailwind and CSS tokens. Uses a CSS-first Tailwind v4 style with `@theme inline` tokens.
- `public/` — Static assets and some page-specific subcomponents (e.g. `public/blog/*`).

## Important conventions and patterns
- Next.js 16 App Router is used. Expect server components by default; add `"use client"` at the top of files that rely on browser APIs or hooks.
- Theme and UI styling:
  - Global theme config is in `app/layout.tsx` and `components/theme-provider.tsx` (uses `next-themes`). Default theme is `dark` and the storage key is `theme-mode`.
  - Design tokens and Tailwind utilities live in `app/globals.css`. If you need to change colors, radii, or animation tokens, edit `app/globals.css` (not scattered inline styles).
- CSS helper `cn` (in `lib/utils.ts`) is the canonical way to compose class names (clsx + twMerge)
- Content source for blog posts is `lib/blog-data.tsx`. Adding or editing posts there updates `/blog` pages; there is no external CMS.
- `next.config.mjs` disables TypeScript build errors (`typescript.ignoreBuildErrors: true`) and `images.unoptimized: true` — be cautious: type errors may be suppressed during `next build`.

## Developer workflows & common commands
- Setup (pnpm is preferred):
  - `pnpm install`
  - `pnpm dev` — runs `next dev` (local dev server)
  - `pnpm build` — production build (runs `next build`)
  - `pnpm start` — serve the built app
  - `pnpm lint` — runs `eslint .`
- Verify changes rapidly by running `pnpm dev` and visiting the route under test (e.g. `/`, `/blog`, `/projects`, `/workbench`).
- There are no automated tests in the repo; adding tests requires an explicit discussion in the PR.

## When making changes (AI agent checklist)
1. Keep changes small and focused (one logical change per PR).
2. Run `pnpm lint` and fix reported issues.
3. Run `pnpm dev` and manually verify the UI in a browser for visual changes.
4. If you change styling tokens, prefer edits in `app/globals.css` (and update the component snapshot or screenshots if requested).
5. If you add or modify a blog post, update `lib/blog-data.tsx` and ensure the page renders as expected.
6. Do not remove `typescript.ignoreBuildErrors` in `next.config.mjs` without a maintainer-approved migration plan — builds rely on this flag.

## Things AI agents should NOT assume
- There is no CI or test runner configured by default — do not assume you can run a test suite.
- The project uses `pnpm` (not npm or yarn) — prefer `pnpm` commands for accuracy.
- TypeScript diagnostics may be intentionally relaxed by the config; prefer to keep types consistent and flag any type regressions to maintainers.

## Example edits (short snippets)
- Add a new blog post: append a `BlogPost` entry to `lib/blog-data.tsx`. Follow the existing structure for `id`, `slug`, `title`, `excerpt`, `content` (MD), `date`, `readTime`, `category`, `tags`, `author`, `featured`, `color`.
- Add a small UI fix: update the component in `components/`, keep it client/server correct (`"use client"` if it uses hooks/browser APIs), run `pnpm dev` and visually validate.

## Helpful files to inspect during PRs
- `app/layout.tsx` — global layout, fonts, theme provider
- `app/globals.css` — design tokens and Tailwind inline theme
- `components/*` — header, footer, theme toggles, and page components
- `lib/blog-data.tsx` — source-of-truth for blog content
- `next.config.mjs` and `package.json` — build behavior and scripts

## If something is unclear
- Ask the repository maintainer in the issue tracker or create a draft PR with a short description and screenshots for visual changes.

---
Please review these instructions and tell me if you'd like me to add project-specific examples (PR templates, CI steps, or a `CONTRIBUTING.md`). I can iterate on this file based on your feedback.
