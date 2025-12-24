# OG Images Directory

This directory should contain Open Graph images for social media sharing.

## Required Images

### Static Pages (1200x630px)
- `og-image.png` - Homepage
- `og-image-blog.png` - Blog list page
- `og-image-projects.png` - Projects page
- `og-image-workbench.png` - Workbench page

### Dynamic Blog Posts (1200x630px)
Each blog post should have an OG image named after its slug:
- `building-linux-distro-from-scratch.png`
- `mcp-protocol-llm-applications.png`
- `nextjs-16-tailwind-v4-migration.png`
- `self-hosting-llms-fastapi.png`
- `rust-wasm-performance.png`

## Image Requirements
- **Dimensions**: 1200 x 630 pixels
- **Format**: PNG or JPEG
- **File size**: Under 5MB
- **Recommended**: Use PNG for better quality

## Generating OG Images

### Option 1: Using Figma/Design Tools
1. Create a 1200x630px canvas
2. Use brand colors and fonts
3. Include post title and key visual
4. Export as PNG

### Option 2: Using Next.js Dynamic OG Images
\`\`\`typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')
  
  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #0ea5e9, #06b6d4)',
      }}>
        <h1 style={{ fontSize: 60, color: 'white' }}>{title}</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
\`\`\`

### Option 3: Using Online Tools
- [Vercel OG Image Playground](https://og-playground.vercel.app/)
- [Canva](https://www.canva.com/) - Use social media templates
- [Figma Community](https://www.figma.com/community) - Search for OG image templates

## Placeholder Images
Until custom images are created, you can use:
1. Solid color backgrounds with text
2. Screenshots of the actual pages
3. Gradient backgrounds with branding

## Testing OG Images
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [OpenGraph.xyz](https://www.opengraph.xyz/)

## Current Status
🚧 OG images need to be created for all pages and blog posts.
