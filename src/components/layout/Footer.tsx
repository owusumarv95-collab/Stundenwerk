import Link from "next/link";
import { site } from "@/lib/site-config";
import Container from "@/components/ui/Container";

/** Footer-Skelett — Rechtslinks stehen, Kontaktdaten folgen über site-config. */
export default function Footer() {
  return (
    <footer className="hairline-t bg-nebel/60">
      <Container className="grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr] md:py-20">
        <div>
          <p className="flex items-baseline gap-2">
            <span aria-hidden className="size-2 bg-kupfer" />
            <span className="font-display text-lg font-semibold tracking-tight [font-stretch:108%]">
              {site.name}
            </span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-graphit">
            Verwaltung für Nachhilfe-Institute. Eigene Instanz pro Institut,
            Daten in der EU. Gebaut in {site.city}.
          </p>
        </div>

        <nav aria-label="Footer-Navigation">
          <h2 className="eyebrow">Navigation</h2>
          <ul className="mt-4 space-y-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  className="text-sm text-graphit transition-colors hover:text-tinte"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rechtliches">
          <h2 className="eyebrow">Rechtliches</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/impressum" className="text-sm text-graphit transition-colors hover:text-tinte">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="text-sm text-graphit transition-colors hover:text-tinte">
                Datenschutz
              </Link>
            </li>
          </ul>
        </nav>
      </Container>

      <div className="hairline-t">
        <Container className="flex flex-col gap-2 py-6 text-xs text-graphit sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.owner}, {site.city}
          </p>
          <p className="font-mono tracking-wide">DSGVO-konform · Hosting in der EU</p>
        </Container>
      </div>
    </footer>
  );
}
