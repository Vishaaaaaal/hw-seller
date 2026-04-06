import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoreProvider } from "@/lib/store";
import { site } from "@/lib/data/site";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: "Starway Diecast | Premium diecast collectibles demo storefront",
    template: "%s | Starway Diecast",
  },
  description:
    "Starway Diecast is a polished demo storefront for Hot Wheels in India, Mini GT diecast cars, Matchbox collectibles, imported models, pre-orders, and premium collector drops.",
  keywords: [
    "Hot Wheels in India",
    "Mini GT diecast cars",
    "Matchbox collectibles",
    "Premium diecast collections",
    "Imported diecast models",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} font-sans antialiased`}>
        <StoreProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
