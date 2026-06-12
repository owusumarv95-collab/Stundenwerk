import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * FAQ (Modul 7) — fängt die typischen Einwände ab.
 * Native <details>/<summary>: barrierefrei, tastaturbedienbar, kein JS.
 */
const fragen = [
  {
    f: "Wo liegen unsere Daten?",
    a: "In Ihrer eigenen Instanz auf Servern in der EU — getrennt von allen anderen Kunden. Die Auftragsverarbeitung regeln wir schriftlich per AVV.",
  },
  {
    f: "Wie aufwendig ist die Umstellung für uns?",
    a: "Etwa zwei Wochen, ohne dass Ihr Betrieb stillsteht. Die Datenübernahme aus Excel übernehme ich; der erste Monat darf parallel zu Ihren bisherigen Zetteln laufen.",
  },
  {
    f: "Was passiert mit unseren Excel-Listen?",
    a: "Sie werden importiert — niemand bei Ihnen tippt Bestandsdaten ab. Und es gibt kein Gefängnis: Ihre Daten lassen sich jederzeit vollständig als CSV exportieren.",
  },
  {
    f: "Müssen unsere Lehrkräfte technikaffin sein?",
    a: "Nein. Lehrkräfte sehen genau das, was sie brauchen: ihre Stunden eintragen, ihre Abrechnung prüfen. Die Einweisung ist Teil der Einrichtung.",
  },
  {
    f: "Was kostet es am Ende wirklich?",
    a: "Einmalig 800–1.200 € für die Einrichtung, dann 149–199 € im Monat — abhängig von der Standortzahl. Beides steht oben offen auf dieser Seite, ohne Sternchen.",
  },
  {
    f: "Und wenn wir wieder aufhören wollen?",
    a: "Dann gehören die Daten weiterhin Ihnen: vollständiger Export, geordnete Übergabe, danach wird Ihre Instanz gelöscht. Ein Wechsel zurück oder weiter bleibt jederzeit möglich.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="hairline-t bg-nebel/50 py-section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="display-tight mt-4 text-[clamp(1.9rem,4vw,3.2rem)]">
              Die typischen Einwände — beantwortet.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="faq">
              {fragen.map((eintrag) => (
                <details key={eintrag.f} className="hairline-t group">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-[1.05rem] font-medium">
                    {eintrag.f}
                    <span
                      aria-hidden
                      className="faq-plus shrink-0 font-display text-xl leading-none text-graphit"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-prose pb-6 text-[0.95rem] leading-relaxed text-graphit">
                    {eintrag.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
