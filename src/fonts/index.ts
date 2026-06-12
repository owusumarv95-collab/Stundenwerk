import localFont from "next/font/local";

/**
 * Selbst gehostete Schriften (OFL-lizenziert, Lizenzen in ./licenses).
 * Kein externes Font-CDN — siehe Abschnitt 10 des Briefings (DSGVO).
 *
 * - Archivo (variabel: Gewicht 100–900, Breite 62–125%) → Display
 * - Hanken Grotesk (variabel: Gewicht)                  → Lauftext
 * - JetBrains Mono (variabel: Gewicht)                  → Zahlen, Labels
 */

export const archivo = localFont({
  src: "./archivo-latin-standard-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  display: "swap",
});

export const hanken = localFont({
  src: "./hanken-grotesk-latin-wght-normal.woff2",
  variable: "--font-hanken",
  weight: "100 900",
  display: "swap",
});

export const jbmono = localFont({
  src: "./jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jbmono",
  weight: "100 800",
  display: "swap",
});
