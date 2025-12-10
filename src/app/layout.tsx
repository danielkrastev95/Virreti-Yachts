import type { Metadata } from "next";
import { Inter, Montserrat, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Virreti Yachts | Navigate the Extraordinary",
  description:
    "Yates de lujo diseñados para quienes no aceptan menos que la perfección. Descubre la nueva era de la navegación de élite.",
  keywords: ["yates", "lujo", "barcos", "Virreti", "yachts", "luxury boats"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${montserrat.variable} ${bodoniModa.variable} font-sans antialiased bg-white text-virreti-black`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
