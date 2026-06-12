import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

/**
 * ENTWURF — die [Platzhalter] muss Naowu vor dem Launch füllen.
 * Hinweis: kein Rechtsrat; vor Veröffentlichung einmal gegenprüfen (lassen).
 */
export default function Impressum() {
  return (
    <Container className="max-w-3xl pb-section pt-36">
      <p className="eyebrow">Rechtliches</p>
      <h1 className="display-tight mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">Impressum</h1>

      <p className="mt-6 rounded-lg border border-kupfer/40 bg-kupfer/10 px-4 py-3 font-mono text-xs text-kupfer-tief">
        Entwurf — Platzhalter in eckigen Klammern vor Veröffentlichung füllen
        und den Text einmal prüfen (lassen).
      </p>

      <div className="mt-10 space-y-10 leading-relaxed text-graphit">
        <section>
          <h2 className="font-display text-xl font-semibold text-tinte">
            Angaben gemäß § 5 DDG
          </h2>
          <p className="mt-3 text-tinte">
            {site.owner}
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ] {site.city}
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-tinte">Kontakt</h2>
          <p className="mt-3">
            E-Mail: [E-Mail-Adresse]
            <br />
            Telefon: [Telefonnummer]
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-tinte">Umsatzsteuer</h2>
          <p className="mt-3">
            [Entweder: Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
            DE… — oder: Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG
            wird keine Umsatzsteuer berechnet. — Nichtzutreffendes löschen.]
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-tinte">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="mt-3">
            {site.owner}, [Straße und Hausnummer], [PLZ] {site.city}
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-tinte">
            Verbraucherstreitbeilegung
          </h2>
          <p className="mt-3">
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </div>
    </Container>
  );
}
