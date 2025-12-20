# EinCode

A modern, minimal code editor / playground built with Next.js, React and Radix UI.

Version: `0.1.1`

## What the project does

Code Forge is a lightweight, opinionated editor UI and playground intended for experimenting with editor-like components and small developer tools. It demonstrates a modern stack including Next.js 16, React 19, TypeScript, Tailwind CSS and Radix UI primitives.

### Why this is useful

- Fast developer playground to prototype editor UX and integrations.
- Collection of reusable UI components (see `components/`).
- Up-to-date with Next.js 16 and React 19 modern patterns (app router, server components).

#### Key features

- App shell and layout in `app/`
- Reusable UI primitives under `components/` (cursor glow, header, footer, workbench, etc.)
- Styling with Tailwind CSS and global styles in `styles/` and `app/globals.css`
- TypeScript-first codebase

##### Getting started

Prerequisites

- Node.js 18 or newer
- pnpm (recommended) — install from <https://pnpm.io/>

Quick start

\`\`\`bash
# install dependencies
pnpm install

# run development server
pnpm dev
\`\`\`

Available scripts

- `pnpm dev` — runs `next dev` (development server)
- `pnpm build` — runs `next build` (production build)
- `pnpm start` — runs `next start` (serve built app)
- `pnpm lint` — run `eslint .`

Building for production

\`\`\`bash
pnpm build
pnpm start
\`\`\`

Project layout (high level)

- `app/` — Next.js App Router pages and layout
- `components/` — UI components and small feature pieces
- `lib/` — utilities and helpers
- `public/` — static assets
- `styles/` — global styles and Tailwind CSS entry

Where to get help

- Create an issue: <https://github.com/ehsanghaffar/code-forge/issues>
- For quick questions, open a discussion or file a concise issue with reproduction steps.

Who maintains this project

- Maintainer: Ehsan Ghaffar — listed as the package author.

Contributing

Contributions are welcome. Open an issue to discuss larger changes, or send a pull request with a focused, well-documented change. Keep changes small and include a description and screenshots (if UI-related).

Notes and next steps

- Consider adding a `CONTRIBUTING.md` and CI badges for build/lint status.
- If you want, I can add a basic `CONTRIBUTING.md` and a PR template next.

---

If anything in this README should be adjusted (more examples, extra badges, or internal docs links), tell me which parts you want expanded and I'll update it.
