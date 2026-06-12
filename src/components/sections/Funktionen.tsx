import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * Feature-Überblick — konkret, kein Marketing-Geschwätz.
 * Hairline-Raster statt Icon-Karten; die eigene Instanz ist als
 * Unterscheidungsmerkmal mit Kupfer markiert.
 */
const funktionen = [
  {
    tag: "Rollen",
    titel: "Jeder sieht nur seins",
    text: "Ober-Admin, Standortleitung, Lehrkraft: drei Rollen, sauber getrennte Rechte. Lehrkräfte sehen ihre Stunden — nicht die Zahlen des Instituts.",
  },
  {
    tag: "Stunden → Abrechnung",
    titel: "Einmal erfassen reicht",
    text: "Erfasste Stunden werden direkt zur Lehrkräfte-Abrechnung. Kein Abtippen, keine zweite Liste, keine Übertragungsfehler am Monatsende.",
  },
  {
    tag: "Export",
    titel: "CSV für den Steuerberater",
    text: "Bestätigte Abrechnungen wandern per Klick als CSV raus — fertig für Steuerbüro oder Buchhaltung, ohne Nacharbeit.",
  },
  {
    tag: "Standorte",
    titel: "Mehrere Standorte, ein System",
    text: "Standortübergreifende Auswertung ohne Zusammenkopieren. Jeder Standort arbeitet im selben System, mit eigenen Rechten.",
  },
  {
    tag: "Eigene Instanz",
    titel: "Eine Installation nur für Sie",
    text: "Ihr Institut bekommt eine eigene, abgeschottete Instanz — eigene Datenbank, eigener Zugang. Keine geteilte Plattform, auf der alle Kunden liegen.",
    kupfer: true,
  },
  {
    tag: "EU-Daten",
    titel: "Daten in der EU, DSGVO inklusive",
    text: "Hosting und Datenbank in der EU, Auftragsverarbeitung (AVV) geregelt. Auskunfts- und Löschanfragen sind kein Schreckgespenst mehr.",
  },
];

export default function Funktionen() {
  return (
    <section id="funktionen" className="hairline-t py-section">
      <Container>
        <Reveal>
          <p className="eyebrow">Funktionen</p>
          <h2 className="display-tight mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3.2rem)]">
            Gebaut für den Institutsalltag.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {funktionen.map((f, i) => (
            <Reveal key={f.tag} delay={(i % 3) * 70}>
              <div
                className={
                  f.kupfer
                    ? "h-full border-t-2 border-kupfer pb-10 pt-6"
                    : "hairline-t h-full pb-10 pt-6"
                }
              >
                <p
                  className={
                    f.kupfer
                      ? "font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-kupfer-tief"
                      : "eyebrow text-[0.72rem]"
                  }
                >
                  {f.tag}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">{f.titel}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-graphit">
                  {f.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
