"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site-config";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * Checkliste (Modul 8) — das Werkzeug, das Kaltakquise ersetzt.
 * Die einzige invertierte (Tinte-)Fläche der Seite: bewusster Akzent
 * für den wichtigsten Conversion-Baustein vor dem Kontakt.
 *
 * Mechanik: E-Mail + Einwilligung → Lead geht per /api/kontakt an Naowu,
 * das PDF wird sofort als Download freigegeben (keine Abhängigkeit von
 * Mail-Zustellung auf Besucherseite).
 */

const vorschauPunkte = [
  "Alle Schülerdaten liegen zentral an einem Ort",
  "Die Abrechnung entsteht aus den erfassten Stunden",
  "Bei einem Geräteausfall geht nichts verloren",
];

export default function Checkliste() {
  const [status, setStatus] = useState<"bereit" | "sendet" | "ok" | "fehler">("bereit");
  const [fehlerText, setFehlerText] = useState("");
  const [download, setDownload] = useState<string>(site.checklisteDatei);

  async function absenden(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sendet");
    setFehlerText("");
    try {
      const antwort = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          art: "checkliste",
          email: f.get("email"),
          einwilligung: f.get("einwilligung") === "on",
          firma: f.get("firma"),
        }),
      });
      const daten = (await antwort.json().catch(() => null)) as
        | { ok?: boolean; download?: string; fehler?: string }
        | null;
      if (antwort.ok && daten?.ok) {
        if (daten.download) setDownload(daten.download);
        setStatus("ok");
      } else {
        setFehlerText(daten?.fehler ?? "Das hat nicht geklappt. Bitte später erneut versuchen.");
        setStatus("fehler");
      }
    } catch {
      setFehlerText("Keine Verbindung. Bitte später erneut versuchen.");
      setStatus("fehler");
    }
  }

  return (
    <section id="checkliste" className="bg-tinte py-section text-porzellan">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <Reveal>
            <p className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em] text-chrom">
              Checkliste · kostenlos
            </p>
            <h2 className="display-tight mt-4 text-[clamp(1.9rem,4vw,3.2rem)] text-porzellan">
              Der ehrliche Selbsttest für Ihr Institut.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-porzellan/75">
              Zehn Bereiche, 36 Punkte zum Durchhaken — von der
              Schülerverwaltung bis zur Datensicherung. Am Ende wissen Sie
              genau, wo Ihr Institut Zeit verliert und wo sich Digitalisieren
              wirklich lohnt. Das PDF gibt es sofort; ich melde mich höchstens
              einmal persönlich — keine Mail-Serie, kein Newsletter.
            </p>

            {status === "ok" ? (
              <div className="mt-9" role="status">
                <a
                  href={download}
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-kupfer px-6 py-4 font-medium leading-none text-porzellan transition-colors duration-200 hover:bg-kupfer-tief"
                >
                  Checkliste herunterladen (PDF) <span aria-hidden>↓</span>
                </a>
                <p className="mt-4 text-sm text-porzellan/60">
                  Viel Erfolg beim Durchhaken — bei vielen leeren Kästchen
                  wissen Sie ja jetzt, wo Sie mich finden.
                </p>
              </div>
            ) : (
              <form onSubmit={absenden} className="mt-9 max-w-xl">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="c-email" className="sr-only">
                    E-Mail-Adresse
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="ihre@email.de"
                    className="w-full rounded-lg border border-porzellan/20 bg-porzellan/5 px-4 py-3.5 text-[0.95rem] text-porzellan placeholder:text-porzellan/40 transition-colors duration-200 focus:border-porzellan/50 focus:outline-none"
                  />
                  <button
                    data-magnet
                    type="submit"
                    disabled={status === "sendet"}
                    className="shrink-0 rounded-lg bg-kupfer px-6 py-3.5 font-medium leading-none text-porzellan transition-colors duration-200 hover:bg-kupfer-tief disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === "sendet" ? "Einen Moment …" : "Checkliste erhalten"}
                  </button>
                </div>

                {/* Honigtopf — für Menschen unsichtbar */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Firma
                    <input name="firma" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <input
                    id="c-einwilligung"
                    name="einwilligung"
                    type="checkbox"
                    required
                    className="mt-1 size-4 shrink-0 accent-kupfer"
                  />
                  <label htmlFor="c-einwilligung" className="text-sm leading-relaxed text-porzellan/60">
                    Ich bin einverstanden, dass meine E-Mail-Adresse für die
                    Bereitstellung der Checkliste und eine einmalige
                    persönliche Nachfrage verarbeitet wird. Details in der{" "}
                    <Link
                      href="/datenschutz"
                      className="underline underline-offset-2 transition-colors hover:text-porzellan"
                    >
                      Datenschutzerklärung
                    </Link>
                    . *
                  </label>
                </div>

                {status === "fehler" && (
                  <p role="alert" className="mt-4 rounded-lg border border-kupfer/50 bg-kupfer/15 px-4 py-3 text-sm text-porzellan">
                    {fehlerText}
                  </p>
                )}
              </form>
            )}
          </Reveal>

          {/* Dokument-Vorschau */}
          <Reveal delay={120} className="hidden lg:block">
            <div aria-hidden className="mx-auto w-full max-w-xs rounded-xl bg-porzellan p-6 text-tinte shadow-[0_32px_80px_-28px_rgba(0,0,0,0.55)]">
              <p className="font-mono text-[10px] uppercase tracking-wider text-graphit">
                Stundenwerk
              </p>
              <p className="display-tight mt-2 text-xl">
                Checkliste: Nachhilfe-Institut digitalisieren
              </p>
              <div className="hairline-t mt-5 space-y-3 pt-5">
                {vorschauPunkte.map((p) => (
                  <div key={p} className="flex items-start gap-2.5">
                    <span className="mt-0.5 size-3 shrink-0 border border-tinte/30" />
                    <p className="text-xs leading-snug text-graphit">{p}</p>
                  </div>
                ))}
              </div>
              <p className="hairline-t mt-5 pt-4 font-mono text-[10px] text-graphit">
                10 Bereiche · 36 Punkte · PDF
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
