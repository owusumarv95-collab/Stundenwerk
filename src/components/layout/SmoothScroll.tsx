"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Sanftes Momentum-Scrolling (Lenis) + weiche Anker-Sprünge.
 * Bei prefers-reduced-motion wird Lenis gar nicht erst gestartet —
 * dann greift natives Scrollen (scroll-behavior: auto).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1 });
    let rafId = 0;
    const schleife = (zeit: number) => {
      lenis.raf(zeit);
      rafId = requestAnimationFrame(schleife);
    };
    rafId = requestAnimationFrame(schleife);

    // Anker-Links auf derselben Seite weich anfahren (Nav, CTAs, Footer)
    const aufKlick = (e: MouseEvent) => {
      const ziel = e.target as HTMLElement | null;
      const a = ziel?.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      e.preventDefault();
      lenis.scrollTo(url.hash, { offset: -76 });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", aufKlick);

    return () => {
      document.removeEventListener("click", aufKlick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
