"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Github, Star, GitFork, ExternalLink, Sparkles } from "lucide-react";

const projects = [
  {
    id: 0,
    title: "EinUI",
    description:
      "A collection of beautiful, ready-made Liquid Glass UI components you can preview, copy, and drop into any web app. Built on Tailwind, shadcn/ui, and Radix UI primitives.",
    tags: ["TypeScript", "Next.js 16", "shadcn", "Radix UI", "Tailwind"],
    status: "in-progress",
    year: "2025",
    stars: 8,
    forks: 1,
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
      "A batteries-included starter for building Next.js 16 apps with App Router, PNPM, Tailwind v4+, Next-Auth v5, and multi-stage Docker setup.",
    tags: ["Next.js 16", "Docker", "Tailwind v4"],
    status: "in-progress",
    year: "2025",
    stars: 8,
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
];

const filters = ["all", "shipped", "in-progress", "archived"];

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((p) => p.status === activeFilter);

  return (
    <section id="projects" className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
              Artifacts
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">Open Source Projects</h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "shrink-0 rounded border px-4 py-2.5 sm:py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.98]",
                  activeFilter === filter
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={cn(
                "group relative overflow-hidden rounded border bg-card/50 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 active:scale-[0.99]",
                hoveredProject === project.id && "border-primary/50 bg-card",
                "highlight" in project && project.highlight
                  ? "sm:col-span-2 lg:col-span-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card/50 to-primary/5"
                  : "border-border",
                project.featured &&
                  !("highlight" in project && project.highlight) &&
                  "sm:col-span-2 lg:col-span-1"
              )}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {"highlight" in project && project.highlight && (
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                    Featured
                  </span>
                </div>
              )}

              {/* Status indicator */}
              <div
                className={cn(
                  "absolute right-4 top-4 flex items-center gap-2",
                  "highlight" in project && project.highlight && "top-4"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    project.status === "shipped" && "bg-primary",
                    project.status === "in-progress" && "bg-yellow-500 animate-pulse",
                    project.status === "archived" && "bg-muted-foreground"
                  )}
                />
                <span className="font-mono text-xs text-muted-foreground">{project.status}</span>
              </div>

              <div
                className={cn(
                  "mb-4 font-mono text-xs text-muted-foreground",
                  "highlight" in project && project.highlight && "mt-8"
                )}
              >
                {project.year}
              </div>

              <h3
                className={cn(
                  "mb-2 font-bold tracking-tight transition-colors duration-200 group-hover:text-primary",
                  "highlight" in project && project.highlight
                    ? "text-xl sm:text-2xl"
                    : "text-lg sm:text-xl"
                )}
              >
                {project.title}
              </h3>

              <p
                className={cn(
                  "mb-4 text-sm leading-relaxed text-muted-foreground",
                  "highlight" in project && project.highlight ? "line-clamp-3" : "line-clamp-2"
                )}
              >
                {project.description}
              </p>

              <div className="mb-4 flex items-center gap-4 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  {project.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" />
                  {project.forks}
                </span>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-border bg-secondary/50 px-2 py-1 font-mono text-xs text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>source</span>
                </a>
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-yellow-400 hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>live</span>
                  </a>
                )}
              </div>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
