import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import type { CSSProperties } from "react";
import { brand } from "@/brand.config";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: {
    default: brand.name,
    template: `%s | ${brand.name}`,
  },
  description: "Schepen, uitrusting en onderdelen voor de echte wereld.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`${archivo.variable} h-full antialiased`}
      style={
        {
          "--brand": brand.colors.primary,
          "--brand-contrast": brand.colors.primaryContrast,
          "--accent": brand.colors.accent,
        } as CSSProperties
      }
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
