import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto | Equilibriate",
  description: "Contáctanos para cualquier pregunta sobre nuestros tés premium en Medellín.",
};

export default function ContactPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground">Contáctanos</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes preguntas sobre nuestros productos o necesitas ayuda con tu
            pedido? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-muted/50 rounded-2xl p-6 lg:p-8 border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Envíanos un mensaje
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Asunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="products">Información de productos</option>
                  <option value="order">Consulta sobre pedido</option>
                  <option value="wholesale">Ventas al por mayor</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Send className="h-4 w-4" />
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Información de contacto
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-xl">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Ubicación</h3>
                    <p className="text-sm text-muted-foreground">
                      Medellín, Antioquia<br />
                      Colombia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-xl">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      hola@equilibriate.co
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-xl">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Teléfono</h3>
                    <p className="text-sm text-muted-foreground">
                      +57 (4) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-xl">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Horario de atención</h3>
                    <p className="text-sm text-muted-foreground">
                      Lunes a Viernes: 8:00 AM - 6:00 PM<br />
                      Sábados: 9:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="font-semibold text-foreground mb-2">
                ¿Necesitas ayuda inmediata?
              </h3>
              <p className="text-sm text-muted-foreground">
                Nuestro asistente virtual está disponible 24/7 en el chat.
                ¡Escríbele y te ayudará al instante!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
