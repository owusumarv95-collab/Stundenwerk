"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { site } from "@/lib/site-config";
import Container from "@/components/ui/Container";

/**
 * Klebrige Navigation.
 * - Liegt anfangs transparent über dem Hero, wird beim Scrollen zu
 *   Porzellan-Glas (Blur + Hairline). Scroll-Listener läuft über rAF.
 * - Mobil: Vollflächen-Menü, ESC schließt, Body-Scroll wird gesperrt.
 * - Der CTA „Demo vereinbaren" ist damit auf jeder Scroll-Position sichtbar.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil-Menü: ESC schließt, Hintergrund scrollt nicht mit.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-30 transition-[background-color,border-color,box-shadow] duration-500 ease-expo",
        scrolled
          ? "border-b border-tinte/10 bg-porzellan/85 shadow-[0_1px_24px_rgba(22,24,29,0.04)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container wide className="flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        {/* Wortmarke */}
        <Link
          href="/#hero"
          className="group flex items-baseline gap-2"
          onClick={() => setOpen(false)}
          aria-label={`${site.name} — zum Seitenanfang`}
        >
          <span
            aria-hidden
            className="size-2 translate-y-[-1px] bg-kupfer transition-transform duration-300 ease-expo group-hover:rotate-90"
          />
          <span className="font-display text-lg font-semibold tracking-tight [font-stretch:108%]">
            {site.name}
          </span>
        </Link>

        {/* Desktop-Navigation */}
        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  className="text-[0.95rem] font-medium text-graphit transition-colors duration-200 hover:text-tinte"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Link
            href="/#kontakt"
            data-magnet
            className="inline-flex items-center rounded-lg bg-tinte px-5 py-2.5 text-sm font-medium leading-none text-porzellan transition-colors duration-200 hover:bg-kupfer"
          >
            Demo vereinbaren
          </Link>
        </div>

        {/* Mobil: Menü-Knopf */}
        <button
          type="button"
          className="relative z-50 -mr-2 flex size-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobilmenu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
          <span aria-hidden className="relative block h-3.5 w-6">
            <span
              className={clsx(
                "absolute left-0 top-0 h-px w-full bg-tinte transition-transform duration-300 ease-expo",
                open && "top-1/2 -translate-y-1/2 rotate-45"
              )}
            />
            <span
              className={clsx(
                "absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-tinte transition-opacity duration-200",
                open && "opacity-0"
              )}
            />
            <span
              className={clsx(
                "absolute bottom-0 left-0 h-px w-full bg-tinte transition-transform duration-300 ease-expo",
                open && "bottom-1/2 translate-y-1/2 -rotate-45"
              )}
            />
          </span>
        </button>
      </Container>

      {/* Mobil-Menü (Vollfläche) */}
      <div
        id="mobilmenu"
        className={clsx(
          "fixed inset-0 z-40 flex flex-col bg-porzellan transition-[opacity,visibility] duration-300 ease-expo md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
        aria-hidden={!open}
      >
        <Container className="flex grow flex-col justify-center">
          <nav aria-label="Mobile Navigation">
            <ul className="space-y-1">
              {site.nav.map((item, i) => (
                <li
                  key={item.href}
                  className={clsx(
                    "transition-[opacity,transform] duration-500 ease-expo",
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  )}
                  style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                >
                  <Link
                    href={`/${item.href}`}
                    onClick={() => setOpen(false)}
                    className="display-tight block py-2 text-4xl text-tinte"
                    tabIndex={open ? 0 : -1}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div
            className={clsx(
              "mt-10 transition-[opacity,transform] delay-300 duration-500 ease-expo",
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            <Link
              href="/#kontakt"
              onClick={() => setOpen(false)}
              className="inline-flex rounded-lg bg-kupfer px-6 py-3.5 font-medium leading-none text-porzellan"
              tabIndex={open ? 0 : -1}
            >
              Demo vereinbaren
            </Link>
          </div>
        </Container>
        <Container className="pb-8">
          <p className="eyebrow">
            Eigene Instanz · Daten in der EU · DSGVO-konform
          </p>
        </Container>
      </div>
    </header>
  );
}
