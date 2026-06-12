import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

/**
 * Preise (Modul 3) — transparent statt „auf Anfrage".
 * Spannen statt Festpreis, weil Standortzahl und Datenbestand den
 * Aufwand bestimmen; die Logik steht offen dabei.
 */
const einrichtung = [
  "Aufbau Ihrer eigenen Instanz",
  "Übernahme der Bestandsdaten aus Excel",
  "Standorte, Rollen und Vergütungssätze",
  "Einweisung für Leitung und Lehrkräfte",
];

const betrieb = [
  "Hosting und Datenbank in der EU",
  "Updates und tägliche Datensicherung",
  "Persönlicher Support — direkter Draht",
  "Auswertungen und CSV-Export inklusive",
];

function Posten({ punkte }: { punkte: readonly string[] }) {
  return (
    <ul className="mt-6">
      {punkte.map((p) => (
        <li key={p} className="hairline-t py-3 text-[0.95rem] leading-relaxed text-graphit">
          {p}
        </li>
      ))}
    </ul>
  );
}

export default function Preise() {
  return (
    <section id="preise" className="hairline-t py-section">
      <Container>
        <Reveal>
          <p className="eyebrow">Preise</p>
          <h2 className="display-tight mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3.2rem)]">
            Transparent statt „auf Anfrage“.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal delay={60}>
            <article className="h-full rounded-2xl border border-tinte/10 p-7 md:p-9">
              <p className="eyebrow text-[0.72rem]">Einmalig</p>
              <p className="display-tight mt-3 text-4xl md:text-5xl">800–1.200 €</p>
              <p className="mt-2 text-sm text-graphit">
                Einrichtung — je nach Standorten und Datenbestand
              </p>
              <Posten punkte={einrichtung} />
            </article>
          </Reveal>

          <Reveal delay={140}>
            <article className="h-full rounded-2xl border-2 border-kupfer/60 bg-nebel/60 p-7 md:p-9">
              <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-kupfer-tief">
                Monatlich
              </p>
              <p className="display-tight mt-3 text-4xl md:text-5xl">149–199 €</p>
              <p className="mt-2 text-sm text-graphit">
                Betrieb — Preis richtet sich nach der Standortzahl
              </p>
              <Posten punkte={betrieb} />
            </article>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-graphit">
              Keine versteckten Kosten, keine Setup-Überraschungen. Die genaue
              Einordnung klären wir in einem kurzen Gespräch — ohne
              Verkaufsdruck.
            </p>
            <Button href="/#kontakt" className="shrink-0">
              Demo vereinbaren
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
