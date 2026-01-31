export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  ingredients: string[];
  preparation: string;
  benefits: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "celion-power",
    name: "CELION POWER",
    brand: "celion",
    description: "Regeneración Celular",
    longDescription:
      "CELION POWER es un suplemento avanzado diseñado para apoyar la regeneración celular y el bienestar general. Su fórmula única combina ingredientes naturales seleccionados para promover la vitalidad y el equilibrio del organismo.",
    price: 146000,
    image: "/assets/ofcellionpower-Big-1-scaled.png",
    ingredients: [
      "Ingredientes naturales seleccionados",
      "Fórmula de regeneración celular",
    ],
    preparation: "Tomar según las indicaciones del producto.",
    benefits: [
      "Apoya la regeneración celular",
      "Promueve el bienestar general",
      "Fórmula natural",
    ],
  },
  {
    id: 2,
    slug: "cellergy-boost",
    name: "CELLERGY BOOST",
    brand: "celion",
    description: "Regeneración Celular",
    longDescription:
      "CELLERGY BOOST es una fórmula potenciada para impulsar la energía celular y la vitalidad. Diseñado para quienes buscan un apoyo adicional en su bienestar diario con ingredientes de alta calidad.",
    price: 208000,
    image: "/assets/ofcellergyboost-Bot-G-scaled.png",
    ingredients: [
      "Complejo energético celular",
      "Ingredientes bioactivos premium",
    ],
    preparation: "Tomar según las indicaciones del producto.",
    benefits: [
      "Impulsa la energía celular",
      "Aumenta la vitalidad",
      "Fórmula potenciada",
    ],
  },
  {
    id: 3,
    slug: "muno-t",
    name: "MUNO T",
    brand: "celion",
    description: "Regeneración Celular",
    longDescription:
      "MUNO T es un suplemento especializado en apoyar el sistema inmunológico y la regeneración celular. Su fórmula avanzada está diseñada para fortalecer las defensas naturales del cuerpo.",
    price: 320000,
    image: "/assets/ofmunot-G-scaled.png",
    ingredients: [
      "Complejo inmunológico",
      "Ingredientes para regeneración celular",
    ],
    preparation: "Tomar según las indicaciones del producto.",
    benefits: [
      "Fortalece el sistema inmune",
      "Apoya la regeneración celular",
      "Fórmula especializada",
    ],
  },
  {
    id: 4,
    slug: "neuro-cell",
    name: "NEURO CELL",
    brand: "celion",
    description: "Regeneración Celular",
    longDescription:
      "NEURO CELL está formulado para apoyar la salud neurológica y la regeneración celular del sistema nervioso. Ideal para quienes buscan mantener una función cognitiva óptima.",
    price: 290000,
    image: "/assets/ofneurocell-Big-scaled.png",
    ingredients: ["Complejo neurocelular", "Ingredientes neuroprotectores"],
    preparation: "Tomar según las indicaciones del producto.",
    benefits: [
      "Apoya la salud neurológica",
      "Promueve la función cognitiva",
      "Regeneración del sistema nervioso",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
}
