"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/ehsanghaffar", handle: "@ehsanghaffar", icon: Github },
  { label: "Twitter", href: "https://twitter.com/ehsanghaffar", handle: "@ehsanghaffar", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com/in/ehsanghaffar", handle: "/in/ehsanghaffar", icon: Linkedin },
  { label: "Email", href: "mailto:hello@ehsanghaffar.dev", handle: "hello@ehsanghaffar.dev", icon: Mail },
]

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  return (
    <footer id="connect" className="border-t border-border/30 px-4 sm:px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">Connect</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-4xl text-balance">
                Let's build something together
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
              Always interested in collaborations, interesting problems, and conversations about code, design, and
              everything in between.
            </p>

            <div className="pt-2 sm:pt-4">
              <a
                href="mailto:hello@ehsanghaffar.dev"
                className="group inline-flex items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-6 py-3.5 sm:py-3 font-mono text-sm text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground active:scale-[0.98] w-full sm:w-auto"
              >
                <span>send a signal</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right column - Links */}
          <div className="space-y-4 sm:space-y-6 lg:text-right">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
              Find me elsewhere
            </p>
            <div className="space-y-1 sm:space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group flex items-center justify-between gap-4 rounded border border-transparent p-3 transition-all duration-200 lg:flex-row-reverse active:bg-secondary/30",
                    hoveredLink === link.label && "border-border/50 bg-card/30",
                  )}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <div className="flex items-center gap-2 lg:flex-row-reverse">
                    <link.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    <span className="font-mono text-sm font-medium transition-colors group-hover:text-primary">
                      {link.label}
                    </span>
                    {link.label !== "Email" && (
                      <ExternalLink className="h-3 w-3 text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{link.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-6 sm:pt-8 sm:flex-row">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span>Forged with curiosity & code</span>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground/60 transition-colors hover:text-primary"
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-muted-foreground text-center sm:text-right">
            © {new Date().getFullYear()} CODEFORGE — All experiments reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
