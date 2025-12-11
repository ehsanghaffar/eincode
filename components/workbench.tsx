"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Github } from "lucide-react"

const wipItems = [
  {
    id: 1,
    name: "next16-docker-tw4-starter",
    description: "Next.js 16 starter with App Router, Tailwind v4, Next-Auth v5, and Docker",
    progress: 85,
    lastUpdated: "Dec 2024",
    url: "https://github.com/ehsanghaffar/next16-docker-tw4-starter",
  },
  {
    id: 2,
    name: "handbuilt-linux",
    description: "Minimal Linux distro from scratch with BusyBox and Syslinux bootloader",
    progress: 60,
    lastUpdated: "Nov 2025",
    url: "https://github.com/ehsanghaffar/handbuilt-linux",
  },
  {
    id: 3,
    name: "einbiogpt",
    description: "AI-powered social media bio generator with MCP integration",
    progress: 90,
    lastUpdated: "Apr 2025",
    url: "https://github.com/ehsanghaffar/einbiogpt",
  },
  {
    id: 4,
    name: "llm-practice",
    description: "Self-hosted chatbot API with RAG and MCP protocol support",
    progress: 75,
    lastUpdated: "Apr 2025",
    url: "https://github.com/ehsanghaffar/llm-practice",
  },
]

export function Workbench() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  return (
    <section id="workbench" className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
            Work in Progress
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">Workbench</h2>
          <p className="max-w-2xl text-sm sm:text-base text-muted-foreground">
            Active experiments and prototypes. Things that are being built, broken, and rebuilt.
          </p>
        </div>

        <div className="rounded border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/30 px-3 sm:px-4 py-2.5 sm:py-3">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-destructive/50" />
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500/50" />
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-primary/50" />
            <span className="ml-2 sm:ml-4 font-mono text-[10px] sm:text-xs text-muted-foreground truncate">
              ~/ehsanghaffar/active
            </span>
          </div>

          {/* WIP list */}
          <div className="divide-y divide-border/30">
            {wipItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex flex-col gap-3 sm:gap-4 p-4 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between",
                  hoveredItem === item.id && "bg-secondary/20",
                )}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-primary font-mono text-sm shrink-0">$</span>
                    <h4 className="font-mono text-sm font-medium tracking-tight group-hover:text-primary transition-colors truncate">
                      {item.name}
                    </h4>
                    <Github className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <p className="pl-5 sm:pl-6 text-xs text-muted-foreground line-clamp-2 sm:line-clamp-1">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 pl-5 sm:pl-0 sm:justify-end">
                  {/* Progress bar */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none">
                    <div className="h-1.5 w-full sm:w-24 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground w-10 shrink-0">{item.progress}%</span>
                  </div>

                  <span className="font-mono text-xs text-muted-foreground shrink-0">{item.lastUpdated}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Terminal footer */}
          <div className="border-t border-border/50 bg-secondary/20 px-3 sm:px-4 py-2.5 sm:py-3">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-muted-foreground">
              <span className="text-primary">❯</span>
              <span className="typing-cursor truncate">git status --all</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
