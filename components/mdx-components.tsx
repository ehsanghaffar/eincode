import Link from "next/link"
import Image, { type ImageProps } from "next/image"
import type { DetailedHTMLProps, AnchorHTMLAttributes, HTMLAttributes } from "react"

// Shared MDX component mappings
// - Anchor tags use Next.js Link for routing and accessibility
// - Images use Next/Image for optimization
// - Pre/code keep classes emitted by rehype-pretty-code

export const mdxComponents = {
  a: (props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
    const { href = "", children, ...rest } = props
    const isExternal = typeof href === "string" && /^(https?:)?\/\//.test(href)
    return (
      <Link
        href={href as string}
        {...(rest as any)}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="underline-offset-4 hover:underline text-primary"
      >
        {children}
      </Link>
    )
  },
  img: (props: ImageProps & { alt?: string }) => {
    const img = props
    const { alt = "", width, height, ...rest } = img
    // Prefer explicit width/height if provided, otherwise use responsive fill
    if (width && height) {
      return (
        <Image
          alt={alt}
          width={Number(width)}
          height={Number(height)}
          className="rounded-lg border border-border/50"
          {...rest}
        />
      )
    }
    return (
      <div className="relative w-full h-auto">
        <Image
          alt={alt}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="rounded-lg border border-border/50 object-contain"
          {...(rest as any)}
        />
      </div>
    )
  },
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="prose-pre:bg-card/80 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl overflow-x-auto"
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => <code {...props} className="prose-code:font-mono prose-code:text-sm" />,
} satisfies Record<string, any>

export default mdxComponents
