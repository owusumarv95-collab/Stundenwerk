# Stundenwerk — Verkaufsseite

One-Pager für die Verwaltungssoftware für Nachhilfe-Institute.
Design-Richtung: **„Porzellan & Chrom"** — hell, präzise, Baujahr 2200.

## Status

| Stufe | Inhalt | Stand |
|-------|--------|-------|
| 1 | Konzept, Design-Tokens, Namensentscheidung | ✅ |
| 2a | Projekt, Grundgerüst, Navigation, Footer, statischer Hero | ✅ |
| 2b | Hero-Signatur-Animation (Chromtropfen, R3F) + Lenis + Eintritts-Animation | ✅ |
| 3 | Problem, Produkt-Showcase (schematische Vorschau), Funktionen, Scroll-Reveals | ✅ |
| 4 | Zeitspar-Rechner, Ablauf-Timeline, Referenz (anonym), Vertrauen, Preise, FAQ | ✅ |
| 5 | Kontaktformular + E-Mail-Versand (Resend), Checkliste als Lead-Magnet, Cal.com-Anbindung | ✅ |
| 6 | Cursor + Magnet-Buttons, Gyro-Parallaxe, Scroll-Drift, Schwebe-CTA, Rechtstexte, SEO/OG, Launch-Doku | ✅ (final) |

## Launch-Checkliste (in dieser Reihenfolge)

1. **Domain festlegen** und in Vercel verbinden; `NEXT_PUBLIC_SITE_URL`
   als Umgebungsvariable setzen (steuert Sitemap, Robots, Open Graph).
2. **Resend einrichten:** Domain dort verifizieren, EU-Region wählen,
   dann `RESEND_API_KEY`, `KONTAKT_AN`, `KONTAKT_FROM` in Vercel setzen.
3. **Kontaktdaten eintragen** in `src/lib/site-config.ts`
   (email, phone, whatsapp, demoUrl der neutralen Demo, calUrl).
4. **Rechtstexte:** Platzhalter in `src/app/impressum/page.tsx` und
   `src/app/datenschutz/page.tsx` füllen, Warnhinweis-Box entfernen,
   einmal prüfen (lassen) — die Entwürfe sind kein Rechtsrat.
5. **Checklisten-PDF:** Fußzeile im Docx
   (`assets/checkliste/checkliste-stundenwerk.docx`) mit echten
   Kontaktdaten versehen, zu PDF konvertieren, nach `public/` kopieren.
6. **Echtgeräte-Test:** Hero auf einem Mittelklasse-Handy (Tropfen flüssig?
   Gyro-Neigung?), Desktop-Cursor, Formulare einmal absenden.
7. **Lighthouse:** Chrome DevTools → Lighthouse → alle vier Kategorien
   gegen den Produktions-Build (`npm run build && npm start`) laufen lassen.
8. `git push` → Vercel deployt automatisch.

## Bewusste Abweichungen vom Briefing

- **Schriften:** Satoshi/General Sans (Fontshare) dürfen nicht im Repo
  weitergegeben werden → OFL-Alternativen Archivo/Hanken Grotesk/JetBrains
  Mono, lokal gehostet. Tausch jederzeit in `src/fonts/index.ts` möglich.
- **GSAP + Framer Motion:** bewusst nicht eingebaut. Die geforderte
  Scroll-Choreografie, Eintritts-Animation und Mikro-Interaktionen laufen
  über IntersectionObserver, Lenis, CSS-Transitions und die R3F-Schleife —
  gleiche Wirkung, ~90 kB weniger JavaScript. Beide Bibliotheken lassen
  sich später ergänzen, falls aufwendigere Scrub-Sequenzen gewünscht sind.
- **Cal.com / WhatsApp:** vorbereitet, erscheinen automatisch nach Eintrag
  in `site-config` (Module 2 und 15).

## Conversion-Mechanik (Stufe 5)

**E-Mail-Versand:** `/api/kontakt` sendet über die Resend-REST-API (kein SDK).
Konfiguration: `.env.example` nach `.env.local` kopieren und füllen —
`RESEND_API_KEY`, `KONTAKT_AN` (Empfänger), `KONTAKT_FROM` (verifizierte
Absenderdomain bei Resend). In Vercel dieselben drei Variablen unter
Settings → Environment Variables eintragen.

Ohne Konfiguration: Kontaktformular meldet einen ehrlichen Fehler (503);
der Checklisten-Download funktioniert trotzdem (Lead geht dann allerdings
verloren — vor dem Launch also zwingend konfigurieren).

**Lead-Magnet:** Das PDF liegt unter `public/checkliste-stundenwerk.pdf`,
die bearbeitbare Quelle unter `assets/checkliste/checkliste-stundenwerk.docx`.
Im Fußbereich stehen noch `[E-Mail]`/`[Telefon]` — nach Lieferung der
Kontaktdaten: Docx anpassen, dann
`soffice --headless --convert-to pdf assets/checkliste/checkliste-stundenwerk.docx`
und das PDF nach `public/` kopieren (passiert sonst in Stufe 6).

**Cal.com (Modul 2):** `site.calUrl` in `src/lib/site-config.ts` setzen →
der Buchungs-Button erscheint automatisch in der Kontakt-Sektion.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build (läuft fehlerfrei durch)
```

## Deploy (Vercel)

Repo zu GitHub pushen → Vercel → „Import Project" → Framework wird als
Next.js erkannt, keine weiteren Einstellungen nötig.

## Struktur

```
src/
  app/
    layout.tsx          Wurzel-Layout: Fonts, Skip-Link, Header/Footer
    page.tsx            One-Pager (Sektions-Reihenfolge + Platzhalter)
    globals.css         Design-Tokens (Tailwind-v4-Theme) + Basis-Styles
    impressum/          Rechtsseite (Skelett, Inhalt in Stufe 6)
    datenschutz/        Rechtsseite (Skelett, Inhalt in Stufe 6)
  components/
    layout/Header.tsx   Klebrige Navigation, Scroll-Zustand, Mobil-Menü
    layout/Footer.tsx   Footer-Skelett
    sections/Hero.tsx   Hero mit Eintritts-Animation
    sections/HeroVisual.tsx  Lazy-Hülle: Sichtbarkeit + Reduced Motion
    sections/Problem.tsx     Status quo in drei Artefakten + Brücke zum Rechner
    sections/Produkt.tsx     Showcase + Demo-CTA (site.demoUrl) + Nebenleistungen
    sections/AppVorschau.tsx Schematische Produkt-Vorschau (HTML/CSS, ersetzbar)
    sections/Funktionen.tsx  Feature-Raster, eigene Instanz in Kupfer markiert
    sections/Rechner.tsx     Interaktiver Zeitspar-Rechner (offene Annahmen)
    sections/Ablauf.tsx      Timeline „So läuft es nach der Zusage"
    sections/Referenz.tsx    Anonyme Live-Referenz (TODO: echtes Zitat mit Freigabe)
    sections/Vertrauen.tsx   Über-mich + DSGVO/EU/Instanz-Signale
    sections/Preise.tsx      Transparente Preise (Setup + monatlich)
    sections/Faq.tsx         Einwände als natives details/summary
    sections/Checkliste.tsx  Lead-Magnet (invertiertes Tinte-Band) + Download
    sections/Kontakt.tsx     Formular, DSGVO-Checkbox, Direktwege, Cal.com
  app/api/kontakt/route.ts   Versand-Endpunkt (Resend, Honigtopf, Validierung)
    sections/Platzhalter.tsx
    ui/Reveal.tsx            Scroll-Reveal (IntersectionObserver)
    three/ChromFeld.tsx Signatur-Animation: reaktiver Chromtropfen (R3F)
    layout/SmoothScroll.tsx  Lenis + weiche Anker-Sprünge
    ui/                 Container, Button
  fonts/                Selbst gehostete woff2 + Lizenzen
  lib/site-config.ts    ZENTRALE Config: Name, Kontakt, Demo-URL, Navigation
  fx/Cursor.tsx          Eigener Cursor + magnetische [data-magnet]-Elemente
  fx/SchwebeCta.tsx      Mitscrollender Demo-Knopf (mobil)
  app/sitemap.ts, robots.ts, icon.png, apple-icon.png — SEO/PWA-Basics
```

## Schriften (selbst gehostet, DSGVO)

Archivo (Display, variable Breite 62–125 %), Hanken Grotesk (Lauftext),
JetBrains Mono (Labels/Zahlen) — alle **SIL Open Font License**, Lizenzen
liegen in `src/fonts/licenses/`. Kein externes Font-CDN.

Hinweis: Satoshi/General Sans (Fontshare) dürfen laut deren EULA nicht im
Repo weitergegeben werden — die OFL-Alternativen sind rechtlich sauber und
optisch sehr nah. Ein späterer Tausch wäre ein Fünf-Minuten-Eingriff in
`src/fonts/index.ts`.

## Noch offen (von Naowu zu liefern)

- Kontaktdaten (E-Mail, Telefon, WhatsApp) → `src/lib/site-config.ts`
- URL der neutralen Demo-Instanz → `site.demoUrl` (bewusst kein Bendias-Link)
- Impressums-/Datenschutzdaten (Anschrift) → Stufe 6
