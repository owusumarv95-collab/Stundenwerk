"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Signatur-Animation: reaktiver Chromtropfen (R3F).
 *
 * Verbesserungen v2:
 * - Scroll-Tracking: Tropfen folgt dem Finger beim Scrollen (mobil)
 *   statt linear wegzudriften — bleibt im sichtbaren Hero-Bereich verankert.
 * - DPR bis 2.0 auf Retina/High-DPI (war 1.75) — mehr Pixel, schärfer.
 * - Stärkere Lichtkontraste: Decken-Fill heller, Kupfer-Glint intensiver,
 *   kältere Seiten — mehr Chrom-Charakter, mehr Tiefe im Spiegelbild.
 * - Höhere Icosahedron-Auflösung: Detail 6 statt 5 (Desktop), 5 statt 4 (Mobil).
 * - Scroll-Verankerung: heroHeight wird gemessen, Tropfen bleibt
 *   proportional im Hero-Bereich verankert statt absolut zu sinken.
 * - Gyro-Empfindlichkeit erhöht: natürlicheres Kippen auf dem Handy.
 */

type Zeiger = { x: number; y: number; v: number; scrollY: number };

function Tropfen({
  zeiger,
  reduziert,
}: {
  zeiger: React.RefObject<Zeiger>;
  reduziert: boolean;
}) {
  const gruppe = useRef<THREE.Group>(null!);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const material = useRef<any>(null!);
  const grob =
    typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches;

  useFrame((state, delta) => {
    const g = gruppe.current;
    if (!g) return;
    const d = Math.min(delta, 0.05);
    const { viewport } = state;
    const schmal = viewport.aspect < 0.95;
    const z = zeiger.current;

    // Scroll-Anteil relativ zur Hero-Höhe — Tropfen sinkt sanft,
    // aber bleibt länger im Bild (divisor 1.4 statt 1.0).
    const heroH = typeof window !== "undefined"
      ? (document.getElementById("hero")?.offsetHeight ?? window.innerHeight)
      : window.innerHeight;
    const scrollAnteil = Math.min(1, z.scrollY / (heroH * 0.9));

    // Ruheposition: proportional verschoben, auf Mobil dem Scroll folgen.
    const zielX = (schmal ? viewport.width * 0.10 : viewport.width * 0.26) + z.x * 0.5;
    const zielY =
      (schmal ? viewport.height * 0.28 : viewport.height * 0.06) +
      z.y * 0.38 -
      scrollAnteil * (schmal ? 1.6 : 1.0);
    g.position.x = THREE.MathUtils.damp(g.position.x, zielX, 3.5, d);
    g.position.y = THREE.MathUtils.damp(g.position.y, zielY, 3.5, d);

    // Skala: auf Mobil minimal größer, Scroll-Shrink sanfter.
    const zielSkala = (schmal ? 1.15 : 1.55) * (1 - scrollAnteil * 0.14);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, zielSkala, 2.4, d));

    // Neigung: etwas reaktiver als vorher.
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -z.y * 0.55, 3.5, d);
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      z.x * 0.65 + state.clock.elapsedTime * 0.065,
      3.5,
      d
    );

    if (material.current && !reduziert) {
      const ziel = 0.28 + Math.min(z.v, 1) * 0.3;
      material.current.distort = THREE.MathUtils.damp(material.current.distort, ziel, 4.5, d);
      material.current.speed = 1.6 + Math.min(z.v, 1) * 2.6;
      z.v = Math.max(0, z.v - d * 1.8);
    }
  });

  return (
    <group ref={gruppe} scale={0}>
      <mesh>
        {/* Höhere Auflösung: 6 (Desktop) / 5 (Touch) statt vorher 5/4 */}
        <icosahedronGeometry args={[1, grob ? 5 : 6]} />
        <MeshDistortMaterial
          ref={material}
          color="#ccd4e0"
          metalness={1}
          roughness={0.045}
          envMapIntensity={1.6}
          distort={0.28}
          speed={reduziert ? 0 : 1.6}
        />
      </mesh>
    </group>
  );
}

export default function ChromFeld({
  aktiv,
  reduziert,
}: {
  aktiv: boolean;
  reduziert: boolean;
}) {
  const zeiger = useRef<Zeiger>({ x: 0, y: 0, v: 0, scrollY: 0 });

  useEffect(() => {
    if (reduziert) return;
    let lx = 0;
    let ly = 0;
    let init = false;

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      const z = zeiger.current;
      if (init) z.v = Math.min(2, z.v + (Math.abs(x - lx) + Math.abs(y - ly)) * 7);
      lx = x;
      ly = y;
      init = true;
      z.x = x;
      z.y = y;
    };

    // Scroll-Position live mitschreiben — RAF damit kein Jank entsteht.
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        zeiger.current.scrollY = window.scrollY;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Gyro: empfindlicher (/ 22 statt / 28), realistische Tilt-Mitte
    const aufNeigung = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const z = zeiger.current;
      z.x = Math.max(-1, Math.min(1, e.gamma / 22));
      z.y = Math.max(-1, Math.min(1, -(e.beta - 42) / 22));
    };
    let neigungAktiv = false;
    const neigungStarten = () => {
      window.addEventListener("deviceorientation", aufNeigung, { passive: true });
      neigungAktiv = true;
    };
    type MitErlaubnis = { requestPermission?: () => Promise<string> };
    const doe = typeof DeviceOrientationEvent !== "undefined"
      ? (DeviceOrientationEvent as unknown as MitErlaubnis)
      : null;
    const erstBeruehrung = () => {
      doe?.requestPermission?.()
        .then((s) => s === "granted" && neigungStarten())
        .catch(() => {});
    };
    const beruehrbar = matchMedia("(pointer: coarse)").matches;
    if (beruehrbar) {
      if (doe?.requestPermission) {
        window.addEventListener("touchend", erstBeruehrung, { once: true, passive: true });
      } else {
        neigungStarten();
      }
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchend", erstBeruehrung);
      if (neigungAktiv) window.removeEventListener("deviceorientation", aufNeigung);
    };
  }, [reduziert]);

  return (
    <Canvas
      frameloop={reduziert ? "demand" : aktiv ? "always" : "never"}
      // DPR bis 2.0 auf Retina — war 1.75, macht auf modernen Handys
      // einen sichtbaren Unterschied in der Chrom-Schärfe.
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <Tropfen zeiger={zeiger} reduziert={reduziert} />

      {/* Studio-Licht v2: härtere Kontraste, mehr Tiefe im Spiegelbild.
          Decke heller, Kupfer-Glint intensiver, kältere rechte Seite. */}
      <Environment resolution={512} frames={1}>
        <color attach="background" args={["#b2bac4"]} />

        {/* Decken-Fill: hart, groß — Haupt-Highlight oben */}
        <Lightformer
          form="rect"
          intensity={4.5}
          position={[0, 5, 0]}
          rotation-x={Math.PI / 2}
          scale={[12, 12, 1]}
          color="#ffffff"
        />
        {/* Linke warme Seite */}
        <Lightformer
          form="rect"
          intensity={1.8}
          position={[-6, 1, 2]}
          rotation-y={Math.PI / 2}
          scale={[7, 4, 1]}
          color="#dde6f0"
        />
        {/* Rechte kühle Seite — Kontrastpartner */}
        <Lightformer
          form="rect"
          intensity={0.7}
          position={[6, -1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[7, 4, 1]}
          color="#8896aa"
        />
        {/* Kupfer-Glint von unten — Markenfarbe als warmer Reflex */}
        <Lightformer
          form="circle"
          intensity={1.2}
          position={[2, -4, 2.5]}
          scale={3}
          color="#c56b3f"
        />
        {/* Kleiner Gegenlicht-Punkt oben rechts — Tiefe */}
        <Lightformer
          form="circle"
          intensity={0.9}
          position={[4, 3, -1]}
          scale={1.5}
          color="#e8eef5"
        />
      </Environment>
    </Canvas>
  );
}