"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const notes = [
  {
    id: 1,
    title: "Building a Linux distro from scratch",
    excerpt: "Learnings from compiling the kernel, configuring BusyBox, and creating bootable ISOs with Syslinux.",
    date: "Nov 2025",
    category: "systems",
  },
  {
    id: 2,
    title: "MCP protocol in LLM apps",
    excerpt:
      "Implementing Model Context Protocol for seamless AI model interactions with vector databases in RAG apps.",
    date: "Apr 2025",
    category: "ai",
  },
  {
    id: 3,
    title: "Next.js 16 + Tailwind v4",
    excerpt: "Exploring the new features in Next.js 16 and migrating to Tailwind CSS v4's new configuration system.",
    date: "Dec 2024",
    category: "frontend",
  },
  {
    id: 4,
    title: "Self-hosting LLMs with FastAPI",
    excerpt: "Running Llama2 locally and building a personal chatbot API for natural language tasks.",
    date: "Oct 2023",
    category: "ai",
  },
]

export function LabNotes() {
  const [expandedNote, setExpandedNote] = useState<number | null>(null)

  return (
    <section id="notes" className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12 space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">Field Notes</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">Lab Notes</h2>
          <p className="max-w-2xl text-sm sm:text-base text-muted-foreground">
            Brief observations, technical findings, and thoughts from the workbench.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <article
              key={note.id}
              className={cn(
                "group cursor-pointer rounded border border-border/50 bg-card/30 p-5 sm:p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/50 active:scale-[0.99]",
                expandedNote === note.id && "border-primary/50 bg-card",
              )}
              onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
            >
              <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2">
                <span className="rounded border border-border bg-secondary/50 px-2 py-1 font-mono text-xs text-muted-foreground">
                  {note.category}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{note.date}</span>
              </div>

              <h3 className="mb-2 text-base sm:text-lg font-semibold tracking-tight transition-colors duration-200 group-hover:text-primary">
                {note.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">{note.excerpt}</p>

              <div className="mt-4 flex items-center gap-2 font-mono text-xs text-primary opacity-100 sm:opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span>read more</span>
                <span>→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
