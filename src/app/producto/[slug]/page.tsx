import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingBag, Truck, Shield, Clock } from "lucide-react";
import { products, getProductBySlug, formatPrice } from "@/data/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado | Equilibriate",
    };
  }

  return {
    title: `${product.name} | Equilibriate`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/#productos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">(12 reseñas)</span>
            </div>

            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
            <p className="mt-4 text-muted-foreground">{product.longDescription}</p>

            <p className="mt-6 text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>

            {/* Quick Benefits */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                Envío gratis en Medellín
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                Garantía de calidad
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Entrega en 24-48h
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                <ShoppingBag className="h-5 w-5" />
                Agregar al Carrito
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-10 space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Ingredientes</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Preparación</h3>
                <p className="text-sm text-muted-foreground">{product.preparation}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Beneficios</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
