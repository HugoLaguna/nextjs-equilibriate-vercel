import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary">
              Equilibriate
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              Distribuidores de té premium en Medellín, Colombia.
              Llevamos bienestar y equilibrio a tu vida a través de
              las mejores mezclas de té artesanal.
            </p>
          </div>

          <div>
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
