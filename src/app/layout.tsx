import type { Metadata } from "next";
import { Bebas_Neue, Sora } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Esteko Ingeniería | Consultoría BIM y Cálculo Estructural",
  description: "Esteko Ingeniería es una empresa líder en Argentina en Consultoría BIM, Cálculo Estructural, Dirección de Obra y Fotogrametría con Drones. Precisión técnica y tecnología aplicadas a la construcción.",
  keywords: ["BIM", "Cálculo Estructural", "Dirección de Obra", "Fotogrametría Drones", "Ingeniería Civil Argentina", "Esteko Ingeniería"],
  authors: [{ name: "Esteko Ingeniería" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${sora.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-brand-bg text-white font-body selection:bg-brand-orange selection:text-black flex flex-col">
        {children}
      </body>
    </html>
  );
}

