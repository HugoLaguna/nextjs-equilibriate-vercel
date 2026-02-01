/**
 * Script inline que previene el flickering de tema durante SSR
 * Se ejecuta antes de la hidratación de React para aplicar el tema inmediatamente
 */
export function ThemeInitializer() {
  // Script que se ejecuta ANTES de que el HTML sea visible
  const themeScript = `
    (function() {
      try {
        const STORAGE_KEY = 'equilibriate-theme-preference';
        const THEME_ATTR = 'data-theme';

        // Leer preferencia guardada
        const stored = localStorage.getItem(STORAGE_KEY);
        let theme = 'light'; // default

        if (stored === 'light' || stored === 'dark') {
          theme = stored;
        } else if (stored === 'system' || !stored) {
          // Detectar preferencia del sistema
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        }

        // Aplicar tema inmediatamente
        document.documentElement.setAttribute(THEME_ATTR, theme);
      } catch (e) {
        // Fallar silenciosamente
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
