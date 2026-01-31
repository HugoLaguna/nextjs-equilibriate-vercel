import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Truck, Shield, Star } from "lucide-react";
import { products, formatPrice } from "@/data/products";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Ingredientes orgánicos y seleccionados cuidadosamente.",
  },
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "Entregas gratuitas en toda el área metropolitana de Medellín.",
  },
  {
    icon: Shield,
    title: "Calidad Garantizada",
    description: "Satisfacción garantizada o te devolvemos tu dinero.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Encuentra tu{" "}
              <span className="text-primary">equilibrio</span>{" "}
              en cada taza
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Descubre nuestra selección de tés premium, cultivados con amor y
              cuidado para llevar bienestar a tu vida diaria. Entregamos en
              toda Medellín.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#productos"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Ver Productos
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-xl">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Nuestros Tés
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Selección cuidadosa de los mejores tés del mundo, preparados
              especialmente para el paladar colombiano.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                className="group"
              >
                <article className="bg-muted/50 rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-lg">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-secondary text-secondary"
                        />
                      ))}
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <p className="mt-3 text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            ¿Tienes preguntas sobre nuestros productos?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nuestro asistente virtual está disponible 24/7 para ayudarte.
            ¡Escríbele en el chat!
          </p>
          <div className="mt-6 lg:hidden">
            <p className="text-sm text-primary font-medium">
              Toca el ícono del chat en la esquina inferior derecha
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
