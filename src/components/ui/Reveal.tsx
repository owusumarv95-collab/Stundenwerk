"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

/**
 * Scroll-Reveal: Elemente bauen sich beim Hereinscrollen auf
 * (Position + Deckkraft, gestaffelt über `delay`). Läuft über
 * IntersectionObserver — kein Scroll-Listener, ein Mal pro Element.
 * Bei prefers-reduced-motion zeigt CSS alles sofort (globals.css).
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [an, setAn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([eintrag]) => {
        if (eintrag.isIntersecting) {
          setAn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx("reveal", an && "reveal-an", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
