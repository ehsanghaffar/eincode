"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import type { BlogPost } from "@/types/mdx"

interface BlogListProps {
  posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="space-y-6">
      {posts.map((post, index) => (
        <article
          key={post.slug}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card/40 glass p-6 sm:p-7 transition-all duration-400 hover:border-primary/40 hover:bg-card/60 active:scale-[0.995] hover-lift opacity-0",
            isVisible && "animate-fade-in-up",
          )}
          style={{ animationDelay: `${index * 80 + 100}ms` }}
        >
          <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
            <span className="sr-only">Read {post.title}</span>
          </Link>

          <div className="relative z-0">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-foreground">
                {post.frontmatter.category}
              </span>
              <div className="ml-auto flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.frontmatter.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.frontmatter.readTime}
                </span>
              </div>
            </div>

            <h2 className="mb-3 text-xl sm:text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-gradient">
              {post.frontmatter.title}
            </h2>

            <p className="mb-5 text-sm sm:text-base leading-relaxed text-muted-foreground line-clamp-2">
              {post.frontmatter.excerpt}
            </p>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src={"/developer-portrait.png"} alt={post.frontmatter.author ?? "Author"} />
                  <AvatarFallback className="bg-secondary text-xs font-mono">
                    {(post.frontmatter.author ?? "").split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{post.frontmatter.author ?? ""}</span>
                  <span className="text-xs text-muted-foreground">{/* role not available in MDX frontmatter */}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-primary transition-all duration-300 sm:opacity-0 sm:translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0">
                <span>read article</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary/40 px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors group-hover:bg-secondary/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
        </article>
      ))}
    </div>
  )
}
