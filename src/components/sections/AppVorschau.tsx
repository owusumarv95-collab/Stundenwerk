/**
 * Schematische Produkt-Vorschau — bewusst KEIN echter Screenshot:
 * Auf der Seite läuft eine neutrale Roh-Demo ohne Instituts-Bezug.
 * Das Schema zeigt die Kernidee (Stunden → Abrechnung → CSV) und wird
 * sichtbar als Schema gekennzeichnet. Die Adresszeile transportiert
 * nebenbei das Instanz-Versprechen: ihr-institut.stundenwerk.app
 */

const zeilen = [
  { name: "A. Weber", std: "38", satz: "18,00 €", betrag: "684,00 €", status: "bestätigt" },
  { name: "M. Yilmaz", std: "41", satz: "17,50 €", betrag: "717,50 €", status: "bestätigt" },
  { name: "S. Brandt", std: "29", satz: "18,00 €", betrag: "522,00 €", status: "offen" },
  { name: "L. Okafor", std: "33", satz: "19,00 €", betrag: "627,00 €", status: "bestätigt" },
];

const seitenleiste = [
  "Übersicht",
  "Schüler",
  "Lehrkräfte",
  "Stunden",
  "Abrechnung",
  "Einstellungen",
];

export default function AppVorschau() {
  return (
    <figure>
      <div
        aria-hidden
        className="overflow-hidden rounded-2xl border border-tinte/10 bg-[#fcfcfa] shadow-[0_32px_90px_-36px_rgba(22,24,29,0.28)]"
      >
        {/* Fenster-Kopf mit Instanz-Adresse */}
        <div className="flex items-center gap-3 border-b border-tinte/10 px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-dunst" />
            <span className="size-2 rounded-full bg-dunst" />
            <span className="size-2 rounded-full bg-dunst" />
          </span>
          <span className="mx-auto rounded-md border border-tinte/10 bg-porzellan px-3 py-1 font-mono text-[11px] text-graphit">
            ihr-institut.stundenwerk.app
          </span>
          <span className="w-10" />
        </div>

        <div className="grid sm:grid-cols-[9.5rem_1fr]">
          {/* Seitenleiste */}
          <nav className="hidden border-r border-tinte/10 p-3 sm:block">
            <ul className="space-y-0.5 text-xs">
              {seitenleiste.map((eintrag) => (
                <li
                  key={eintrag}
                  className={
                    eintrag === "Abrechnung"
                      ? "rounded-md bg-nebel px-2.5 py-1.5 font-medium text-tinte"
                      : "px-2.5 py-1.5 text-graphit"
                  }
                >
                  {eintrag}
                </li>
              ))}
            </ul>
          </nav>

          {/* Hauptbereich: Abrechnung */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">Abrechnung · März 2026</p>
              <span className="rounded-md bg-tinte px-2.5 py-1.5 text-[11px] font-medium leading-none text-porzellan">
                CSV exportieren
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ["Stunden gesamt", "141"],
                ["Lehrkräfte", "4"],
                ["Summe", "2.550,50 €"],
              ].map(([label, wert]) => (
                <div key={label} className="rounded-lg border border-tinte/10 px-3 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-graphit">
                    {label}
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-semibold">{wert}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-tinte/10">
              <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 border-b border-tinte/10 bg-porzellan px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-graphit sm:grid-cols-[1fr_auto_auto_auto_auto]">
                <span>Lehrkraft</span>
                <span className="text-right">Std.</span>
                <span className="hidden text-right sm:block">Satz</span>
                <span className="text-right">Betrag</span>
                <span className="text-right">Status</span>
              </div>
              {zeilen.map((z) => (
                <div
                  key={z.name}
                  className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 border-b border-tinte/10 px-3 py-2.5 text-xs last:border-b-0 sm:grid-cols-[1fr_auto_auto_auto_auto]"
                >
                  <span className="font-medium">{z.name}</span>
                  <span className="text-right font-mono">{z.std}</span>
                  <span className="hidden text-right font-mono text-graphit sm:block">
                    {z.satz}
                  </span>
                  <span className="text-right font-mono">{z.betrag}</span>
                  <span className="text-right">
                    <span
                      className={
                        z.status === "bestätigt"
                          ? "rounded-full border border-kupfer/35 bg-kupfer/10 px-2 py-0.5 text-[10px] font-medium text-kupfer-tief"
                          : "rounded-full border border-tinte/15 px-2 py-0.5 text-[10px] text-graphit"
                      }
                    >
                      {z.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 font-mono text-xs text-graphit">
        Schematische Vorschau mit Beispieldaten — die echte Oberfläche zeigen
        wir Ihnen in der Demo.
      </figcaption>
    </figure>
  );
}
