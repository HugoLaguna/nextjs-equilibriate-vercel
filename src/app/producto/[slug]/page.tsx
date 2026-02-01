import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingBag, Truck, Shield, Clock, MessageCircle } from "lucide-react";
import { OpenChatButton } from "@/components/chat/OpenChatButton";
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

        <div className="flex flex-wrap gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="flex-[1_1_300px] self-start">
            <div className="aspect-square bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-[1_1_300px]">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">(12 reseñas)</span>
            </div>

            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

            {/* Availability Badge */}
            <div className="mt-3">
              {product.available ? (
                <span className="inline-flex items-center rounded-full bg-green-500 px-4 py-1.5 text-sm font-semibold text-white">
                  ✓ Disponible
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-gray-500 px-4 py-1.5 text-sm font-semibold text-white">
                  No disponible
                </span>
              )}
            </div>

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
            <div className="mt-8 flex flex-col gap-3">
              <button
                disabled={!product.available}
                className={`flex-1 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                  product.available
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
                {product.available ? 'Agregar al Carrito' : 'No Disponible'}
              </button>
              <OpenChatButton className="flex-1 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/90 cursor-pointer">
                <MessageCircle className="h-5 w-5" />
                Asistente Nutricionista Inteligente
              </OpenChatButton>
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

              {/* Nutrition Table */}
              {product.nutritionTable && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Información Nutricional</h3>
                  <div className="bg-secondary/10 rounded-xl p-6 space-y-4">
                    {/* Calories - Featured at top */}
                    {product.calories !== undefined && (
                      <div className="border-b-2 border-border pb-4">
                        <div className="flex justify-between items-end">
                          <span className="text-sm font-medium text-foreground">Calorías</span>
                          <span className="text-4xl font-bold text-foreground">{product.calories}</span>
                        </div>
                      </div>
                    )}

                    {/* Rest of nutrition facts */}
                    <div className="space-y-2">
                      {Object.entries(product.nutritionTable)
                        .filter(([key]) => key !== 'calorias') // Skip calories as it's shown above
                        .map(([key, value]) => {
                          const formattedKey = key
                            .split('_')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');

                          if (typeof value === 'string') {
                            return (
                              <div key={key} className="flex justify-between items-center text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
                                <span className="font-medium text-foreground">{formattedKey}:</span>
                                <span className="text-muted-foreground">{value}</span>
                              </div>
                            );
                          } else {
                            return (
                              <div key={key} className="space-y-2">
                                <div className="font-medium text-foreground text-sm">{formattedKey}:</div>
                                <div className="pl-4 space-y-1">
                                  {Object.entries(value).map(([subKey, subValue]) => {
                                    const formattedSubKey = subKey
                                      .split('_')
                                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                      .join(' ');
                                    return (
                                      <div key={subKey} className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">{formattedSubKey}:</span>
                                        <span className="text-muted-foreground">{subValue}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
