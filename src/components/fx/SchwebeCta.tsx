"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";

/**
 * Mitscrollender CTA (mobil) — auf dem Desktop sitzt der CTA dauerhaft
 * in der klebrigen Navigation; mobil liegt er hinter dem Menü. Dieser
 * dezente Knopf erscheint nach dem Hero und verschwindet, sobald die
 * Kontakt-Sektion ohnehin im Bild ist.
 */
export default function SchwebeCta() {
  const [zeigen, setZeigen] = useState(false);
  const tief = useRef(false);
  const kontaktSichtbar = useRef(false);

  useEffect(() => {
    const ticking = { wert: false };
    const pruefen = () => {
      setZeigen(tief.current && !kontaktSichtbar.current);
    };
    const aufScroll = () => {
      if (ticking.wert) return;
      ticking.wert = true;
      requestAnimationFrame(() => {
        tief.current = window.scrollY > window.innerHeight * 0.9;
        pruefen();
        ticking.wert = false;
      });
    };
    window.addEventListener("scroll", aufScroll, { passive: true });
    aufScroll();

    const kontakt = document.getElementById("kontakt");
    let io: IntersectionObserver | undefined;
    if (kontakt) {
      io = new IntersectionObserver(([eintrag]) => {
        kontaktSichtbar.current = eintrag.isIntersecting;
        pruefen();
      });
      io.observe(kontakt);
    }
    return () => {
      window.removeEventListener("scroll", aufScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <Link
      href="/#kontakt"
      data-magnet
      aria-hidden={!zeigen}
      tabIndex={zeigen ? 0 : -1}
      className={clsx(
        "fixed bottom-5 right-5 z-40 rounded-full bg-tinte px-5 py-3.5 text-sm font-medium leading-none text-porzellan shadow-[0_12px_32px_-8px_rgba(22,24,29,0.4)] transition-[opacity,transform] duration-500 ease-expo md:hidden",
        zeigen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      Demo vereinbaren
    </Link>
  );
}
