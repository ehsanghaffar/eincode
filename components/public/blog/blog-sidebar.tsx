"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Mail, Rss, Search, Tag, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "All Posts", count: 12, slug: "all" },
  { name: "AI & Machine Learning", count: 4, slug: "ai" },
  { name: "Frontend", count: 3, slug: "frontend" },
  { name: "Systems & DevOps", count: 3, slug: "systems" },
  { name: "Design", count: 2, slug: "design" },
]

const popularTags = ["nextjs", "react", "typescript", "llm", "rust", "linux", "python", "tailwind", "wasm", "rag"]

export function BlogSidebar() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [email, setEmail] = useState("")
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription
    setEmail("")
  }

  return (
    <aside ref={sidebarRef} className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      {/* Search */}
      <div className={cn("opacity-0", isVisible && "animate-fade-in-up")}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10 bg-card/40 border-border/50 focus:border-primary/50"
          />
        </div>
      </div>

      {/* Categories */}
      <div className={cn("opacity-0", isVisible && "animate-fade-in-up stagger-1")}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Categories</h3>
        </div>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-300",
                activeCategory === category.slug
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent",
              )}
            >
              <span>{category.name}</span>
              <span className="rounded-md bg-secondary/60 px-2 py-0.5 font-mono text-xs">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className={cn("opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Popular Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              className="rounded-lg border border-border/50 bg-card/40 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div
        className={cn(
          "rounded-xl border border-border/50 bg-card/40 glass p-6 opacity-0",
          isVisible && "animate-fade-in-up stagger-3",
        )}
      >
        <div className="flex items-center gap-2 mb-3">
          <Mail className="h-4 w-4 text-primary" />
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Newsletter</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Get notified about new articles and experiments. No spam, unsubscribe anytime.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background/50 border-border/50 focus:border-primary/50"
          />
          <Button type="submit" className="w-full font-mono text-xs uppercase tracking-wider">
            Subscribe
          </Button>
        </form>
      </div>

      {/* RSS Feed */}
      <div className={cn("opacity-0", isVisible && "animate-fade-in-up stagger-4")}>
        <a
          href="/rss.xml"
          className="flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-card/40 px-4 py-3 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
        >
          <Rss className="h-4 w-4" />
          <span>Subscribe via RSS</span>
        </a>
      </div>
    </aside>
  )
}
