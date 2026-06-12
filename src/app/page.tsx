import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Produkt from "@/components/sections/Produkt";
import Funktionen from "@/components/sections/Funktionen";
import Rechner from "@/components/sections/Rechner";
import Ablauf from "@/components/sections/Ablauf";
import Referenz from "@/components/sections/Referenz";
import Vertrauen from "@/components/sections/Vertrauen";
import Preise from "@/components/sections/Preise";
import Faq from "@/components/sections/Faq";
import Kontakt from "@/components/sections/Kontakt";
import Checkliste from "@/components/sections/Checkliste";
import SchwebeCta from "@/components/fx/SchwebeCta";

/**
 * One-Pager — Dramaturgie: Problem → Lösung → Beweis → Vertrauen → Handlung.
 */

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Produkt />
      <Funktionen />
      <Rechner />
      <Ablauf />
      <Referenz />
      <Vertrauen />
      <Preise />
      <Checkliste />
      <Faq />
      <Kontakt />
      <SchwebeCta />
    </>
  );
}
