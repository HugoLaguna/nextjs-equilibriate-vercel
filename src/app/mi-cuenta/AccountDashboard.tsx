"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User as UserType } from "@supabase/supabase-js";
import { Package, Heart, Settings, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AccountDashboardProps {
  user: UserType;
}

export function AccountDashboard({ user }: AccountDashboardProps) {
  const { signOut, isLoading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mi Cuenta</h1>
            <p className="mt-1 text-muted-foreground">
              Bienvenido, {user.user_metadata?.full_name || user.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            Cerrar sesion
          </button>
        </div>

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
              Configuracion
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
