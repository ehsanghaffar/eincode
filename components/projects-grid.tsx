"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Github, Star, GitFork, ExternalLink, Sparkles } from "lucide-react"

const projects = [
  {
    id: 0,
    title: "EinUI",
    description:
      "A collection of beautiful, ready-made Liquid Glass UI components you can preview, copy, and drop into any web app. Built on Tailwind, shadcn/ui, and Radix UI primitives.",
    tags: ["TypeScript", "Next.js 16", "shadcn", "Radix UI", "Tailwind"],
    status: "in-progress",
    year: "2025",
    stars: 50,
    forks: 10,
    url: "https://github.com/ehsanghaffar/einui",
    homepage: "https://ui.eindev.ir",
    featured: true,
    highlight: true,
  },
  {
    id: 1,
    title: "EinBioGPT",
    description:
      "An intelligent web application built with Next.js, Tailwind CSS, and OpenAI's GPT models. Generates engaging and personalized bios for social media platforms.",
    tags: ["TypeScript", "Next.js", "GPT", "LangChain"],
    status: "shipped",
    year: "2023",
    stars: 17,
    forks: 8,
    url: "https://github.com/ehsanghaffar/einbiogpt",
    homepage: "https://bio.eindev.ir/",
    featured: true,
  },
  {
    id: 2,
    title: "JavaScript Playground",
    description:
      "A collection of JavaScript code snippets, algorithms, and mini-projects for learning and reference purposes.",
    tags: ["JavaScript", "Algorithms", "Snippets"],
    status: "shipped",
    year: "2020",
    stars: 19,
    forks: 5,
    url: "https://github.com/ehsanghaffar/javascript-playground",
    featured: false,
  },
  {
    id: 3,
    title: "Next.js 16 Docker Starter",
    description:
      "A batteries-included starter for building Next.js 16.1.0 apps with App Router, PNPM, Tailwind v4+, Next-Auth v5, and multi-stage Docker setup.",
    tags: ["Next.js 16.1.0", "Docker", "Tailwind v4"],
    status: "in-progress",
    year: "2025",
    stars: 9,
    forks: 4,
    url: "https://github.com/ehsanghaffar/next16-docker-tw4-starter",
    homepage: "https://nextjs-16-docker.vercel.app",
    featured: true,
  },
  {
    id: 4,
    title: "Awesome Clubhouses",
    description:
      "Curated list of resources for Clubhouse, the voice-based social network where people come together to talk, listen and learn.",
    tags: ["Python", "Awesome List", "Social"],
    status: "archived",
    year: "2022",
    stars: 41,
    forks: 8,
    url: "https://github.com/ehsanghaffar/awesome-clubhouse",
    homepage: "https://ehsanghaffar.github.io/awesome-clubhouse/",
    featured: false,
  },
  {
    id: 5,
    title: "LLM Practice",
    description:
      "A self-hosted personal chatbot API with FastAPI. Interact with Llama2 and other open-source LLMs for natural language conversations.",
    tags: ["Python", "FastAPI", "Llama2", "MCP"],
    status: "shipped",
    year: "2023",
    stars: 13,
    forks: 3,
    url: "https://github.com/ehsanghaffar/llm-practice",
    featured: false,
  },
  {
    id: 6,
    title: "Hand-Build Linux",
    description:
      "A minimal, customizable Linux distribution built from scratch using the Linux kernel, BusyBox, and Syslinux bootloader.",
    tags: ["Shell", "Linux", "Docker"],
    status: "in-progress",
    year: "2025",
    stars: 8,
    forks: 1,
    url: "https://github.com/ehsanghaffar/handbuilt-linux",
    featured: true,
  },
  {
    id: 7,
    title: "Next.js AppDir Template",
    description:
      "An all-inclusive Next.js web application template showcasing seamless integration of Next.js, Docker, MongoDB, and Tailwind CSS.",
    tags: ["TypeScript", "Next.js", "Docker", "MongoDB"],
    status: "shipped",
    year: "2023",
    stars: 19,
    forks: 6,
    url: "https://github.com/ehsanghaffar/nextjs-appdir-docker",
    featured: false,
  },
]

const filters = ["all", "shipped", "in-progress", "archived"]

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.status === activeFilter)

  return (
    <section id="projects" className="px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10 lg:mb-14 flex flex-col gap-4 sm:gap-6 lg:gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3 animate-fade-in-up">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary">Artifacts</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">Open Source Projects</h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 lg:overflow-visible lg:flex-wrap scrollbar-hide animate-fade-in-up stagger-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "shrink-0 rounded-lg border px-4 sm:px-5 py-2 sm:py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-90 active:bg-secondary/50",
                  activeFilter === filter
                    ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-card/40 p-5 sm:p-6 lg:p-7 glass transition-all duration-300 active:scale-95 active:bg-secondary/70 hover-lift hover:border-primary/40 hover:bg-card/70 animate-fade-in-up",
                "highlight" in project && project.highlight
                  ? "sm:col-span-2 lg:col-span-2 border-primary/30 bg-gradient-to-br from-primary/8 via-card/50 to-primary/8"
                  : "border-border/60",
                project.featured && !("highlight" in project && project.highlight) && "sm:col-span-2 lg:col-span-1",
              )}
              style={{ animationDelay: `${(index % 6) * 100 + 200}ms` }}
            >
              {"highlight" in project && project.highlight && (
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 animate-pulse-glow">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-medium">
                    Featured
                  </span>
                </div>
              )}

              {/* Status indicator */}
              <div
                className={cn(
                  "absolute right-4 top-4 flex items-center gap-2 sm:gap-2.5",
                  "highlight" in project && project.highlight && "top-4 sm:top-5",
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-shadow duration-300 flex-shrink-0",
                    project.status === "shipped" && "bg-primary shadow-sm shadow-primary/50",
                    project.status === "in-progress" && "bg-yellow-500 animate-pulse shadow-sm shadow-yellow-500/50",
                    project.status === "archived" && "bg-muted-foreground",
                  )}
                />
                <span className="font-mono text-[11px] sm:text-xs text-muted-foreground truncate">{project.status}</span>
              </div>

              <div
                className={cn(
                  "mb-4 sm:mb-5 font-mono text-xs text-muted-foreground",
                  "highlight" in project && project.highlight && "mt-8 sm:mt-10",
                )}
              >
                {project.year}
              </div>

              <h3
                className={cn(
                  "mb-2 sm:mb-3 font-bold tracking-tight transition-all duration-300 group-hover:text-gradient",
                  "highlight" in project && project.highlight ? "text-lg sm:text-xl lg:text-2xl" : "text-base sm:text-lg",
                )}
              >
                {project.title}
              </h3>

              <p
                className={cn(
                  "mb-4 sm:mb-5 text-xs sm:text-sm leading-relaxed text-muted-foreground",
                  "highlight" in project && project.highlight ? "line-clamp-3" : "line-clamp-2",
                )}
              >
                {project.description}
              </p>

              <div className="mb-4 sm:mb-5 flex items-center gap-4 sm:gap-5 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1 sm:gap-1.5 transition-colors group-hover:text-yellow-500">
                  <Star className="h-3 sm:h-3.5 w-3 sm:w-3.5 flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs">{project.stars}</span>
                </span>
                <span className="flex items-center gap-1 sm:gap-1.5 transition-colors group-hover:text-foreground">
                  <GitFork className="h-3 sm:h-3.5 w-3 sm:w-3.5 flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs">{project.forks}</span>
                </span>
              </div>

              <div className="mb-4 sm:mb-5 flex flex-wrap gap-1.5 sm:gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/80 bg-secondary/60 px-2 sm:px-2.5 py-0.5 sm:py-1 font-mono text-[10px] sm:text-xs text-secondary-foreground transition-colors active:scale-90 hover:border-primary/50 hover:bg-primary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-muted-foreground transition-all duration-300 active:scale-90 hover:text-primary group/link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-3.5 sm:h-4 w-3.5 sm:w-4 transition-transform group-hover/link:scale-110 flex-shrink-0" />
                  <span className="underline-animate">source</span>
                </a>
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-primary transition-all duration-300 active:scale-90 hover:text-foreground group/link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3.5 sm:h-4 w-3.5 sm:w-4 transition-transform group-hover/link:scale-110 group-hover/link:rotate-12 flex-shrink-0" />
                    <span className="underline-animate">live</span>
                  </a>
                )}
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
