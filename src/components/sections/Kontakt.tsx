"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site-config";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * Kontakt (Kern + Module 2/15) — der Abschluss der Seite.
 * Direktwege (E-Mail, Telefon, WhatsApp, Cal.com) erscheinen automatisch,
 * sobald sie in site-config gepflegt sind. Das Formular sendet an
 * /api/kontakt; die DSGVO-Einwilligung ist Pflicht und verlinkt
 * die Datenschutzerklärung.
 */

const feld =
  "w-full rounded-lg border border-tinte/15 bg-porzellan px-4 py-3 text-[0.95rem] " +
  "placeholder:text-graphit/60 transition-colors duration-200 focus:border-tinte/40 focus:outline-none";

export default function Kontakt() {
  const [status, setStatus] = useState<"bereit" | "sendet" | "ok" | "fehler">("bereit");
  const [fehlerText, setFehlerText] = useState("");

  async function absenden(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formular = e.currentTarget;
    const f = new FormData(formular);
    setStatus("sendet");
    setFehlerText("");
    try {
      const antwort = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          art: "kontakt",
          name: f.get("name"),
          institut: f.get("institut"),
          email: f.get("email"),
          nachricht: f.get("nachricht"),
          einwilligung: f.get("einwilligung") === "on",
          firma: f.get("firma"),
        }),
      });
      if (antwort.ok) {
        setStatus("ok");
        formular.reset();
      } else {
        const daten = (await antwort.json().catch(() => null)) as { fehler?: string } | null;
        setFehlerText(daten?.fehler ?? "Das hat nicht geklappt. Bitte später erneut versuchen.");
        setStatus("fehler");
      }
    } catch {
      setFehlerText("Keine Verbindung. Bitte später erneut versuchen.");
      setStatus("fehler");
    }
  }

  const direktwege = [
    site.email && { label: "E-Mail", wert: site.email, href: `mailto:${site.email}` },
    site.phone && { label: "Telefon", wert: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    site.whatsapp && {
      label: "WhatsApp",
      wert: "Direkt schreiben",
      href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`,
    },
  ].filter(Boolean) as { label: string; wert: string; href: string }[];

  return (
    <section id="kontakt" className="hairline-t py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Kontakt</p>
            <h2 className="display-tight mt-4 text-[clamp(1.9rem,4vw,3.2rem)]">
              Zeigen statt erzählen.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-graphit">
              Schreiben Sie zwei Sätze dazu, wie Ihr Institut heute verwaltet —
              Sie bekommen eine ehrliche Demo, keine Verkaufsshow. Antwort kommt
              persönlich, vom Entwickler selbst.
            </p>

            {site.calUrl && (
              <a
                href={site.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-lg border border-tinte/15 px-5 py-3 font-medium transition-colors hover:border-tinte/40"
              >
                Demo-Termin direkt buchen <span aria-hidden>↗</span>
              </a>
            )}

            {direktwege.length > 0 && (
              <dl className="mt-10 space-y-4">
                {direktwege.map((w) => (
                  <div key={w.label} className="hairline-t pt-4">
                    <dt className="eyebrow text-[0.72rem]">{w.label}</dt>
                    <dd className="mt-1">
                      <a href={w.href} className="font-medium transition-colors hover:text-kupfer-tief">
                        {w.wert}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-tinte/10 p-6 md:p-9">
              {status === "ok" ? (
                <div className="py-10 text-center" role="status">
                  <p className="display-tight text-3xl">Angekommen.</p>
                  <p className="mx-auto mt-4 max-w-sm text-graphit">
                    Danke für Ihre Anfrage — Sie hören in Kürze persönlich von
                    mir, in der Regel innerhalb eines Werktags.
                  </p>
                </div>
              ) : (
                <form onSubmit={absenden} noValidate={false}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="k-name" className="mb-2 block text-sm font-medium">
                        Ihr Name *
                      </label>
                      <input id="k-name" name="name" required autoComplete="name" className={feld} />
                    </div>
                    <div>
                      <label htmlFor="k-institut" className="mb-2 block text-sm font-medium">
                        Institut <span className="font-normal text-graphit">(optional)</span>
                      </label>
                      <input id="k-institut" name="institut" autoComplete="organization" className={feld} />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="k-email" className="mb-2 block text-sm font-medium">
                      E-Mail *
                    </label>
                    <input id="k-email" name="email" type="email" required autoComplete="email" className={feld} />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="k-nachricht" className="mb-2 block text-sm font-medium">
                      Wie verwalten Sie heute?{" "}
                      <span className="font-normal text-graphit">(optional)</span>
                    </label>
                    <textarea
                      id="k-nachricht"
                      name="nachricht"
                      rows={4}
                      placeholder="z. B.: 2 Standorte, ca. 120 Schüler, Abrechnung läuft über Excel …"
                      className={feld}
                    />
                  </div>

                  {/* Honigtopf — für Menschen unsichtbar */}
                  <div className="hidden" aria-hidden="true">
                    <label>
                      Firma
                      <input name="firma" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <div className="mt-6 flex items-start gap-3">
                    <input
                      id="k-einwilligung"
                      name="einwilligung"
                      type="checkbox"
                      required
                      className="mt-1 size-4 shrink-0 accent-kupfer"
                    />
                    <label htmlFor="k-einwilligung" className="text-sm leading-relaxed text-graphit">
                      Ich bin einverstanden, dass meine Angaben zur Bearbeitung
                      dieser Anfrage verarbeitet werden. Details in der{" "}
                      <Link href="/datenschutz" className="underline underline-offset-2 hover:text-tinte">
                        Datenschutzerklärung
                      </Link>
                      . *
                    </label>
                  </div>

                  {status === "fehler" && (
                    <p role="alert" className="mt-5 rounded-lg border border-kupfer/40 bg-kupfer/10 px-4 py-3 text-sm text-kupfer-tief">
                      {fehlerText}
                    </p>
                  )}

                  <button
                    data-magnet
                    type="submit"
                    disabled={status === "sendet"}
                    className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-kupfer px-6 py-4 font-medium leading-none text-porzellan transition-colors duration-200 hover:bg-kupfer-tief disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                  >
                    {status === "sendet" ? "Wird gesendet …" : "Demo anfragen"}
                  </button>

                  <p className="mt-4 text-xs leading-relaxed text-graphit">
                    Ihre Angaben gehen ausschließlich an mich und werden nur
                    für diese Anfrage verwendet — kein Newsletter, keine
                    Weitergabe.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
