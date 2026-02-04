import "server-only"

import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import mdxComponents from "./mdx-components"
import { cn } from "@/lib/utils"

type MdxRemoteProps = {
  source: string
  className?: string
}

// rehype-pretty-code configuration
const prettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: false,
} as const

// Server Component: render MDX string with pretty code + slugged, autolinked headings
export async function MdxRemote({ source, className }: MdxRemoteProps) {
  return (
    <div
      className={cn(
        "prose prose-invert max-w-none",
        // sensible defaults; tweak via container utilities where used
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-foreground",
        "prose-code:bg-secondary/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
        className,
      )}
    >
      {/* MDXRemote compiles on the server with provided plugins */}
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                // clickable anchors on headings
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                  properties: { className: ["subtle-anchor"] },
                },
              ],
              [rehypePrettyCode, prettyCodeOptions],
            ],
          },
        }}
      />
    </div>
  )
}

export default MdxRemote
