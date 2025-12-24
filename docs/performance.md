# Performance Optimization Guide

## Current Performance Status

### ⚠️ Critical Issues

| Issue | Impact | Priority | Status |
|-------|--------|----------|--------|
| Image optimization disabled | High | P0 | 🔴 Not Fixed |
| TypeScript errors ignored | Medium | P0 | 🔴 Not Fixed |
| Excessive client components | High | P0 | 🔴 Not Fixed |
| No Suspense boundaries | Medium | P1 | 🔴 Not Fixed |
| Unused font imports | Low | P1 | 🔴 Not Fixed |
| No loading states | Medium | P1 | 🔴 Not Fixed |

## Next.js 16 Image Optimization

### Problem
\`\`\`javascript
// next.config.mjs
images: {
  unoptimized: true,  // ❌ Disables ALL image optimization
}
\`\`\`

**Impact**:
- Images served at full size (can be 5-10MB)
- No WebP/AVIF conversion
- No responsive images
- Poor Core Web Vitals (LCP)
- Slower page loads

### Solution

1. **Remove the unoptimized flag**:
\`\`\`javascript
// next.config.mjs
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,  // Also fix this
  },
  images: {
    // Remove unoptimized: true
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
\`\`\`

2. **Use next/image everywhere**:
\`\`\`tsx
// ❌ Bad - No optimization
<img src="/profile.png" alt="Profile" />

// ✅ Good - Optimized
import Image from 'next/image'

<Image
  src="/profile.png"
  alt="Profile"
  width={500}
  height={500}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
\`\`\`

3. **For remote images, configure domains**:
\`\`\`javascript
// next.config.mjs
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 's3.amazonaws.com',
      pathname: '/my-bucket/**',
    },
  ],
}
\`\`\`

### Expected Improvements
- **60-80% smaller images** (AVIF/WebP compression)
- **Faster LCP** (Largest Contentful Paint)
- **Better CLS** (Cumulative Layout Shift) with width/height
- **Lazy loading** by default for below-fold images

## Server Components vs Client Components

### Current Problem
Too many components use `"use client"` unnecessarily.

#### Components That Should Be Server Components
\`\`\`tsx
// ❌ components/hero-section.tsx - Currently client
"use client"
// Only uses IntersectionObserver for animations
// Could use CSS-only animations instead

// ✅ Should be:
// Remove "use client" and use CSS animations
\`\`\`

\`\`\`tsx
// ❌ components/projects-grid.tsx - Currently client
"use client"
// Only displays static project data
// Animation can be CSS-based

// ✅ Should be: Server Component with CSS animations
\`\`\`

#### When to Use Client Components

**✅ Use `"use client"` when**:
- Using React hooks (`useState`, `useEffect`, `useContext`)
- Accessing browser APIs (`localStorage`, `window`, `document`)
- Event handlers (`onClick`, `onChange`)
- Third-party libraries that use browser APIs

**❌ Don't use `"use client"` when**:
- Just displaying data
- Using CSS for animations
- No interactivity needed
- No browser APIs accessed

### Migration Strategy

1. **Identify components that can be server components**
2. **Extract interactive logic to separate client components**
3. **Use CSS for animations instead of JavaScript**

Example:
\`\`\`tsx
// Before: One big client component
"use client"
export function ProjectsGrid() {
  const [visible, setVisible] = useState(false)
  // ... lots of IntersectionObserver logic
  return <div>{/* content */}</div>
}

// After: Server component + CSS animations
export function ProjectsGrid() {
  // No client logic needed
  return (
    <div className="animate-on-scroll">
      {/* content */}
    </div>
  )
}

// app/globals.css
.animate-on-scroll {
  animation: fadeIn 0.6s ease-out;
}
\`\`\`

### Expected Improvements
- **40-60% smaller JavaScript bundle**
- **Faster Time to Interactive (TTI)**
- **Faster hydration**
- **Better SEO** (more content server-rendered)

## Streaming with Suspense

### Problem
No Suspense boundaries = blocking data fetching.

\`\`\`tsx
// ❌ Current: Blocking
export default async function BlogPage() {
  const posts = await fetchPosts()  // Blocks entire page
  return <BlogList posts={posts} />
}
\`\`\`

### Solution
\`\`\`tsx
// ✅ With Suspense: Streaming
import { Suspense } from 'react'

export default function BlogPage() {
  return (
    <div>
      <h1>Blog</h1>  {/* Shows immediately */}
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList />  {/* Streams in when ready */}
      </Suspense>
    </div>
  )
}

// BlogList.tsx
async function BlogList() {
  const posts = await fetchPosts()
  return <div>{/* render posts */}</div>
}

// BlogListSkeleton.tsx
function BlogListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>
  )
}
\`\`\`

### Expected Improvements
- **Faster perceived load time**
- **Better UX** (see content sooner)
- **Better Core Web Vitals**
- **Progressive rendering**

## Font Loading Optimization

### Problem
\`\`\`tsx
// app/layout.tsx
const _geist = Geist({ subsets: ["latin"] })  // ❌ Unused (prefix _)
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
\`\`\`

**Impact**: Downloads fonts but never uses them = wasted bandwidth

### Solution

**Option 1: Apply the fonts**
\`\`\`tsx
// app/layout.tsx
const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}

// app/globals.css
@theme inline {
  --font-sans: var(--font-geist), "Geist Fallback";
}
\`\`\`

**Option 2: Remove unused imports**
\`\`\`tsx
// app/layout.tsx
// Remove all unused font imports
import { Analytics } from "@vercel/analytics/next"
// ... no font imports needed if using system fonts
\`\`\`

### Expected Improvements
- **Faster initial page load**
- **Smaller bundle size**
- **Better FCP** (First Contentful Paint)

## Bundle Size Optimization

### Current Issues
- Many unused Radix UI packages installed
- No bundle analysis configured

### Solution

1. **Audit dependencies**:
\`\`\`bash
npx depcheck
\`\`\`

2. **Remove unused packages**:
\`\`\`bash
pnpm remove @radix-ui/react-accordion @radix-ui/react-alert-dialog
# ... remove all unused Radix components
\`\`\`

3. **Add bundle analyzer**:
\`\`\`bash
pnpm add -D @next/bundle-analyzer
\`\`\`

\`\`\`javascript
// next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
\`\`\`

\`\`\`bash
# Analyze bundle
ANALYZE=true pnpm build
\`\`\`

## Animation Performance

### Problem
\`\`\`tsx
// components/cursor-glow.tsx
style={{
  left: position.x,      // ❌ Triggers layout
  top: position.y,       // ❌ Triggers layout
  opacity: isVisible ? 1 : 0,
}}
\`\`\`

**Impact**: Animating `left`/`top` triggers expensive layout recalculations

### Solution
\`\`\`tsx
// Use transform instead
style={{
  transform: `translate(${position.x}px, ${position.y}px)`,  // ✅ GPU accelerated
  opacity: isVisible ? 1 : 0,
  willChange: 'transform, opacity',  // ✅ Hint to browser
}}
\`\`\`

Or better, use CSS:
\`\`\`css
.cursor-glow {
  transform: translate(var(--x), var(--y));
  opacity: var(--opacity);
  will-change: transform, opacity;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
\`\`\`

### Expected Improvements
- **60fps animations**
- **Lower CPU usage**
- **Smoother scrolling**

## Loading States

### Problem
No `loading.tsx` files = no loading UI during navigation

### Solution
\`\`\`tsx
// app/(public)/blog/loading.tsx
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

Create for:
- `app/(public)/blog/loading.tsx`
- `app/(public)/projects/loading.tsx`
- `app/(public)/workbench/loading.tsx`

## Error Boundaries

### Problem
No `error.tsx` files = full page crashes on errors

### Solution
\`\`\`tsx
// app/(public)/error.tsx
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

## Performance Metrics Targets

### Core Web Vitals

| Metric | Current | Target | Priority |
|--------|---------|--------|----------|
| LCP (Largest Contentful Paint) | ~3.5s | <2.5s | P0 |
| FID (First Input Delay) | ~150ms | <100ms | P1 |
| CLS (Cumulative Layout Shift) | ~0.15 | <0.1 | P1 |
| FCP (First Contentful Paint) | ~2.2s | <1.8s | P1 |
| TTI (Time to Interactive) | ~4.5s | <3.5s | P0 |

### JavaScript Bundle

| Bundle | Current | Target |
|--------|---------|--------|
| First Load JS | ~350KB | <250KB |
| Route JS | ~180KB | <150KB |

## Performance Monitoring

### Add Vercel Speed Insights
\`\`\`tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
\`\`\`

### Add Web Vitals Reporting
\`\`\`tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
\`\`\`

## Quick Wins Checklist

- [ ] Remove `unoptimized: true` from next.config.mjs
- [ ] Remove `ignoreBuildErrors: true` from next.config.mjs
- [ ] Delete unused font imports or apply them
- [ ] Convert hero-section to CSS animations
- [ ] Convert projects-grid to server component
- [ ] Add loading.tsx for blog route
- [ ] Add error.tsx for route groups
- [ ] Run depcheck and remove unused deps
- [ ] Use transform instead of left/top for animations
- [ ] Add will-change to animated elements

## Performance Testing

\`\`\`bash
# Test locally
pnpm build && pnpm start

# Lighthouse
npx lighthouse http://localhost:3000 --view

# Bundle analysis
ANALYZE=true pnpm build
\`\`\`

---

**Next Steps**: See [improvement-checklist.md](./improvement-checklist.md) for prioritized implementation plan.
