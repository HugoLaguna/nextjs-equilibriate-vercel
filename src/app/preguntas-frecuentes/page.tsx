"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Cuáles son las zonas de entrega?",
    answer:
      "Realizamos entregas en toda el área metropolitana de Medellín, incluyendo Envigado, Sabaneta, Itagüí, Bello, y La Estrella. Si estás fuera de estas zonas, contáctanos para verificar disponibilidad.",
  },
  {
    question: "¿Cuánto tiempo tarda la entrega?",
    answer:
      "Nuestras entregas se realizan en un plazo de 24 a 48 horas hábiles después de confirmado el pago. Para pedidos realizados antes de las 12:00 PM, intentamos entregar al día siguiente.",
  },
  {
    question: "¿El envío tiene costo?",
    answer:
      "No, el envío es completamente gratuito para todos los pedidos dentro de nuestra zona de cobertura en el área metropolitana de Medellín.",
  },
  {
    question: "¿Cuáles son los métodos de pago aceptados?",
    answer:
      "Aceptamos pagos con tarjeta de crédito y débito (Visa, Mastercard, American Express), PSE, Nequi, Daviplata, y pago contra entrega en efectivo.",
  },
  {
    question: "¿Los tés tienen fecha de vencimiento?",
    answer:
      "Sí, todos nuestros tés tienen una fecha de vencimiento impresa en el empaque. Generalmente, nuestros tés tienen una vida útil de 12 a 24 meses desde su producción, siempre que se almacenen en un lugar fresco y seco.",
  },
  {
    question: "¿Cómo debo almacenar el té?",
    answer:
      "Para mantener la frescura y el sabor de tu té, guárdalo en un lugar fresco, seco y alejado de la luz directa del sol. Evita almacenarlo cerca de alimentos con olores fuertes, ya que el té puede absorberlos.",
  },
  {
    question: "¿Puedo devolver un producto?",
    answer:
      "Sí, aceptamos devoluciones dentro de los 7 días siguientes a la recepción del producto, siempre que este no haya sido abierto y se encuentre en su empaque original. Para productos defectuosos, el plazo se extiende a 30 días.",
  },
  {
    question: "¿Ofrecen ventas al por mayor?",
    answer:
      "Sí, trabajamos con restaurantes, cafeterías, hoteles y tiendas especializadas. Contáctanos a través de nuestro formulario de contacto seleccionando 'Ventas al por mayor' para recibir información sobre precios y condiciones.",
  },
  {
    question: "¿Los tés son orgánicos?",
    answer:
      "La mayoría de nuestros tés son orgánicos y provienen de cultivos certificados. Cada producto indica en su descripción si cuenta con certificación orgánica. Trabajamos directamente con productores que practican agricultura sostenible.",
  },
  {
    question: "¿Cómo puedo contactar al servicio al cliente?",
    answer:
      "Puedes contactarnos a través de nuestro chat en vivo disponible 24/7, por email a hola@equilibriate.co, o llamando al +57 (4) 123-4567 en horario de oficina. También puedes usar nuestro formulario de contacto.",
  },
];

export default function FAQPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground">
            Preguntas Frecuentes
          </h1>
          <p className="mt-4 text-muted-foreground">
            Encuentra respuestas a las preguntas más comunes sobre nuestros
            productos y servicios.
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="bg-muted/50 rounded-xl border border-border overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between p-4 text-left text-foreground font-medium hover:bg-muted/80 transition-colors group">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="px-4 pb-4 text-muted-foreground text-sm">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <div className="mt-12 bg-primary/5 rounded-2xl p-6 text-center border border-primary/10">
          <h2 className="font-semibold text-foreground">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Nuestro asistente virtual puede ayudarte con cualquier otra
            pregunta. ¡Escríbele en el chat!
          </p>
        </div>
      </div>
    </div>
  );
}
