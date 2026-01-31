import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Equilibriate",
  description: "Términos y condiciones de uso de Equilibriate.",
};

export default function TermsPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Términos y Condiciones
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Última actualización: Enero 2025
          </p>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              1. Aceptación de los Términos
            </h2>
            <p className="text-muted-foreground">
              Al acceder y utilizar el sitio web de Equilibriate, usted acepta estar
              sujeto a estos términos y condiciones de uso. Si no está de acuerdo
              con alguna parte de estos términos, le rogamos que no utilice
              nuestro sitio web.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              2. Productos y Precios
            </h2>
            <p className="text-muted-foreground">
              Todos los precios mostrados están en Pesos Colombianos (COP) e
              incluyen el IVA aplicable. Nos reservamos el derecho de modificar
              los precios sin previo aviso. Las imágenes de los productos son
              ilustrativas y pueden diferir ligeramente del producto real.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              3. Envíos y Entregas
            </h2>
            <p className="text-muted-foreground">
              Realizamos entregas únicamente en el área metropolitana de Medellín,
              Colombia. Los tiempos de entrega estimados son de 24 a 48 horas
              hábiles después de confirmado el pago. El envío es gratuito para
              todos los pedidos.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              4. Política de Devoluciones
            </h2>
            <p className="text-muted-foreground">
              Si no está satisfecho con su compra, puede solicitar un reembolso
              dentro de los 7 días siguientes a la recepción del producto,
              siempre que este no haya sido abierto y se encuentre en su empaque
              original. Para productos defectuosos, el plazo se extiende a 30 días.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              5. Privacidad de Datos
            </h2>
            <p className="text-muted-foreground">
              Respetamos su privacidad y protegemos sus datos personales de
              acuerdo con la Ley 1581 de 2012 de Protección de Datos Personales
              de Colombia. Sus datos serán utilizados únicamente para procesar
              sus pedidos y mejorar su experiencia en nuestro sitio.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              6. Propiedad Intelectual
            </h2>
            <p className="text-muted-foreground">
              Todo el contenido de este sitio web, incluyendo textos, gráficos,
              logotipos, imágenes y software, es propiedad de Equilibriate y
              está protegido por las leyes de propiedad intelectual de Colombia.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              7. Contacto
            </h2>
            <p className="text-muted-foreground">
              Si tiene preguntas sobre estos términos y condiciones, puede
              contactarnos a través de nuestra página de contacto o mediante
              nuestro asistente virtual disponible en el chat.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
