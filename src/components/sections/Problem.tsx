import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * Das Problem — der Status quo in drei Artefakten, die jede
 * Institutsleitung sofort wiedererkennt. Keine erfundenen Statistiken;
 * die eigene Rechnung macht der Besucher im Zeitspar-Rechner (#rechner).
 */
const artefakte = [
  {
    datei: "Schuelerliste_FINAL_v3.xlsx",
    titel: "Die Excel-Tabelle",
    text: "Stammdaten, Verträge, Telefonnummern — in einer Datei, die nur auf einem Rechner aktuell ist. Wehe, die Vertretung braucht sie.",
  },
  {
    datei: "Ordner: Stundenzettel 2026",
    titel: "Die Zettelwirtschaft",
    text: "Jede Stunde wird zweimal angefasst: einmal auf Papier, einmal beim Abtippen für die Abrechnung. Übertragungsfehler inklusive.",
  },
  {
    datei: "3 Gruppen · 214 ungelesen",
    titel: "Der Chat-Verlauf",
    text: "Absagen, Vertretungen, Raumfragen — verteilt auf Sprachnachrichten und drei Gruppen. Nachvollziehbar ist daran nichts.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="hairline-t bg-nebel/50 py-section">
      <Container>
        <Reveal>
          <p className="eyebrow">Das Problem</p>
          <h2 className="display-tight mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3.2rem)]">
            Excel, Zettel, drei WhatsApp-Gruppen.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {artefakte.map((a, i) => (
            <Reveal key={a.titel} delay={i * 80}>
              <article className="h-full rounded-xl border border-tinte/10 bg-porzellan p-6">
                <p className="font-mono text-[11px] tracking-wide text-graphit">
                  {a.datei}
                </p>
                <h3 className="mt-5 font-display text-lg font-semibold">{a.titel}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-graphit">
                  {a.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-14 max-w-2xl text-xl font-medium leading-snug md:text-2xl">
            Das geht erstaunlich lange gut — bis es das nicht mehr tut. Jeden
            Monat kostet es Stunden, die in Unterricht und Wachstum fehlen.
          </p>
          <Link
            href="/#rechner"
            className="group mt-6 inline-flex items-center gap-2 font-medium text-tinte transition-colors hover:text-kupfer-tief"
          >
            Rechnen Sie es für Ihr Institut aus
            <span
              aria-hidden
              className="transition-transform duration-300 ease-expo group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
