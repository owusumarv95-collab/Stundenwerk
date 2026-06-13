import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false },
};

/**
 * ENTWURF — auf die tatsächlich eingebauten Module abgestimmt:
 * Hosting (Vercel), Kontaktformular + Checkliste (Versand über Resend),
 * keine Cookies, kein Tracking, Schriften lokal.
 * [Platzhalter] füllen und vor Veröffentlichung prüfen (lassen).
 * Falls später Plausible oder Cal.com dazukommen: eigene Abschnitte ergänzen.
 */
const abschnitte = [
  {
    titel: "1. Verantwortlicher",
    text: [
      `Verantwortlich für die Datenverarbeitung auf dieser Website ist [Name], [Straße und Hausnummer], [PLZ] [Stadt], E-Mail: [E-Mail-Adresse].`,
    ],
  },
  {
    titel: "2. Grundsätze",
    text: [
      "Diese Website ist bewusst datensparsam gebaut: Sie setzt keine Cookies, verwendet keine Analyse- oder Tracking-Dienste und lädt keine Schriften oder Skripte von Drittanbieter-Servern — alle Schriften werden lokal von dieser Website ausgeliefert.",
      "Personenbezogene Daten werden nur verarbeitet, wenn Sie sie uns aktiv mitteilen (Kontaktformular oder Checklisten-Anforderung) oder soweit dies technisch für die Bereitstellung der Website erforderlich ist.",
    ],
  },
  {
    titel: "3. Hosting",
    text: [
      "Diese Website wird bei Vercel Inc., 650 California St, San Francisco, CA 94108, USA gehostet. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten (insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Browser-Informationen) in Server-Protokollen, um die Website auszuliefern und ihre Sicherheit und Stabilität zu gewährleisten.",
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und zuverlässigen Betrieb). Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung; soweit Daten in die USA übermittelt werden, erfolgt dies auf Grundlage der EU-Standardvertragsklauseln bzw. einer Angemessenheitsentscheidung. [Vor Launch prüfen: aktueller Stand des Vercel-DPA und ggf. EU-Region konfigurieren.]",
    ],
  },
  {
    titel: "4. Kontaktformular",
    text: [
      "Wenn Sie das Kontaktformular nutzen, verarbeiten wir die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, optional Institut und Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO.",
      "Für die Zustellung der Anfrage per E-Mail nutzen wir den Versanddienst Resend (Resend, Inc.). Mit dem Dienst besteht ein Vertrag zur Auftragsverarbeitung. [Vor Launch prüfen: EU-Region im Resend-Konto aktivieren.]",
      "Ihre Angaben werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
    ],
  },
  {
    titel: "5. Checkliste (Download gegen E-Mail-Adresse)",
    text: [
      "Wenn Sie die Checkliste anfordern, verarbeiten wir Ihre E-Mail-Adresse zur Bereitstellung des Dokuments und für eine einmalige persönliche Nachfrage. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO.",
      "Sie können diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, etwa formlos per E-Mail. Es findet kein Newsletter-Versand und keine Weitergabe an Dritte statt.",
    ],
  },
  {
    titel: "6. Ihre Rechte",
    text: [
      "Sie haben gegenüber uns das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO).",
      "Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren — zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW).",
    ],
  },
  {
    titel: "7. Stand",
    text: [
      "Stand dieser Erklärung: [Monat Jahr]. Wir passen sie an, wenn sich die Website oder die Rechtslage ändert.",
    ],
  },
];

export default function Datenschutz() {
  return (
    <Container className="max-w-3xl pb-section pt-36">
      <p className="eyebrow">Rechtliches</p>
      <h1 className="display-tight mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
        Datenschutzerklärung
      </h1>

      <p className="mt-6 rounded-lg border border-kupfer/40 bg-kupfer/10 px-4 py-3 font-mono text-xs text-kupfer-tief">
        Entwurf — Platzhalter in eckigen Klammern füllen und vor
        Veröffentlichung prüfen (lassen).
      </p>

      <div className="mt-10 space-y-10">
        {abschnitte.map((a) => (
          <section key={a.titel}>
            <h2 className="font-display text-xl font-semibold text-tinte">{a.titel}</h2>
            {a.text.map((t) => (
              <p key={t.slice(0, 40)} className="mt-3 leading-relaxed text-graphit">
                {t}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Container>
  );
}
