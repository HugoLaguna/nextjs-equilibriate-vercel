export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  description: string;
  longDescription: string;
  detailDescription?: string;
  available: boolean,
  price: number;
  image: string;
  ingredients: string[];
  calories?: number;
  nutritionTable?: {
    [key: string]: string | { [key: string]: string }
  };
  preparation: string;
  benefits: string[];
  instructions: string[];
  rateSuggestion: string;
  certification: string[];
}

export const products: Product[] = [
  {
    id: 3,
    slug: "muno-t",
    name: "MUNO T",
    brand: "celion",
    description: "Regeneración Celular",
    longDescription:
      "MUNO T es un suplemento especializado en apoyar el sistema inmunológico y la regeneración celular. Su fórmula avanzada está diseñada para fortalecer las defensas naturales del cuerpo.",
    detailDescription: `Muno T está formulado para ayudar a reducir la inflamación celular y eliminar las toxinas que se acumulan en el organismo; con una mezcla de hierbas naturales, Muno T ayuda especialmente a desintoxicar hígado, riñones y sistema digestivo, además, es una excelente alternativa para promover la óptima absorción de los nutrientes que nuestro cuerpo necesita.

En un mundo donde el estrés, la contaminación y las toxinas afectan nuestra calidad de vida, es necesario contar con un aliado que nos ayude a combatir los efectos negativos del día a día. MUNO-T no es solo un té detox; es un ritual de bienestar diseñado para revitalizar cada célula de tu cuerpo y restaurar su equilibrio natural, inspirado en las antiguas tradiciones de la medicina oriental y en los secretos de la naturaleza, MUNO-T es una fusión de ingredientes poderosos que han sido utilizados durante siglos por sus propiedades curativas y desintoxicantes.`,
    price: 320000,
    available: true,
    image: "/assets/ofmunot-G-scaled.png",
    calories: 0,
    nutritionTable: {
      "tamaño_de_porcion": "1 paquete (40g)",
      "porciones_por_envase": "4",
      "calorias": "0",
      "grasas": {
        "grasa_total": "0g (0% VD)",
        "grasa_saturada": "0g (0% VD)",
        "grasas_trans": "0g"
      },
      "colesterol": "0mg (0% VD)",
      "sodio": "0mg (0% VD)",
      "carbohidratos": {
        "total_carbohidratos": "0g (0% VD)",
        "fibra_dietetica": "0g (0% VD)",
        "azucares_totales": "0g",
        "azucares_añadidos": "0g (0% VD)"
      },
      "proteina": "0g"
    },
    ingredients: [
      "Malva silvestre (Common Mallow)",
      "Diente de león (Common Dandelion)",
      "Durazno (Peach)",
      "Manzanilla (Chamomile)",
      "Frángula",
      "Cardo Mariano (Blessed Milk Thistle)",
      "Cardo Bendito (Blessed Thistle)",
      "Lobelia",
      "Flor de azahar (Orange blossom)",
      "Malvavisco común (Common Marshmallow)",
      "Caqui japonés (Japanese Persimmon)",
      "Ortiga (Stinging Nettle)",
      "Hongo Chaga",
      "Hongo Reishi / Ganoderma lucidum",
      "Jengibre"
    ],
    preparation: "Tomar según las indicaciones del producto.",
    benefits: [
      "Fortalece el sistema inmune",
      "Apoya la regeneración celular",
      "Fórmula especializada",
    ],
    instructions: [
      "Hervir 1 litro de agua, retirar del fuego y añadir 1 sobre (10g) de Muno T [3].",
      "Dejar reposar por 4 horas [3].",
      "Filtrar y combinar con 2 litros adicionales de agua fría [3].",
      "Mantener refrigerado [3]."
    ],
    rateSuggestion: "Beber una taza por la mañana y una taza por la noche [3, 5].",
    certification: [
      "Vegano [3]",
      "100% Natural [3]",
      "Libre de OGM (Non-GMO) [3]"
    ]
  },
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
    available: false,
    calories: 0,
    preparation: "Tomar según las indicaciones del producto.",
    benefits: [
      "Apoya la regeneración celular",
      "Promueve el bienestar general",
      "Fórmula natural",
    ],
    instructions: [
      "Tomar 1 cápsula por la mañana con el desayuno.",
      "Tomar 1 cápsula por la noche con la cena.",
      "Acompañar con un vaso de agua.",
      "No exceder la dosis recomendada."
    ],
    rateSuggestion: "Tomar 2 cápsulas diarias, preferiblemente con las comidas principales.",
    certification: [
      "100% Natural",
      "Libre de OGM (Non-GMO)",
      "GMP Certificado"
    ]
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
    available: false,
    image: "/assets/ofcellergyboost-Bot-G-scaled.png",
    ingredients: [
      "Complejo energético celular",
      "Ingredientes bioactivos premium",
    ],
    calories: 0,
    preparation: "Tomar según las indicaciones del producto.",
    benefits: [
      "Impulsa la energía celular",
      "Aumenta la vitalidad",
      "Fórmula potenciada",
    ],
    instructions: [
      "Tomar 1 cápsula por la mañana en ayunas.",
      "Tomar 1 cápsula a media tarde para mantener la energía.",
      "Acompañar con abundante agua.",
      "Puede tomarse con o sin alimentos."
    ],
    rateSuggestion: "Tomar 2 cápsulas al día para resultados óptimos, una por la mañana y otra por la tarde.",
    certification: [
      "Vegano",
      "100% Natural",
      "Libre de OGM (Non-GMO)",
      "Sin Gluten"
    ]
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
    available: false,
    calories: 0,
    image: "/assets/ofneurocell-Big-scaled.png",
    ingredients: ["Complejo neurocelular", "Ingredientes neuroprotectores"],
    preparation: "Tomar según las indicaciones del producto.",
    benefits: [
      "Apoya la salud neurológica",
      "Promueve la función cognitiva",
      "Regeneración del sistema nervioso",
    ],
    instructions: [
      "Tomar 2 cápsulas por la mañana con el desayuno.",
      "Acompañar con un vaso de agua.",
      "Para mejores resultados, mantener un uso constante.",
      "Consultar con un profesional de la salud antes de usar."
    ],
    rateSuggestion: "Tomar 2 cápsulas diarias con la primera comida del día para apoyar la función cognitiva durante el día.",
    certification: [
      "100% Natural",
      "Libre de OGM (Non-GMO)",
      "GMP Certificado",
      "Respaldado científicamente"
    ]
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
