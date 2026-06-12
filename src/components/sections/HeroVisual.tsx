"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

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

    // rootMargin großzügiger: 300px — Tropfen startet früher, kein
    // sichtbares "Pop-in" beim ersten Scroll.
    const io = new IntersectionObserver(
      ([eintrag]) => setSichtbar(eintrag.isIntersecting),
      { rootMargin: "300px" }
    );
    if (huelle.current) io.observe(huelle.current);

    return () => {
      mq.removeEventListener("change", aufMq);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={huelle} aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {/* Dunst-Schein hinter dem Tropfen — größer und satter als vorher */}
      <div className="absolute right-[-8%] top-[2%] size-[42rem] max-w-[95vw] rounded-full bg-[radial-gradient(closest-side,var(--color-dunst),transparent_68%)] opacity-85 md:top-[8%]" />
      {/* Zweiter subtiler Schein unten links — Tiefe, Porzellan-Reflexion */}
      <div className="absolute bottom-[10%] left-[-5%] size-[24rem] max-w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--color-dunst),transparent_75%)] opacity-30" />
      <ChromFeld aktiv={sichtbar} reduziert={reduziert} />
    </div>
  );
}