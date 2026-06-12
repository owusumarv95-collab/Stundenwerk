import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Kontakt- und Lead-Endpunkt.
 *
 * Versand über die Resend-REST-API (EU-Datenverarbeitung möglich) — bewusst
 * ohne SDK, eine Abhängigkeit weniger. Konfiguration über Umgebungsvariablen:
 *   RESEND_API_KEY  – API-Schlüssel von resend.com
 *   KONTAKT_AN      – Empfängeradresse (Naowu)
 *   KONTAKT_FROM    – verifizierter Absender, z. B. "Stundenwerk <post@domain.de>"
 *
 * Verhalten ohne Konfiguration (lokal / vor dem Launch):
 *   – Kontaktanfragen geben einen ehrlichen Fehler zurück (503).
 *   – Checklisten-Anfragen liefern das Dokument trotzdem aus, damit die
 *     Besucher-Erfahrung beim Testen nicht von E-Mail-Zustellung abhängt.
 *
 * Datensparsamkeit: keine Speicherung, kein Logging von Inhalten —
 * die Anfrage wird ausschließlich als E-Mail weitergereicht.
 */

type Eingang = {
  art?: string;
  name?: string;
  email?: string;
  institut?: string;
  nachricht?: string;
  einwilligung?: boolean;
  /** Honigtopf — Menschen sehen dieses Feld nie */
  firma?: string;
};

const emailMuster = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const kuerzen = (wert: unknown, max: number) =>
  typeof wert === "string" ? wert.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let daten: Eingang;
  try {
    daten = (await req.json()) as Eingang;
  } catch {
    return NextResponse.json({ fehler: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honigtopf gefüllt → Bot. Freundlich „ok" sagen und nichts tun.
  if (kuerzen(daten.firma, 10)) return NextResponse.json({ ok: true });

  const art = daten.art === "checkliste" ? "checkliste" : "kontakt";
  const email = kuerzen(daten.email, 200);
  const name = kuerzen(daten.name, 200);
  const institut = kuerzen(daten.institut, 200);
  const nachricht = kuerzen(daten.nachricht, 5000);

  if (!emailMuster.test(email)) {
    return NextResponse.json(
      { fehler: "Bitte eine gültige E-Mail-Adresse angeben." },
      { status: 400 }
    );
  }
  if (daten.einwilligung !== true) {
    return NextResponse.json(
      { fehler: "Ohne Einwilligung dürfen wir die Anfrage nicht verarbeiten." },
      { status: 400 }
    );
  }
  if (art === "kontakt" && !name) {
    return NextResponse.json(
      { fehler: "Bitte einen Namen angeben." },
      { status: 400 }
    );
  }

  const schluessel = process.env.RESEND_API_KEY;
  const an = process.env.KONTAKT_AN;
  const von = process.env.KONTAKT_FROM ?? "Stundenwerk <onboarding@resend.dev>";

  const betreff =
    art === "kontakt"
      ? `Demo-Anfrage: ${name}${institut ? ` (${institut})` : ""}`
      : `Checklisten-Download: ${email}`;

  const text = [
    `Art: ${art === "kontakt" ? "Kontakt / Demo-Anfrage" : "Checkliste (Lead-Magnet)"}`,
    `Name: ${name || "—"}`,
    `Institut: ${institut || "—"}`,
    `E-Mail: ${email}`,
    "",
    nachricht || "(keine Nachricht)",
    "",
    "— gesendet über die Stundenwerk-Website",
  ].join("\n");

  if (schluessel && an) {
    const antwort = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${schluessel}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: von,
        to: [an],
        reply_to: email,
        subject: betreff,
        text,
      }),
    });
    if (!antwort.ok && art === "kontakt") {
      return NextResponse.json(
        { fehler: "Der Versand ist gerade gestört. Bitte versuchen Sie es später erneut." },
        { status: 502 }
      );
    }
  } else if (art === "kontakt") {
    return NextResponse.json(
      { fehler: "Der Versand ist noch nicht eingerichtet. Bitte versuchen Sie es später erneut." },
      { status: 503 }
    );
  }

  return NextResponse.json(
    art === "checkliste"
      ? { ok: true, download: "/checkliste-stundenwerk.pdf" }
      : { ok: true }
  );
}
