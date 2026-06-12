import { site } from "@/lib/site-config";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import AppVorschau from "@/components/sections/AppVorschau";

/**
 * Produkt-Showcase — die Verwaltungssoftware im Mittelpunkt,
 * Web-Entwicklung und freie Aufträge danach bewusst kompakt.
 * Demo-CTA: zeigt die neutrale Demo-Instanz, sobald site.demoUrl
 * gesetzt ist — bis dahin führt er zur Demo-Vereinbarung.
 */
const nebenan = [
  {
    titel: "Landing Pages & Web-Entwicklung",
    text: "Seiten wie diese hier: individuell entworfen und gebaut statt aus dem Baukasten — schnell, barrierearm, DSGVO-sauber.",
  },
  {
    titel: "Individuelle Aufträge",
    text: "Web- und Software-Arbeiten nach Absprache — vom kleinen internen Werkzeug bis zur Erweiterung Ihres Portals.",
  },
];

export default function Produkt() {
  return (
    <section id="produkt" className="hairline-t py-section">
      <Container>
        <Reveal>
          <p className="eyebrow">Das Produkt</p>
          <h2 className="display-tight mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3.2rem)]">
            Eine Verwaltung. Ein Ort. Ihre Instanz.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-graphit">
              {site.name} bündelt Schüler, Lehrkräfte, Stunden und Abrechnung
              in einem System — entstanden im Alltag eines echten Instituts,
              nicht am Reißbrett. Was erfasst wird, ist auch schon abgerechnet.
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              {site.demoUrl ? (
                <Button href={site.demoUrl} external>
                  Demo live öffnen
                </Button>
              ) : (
                <Button href="/#kontakt">Live sehen — Demo vereinbaren</Button>
              )}
              <Button href="/#funktionen" variant="ghost">
                Funktionen
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>

      <Container wide className="mt-14">
        <Reveal delay={60}>
          <AppVorschau />
        </Reveal>
      </Container>

      <Container className="mt-16">
        <Reveal>
          <p className="eyebrow">Außerdem</p>
        </Reveal>
        <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-5">
          {nebenan.map((n, i) => (
            <Reveal key={n.titel} delay={i * 80}>
              <article className="h-full rounded-xl border border-tinte/10 p-6">
                <h3 className="font-display text-lg font-semibold">{n.titel}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-graphit">
                  {n.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
