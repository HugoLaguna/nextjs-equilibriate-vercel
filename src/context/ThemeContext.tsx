"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Theme,
  ThemeMode,
  getStoredThemeMode,
  resolveTheme,
  applyTheme,
  THEME_STORAGE_KEY,
} from "@/lib/theme";

interface ThemeContextType {
  mode: ThemeMode;
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // mode: la preferencia del usuario (light/dark/system)
  // theme: el tema resuelto actual (light/dark)
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [theme, setTheme] = useState<Theme>("light");

  // Inicialización: leer localStorage y aplicar tema
  useEffect(() => {
    const storedMode = getStoredThemeMode();
    setModeState(storedMode);
    const resolvedTheme = resolveTheme(storedMode);
    setTheme(resolvedTheme);
    applyTheme(resolvedTheme);
  }, []);

  // Escuchar cambios en la preferencia del sistema (solo si mode === "system")
  useEffect(() => {
    if (mode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
      applyTheme(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode]);

  // Función para cambiar el modo
  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);

    // Persistir en localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newMode);
    } catch (error) {
      console.warn("Error saving theme to localStorage:", error);
    }

    // Resolver y aplicar el tema
    const resolvedTheme = resolveTheme(newMode);
    setTheme(resolvedTheme);
    applyTheme(resolvedTheme);
  };

  return (
    <ThemeContext.Provider value={{ mode, theme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
