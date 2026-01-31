import { Metadata } from "next";
import { User, Package, Heart, Settings, LogIn } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mi Cuenta | Equilibriate",
  description: "Gestiona tu cuenta, pedidos y preferencias en Equilibriate.",
};

export default function AccountPage() {
  // This would normally check authentication state
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="py-12 lg:py-16">
        <div className="mx-auto max-w-md px-4 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Mi Cuenta</h1>
            <p className="mt-2 text-muted-foreground">
              Inicia sesión para gestionar tus pedidos y preferencias
            </p>
          </div>

          <div className="bg-muted/50 rounded-2xl p-6 lg:p-8 border border-border">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">Recordarme</span>
                </label>
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Iniciar Sesión
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link href="#" className="text-primary hover:underline font-medium">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged in view (placeholder for future)
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Mi Cuenta</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/mi-cuenta/pedidos"
            className="bg-muted/50 rounded-2xl p-6 border border-border hover:border-primary/50 transition-all group"
          >
            <Package className="h-8 w-8 text-primary mb-4" />
            <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              Mis Pedidos
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Revisa el estado de tus pedidos
            </p>
          </Link>

          <Link
            href="/mi-cuenta/favoritos"
            className="bg-muted/50 rounded-2xl p-6 border border-border hover:border-primary/50 transition-all group"
          >
            <Heart className="h-8 w-8 text-primary mb-4" />
            <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              Favoritos
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Tus productos guardados
            </p>
          </Link>

          <Link
            href="/mi-cuenta/configuracion"
            className="bg-muted/50 rounded-2xl p-6 border border-border hover:border-primary/50 transition-all group"
          >
            <Settings className="h-8 w-8 text-primary mb-4" />
            <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              Configuración
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Gestiona tu perfil y preferencias
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
