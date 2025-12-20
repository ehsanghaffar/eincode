"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-8 w-8 items-center justify-center">
        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
  ];

  // Handle undefined theme - default to "dark" as per layout.tsx defaultTheme
  const currentTheme = theme ?? "dark";
  
  // Determine which icon to show based on resolved theme (what user actually sees)
  let CurrentIcon: typeof Sun | typeof Moon | typeof Monitor;
  if (currentTheme === "system") {
    CurrentIcon = Monitor;
  } else {
    // Use resolvedTheme for icon when available (handles system theme case)
    const displayTheme = resolvedTheme ?? currentTheme;
    const themeIndex = themes.findIndex((t) => t.value === displayTheme);
    CurrentIcon = themes[themeIndex >= 0 ? themeIndex : 0]?.icon || Moon;
  }
  
  // For next theme, cycle through available themes based on current theme setting
  // If current theme is "system" or not in themes array, start from "light"
  const themeIndex = themes.findIndex((t) => t.value === currentTheme);
  const nextIndex = themeIndex >= 0 ? (themeIndex + 1) % themes.length : 0;
  const nextTheme = themes[nextIndex];

  return (
    <button
      onClick={() => setTheme(nextTheme.value)}
      className={cn(
        "group relative flex size-8 items-center justify-center rounded",
        "text-muted-foreground transition-all duration-200 hover:text-primary"
      )}
      aria-label={`Switch to ${nextTheme.label} theme`}
    >
      <CurrentIcon className="size-4" />
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-card px-2 py-0.5 font-mono text-[10px] text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {resolvedTheme ?? currentTheme}
      </span>
    </button>
  );
}
