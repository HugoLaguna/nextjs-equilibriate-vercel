import Image from "next/image";
import Link from "next/link";
import { ThemeSelector } from "@/components/theme/ThemeSelector";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="bg-primary/10 py-3">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 flex items-center justify-center gap-3">
          <Image
            src="/assets/celion_logo.png"
            alt="Logo Celion"
            width={160}
            height={160}
            className="object-contain"
          />
          <span className="text-sm font-medium text-black">
            Distribuidor oficial de Celion
          </span>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-wrap gap-8">
          <div className="flex-[2_1_300px]">
            <Link href="/" className="text-2xl font-bold text-primary">
              Equilibriate
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              Distribuidores de té premium en Medellín, Colombia.
              Llevamos bienestar y equilibrio a tu vida a través de
              las mejores mezclas de té artesanal.
            </p>
          </div>

          <div className="flex-[1_1_200px]">
            <h3 className="text-sm font-semibold text-foreground">Navegación</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/mi-cuenta" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Mi Cuenta
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-[1_1_200px]">
            <div className="space-y-6">
              <ThemeSelector />

              <div>
                <h3 className="text-sm font-semibold text-foreground">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/terminos-y-condiciones" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Términos y Condiciones
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Equilibriate. Todos los derechos reservados.
            Medellín, Colombia.
          </p>
        </div>
      </div>
    </footer>
  );
}
