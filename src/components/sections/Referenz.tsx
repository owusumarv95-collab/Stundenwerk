import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * Referenz (Modul 4) — bewusst ANONYM formuliert: Auf der Seite wird kein
 * Institut namentlich genannt und keine Produktiv-App verlinkt.
 * TODO (später, mit schriftlicher Freigabe): echtes Kundenzitat ergänzen.
 */
const fakten = [
  "Stundenerfassung bis Monatsabschluss — komplett im System",
  "Lehrkräfte-Abrechnung mit Bestätigung und CSV-Export",
  "Mehrere Lehrkräfte, tägliche Nutzung im Echtbetrieb",
];

export default function Referenz() {
  return (
    <section id="referenz" className="hairline-t bg-nebel/50 py-section">
      <Container>
        <Reveal>
          <p className="eyebrow">Referenz</p>
          <h2 className="display-tight mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3.2rem)]">
            Läuft live. Jeden Tag.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphit">
            Stundenwerk ist keine Beta und kein Konzept: Ein Nachhilfe-Institut
            in NRW arbeitet täglich damit — vom Eintragen der Stunden bis zur
            fertigen Abrechnung am Monatsende. Genau dieser Alltag hat das
            System geformt.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-10 md:grid-cols-3">
          {fakten.map((f, i) => (
            <Reveal key={f} delay={i * 70}>
              <p className="hairline-t py-5 font-mono text-sm leading-relaxed text-tinte">
                {f}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
