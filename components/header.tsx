"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Github, Twitter, Linkedin } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Notes", href: "#notes" },
  { label: "Workbench", href: "#workbench" },
  { label: "Connect", href: "#connect" },
]

const socialLinks = [
  { label: "GitHub", href: "https://github.com/ehsanghaffar", icon: Github },
  { label: "Twitter", href: "https://twitter.com/ehsanghaffar", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com/in/ehsanghaffar", icon: Linkedin },
]

export function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <nav className="flex items-center justify-between">
          <a href="#" className="group flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded border border-primary/50 bg-primary/10 font-mono text-sm text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <span className="glitch">{"⚡"}</span>
            </div>
            <span className="font-mono text-sm tracking-tight">
              CODE<span className="text-primary">FORGE</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:text-foreground",
                  hoveredIndex === index && "text-foreground",
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index && <span className="absolute left-1 text-primary">{">"}</span>}
                {item.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 sm:flex">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group relative flex h-8 w-8 items-center justify-center rounded text-muted-foreground transition-all duration-200 hover:text-primary"
                >
                  <link.icon className="h-4 w-4" />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-card px-2 py-0.5 font-mono text-[10px] text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="hidden h-4 w-px bg-border/50 sm:block" />

            <div className="hidden items-center gap-2 font-mono text-xs text-muted-foreground sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span>status: building</span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded border border-border md:hidden"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    "h-0.5 w-5 bg-foreground transition-all duration-200",
                    isMobileMenuOpen && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn("h-0.5 w-5 bg-foreground transition-all duration-200", isMobileMenuOpen && "opacity-0")}
                />
                <span
                  className={cn(
                    "h-0.5 w-5 bg-foreground transition-all duration-200",
                    isMobileMenuOpen && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>
        </nav>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300 md:hidden",
            isMobileMenuOpen ? "max-h-80 pt-4" : "max-h-0",
          )}
        >
          <div className="flex flex-col gap-1 border-t border-border/50 pt-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded px-3 py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors active:bg-secondary hover:text-foreground"
              >
                <span className="text-primary">{">"}</span>
                {item.label}
              </a>
            ))}

            <div className="mt-3 flex items-center gap-2 border-t border-border/50 pt-4 px-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded border border-border/50 text-muted-foreground transition-colors active:bg-secondary hover:border-primary/50 hover:text-primary"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
              <div className="flex h-10 w-10 items-center justify-center rounded border border-border/50">
                <ThemeToggle />
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 px-3 py-2 font-mono text-xs text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span>status: building</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
