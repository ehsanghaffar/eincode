"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Palette } from "lucide-react"
import { cn } from "@/lib/utils"
import { themes, type ThemeColor } from "@/lib/themes"

export function ThemeChanger() {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>("golden")
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("color-theme") as ThemeColor
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    applyTheme(currentTheme, resolvedTheme)
  }, [mounted, currentTheme, resolvedTheme])

  const applyTheme = (themeName: ThemeColor, mode?: string | null) => {
    const themeConfig = themes[themeName]
    const isDark = mode === "dark"
    const colors = isDark ? themeConfig.dark : themeConfig.light

    requestAnimationFrame(() => {
      Object.entries(colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value)
      })
    })
  }

  const handleThemeChange = (themeName: ThemeColor) => {
    localStorage.setItem("color-theme", themeName)
    setCurrentTheme(themeName)
    applyTheme(themeName, resolvedTheme)
    setIsOpen(false)
  }

  if (!mounted) {
    return (
      <div className="flex h-9 w-9 items-center justify-center">
        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  const themeColors: Record<ThemeColor, string> = {
    golden: "bg-gradient-to-br from-amber-400 to-yellow-600",
    cyan: "bg-gradient-to-br from-cyan-400 to-blue-500",
    purple: "bg-gradient-to-br from-purple-400 to-violet-600",
    emerald: "bg-gradient-to-br from-emerald-400 to-green-600",
    rose: "bg-gradient-to-br from-rose-400 to-pink-600",
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group relative flex h-9 w-9 items-center justify-center rounded-lg",
          "text-muted-foreground transition-all duration-300",
          "hover:text-primary hover:bg-primary/10",
          isOpen && "bg-primary/10 text-primary",
        )}
        aria-label="Change color theme"
      >
        <Palette className="h-4 w-4" />
        <span
          className={cn(
            "absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap",
            "rounded-md bg-card border border-border px-2.5 py-1",
            "font-mono text-[10px] text-muted-foreground",
            "opacity-0 transition-all duration-200 pointer-events-none shadow-lg",
            "group-hover:opacity-100 group-hover:-bottom-9",
          )}
        >
          Colors
        </span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            className={cn(
              "absolute right-0 top-12 z-50",
              "w-48 rounded-lg border border-border",
              "bg-card/95 backdrop-blur-xl shadow-xl",
              "p-3 animate-fade-in",
            )}
          >
            <div className="mb-2 font-mono text-xs text-muted-foreground uppercase tracking-wider">Select Theme</div>
            <div className="space-y-1.5">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key as ThemeColor)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
                    "transition-all duration-200",
                    "hover:bg-secondary/80",
                    currentTheme === key ? "bg-primary/10 border border-primary/50" : "border border-transparent",
                  )}
                >
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border-2 border-border shadow-sm",
                      themeColors[key as ThemeColor],
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-sm flex-1 text-left",
                      currentTheme === key ? "text-foreground font-medium" : "text-muted-foreground",
                    )}
                  >
                    {theme.name}
                  </span>
                  {currentTheme === key && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
