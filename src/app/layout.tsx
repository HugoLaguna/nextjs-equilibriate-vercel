import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";
import { LayoutShell } from "@/components/layout/LayoutShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Equilibriate | Té Premium en Medellín",
  description: "Distribuidores de té premium en Medellín, Colombia. Llevamos bienestar y equilibrio a tu vida a través de las mejores mezclas de té artesanal.",
  keywords: ["té", "tea", "Medellín", "Colombia", "té premium", "bienestar", "equilibrio"],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} antialiased`}
      >
        <ChatProvider>
          <LayoutShell>{children}</LayoutShell>
        </ChatProvider>
      </body>
    </html>
  );
}
