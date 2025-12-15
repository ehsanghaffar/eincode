"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
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
    { value: "system", icon: Monitor, label: "System" },
  ];

  const currentIndex = themes.findIndex((t) => t.value === theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];
  const CurrentIcon = themes[currentIndex]?.icon || Moon;

  return (
    <button
      onClick={() => setTheme(nextTheme.value)}
      className={cn(
        "group relative flex h-8 w-8 items-center justify-center rounded",
        "text-muted-foreground transition-all duration-200 hover:text-primary"
      )}
      aria-label={`Switch to ${nextTheme.label} theme`}
    >
      <CurrentIcon className="h-4 w-4" />
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-card px-2 py-0.5 font-mono text-[10px] text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {theme}
      </span>
    </button>
  );
}
