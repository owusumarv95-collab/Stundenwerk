"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * Zeitspar-Rechner (Modul 9) — der interaktive Moment in der Seitenmitte.
 *
 * Die Annahmen sind bewusst konservativ und stehen sichtbar unter dem
 * Ergebnis — diese Zielgruppe riecht aufgeblasene Marketing-Zahlen sofort:
 *   · 20 Min Abrechnungsaufwand pro Lehrkraft und Monat
 *   ·  3 Min Verwaltung/Suchen pro Schüler und Monat
 *   ·  2 Std Monatsabschluss als Sockel
 */

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function Regler({
  id,
  label,
  wert,
  einheit,
  min,
  max,
  step = 1,
  aufAenderung,
}: {
  id: string;
  label: string;
  wert: number;
  einheit: string;
  min: number;
  max: number;
  step?: number;
  aufAenderung: (w: number) => void;
}) {
  return (
    <div className="hairline-t pt-5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.95rem] font-medium">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-sm font-semibold tabular-nums">
          {wert.toLocaleString("de-DE")} {einheit}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={wert}
        onChange={(e) => aufAenderung(Number(e.target.value))}
        className="mt-3 w-full"
      />
    </div>
  );
}

export default function Rechner() {
  const [schueler, setSchueler] = useState(80);
  const [lehrkraefte, setLehrkraefte] = useState(10);
  const [satz, setSatz] = useState(35);

  const minuten = lehrkraefte * 20 + schueler * 3 + 120;
  const stunden = Math.round(minuten / 60);
  const proMonat = stunden * satz;
  const proJahr = proMonat * 12;

  return (
    <section id="rechner" className="hairline-t py-section">
      <Container>
        <Reveal>
          <p className="eyebrow">Zeitspar-Rechner</p>
          <h2 className="display-tight mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3.2rem)]">
            Was kostet Sie die Zettelwirtschaft?
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal delay={60}>
            <div className="space-y-5">
              <Regler
                id="r-schueler"
                label="Schülerinnen und Schüler"
                wert={schueler}
                einheit=""
                min={10}
                max={500}
                step={5}
                aufAenderung={setSchueler}
              />
              <Regler
                id="r-lehrkraefte"
                label="Lehrkräfte"
                wert={lehrkraefte}
                einheit=""
                min={2}
                max={60}
                aufAenderung={setLehrkraefte}
              />
              <Regler
                id="r-satz"
                label="Wert einer Leitungs-Stunde"
                wert={satz}
                einheit="€"
                min={20}
                max={80}
                step={5}
                aufAenderung={setSatz}
              />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-2xl bg-nebel p-7 md:p-9">
              <p className="eyebrow">Verwaltungszeit, die nicht sein müsste</p>
              <p className="display-tight mt-3 text-[clamp(2.6rem,6vw,4.5rem)] tabular-nums">
                ≈ {stunden} Std.
                <span className="ml-2 align-baseline font-sans text-base font-normal tracking-normal text-graphit">
                  pro Monat
                </span>
              </p>

              <dl className="hairline-t mt-7 grid grid-cols-2 gap-4 pt-5">
                <div>
                  <dt className="text-sm text-graphit">entspricht pro Monat</dt>
                  <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">
                    ≈ {euro.format(proMonat)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-graphit">aufs Jahr gerechnet</dt>
                  <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">
                    ≈ {euro.format(proJahr)}
                  </dd>
                </div>
              </dl>

              <p className="hairline-t mt-6 pt-5 text-sm leading-relaxed text-graphit">
                Zum Vergleich: {`Stundenwerk`} kostet ab 149 € im Monat.
                Konservativ gerechnet — Annahmen: 20 Min Abrechnung pro
                Lehrkraft, 3 Min Verwaltung pro Schüler, 2 Std Monatsabschluss.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
