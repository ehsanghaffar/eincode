"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const roles = [
  "building interfaces",
  "exploring systems",
  "breaking barriers",
  "forging ideas",
  "crafting code",
];

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < targetText.length) {
            setDisplayText(targetText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section className="relative px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20 lg:items-center lg:min-h-[70vh]">
          {/* Left column - Text */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                CODEFORGE — Where Code Meets Curiosity
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                Forging digital
                <br />
                <span className="text-primary typing-cursor">{displayText}</span>
              </h1>
            </div>

            <p className="max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
              Welcome to my digital workshop — a space for experiments, prototypes, and open-source
              artifacts. Currently building at <span className="text-foreground">Tutorify AI</span>.
              Here, ideas are forged, tested, and refined. Not a portfolio. A laboratory.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-6 py-3.5 sm:py-3 font-mono text-sm text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
              >
                <span>explore artifacts</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <Link
                href="/introduction"
                className="inline-flex items-center justify-center gap-2 rounded border border-border px-6 py-3.5 sm:py-3 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground active:scale-[0.98]"
              >
                <span>introduction</span>
              </Link>
            </div>
          </div>

          {/* Right column - ASCII Art / Visual */}
          <div className="relative">
            <div className="relative rounded border border-border/50 bg-card/50 p-4 sm:p-6 backdrop-blur-sm">
              <div className="absolute -top-3 left-4 bg-background px-2 font-mono text-xs text-muted-foreground">
                terminal://eincode
              </div>
              <pre className="overflow-hidden font-mono text-[10px] leading-relaxed text-primary/70 sm:text-xs md:text-sm">
                <span className="sm:hidden">{`┌───────────────────────┐
│  ██████╗███████╗      │
│ ██╔════╝██╔════╝      │
│ ██║     █████╗        │
│ ██║     ██╔══╝        │
│ ╚██████╗██║           │
│  ╚═════╝╚═╝           │
│                       │
│  > experiments: 12    │
│  > status: forging    │
└───────────────────────┘`}</span>
                <span className="hidden sm:block">{`┌─────────────────────────────────────┐
│                                     │
│  ██████╗ ██████╗ ██████╗ ███████╗   │
│ ██╔════╝██╔═══██╗██╔══██╗██╔════╝   │
│ ██║     ██║   ██║██║  ██║█████╗     │
│ ██║     ██║   ██║██║  ██║██╔══╝     │
│ ╚██████╗╚██████╔╝██████╔╝███████╗   │
│  ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝   │
│           Ein                       │
│                                     │
│   > experiments loaded: 12          │
│   > status: forging                 │
│   > last spark: today               │
│                                     │
└─────────────────────────────────────┘`}</span>
              </pre>
            </div>

            <div className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 rounded border border-primary/30 bg-primary/10 px-2 sm:px-3 py-1 font-mono text-[10px] sm:text-xs text-primary animate-pulse">
              v0.1.0
            </div>
            <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 rounded border border-border bg-card px-2 sm:px-3 py-1 font-mono text-[10px] sm:text-xs text-muted-foreground">
              Dec. 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
