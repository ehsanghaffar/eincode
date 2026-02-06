# EinCode

A modern personal portfolio and digital laboratory built with Next.js 16, React 19 and cutting-edge web technologies.

## What the project does

EinCode is Ehsan Ghaffar's digital laboratory and portfolio website, showcasing technical projects, blog posts, and active development work. It demonstrates modern web development best practices with Next.js 16 App Router, React 19 server components, TypeScript, and Tailwind CSS v4.

### Why this is useful

- **Portfolio Platform**: Professional showcase of projects, skills, and technical writing
- **Technical Blog**: MDX-powered blog with in-depth software engineering articles
- **Development Sandbox**: Live workbench displaying active projects and experiments
- **Modern Stack Demo**: Real-world implementation of latest web technologies
- **SEO Optimized**: Complete structured data, sitemap, and meta tag implementation

#### Key features

- **Modern Tech Stack**: Next.js 16 with App Router, React 19, TypeScript, Tailwind CSS v4
- **Content Management**: MDX-based blog with frontmatter and syntax highlighting
- **Interactive Workbench**: Live project progress tracking and experiment showcase
- **Lab Notes**: Technical thoughts and discoveries section
- **Theme System**: Built-in dark/light mode with next-themes
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Performance**: Optimized images, fonts, and loading strategies

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

- `pnpm dev` — runs `next dev` (development server with Turbopack)
- `pnpm build` — runs `next build` (production build)
- `pnpm start` — runs `next start` (serve built app)
- `pnpm lint` — run `eslint .` (code linting)

Building for production

\`\`\`bash
pnpm build
pnpm start
\`\`\`

Project layout

\`\`\`
eincode/
├── app/                     # Next.js App Router pages
│   ├── (public)/           # Route group for public pages
│   │   ├── workbench/      # Work in progress projects
│   │   ├── notes/          # Lab notes section
│   │   ├── blog/[postSlug]/ # Dynamic blog post pages
│   │   └── layout.tsx      # Public layout
│   ├── globals.css         # Global styles with Tailwind v4
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── sitemap.ts, robots.ts # SEO files
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── workbench.tsx      # WIP projects display
│   ├── lab-notes.tsx      # Notes section
│   ├── hero-section.tsx   # Homepage hero
│   └── theme-*.tsx        # Theme management
├── content/               # MDX blog posts
├── lib/                   # Utilities and helpers
│   ├── blog-data.tsx      # Blog posts data
│   ├── mdx-utils.ts       # MDX processing
│   └── structured-data.ts # SEO structured data
├── public/                # Static assets
└── types/                 # TypeScript definitions
\`\`\`

## Routes

- **/**: Homepage with hero, workbench, and blog sections
- **/workbench**: Active projects and experiments showcase
- **/notes**: Technical lab notes and quick thoughts
- **/blog**: Blog posts listing and archive
- **/blog/[slug]**: Individual blog post pages

## Content Management

Blog posts are written in MDX format with frontmatter metadata:

\`\`\`mdx
---
title: "Post Title"
description: "Post description"
publishedAt: "2024-01-01"
tags: ["tag1", "tag2"]
---

# Content here
\`\`\`

## Technologies Used

### Core Framework
- **Next.js 16**: Latest version with Turbopack and App Router
- **React 19**: Latest React with server components
- **TypeScript**: Full TypeScript support with path aliases

### UI & Styling
- **Tailwind CSS v4**: Latest CSS-first configuration
- **Radix UI**: Comprehensive set of accessible primitives
- **shadcn/ui**: Modern component library built on Radix
- **Lucide React**: Icon library

### Content & MDX
- **next-mdx-remote**: MDX processing for blog posts
- **gray-matter**: Frontmatter parsing
- **rehype/remark plugins**: Markdown processing enhancements
- **shiki**: Syntax highlighting

### Developer Experience
- **pnpm**: Fast, disk space efficient package manager
- **ESLint**: Code linting
- **next-themes**: Dark/light mode support
- **Vercel Analytics**: Performance monitoring

## Deployment

This project is optimized for deployment on Vercel with automatic optimizations for:
- Image optimization
- Font loading
- Bundle analysis
- Performance monitoring

## Contributing

Contributions are welcome! Please:
1. Open an issue to discuss larger changes
2. Send focused pull requests with clear descriptions
3. Follow the existing code style and TypeScript patterns
4. Include screenshots for UI-related changes

## License

This project is open source and available under the [MIT License](LICENSE).

---

**EinCode** © 2024 Ehsan Ghaffar. Built with ❤️ using modern web technologies.
