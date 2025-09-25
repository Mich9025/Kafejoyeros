import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kafe Joyeros - Joyería Artesanal de Excelencia",
  description: "Creamos joyas únicas que cuentan tu historia. Más de 20 años de experiencia en joyería artesanal, diseño personalizado, reparación y servicios especializados.",
  keywords: "joyería, joyas artesanales, diseño personalizado, anillos, collares, aretes, pulseras, oro, plata, diamantes, reparación de joyas",
  authors: [{ name: "Kafe Joyeros" }],
  openGraph: {
    title: "Kafe Joyeros - Joyería Artesanal de Excelencia",
    description: "Creamos joyas únicas que cuentan tu historia. Más de 20 años de experiencia en joyería artesanal.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kafe Joyeros - Joyería Artesanal de Excelencia",
    description: "Creamos joyas únicas que cuentan tu historia. Más de 20 años de experiencia en joyería artesanal.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
