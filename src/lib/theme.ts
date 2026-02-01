// Tipos para el sistema de temas
export type Theme = "light" | "dark";
export type ThemeMode = Theme | "system";

// Constantes
export const THEME_STORAGE_KEY = "equilibriate-theme-preference";
export const THEME_ATTRIBUTE = "data-theme";

/**
 * Obtiene el tema preferido del sistema operativo
 */
export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Obtiene el modo de tema guardado en localStorage
 * Retorna "system" si no hay preferencia guardada
 */
export function getStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch (error) {
    console.warn("Error reading theme from localStorage:", error);
  }
  return "system";
}

/**
 * Resuelve el tema real a partir del modo
 * Si es "system", detecta la preferencia del SO
 */
export function resolveTheme(mode: ThemeMode): Theme {
  if (mode === "system") {
    return getSystemTheme();
  }
  return mode;
}

/**
 * Aplica el tema al documento HTML
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
}
