# Development Workflow

## Getting Started

### Prerequisites

- **Node.js**: 18 or newer
- **pnpm**: 8.x (recommended package manager)
- **Git**: For version control
- **VS Code**: Recommended editor (with extensions below)

### Initial Setup

\`\`\`bash
# Clone repository
git clone https://github.com/ehsanghaffar/code-forge.git
cd eincode

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser
open http://localhost:3000
\`\`\`

## Available Commands

### Development
\`\`\`bash
# Start dev server (default port: 3000)
pnpm dev

# Start on different port
pnpm dev -- -p 3001

# Start with turbo mode (faster HMR)
pnpm dev --turbo
\`\`\`

### Build & Production
\`\`\`bash
# Create production build
pnpm build

# Test production build locally
pnpm build && pnpm start

# Analyze bundle size
ANALYZE=true pnpm build
\`\`\`

### Code Quality
\`\`\`bash
# Run ESLint
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix

# Type check (when ignoreBuildErrors is removed)
pnpm tsc --noEmit
\`\`\`

### Experimental
\`\`\`bash
# Analyze Next.js app
pnpm analyze
\`\`\`

## Project Structure Deep Dive

### App Router (`app/`)
\`\`\`
app/
├── layout.tsx              # Root layout (fonts, metadata, providers)
├── page.tsx                # Homepage (/)
├── globals.css             # Global styles + Tailwind config
└── (public)/               # Route group (shared layout)
    ├── layout.tsx          # Public pages layout (Header + Footer)
    ├── blog/
    │   ├── page.tsx        # /blog
    │   └── [postSlug]/
    │       └── page.tsx    # /blog/[slug]
    ├── projects/
    │   └── page.tsx        # /projects
    ├── workbench/
    │   └── page.tsx        # /workbench
    └── notes/
        └── page.tsx        # /notes (currently commented out)
\`\`\`

### Components Organization
\`\`\`
components/
├── header.tsx              # Main navigation (client component)
├── footer.tsx              # Footer with links (client component)
├── theme-*.tsx             # Theme-related components (client)
├── cursor-glow.tsx         # Custom cursor effect (client)
├── hero-section.tsx        # Hero component (client - should be server)
├── projects-grid.tsx       # Projects display (client - should be server)
├── lab-notes.tsx           # Notes display (client - should be server)
├── workbench.tsx           # Workbench UI (client)
├── public/                 # Page-specific components
│   ├── blog/
│   │   ├── blog-hero.tsx
│   │   ├── blog-list.tsx
│   │   ├── blog-post-content.tsx
│   │   └── blog-sidebar.tsx
│   ├── notes/
│   ├── projects/
│   └── workbench/
└── ui/                     # Base UI primitives (shadcn/ui style)
    ├── avatar.tsx
    ├── button.tsx
    └── input.tsx
\`\`\`

### Library Files (`lib/`)
\`\`\`
lib/
├── utils.ts                # cn() helper, other utilities
├── themes.ts               # Theme configurations
└── blog-data.tsx           # Blog posts data (source of truth)
\`\`\`

## Development Patterns

### Adding a New Page

1. **Create the route file**:
\`\`\`bash
# For /about page
mkdir -p app/(public)/about
touch app/(public)/about/page.tsx
\`\`\`

2. **Create the page component**:
\`\`\`tsx
// app/(public)/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | EinCode',
  description: 'About Ehsan Ghaffar and this digital laboratory',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">About</h1>
      <p className="mt-4">Content here...</p>
    </div>
  )
}
\`\`\`

3. **Add to navigation** (if needed):
\`\`\`tsx
// components/header.tsx
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },  // Add this
  { label: "Projects", href: "/projects" },
  // ...
]
\`\`\`

### Adding a New Component

1. **Decide: Server or Client Component?**
   - **Server**: Static content, no hooks, no browser APIs
   - **Client**: Interactive, uses hooks, browser APIs

2. **Create component file**:
\`\`\`tsx
// components/my-component.tsx
// Only add "use client" if necessary
export function MyComponent({ title }: { title: string }) {
  return <div>{title}</div>
}
\`\`\`

3. **Import and use**:
\`\`\`tsx
import { MyComponent } from '@/components/my-component'

<MyComponent title="Hello" />
\`\`\`

### Adding a Blog Post

1. **Open blog data file**:
\`\`\`bash
code lib/blog-data.tsx
\`\`\`

2. **Add new post object**:
\`\`\`tsx
export const blogPosts: BlogPost[] = [
  // ... existing posts
  {
    id: 6,
    slug: "my-new-post",
    title: "My New Post Title",
    excerpt: "Short description for listing page",
    content: `
## Introduction

Full markdown content here...

\`\`\`typescript
// Code blocks supported
const hello = "world"
\`\`\`
    `,
    date: "Dec 24, 2025",
    readTime: "5 min read",
    category: "frontend",
    tags: ["nextjs", "react"],
    author: {
      name: "Ehsan Ghaffar",
      avatar: "/developer-portrait.png",
      role: "Software Engineer",
    },
    featured: false,
    color: "from-blue-500/20 to-purple-500/20",
  },
]
\`\`\`

3. **View at**: `http://localhost:3000/blog/my-new-post`

### Styling Components

#### Using Tailwind Utilities
\`\`\`tsx
<div className="bg-background text-foreground rounded-lg p-4">
  Content
</div>
\`\`\`

#### Composing Classes with cn()
\`\`\`tsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-class",
  isActive && "active-class",
  "conditional-class"
)}>
  Content
</div>
\`\`\`

#### Using Theme Colors
\`\`\`tsx
// Available theme colors:
// bg-background, bg-foreground
// bg-card, bg-popover
// bg-primary, bg-secondary, bg-muted, bg-accent
// text-foreground, text-muted-foreground
// border-border

<button className="bg-primary text-primary-foreground">
  Button
</button>
\`\`\`

#### Adding Custom Animations
\`\`\`css
/* app/globals.css */
@keyframes my-animation {
  from { opacity: 0; }
  to { opacity: 1; }
}

.my-animated-class {
  animation: my-animation 0.3s ease-out;
}
\`\`\`

### Theme Development

#### Adding a New Theme Color
\`\`\`tsx
// lib/themes.ts
export const themes = [
  // ... existing themes
  {
    name: "sunset",
    color: "#FF6B35",
    cssVars: {
      light: {
        primary: "oklch(0.65 0.25 30)",
        accent: "oklch(0.65 0.25 30)",
      },
      dark: {
        primary: "oklch(0.75 0.22 30)",
        accent: "oklch(0.75 0.22 30)",
      },
    },
  },
]
\`\`\`

## Development Tools & Extensions

### Recommended VS Code Extensions

\`\`\`json
// .vscode/extensions.json (create this file)
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "GitHub.copilot",
    "GitHub.copilot-chat",
    "unifiedjs.vscode-mdx"
  ]
}
\`\`\`

### VS Code Settings

\`\`\`json
// .vscode/settings.json (create this file)
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
\`\`\`

## Debugging

### Next.js Debug Mode
\`\`\`bash
# Start with debug logging
NODE_OPTIONS='--inspect' pnpm dev
\`\`\`

Then open Chrome DevTools:
\`\`\`
chrome://inspect
\`\`\`

### Console Logging
\`\`\`tsx
// Server Component (logs in terminal)
export default async function ServerPage() {
  console.log('This logs in terminal')
  return <div>Content</div>
}

// Client Component (logs in browser)
'use client'
export function ClientComponent() {
  console.log('This logs in browser DevTools')
  return <div>Content</div>
}
\`\`\`

### React DevTools
Install browser extension: [React DevTools](https://react.dev/learn/react-developer-tools)

## Common Issues & Solutions

### Issue: "Module not found"
**Cause**: Import path incorrect or missing `@/` alias

**Solution**:
\`\`\`tsx
// ❌ Wrong
import { Header } from 'components/header'

// ✅ Correct
import { Header } from '@/components/header'
\`\`\`

### Issue: "Hydration Error"
**Cause**: Server HTML doesn't match client HTML

**Common causes**:
- Using `Date.now()` or `Math.random()` in render
- Conditional rendering based on client-only state
- Using browser APIs in Server Components

**Solution**:
\`\`\`tsx
// ❌ Causes hydration error
export default function Page() {
  const timestamp = Date.now()  // Different on server vs client
  return <div>{timestamp}</div>
}

// ✅ Fixed
'use client'
import { useState, useEffect } from 'react'

export default function Page() {
  const [timestamp, setTimestamp] = useState<number | null>(null)
  
  useEffect(() => {
    setTimestamp(Date.now())
  }, [])
  
  return <div>{timestamp ?? 'Loading...'}</div>
}
\`\`\`

### Issue: "Cannot read property of undefined"
**Cause**: Data not loaded yet or prop missing

**Solution**: Add proper checks
\`\`\`tsx
// ❌ Crashes if post is undefined
<h1>{post.title}</h1>

// ✅ Safe
<h1>{post?.title ?? 'Loading...'}</h1>

// ✅ Better - early return
if (!post) return <div>Loading...</div>
return <h1>{post.title}</h1>
\`\`\`

### Issue: Styles not applying
**Causes**:
1. Tailwind class misspelled
2. Custom class not in globals.css
3. CSS specificity issue

**Solutions**:
\`\`\`tsx
// 1. Check spelling
<div className="backgrund-primary">  // ❌ typo
<div className="bg-primary">        // ✅ correct

// 2. Ensure class exists
// app/globals.css
.my-custom-class {
  /* styles */
}

// 3. Use !important if needed (last resort)
<div className="!bg-primary">
\`\`\`

## Testing (To Be Added)

Currently no tests. Future additions:
- Jest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests
- Lighthouse CI for performance

## Git Workflow

\`\`\`bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes, commit often
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/my-feature

# Create PR on GitHub
\`\`\`

### Commit Message Convention
\`\`\`
feat: new feature
fix: bug fix
docs: documentation
style: formatting, no code change
refactor: code refactoring
perf: performance improvement
test: adding tests
chore: maintenance
\`\`\`

## Performance Tips During Development

1. **Use React DevTools Profiler** to identify slow components
2. **Check bundle size** regularly with analyzer
3. **Monitor dev server memory** - restart if sluggish
4. **Clear .next folder** if builds seem stale: `rm -rf .next`
5. **Use production build** for accurate performance testing

## Getting Help

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Radix UI Docs**: https://www.radix-ui.com/
- **GitHub Issues**: https://github.com/ehsanghaffar/code-forge/issues
- **Discord**: (Add if exists)

---

**Happy Coding!** 🚀
