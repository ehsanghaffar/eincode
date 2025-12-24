# Comprehensive Improvement Checklist

**Generated**: December 24, 2025  
**Based on**: Codebase analysis + Next.js 16 + Tailwind CSS v4 best practices

---

## 🔴 CRITICAL (P0) - Week 1

### 1. Fix Image Optimization
**Priority**: P0 | **Impact**: High | **Effort**: Low (30 min)

- [ ] Remove `unoptimized: true` from `next.config.mjs`
- [ ] Configure `remotePatterns` if using external images
- [ ] Update any `<img>` tags to use `next/image`
- [ ] Test image loading on all pages
- [ ] Verify Core Web Vitals improve

**Files to modify**:
- `next.config.mjs`

**Reference**: [docs/performance.md](./performance.md#nextjs-16-image-optimization)

---

### 2. Fix TypeScript Errors
**Priority**: P0 | **Impact**: High | **Effort**: Medium (2-3 hours)

- [ ] Remove `ignoreBuildErrors: true` from `next.config.mjs`
- [ ] Run `pnpm tsc --noEmit` to see all errors
- [ ] Fix type errors in `app/layout.tsx` (remove `@ts-ignore`)
- [ ] Add proper types for blog post content
- [ ] Fix any other type errors that appear
- [ ] Verify build succeeds: `pnpm build`

**Files to modify**:
- `next.config.mjs`
- `app/layout.tsx`
- `lib/blog-data.tsx`
- Various component files

**Reference**: [docs/performance.md](./performance.md#typescript-safety)

---

### 3. Remove Unused Font Imports
**Priority**: P0 | **Impact**: Medium | **Effort**: Low (15 min)

- [ ] Either apply fonts to `<body>` className
- [ ] Or remove unused font imports
- [ ] Update Tailwind theme if using custom fonts
- [ ] Test font rendering in light and dark mode
- [ ] Verify bundle size decrease

**Files to modify**:
- `app/layout.tsx`
- `app/globals.css` (if applying fonts)

**Reference**: [docs/performance.md](./performance.md#font-loading-optimization)

---

### 4. Consolidate CSS Files
**Priority**: P0 | **Impact**: Low | **Effort**: Low (15 min)

- [ ] Review content of `styles/globals.css`
- [ ] Merge any unique styles into `app/globals.css`
- [ ] Delete `styles/globals.css`
- [ ] Delete `styles/` directory if empty
- [ ] Verify no style regressions

**Files to modify**:
- `app/globals.css`
- Delete: `styles/globals.css`

---

### 5. Convert to Server Components
**Priority**: P0 | **Impact**: High | **Effort**: Medium (2 hours)

**Components to convert**:
- [ ] `components/hero-section.tsx` - Use CSS animations
- [ ] `components/projects-grid.tsx` - Make server component
- [ ] `components/lab-notes.tsx` - Make server component
- [ ] `components/cursor-glow.tsx` - Use CSS-only solution

**Steps for each**:
1. Remove `"use client"` directive
2. Replace `useState`/`useEffect` with CSS
3. Move interactive parts to separate client components if needed
4. Test functionality remains the same

**Reference**: [docs/performance.md](./performance.md#server-components-vs-client-components)

---

### 6. Add Loading States
**Priority**: P0 | **Impact**: Medium | **Effort**: Low (1 hour)

Create `loading.tsx` files with skeleton screens:

- [ ] `app/(public)/blog/loading.tsx`
- [ ] `app/(public)/blog/[postSlug]/loading.tsx`
- [ ] `app/(public)/projects/loading.tsx`
- [ ] `app/(public)/workbench/loading.tsx`

**Template**:
\`\`\`tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-12 w-48 bg-muted animate-pulse rounded mb-8" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  )
}
\`\`\`

---

### 7. Add Error Boundaries
**Priority**: P0 | **Impact**: Medium | **Effort**: Low (30 min)

Create `error.tsx` files:

- [ ] `app/(public)/error.tsx` - For all public routes
- [ ] `app/error.tsx` - Root error boundary

**Template**:
\`\`\`tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
      >
        Try again
      </button>
    </div>
  )
}
\`\`\`

---

### 8. Create Custom 404 Page
**Priority**: P0 | **Impact**: Low | **Effort**: Low (30 min)

- [ ] Create `app/not-found.tsx`
- [ ] Add branded design matching site theme
- [ ] Include navigation back to home
- [ ] Test by visiting non-existent route

**Template**:
\`\`\`tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg"
      >
        Go Home
      </Link>
    </div>
  )
}
\`\`\`

---

## 🟠 HIGH PRIORITY (P1) - Week 2

### 9. Add Suspense Boundaries
**Priority**: P1 | **Impact**: Medium | **Effort**: Medium (2 hours)

Wrap async components in Suspense:

- [ ] Blog post list fetching
- [ ] Individual blog post fetching
- [ ] Projects data loading
- [ ] Any async data fetching

**Example**:
\`\`\`tsx
import { Suspense } from 'react'

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <BlogList />
    </Suspense>
  )
}
\`\`\`

---

### 10. Fix Accessibility Issues
**Priority**: P1 | **Impact**: High | **Effort**: Medium (3 hours)

#### ARIA Labels
- [ ] Add to theme changer button
- [ ] Add to social links in footer
- [ ] Add to mobile menu button (verify existing)
- [ ] Add to all icon-only buttons

#### Keyboard Navigation
- [ ] Fix mobile menu keyboard navigation
- [ ] Add Escape key handler to close menu
- [ ] Implement focus trapping in mobile menu
- [ ] Use Radix UI for theme dropdown
- [ ] Test Tab navigation through all interactive elements

#### Color Contrast
- [ ] Run contrast checker on all theme colors
- [ ] Fix any failing combinations
- [ ] Test in light and dark modes
- [ ] Verify WCAG AA compliance (4.5:1 for normal text)

#### Other
- [ ] Add skip link to main content
- [ ] Verify heading hierarchy (h1 → h2 → h3)
- [ ] Add focus indicators
- [ ] Test with screen reader

**Reference**: [docs/accessibility.md](./accessibility.md)

---

### 11. Add Comprehensive SEO
**Priority**: P1 | **Impact**: High | **Effort**: Medium (3 hours)

#### Metadata
- [ ] Add `og:image` to all pages
- [ ] Add Twitter card metadata
- [ ] Add JSON-LD structured data for blog posts
- [ ] Add canonical URLs
- [ ] Generate dynamic OG images for blog posts

#### Files to Create
- [ ] `public/robots.txt`
- [ ] `app/sitemap.ts` (dynamic sitemap)
- [ ] Blog post structured data

**Templates**:

\`\`\`typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = blogPosts.map((post) => ({
    url: `https://eindev.ir/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://eindev.ir',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://eindev.ir/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...posts,
  ]
}
\`\`\`

\`\`\`typescript
// app/(public)/blog/[postSlug]/page.tsx - Add structured data
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.postSlug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{
        url: `/og-images/${post.slug}.png`,
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`/og-images/${post.slug}.png`],
    },
  }
}
\`\`\`

---

### 12. Fix Mobile Menu Animation
**Priority**: P1 | **Impact**: Medium | **Effort**: Low (30 min)

- [ ] Replace `max-h-96` with proper grid animation
- [ ] Or use visibility-based animation
- [ ] Test with various menu content sizes
- [ ] Ensure smooth animation

**Better approach**:
\`\`\`tsx
// Use grid-template-rows
<div className={cn(
  "grid transition-all duration-400 md:hidden",
  isMobileMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
)}>
  <div className="overflow-hidden">
    {/* Menu content */}
  </div>
</div>
\`\`\`

---

## 🟡 MEDIUM PRIORITY (P2) - Week 3

### 13. Create Reusable Animation Hooks
**Priority**: P2 | **Impact**: Medium | **Effort**: Low (1 hour)

- [ ] Create `hooks/use-in-view.ts`
- [ ] Replace repeated IntersectionObserver code
- [ ] Or use Framer Motion's `useInView`

**Template**:
\`\`\`typescript
// hooks/use-in-view.ts
import { useEffect, useRef, useState } from 'react'

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      options
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return { ref, isInView }
}
\`\`\`

---

### 14. Move Content to MDX or CMS
**Priority**: P2 | **Impact**: High | **Effort**: High (1 day)

**Options**:

#### Option A: MDX Files (Recommended for <50 posts)
- [ ] Install `@next/mdx` and dependencies
- [ ] Create `content/blog/` directory
- [ ] Convert blog posts to `.mdx` files
- [ ] Create MDX components
- [ ] Update blog data fetching

#### Option B: Headless CMS (For 50+ posts)
- [ ] Choose CMS (Contentful, Sanity, Strapi)
- [ ] Setup CMS account
- [ ] Create content models
- [ ] Migrate existing content
- [ ] Update data fetching

**MDX Setup**:
\`\`\`bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
pnpm add remark-gfm rehype-highlight
\`\`\`

\`\`\`javascript
// next.config.mjs
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
\`\`\`

---

### 15. Implement Search Functionality
**Priority**: P2 | **Impact**: High | **Effort**: Medium (4 hours)

**Options**:

#### Option A: Client-Side Search (Simple)
- [ ] Add search state management
- [ ] Filter blog posts by title/content
- [ ] Add debounced search input
- [ ] Display search results

#### Option B: Algolia/Meilisearch (Better UX)
- [ ] Setup search service account
- [ ] Index blog posts
- [ ] Integrate search component
- [ ] Add instant search results

**Client-side template**:
\`\`\`tsx
'use client'

export function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState('')
  
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-2 border rounded-lg"
      />
      <div className="mt-4">
        {filtered.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
\`\`\`

---

### 16. Add Newsletter Subscription
**Priority**: P2 | **Impact**: Medium | **Effort**: Medium (3 hours)

- [ ] Choose email service (ConvertKit, Mailchimp, Buttondown)
- [ ] Create API route for subscription
- [ ] Add form validation
- [ ] Add success/error states
- [ ] Test subscription flow

**API Route**:
\`\`\`typescript
// app/api/newsletter/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()
  
  // Validate email
  if (!email || !email.includes('@')) {
    return NextResponse.json(
      { error: 'Invalid email' },
      { status: 400 }
    )
  }
  
  // Subscribe to service (example with ConvertKit)
  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email,
      }),
    }
  )
  
  if (!response.ok) {
    return NextResponse.json(
      { error: 'Subscription failed' },
      { status: 500 }
    )
  }
  
  return NextResponse.json({ success: true })
}
\`\`\`

---

### 17. Generate RSS Feed
**Priority**: P2 | **Impact**: Low | **Effort**: Low (1 hour)

- [ ] Create `app/rss.xml/route.ts`
- [ ] Generate RSS XML from blog posts
- [ ] Add RSS link to footer
- [ ] Test feed in RSS reader

**Template**:
\`\`\`typescript
// app/rss.xml/route.ts
import { blogPosts } from '@/lib/blog-data'
import { NextResponse } from 'next/server'

export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>EinCode Blog</title>
    <link>https://eindev.ir/blog</link>
    <description>Code, experiments, and digital artifacts</description>
    ${blogPosts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>https://eindev.ir/blog/${post.slug}</link>
      <description>${post.excerpt}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
\`\`\`

---

### 18. Add Environment Variables
**Priority**: P2 | **Impact**: Low | **Effort**: Low (30 min)

- [ ] Create `.env.local` file
- [ ] Move hard-coded URLs to env vars
- [ ] Update components to use env vars
- [ ] Add `.env.example` for reference
- [ ] Update Vercel env vars

**Files**:
\`\`\`env
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GITHUB_URL=https://github.com/ehsanghaffar
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/ehsanghaffar
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/ehsanghaffar
\`\`\`

---

### 19. Remove Unused Dependencies
**Priority**: P2 | **Impact**: Low | **Effort**: Low (30 min)

- [ ] Run `npx depcheck`
- [ ] Review unused Radix UI packages
- [ ] Remove unused packages
- [ ] Run `pnpm install` to update lockfile
- [ ] Verify app still works

\`\`\`bash
# Check for unused deps
npx depcheck

# Remove (example)
pnpm remove @radix-ui/react-accordion @radix-ui/react-alert-dialog
# ... remove all unused
\`\`\`

---

## 🟢 LOW PRIORITY (P3) - Week 4+

### 20. Optimize Animations
**Priority**: P3 | **Impact**: Low | **Effort**: Low (1 hour)

- [ ] Add `will-change` to animated elements
- [ ] Use `transform` instead of `left`/`top`
- [ ] Use GPU-accelerated properties
- [ ] Test animation performance

\`\`\`css
/* app/globals.css */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force GPU */
}
\`\`\`

---

### 21. Add Bundle Analysis
**Priority**: P3 | **Impact**: Low | **Effort**: Low (15 min)

\`\`\`bash
pnpm add -D @next/bundle-analyzer
\`\`\`

\`\`\`javascript
// next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
\`\`\`

\`\`\`bash
# Analyze
ANALYZE=true pnpm build
\`\`\`

---

### 22. Add Testing Suite
**Priority**: P3 | **Impact**: High | **Effort**: High (2 days)

- [ ] Setup Jest for unit tests
- [ ] Setup React Testing Library
- [ ] Setup Playwright for E2E
- [ ] Write tests for critical components
- [ ] Setup CI to run tests

---

### 23. Add Caching Strategy
**Priority**: P3 | **Impact**: Medium | **Effort**: Medium (2 hours)

When moving to dynamic content:

\`\`\`typescript
// Revalidate every hour
export const revalidate = 3600

// Or use ISR
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    postSlug: post.slug,
  }))
}
\`\`\`

---

## Progress Tracking

### Quick Wins (Can be done in < 1 hour)
- [x] Documentation created
- [ ] Remove `unoptimized: true`
- [ ] Remove `ignoreBuildErrors: true`
- [ ] Remove unused fonts or apply them
- [ ] Delete duplicate CSS file
- [ ] Add ARIA labels
- [ ] Create 404 page
- [ ] Add environment variables

### This Week Priority
1. Image optimization
2. TypeScript errors
3. Loading states
4. Error boundaries

### Next Sprint
1. Accessibility fixes
2. SEO improvements
3. Search functionality

---

**Estimated Total Time**: 4-6 weeks for all improvements  
**Minimum Viable Improvements**: P0 items (Week 1)  
**Recommended First Phase**: P0 + P1 (Weeks 1-2)
