import { site } from "@/lib/site-config";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * Vertrauen (Kern + Modul 13) — Über-mich plus die drei Signale,
 * auf die diese Zielgruppe tatsächlich achtet.
 */
const signale = [
  {
    tag: "DSGVO",
    text: "Konform, mit Auftragsverarbeitungsvertrag (AVV) — schriftlich, nicht als Versprechen.",
  },
  {
    tag: "EU-Hosting",
    text: "Server und Datenbank stehen in der EU. Keine Datenflüsse in Drittländer.",
  },
  {
    tag: "Eigene Instanz",
    text: "Abgeschottete Installation nur für Ihr Institut — keine geteilte Plattform.",
  },
];

export default function Vertrauen() {
  return (
    <section id="vertrauen" className="hairline-t py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Vertrauen</p>
            <h2 className="display-tight mt-4 text-[clamp(1.9rem,4vw,3.2rem)]">
              Wer dahinter steht. Wo Ihre Daten liegen.
            </h2>
            <div className="mt-7 max-w-xl space-y-4 text-lg leading-relaxed text-graphit">
              <p>
                {site.name} baue und betreue ich persönlich: {site.owner},
                Entwickler aus {site.city}. Ich stehe seit Jahren selbst in der
                Nachhilfe — von der Grundschule bis zum Abitur — und habe diese
                Software gebaut, weil ich die Excel-Listen und Zettel aus der
                Praxis kenne, nicht aus Verkaufsfolien.
              </p>
              <p>
                Für Sie heißt das: Sie sprechen mit dem Menschen, der den Code
                geschrieben hat. Keine Hotline, keine Warteschleife, keine
                Zuständigkeits-Pingpongs.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4 lg:pt-16">
            {signale.map((s, i) => (
              <Reveal key={s.tag} delay={i * 80}>
                <div className="rounded-xl border border-tinte/10 p-5">
                  <p className="eyebrow text-[0.72rem]">{s.tag}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-tinte">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
