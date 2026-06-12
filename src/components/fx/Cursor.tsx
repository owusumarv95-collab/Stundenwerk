"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Eigener Cursor (Desktop) — Punkt + Ring in Differenz-Mischung,
 * dadurch auf Porzellan UND auf dem dunklen Checklisten-Band sichtbar.
 *
 * - Über interaktiven Elementen wächst der Ring, der Punkt schrumpft.
 * - Elemente mit [data-magnet] ziehen den Ring an und bewegen sich selbst
 *   ein paar Pixel zum Zeiger — Bewegung mit Gewicht, gedämpft, mit
 *   federnder Rückkehr.
 * - Nur bei feinem Zeiger (Maus/Trackpad); bei Touch oder
 *   prefers-reduced-motion bleibt alles beim System-Cursor.
 */
export default function Cursor() {
  const punktRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [an, setAn] = useState(false);

  useEffect(() => {
    const fein = matchMedia("(pointer: fine)").matches;
    const ruhig = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fein || ruhig) return;

    setAn(true);
    document.documentElement.classList.add("hat-cursor");

    let zx = innerWidth / 2;
    let zy = innerHeight / 2;
    let rx = zx;
    let ry = zy;
    let skala = 1;
    let zielSkala = 1;
    let sichtbar = false;
    let gedrueckt = false;
    let magnet: HTMLElement | null = null;
    let magnetMitte = { x: 0, y: 0 };
    let raf = 0;

    const interaktiv =
      'a, button, input, textarea, select, summary, label, [role="button"]';

    const magnetLoesen = () => {
      if (!magnet) return;
      magnet.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      magnet.style.transform = "";
      magnet = null;
    };

    const aufMove = (e: PointerEvent) => {
      zx = e.clientX;
      zy = e.clientY;
      sichtbar = true;

      const ziel = (e.target as HTMLElement | null)?.closest?.(interaktiv);
      zielSkala = ziel ? 1.9 : 1;

      const neuerMagnet =
        ((e.target as HTMLElement | null)?.closest?.("[data-magnet]") as
          | HTMLElement
          | null) ?? null;

      if (neuerMagnet !== magnet) {
        magnetLoesen();
        magnet = neuerMagnet;
        if (magnet) {
          const r = magnet.getBoundingClientRect();
          magnetMitte = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          magnet.style.transition = "transform 0.12s ease-out";
        }
      }

      if (magnet) {
        // Das Element kommt dem Zeiger ein Stück entgegen …
        const dx = Math.max(-8, Math.min(8, (zx - magnetMitte.x) * 0.22));
        const dy = Math.max(-8, Math.min(8, (zy - magnetMitte.y) * 0.22));
        magnet.style.transform = `translate(${dx}px, ${dy}px)`;
        // … und zieht den Ring zu sich heran.
        zx = zx * 0.65 + magnetMitte.x * 0.35;
        zy = zy * 0.65 + magnetMitte.y * 0.35;
      }
    };

    const aufRaus = () => {
      sichtbar = false;
      magnetLoesen();
    };
    const aufRunter = () => (gedrueckt = true);
    const aufHoch = () => (gedrueckt = false);

    const schleife = () => {
      rx += (zx - rx) * 0.18;
      ry += (zy - ry) * 0.18;
      skala += ((gedrueckt ? zielSkala * 0.8 : zielSkala) - skala) * 0.2;

      const punkt = punktRef.current;
      const ring = ringRef.current;
      if (punkt && ring) {
        const deck = sichtbar ? "1" : "0";
        punkt.style.opacity = deck;
        ring.style.opacity = deck;
        punkt.style.transform = `translate3d(${zx}px, ${zy}px, 0) translate(-50%, -50%) scale(${
          zielSkala > 1 ? 0.5 : 1
        })`;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${skala})`;
      }
      raf = requestAnimationFrame(schleife);
    };
    raf = requestAnimationFrame(schleife);

    window.addEventListener("pointermove", aufMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", aufRaus);
    window.addEventListener("pointerdown", aufRunter, { passive: true });
    window.addEventListener("pointerup", aufHoch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", aufMove);
      document.documentElement.removeEventListener("pointerleave", aufRaus);
      window.removeEventListener("pointerdown", aufRunter);
      window.removeEventListener("pointerup", aufHoch);
      document.documentElement.classList.remove("hat-cursor");
      magnetLoesen();
    };
  }, []);

  if (!an) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <div
        ref={punktRef}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-porzellan opacity-0 mix-blend-difference"
        style={{ transition: "opacity 0.3s" }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 size-8 rounded-full border border-porzellan/70 opacity-0 mix-blend-difference"
        style={{ transition: "opacity 0.3s" }}
      />
    </div>
  );
}
