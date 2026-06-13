/**
 * Zentrale Konfiguration — alle Inhalte werden NUR hier eingetragen
 * und ziehen sich durch die ganze Seite.
 */
export const site = {
  name: "Stundenwerk",
  claim: "Weniger verwalten. Mehr unterrichten.",
  description:
    "Stundenwerk bündelt Schüler, Lehrkräfte, Stunden und Abrechnung für Nachhilfe-Institute — in einer eigenen, abgeschotteten Instanz mit Daten in der EU.",

  // TODO (Naowu): Kontaktdaten eintragen — Stufe 5 verdrahtet sie.
  email: null as string | null,
  phone: null as string | null,
  whatsapp: null as string | null,

  // Neutrale Demo-Instanz (Roh-Demo ohne Instituts-Bezug).
  // Bewusst KEIN Link zur Bendias-Produktiv-App.
  demoUrl: null as string | null,

  // TODO (Naowu): Cal.com-Buchungslink (Modul 2), z. B. "https://cal.com/naowu/demo"
  calUrl: null as string | null,

  // Lead-Magnet (Modul 8): liegt in /public — siehe README zum Neu-Erzeugen
  checklisteDatei: "/checkliste-stundenwerk.pdf",

  nav: [
    { label: "Produkt", href: "#produkt" },
    { label: "Funktionen", href: "#funktionen" },
    { label: "Preise", href: "#preise" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontakt", href: "#kontakt" },
  ],
} as const;
