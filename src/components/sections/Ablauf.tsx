import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * Ablauf-Timeline (Modul 12) — nimmt die Angst vor der Umstellung.
 * Hier sind Nummern gerechtfertigt: Es ist eine echte Abfolge.
 */
const schritte = [
  {
    nr: "01",
    zeit: "Woche 0",
    titel: "Kennenlernen und Demo",
    text: "Wir schauen uns an, wie Ihr Institut heute arbeitet — und Sie sehen das System live. Danach wissen beide Seiten, ob es passt.",
  },
  {
    nr: "02",
    zeit: "Woche 1",
    titel: "Ihre Instanz wird aufgebaut",
    text: "Eigene Installation nur für Sie: Standorte, Rollen, Vergütungssätze, Ihr Logo. Sie bekommen Zugänge für Leitung und Lehrkräfte.",
  },
  {
    nr: "03",
    zeit: "Woche 1–2",
    titel: "Ihre Daten ziehen um",
    text: "Bestehende Schüler- und Lehrkräftedaten werden übernommen — aus Excel, ohne dass bei Ihnen jemand abtippen muss.",
  },
  {
    nr: "04",
    zeit: "Woche 2",
    titel: "Einweisung und Start",
    text: "Kurze Einweisung für alle, die damit arbeiten. Der erste Monat darf parallel laufen — die Zettel bleiben als Fallschirm erlaubt.",
  },
  {
    nr: "05",
    zeit: "laufend",
    titel: "Betrieb mit direktem Draht",
    text: "Updates, Datensicherung und Betreuung sind drin. Bei Fragen antwortet der Mensch, der das System gebaut hat — kein Ticketsystem.",
  },
];

export default function Ablauf() {
  return (
    <section id="ablauf" className="hairline-t py-section">
      <Container>
        <Reveal>
          <p className="eyebrow">Der Ablauf</p>
          <h2 className="display-tight mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3.2rem)]">
            So läuft es nach der Zusage.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-graphit">
            Von der Demo bis zum laufenden Betrieb sind es etwa zwei Wochen —
            ohne dass Ihr Tagesgeschäft stillsteht.
          </p>
        </Reveal>

        <ol className="mt-14 max-w-3xl border-l border-tinte/10">
          {schritte.map((s, i) => (
            <li key={s.nr} className="relative pb-12 pl-8 last:pb-0 sm:pl-10">
              <span
                aria-hidden
                className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-kupfer bg-porzellan"
              />
              <Reveal delay={i * 60}>
                <p className="font-mono text-xs tracking-wide text-graphit">
                  {s.nr} · {s.zeit}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold">{s.titel}</h3>
                <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-graphit">
                  {s.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
