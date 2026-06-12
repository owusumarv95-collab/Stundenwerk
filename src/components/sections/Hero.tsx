import { site } from "@/lib/site-config";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HeroVisual from "@/components/sections/HeroVisual";

/**
 * Hero — Stufe 2a: statisches Grundgerüst.
 * Die Signatur-Animation (Chromtropfen, R3F) kommt in Stufe 2b und legt
 * sich als eigene Ebene hinter/neben die Headline — das Layout hier ist
 * dafür bereits ausgelegt (rechter Freiraum ab lg).
 */
export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      {/* Signatur-Ebene: der reaktive Chromtropfen (WebGL, z-0) */}
      <HeroVisual />

      <Container wide className="relative z-10 pb-14 pt-36 md:pb-20">
        <p className="eyebrow hero-rise [animation-delay:60ms]">Verwaltungssoftware für Nachhilfe-Institute</p>

        <h1 className="display-tight hero-rise mt-5 [animation-delay:140ms] max-w-[11ch] text-[clamp(2.9rem,9vw,8.5rem)]">
          Weniger verwalten. <span className="text-graphit">Mehr unterrichten.</span>
        </h1>

        <div className="hero-rise mt-10 flex flex-col gap-10 [animation-delay:260ms] md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-graphit">
            {site.name} bündelt Schüler, Lehrkräfte, Stunden und Abrechnung an
            einem Ort — in einer eigenen, abgeschotteten Instanz nur für Ihr
            Institut. Kein Excel-Flickwerk, keine Zettel.
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button href="/#kontakt">Demo vereinbaren</Button>
            <Button href="/#produkt" variant="ghost">
              Produkt ansehen
            </Button>
          </div>
        </div>

        <div className="hairline-t hero-rise mt-14 pt-5 [animation-delay:400ms]">
          <p className="eyebrow">
            Eigene Instanz pro Institut · Daten in der EU · läuft live im Einsatz
          </p>
        </div>
      </Container>
    </section>
  );
}
