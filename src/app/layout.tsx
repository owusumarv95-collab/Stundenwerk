import type { Metadata, Viewport } from "next";
import { archivo, hanken, jbmono } from "@/fonts";
import { site } from "@/lib/site-config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/fx/Cursor";
import "./globals.css";

const basisUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const titel = `${site.name} — Verwaltung für Nachhilfe-Institute`;

export const metadata: Metadata = {
  metadataBase: new URL(basisUrl),
  title: { default: titel, template: `%s · ${site.name}` },
  description: site.description,
  keywords: [
    "Nachhilfe Verwaltungssoftware",
    "Software Nachhilfe-Institut",
    "Schülerverwaltung Nachhilfe",
    "Lehrkräfte-Abrechnung",
    "Nachhilfeschule digitalisieren",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: site.name,
    title: titel,
    description: site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — Weniger verwalten. Mehr unterrichten.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titel,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${archivo.variable} ${hanken.variable} ${jbmono.variable}`}>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-tinte focus:px-4 focus:py-2 focus:text-porzellan"
        >
          Zum Inhalt springen
        </a>
        <SmoothScroll />
        <Cursor />
        <Header />
        <main id="inhalt">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
