"use client";

import Link from "next/link";
import { Menu, X, User, ShoppingBag, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import Logo from "../logo";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Contacto", href: "/contacto" },
  { name: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex gap-3">
            <Logo />
            <span className="text-2xl ">
              Equilibria<i className="font-bold text-primary">Te</i>
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div> */}

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {user ? (
            <>
              <Link
                href="/mi-cuenta"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                <User className="h-5 w-5" />
                <span>{user.userMetadata?.fullName || "Mi Cuenta"}</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                title="Cerrar sesion"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              href="/mi-cuenta"
              className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              <User className="h-5 w-5" />
              <span>Mi Cuenta</span>
            </Link>
          )}
          <button className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <ShoppingBag className="h-4 w-4" />
            <span>Carrito (0)</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="space-y-1 px-4 pb-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-base font-medium text-foreground/80 hover:bg-muted hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/mi-cuenta"
                className="block rounded-lg px-3 py-2 text-base font-medium text-foreground/80 hover:bg-muted hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {user.userMetadata?.fullName || "Mi Cuenta"}
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Cerrar sesion
              </button>
            </>
          ) : (
            <Link
              href="/mi-cuenta"
              className="block rounded-lg px-3 py-2 text-base font-medium text-foreground/80 hover:bg-muted hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mi Cuenta
            </Link>
          )}
          <div className="pt-2">
            <button className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              <ShoppingBag className="h-4 w-4" />
              <span>Carrito (0)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
