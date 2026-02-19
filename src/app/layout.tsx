import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RBR Unidos — Cúpulas Geodésicas Premium",
  description:
    "Fabricamos cúpulas geodésicas a medida para glamping, casas, eventos y espacios de trabajo. Materiales premium, diseño arquitectónico, entrega en todo el país.",
  keywords: [
    "cúpulas geodésicas",
    "glamping",
    "domos",
    "arquitectura premium",
    "RBR Unidos",
  ],
  openGraph: {
    title: "RBR Unidos — Cúpulas Geodésicas Premium",
    description: "Espacios esféricos que transforman experiencias.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
