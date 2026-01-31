import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Leaf, Star, ShoppingBag, Truck, Shield, Clock } from "lucide-react";

const products = [
  {
    id: 1,
    slug: "te-verde-ancestral",
    name: "Té Verde Ancestral",
    description: "Mezcla tradicional de hojas de té verde con notas herbales.",
    longDescription: "Nuestro Té Verde Ancestral es una cuidadosa selección de hojas de té verde cultivadas en las montañas, siguiendo métodos tradicionales transmitidos de generación en generación. Cada taza ofrece un sabor suave y refrescante con notas herbales que te transportarán a la tranquilidad de la naturaleza.",
    price: 35000,
    image: "/products/te-verde.jpg",
    ingredients: ["Hojas de té verde orgánico", "Menta fresca", "Hierba limón"],
    preparation: "Infusionar 1 cucharadita en agua a 80°C durante 2-3 minutos.",
    benefits: ["Alto en antioxidantes", "Mejora la concentración", "Ayuda a la digestión"],
  },
  {
    id: 2,
    slug: "te-chai-especiado",
    name: "Té Chai Especiado",
    description: "Intenso blend de especias con canela, cardamomo y jengibre.",
    longDescription: "El Té Chai Especiado es nuestra interpretación del clásico masala chai indio. Una explosión de sabores que combina té negro robusto con una mezcla perfectamente balanceada de especias aromáticas. Ideal para las tardes frías de Medellín o para comenzar el día con energía.",
    price: 42000,
    image: "/products/te-chai.jpg",
    ingredients: ["Té negro Assam", "Canela de Ceilán", "Cardamomo", "Jengibre", "Clavo", "Pimienta negra"],
    preparation: "Hervir en agua o leche durante 5 minutos. Endulzar al gusto.",
    benefits: ["Energizante natural", "Mejora la circulación", "Propiedades antiinflamatorias"],
  },
  {
    id: 3,
    slug: "te-matcha-premium",
    name: "Té Matcha Premium",
    description: "Matcha ceremonial de grado premium, importado de Japón.",
    longDescription: "Nuestro Matcha Premium es un polvo de té verde de grado ceremonial, cultivado a la sombra en la región de Uji, Japón. Su color verde vibrante y sabor umami lo hacen perfecto tanto para la ceremonia del té tradicional como para lattes y smoothies.",
    price: 68000,
    image: "/products/te-matcha.jpg",
    ingredients: ["100% polvo de té verde Matcha de grado ceremonial"],
    preparation: "Tamizar 1-2g de matcha, agregar 70ml de agua a 80°C y batir con chasen hasta obtener espuma.",
    benefits: ["137x más antioxidantes que el té verde regular", "Aumenta el metabolismo", "Mejora el estado de ánimo"],
  },
  {
    id: 4,
    slug: "te-rooibos-frutal",
    name: "Té Rooibos Frutal",
    description: "Rooibos sudafricano con frutas tropicales y flores.",
    longDescription: "El Té Rooibos Frutal combina la suavidad del rooibos sudafricano con una selección de frutas tropicales y pétalos de flores. Naturalmente libre de cafeína, es perfecto para cualquier momento del día, especialmente antes de dormir.",
    price: 38000,
    image: "/products/te-rooibos.jpg",
    ingredients: ["Rooibos sudafricano", "Mango deshidratado", "Maracuyá", "Pétalos de rosa", "Flor de hibisco"],
    preparation: "Infusionar 1 cucharadita en agua a 100°C durante 5-7 minutos.",
    benefits: ["Sin cafeína", "Rico en minerales", "Promueve el sueño reparador"],
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
}

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
  const product = products.find((p) => p.slug === slug);

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
  const product = products.find((p) => p.slug === slug);

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
          <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
            <Leaf className="h-32 w-32 text-primary/40" />
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
