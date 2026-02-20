import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "LB Conexão Jurídica | Excelência no Direito Angolano",
  description: "Conectando profissionais, empresas e estudantes em Angola com soluções jurídicas completas e formação prática de alta qualidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-AO">
      <body className={`${playfair.variable} ${outfit.variable} font-sans antialiased selection:bg-secondary selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
