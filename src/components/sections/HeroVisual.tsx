"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// WebGL nur im Browser laden — und nur, wenn der Hero im Sichtbereich ist.
const ChromFeld = dynamic(() => import("@/components/three/ChromFeld"), {
  ssr: false,
});

export default function HeroVisual() {
  const huelle = useRef<HTMLDivElement>(null);
  const [sichtbar, setSichtbar] = useState(true);
  const [reduziert, setReduziert] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const aufMq = () => setReduziert(mq.matches);
    aufMq();
    mq.addEventListener("change", aufMq);

    const io = new IntersectionObserver(
      ([eintrag]) => setSichtbar(eintrag.isIntersecting),
      { rootMargin: "160px" }
    );
    if (huelle.current) io.observe(huelle.current);

    return () => {
      mq.removeEventListener("change", aufMq);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={huelle} aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {/* Weicher Tiefen-Schein hinter dem Tropfen — Nebel auf Porzellan */}
      <div className="absolute right-[-12%] top-[4%] size-[34rem] max-w-[90vw] rounded-full bg-[radial-gradient(closest-side,var(--color-dunst),transparent_72%)] opacity-70 md:top-[10%]" />
      <ChromFeld aktiv={sichtbar} reduziert={reduziert} />
    </div>
  );
}
