"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, Calendar, Tag, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const notes = [
  {
    id: 1,
    title: "Building a Linux distro from scratch",
    excerpt:
      "Learnings from compiling the kernel, configuring BusyBox, and creating bootable ISOs with Syslinux. A deep dive into the foundations of operating systems.",
    content:
      "Full walkthrough of building a minimal Linux distribution including kernel compilation, initramfs setup, and bootloader configuration...",
    date: "Nov 2025",
    category: "systems",
    tags: ["Linux", "Shell", "Docker"],
    color: "from-blue-500/20 to-cyan-500/20",
    readTime: "12 min",
  },
  {
    id: 2,
    title: "MCP protocol in LLM apps",
    excerpt:
      "Implementing Model Context Protocol for seamless AI model interactions with vector databases in RAG apps. Exploring the future of AI agent communication.",
    content: "Deep dive into MCP protocol implementation...",
    date: "Apr 2025",
    category: "ai",
    tags: ["AI", "MCP", "RAG", "LangChain"],
    color: "from-purple-500/20 to-pink-500/20",
    readTime: "8 min",
  },
  {
    id: 3,
    title: "Next.js 16 + Tailwind v4",
    excerpt:
      "Exploring the new features in Next.js 16 and migrating to Tailwind CSS v4's new configuration system. Performance improvements and developer experience.",
    content: "Migration guide and new features overview...",
    date: "Dec 2024",
    category: "frontend",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    color: "from-primary/20 to-emerald-500/20",
    readTime: "6 min",
  },
  {
    id: 4,
    title: "Self-hosting LLMs with FastAPI",
    excerpt:
      "Running Llama2 locally and building a personal chatbot API for natural language tasks. Complete setup guide with Docker containerization.",
    content: "Step-by-step guide to self-hosting LLMs...",
    date: "Oct 2023",
    category: "ai",
    tags: ["Python", "FastAPI", "Llama2", "Docker"],
    color: "from-orange-500/20 to-amber-500/20",
    readTime: "10 min",
  },
  {
    id: 5,
    title: "Docker multi-stage builds for Next.js",
    excerpt:
      "Optimizing container sizes and build times with multi-stage Docker builds. Production-ready configurations for Next.js applications.",
    content: "Docker optimization techniques...",
    date: "Sep 2023",
    category: "devops",
    tags: ["Docker", "Next.js", "CI/CD"],
    color: "from-cyan-500/20 to-blue-500/20",
    readTime: "7 min",
  },
  {
    id: 6,
    title: "React Server Components deep dive",
    excerpt:
      "Understanding the paradigm shift with RSC. How server components change data fetching patterns and improve performance.",
    content: "Complete guide to React Server Components...",
    date: "Aug 2023",
    category: "frontend",
    tags: ["React", "RSC", "Next.js"],
    color: "from-indigo-500/20 to-purple-500/20",
    readTime: "9 min",
  },
]

const categories = ["all", "frontend", "ai", "systems", "devops"]
const allTags = [...new Set(notes.flatMap((n) => n.tags))]

export function NotesPageContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [expandedNote, setExpandedNote] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredNotes = notes.filter((n) => {
    const matchesCategory = activeCategory === "all" || n.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => n.tags.includes(tag))
    return matchesCategory && matchesSearch && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Field Notes</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Lab Notes</h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Brief observations, technical findings, and thoughts from the workbench. Documentation of the learning
            journey.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-4">
          {/* Sidebar */}
          <div className={cn("lg:col-span-1 space-y-6 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/40 border-border/60 focus:border-primary/50"
              />
            </div>

            {/* Categories */}
            <div className="rounded-xl border border-border bg-card/40 glass p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-4">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "text-left px-3 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200",
                      activeCategory === category
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-xl border border-border bg-card/40 glass p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                <Tag className="h-3.5 w-3.5" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "rounded-md border px-2.5 py-1 font-mono text-xs transition-all duration-200",
                      selectedTags.includes(tag)
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border/60 bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Grid */}
          <div className="lg:col-span-3">
            <div className="grid gap-5 md:grid-cols-2">
              {filteredNotes.map((note, index) => (
                <article
                  key={note.id}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card/40 glass p-6 sm:p-7 transition-all duration-400 hover:border-primary/40 hover:bg-card/60 active:scale-[0.99] hover-lift opacity-0",
                    isVisible && "animate-fade-in-up",
                    expandedNote === note.id && "border-primary/50 bg-card/70",
                  )}
                  style={{ animationDelay: `${index * 80 + 200}ms` }}
                  onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      note.color,
                    )}
                  />

                  <div className="relative z-10">
                    <div className="mb-4 sm:mb-5 flex items-center justify-between gap-3">
                      <span className="rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-foreground">
                        {note.category}
                      </span>
                      <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {note.date}
                        </span>
                        <span>{note.readTime}</span>
                      </div>
                    </div>

                    <h3 className="mb-3 text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-gradient">
                      {note.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted-foreground mb-4">{note.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs text-primary transition-all duration-300 sm:opacity-0 sm:translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0">
                      <span>read more</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
                </article>
              ))}
            </div>

            {filteredNotes.length === 0 && (
              <div className="text-center py-20">
                <p className="font-mono text-sm text-muted-foreground">No notes found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
