"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeContext } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "@/lib/theme";

const options: { mode: ThemeMode; icon: typeof Sun; label: string }[] = [
  { mode: "light", icon: Sun, label: "Claro" },
  { mode: "dark", icon: Moon, label: "Oscuro" },
  { mode: "system", icon: Monitor, label: "Sistema" },
];

export function ThemeSelector() {
  const { mode, setMode } = useThemeContext();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-foreground">Tema</h3>
      <div className="flex gap-2">
        {options.map(({ mode: optionMode, icon: Icon, label }) => (
          <button
            key={optionMode}
            onClick={() => setMode(optionMode)}
            className={cn(
              "flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg border transition-all",
              "hover:border-primary/50",
              mode === optionMode
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground"
            )}
            aria-label={`Cambiar a tema ${label.toLowerCase()}`}
            aria-pressed={mode === optionMode}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
