"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChromFeld = dynamic(() => import("@/components/three/ChromFeld"), {
  ssr: false,
});

/**
 * FloatingVisual — globale, immer sichtbare Chrome-Blase.
 *
 * position: fixed → bleibt im Viewport, egal wie weit gescrollt wird.
 * z-index: 2       → über dem Body-Hintergrund, aber unter <main> (z-10)
 *                    und weit unter dem Header (z-30).
 * pointer-events: none → kein Klick-Blocking.
 *
 * Der Scroll-Drift läuft über ChromFeld intern (zeiger.scrollY):
 * die Blase wandert langsam von oben-rechts nach mittig-rechts,
 * verteilt über ~3 Viewport-Höhen.
 */
export default function FloatingVisual() {
  const [reduziert, setReduziert] = useState(false);
  const [aktiv, setAktiv] = useState(true);

  useEffect(() => {
    // Reduced-Motion-Präferenz
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const aktualisieren = () => setReduziert(mq.matches);
    aktualisieren();
    mq.addEventListener("change", aktualisieren);

    // Rendering pausieren wenn Tab unsichtbar
    const onVis = () => setAktiv(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      mq.removeEventListener("change", aktualisieren);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      {/* Umgebungs-Dunst oben rechts — immer im Viewport */}
      <div
        style={{
          position: "absolute",
          right: "-8%",
          top: "2%",
          width: "min(42rem, 95vw)",
          height: "min(42rem, 95vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, var(--color-dunst), transparent 68%)",
          opacity: 0.75,
        }}
      />
      {/* Subtiler zweiter Dunst unten links — Tiefe */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: "min(24rem, 60vw)",
          height: "min(24rem, 60vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, var(--color-dunst), transparent 75%)",
          opacity: 0.22,
        }}
      />
      <ChromFeld aktiv={aktiv} reduziert={reduziert} />
    </div>
  );
}
