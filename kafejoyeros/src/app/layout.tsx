import type { Metadata } from "next";
import { Playfair_Display, Inter, DM_Sans } from "next/font/google";
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

const dmSans = DM_Sans({
  variable: "--font-tai-lue",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kafe Joyeros - Joyería Artesanal de Excelencia",
  description: "Creamos joyas únicas que cuentan tu historia. Más de 20 años de experiencia en joyería artesanal, diseño personalizado, reparación y servicios especializados.",
  keywords: "joyería, joyas artesanales, diseño personalizado, anillos, collares, aretes, pulseras, oro, plata, diamantes, reparación de joyas",
  authors: [{ name: "Kafe Joyeros" }],
  icons: {
    icon: [
      { url: "https://api.kafejoyeros.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png", type: "image/png" },
    ],
    apple: [
      { url: "https://api.kafejoyeros.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png" },
    ],
  },
  openGraph: {
    title: "Kafe Joyeros - Joyería Artesanal de Excelencia",
    description: "Creamos joyas únicas que cuentan tu historia. Más de 20 años de experiencia en joyería artesanal.",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "https://api.kafejoyeros.com/wp-content/uploads/2025/10/0DBD3315-D87C-4ED7-83F6-3D4F1BF6354B.jpg",
        alt: "Kafe Joyeros Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kafe Joyeros - Joyería Artesanal de Excelencia",
    description: "Creamos joyas únicas que cuentan tu historia. Más de 20 años de experiencia en joyería artesanal.",
    images: ["https://api.kafejoyeros.com/wp-content/uploads/2025/10/0DBD3315-D87C-4ED7-83F6-3D4F1BF6354B.jpg"],
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
        className={`${playfairDisplay.variable} ${inter.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
