"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type Zeiger = { x: number; y: number; v: number };

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

    const scrollAnteil = Math.min(1, window.scrollY / window.innerHeight);

    const zielX = (schmal ? viewport.width * 0.14 : viewport.width * 0.24) + z.x * 0.45;
    const zielY =
      (schmal ? viewport.height * 0.21 : viewport.height * 0.05) +
      z.y * 0.35 -
      scrollAnteil * 1.1;
    g.position.x = THREE.MathUtils.damp(g.position.x, zielX, 3, d);
    g.position.y = THREE.MathUtils.damp(g.position.y, zielY, 3, d);

    const zielSkala = (schmal ? 1.05 : 1.5) * (1 - scrollAnteil * 0.18);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, zielSkala, 2.4, d));

    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -z.y * 0.5, 3, d);
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      z.x * 0.6 + state.clock.elapsedTime * 0.06,
      3,
      d
    );

    if (material.current && !reduziert) {
      const ziel = 0.3 + Math.min(z.v, 1) * 0.26;
      material.current.distort = THREE.MathUtils.damp(material.current.distort, ziel, 4, d);
      material.current.speed = 1.5 + Math.min(z.v, 1) * 2.2;
      z.v = Math.max(0, z.v - d * 1.6);
    }
  });

  return (
    <group ref={gruppe} scale={0}>
      <mesh>
        <icosahedronGeometry args={[1, grob ? 4 : 5]} />
        <MeshDistortMaterial
          ref={material}
          color="#d6dde6"
          metalness={1}
          roughness={0.07}
          envMapIntensity={1.25}
          distort={0.3}
          speed={reduziert ? 0 : 1.5}
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
  const zeiger = useRef<Zeiger>({ x: 0, y: 0, v: 0 });

  useEffect(() => {
    if (reduziert) return;
    let lx = 0;
    let ly = 0;
    let init = false;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      const z = zeiger.current;
      if (init) z.v = Math.min(2, z.v + (Math.abs(x - lx) + Math.abs(y - ly)) * 6);
      lx = x;
      ly = y;
      init = true;
      z.x = x;
      z.y = y;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const aufNeigung = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const z = zeiger.current;
      z.x = Math.max(-1, Math.min(1, e.gamma / 28));
      z.y = Math.max(-1, Math.min(1, -(e.beta - 42) / 28));
    };
    let neigungAktiv = false;
    const neigungStarten = () => {
      window.addEventListener("deviceorientation", aufNeigung, { passive: true });
      neigungAktiv = true;
    };
    type MitErlaubnis = { requestPermission?: () => Promise<string> };
    const doe = (typeof DeviceOrientationEvent !== "undefined"
      ? (DeviceOrientationEvent as unknown as MitErlaubnis)
      : null);
    const erstBeruehrung = () => {
      doe?.requestPermission?.()
        .then((status) => status === "granted" && neigungStarten())
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
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchend", erstBeruehrung);
      if (neigungAktiv) window.removeEventListener("deviceorientation", aufNeigung);
    };
  }, [reduziert]);

  return (
    <Canvas
      frameloop={reduziert ? "demand" : aktiv ? "always" : "never"}
      dpr={[1, 1.75]}
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

      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#b9bfc8"]} />
        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 4, 0]}
          rotation-x={Math.PI / 2}
          scale={[9, 9, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[-5, 0, 1]}
          rotation-y={Math.PI / 2}
          scale={[6, 3, 1]}
          color="#e3eaf4"
        />
        <Lightformer
          form="rect"
          intensity={1}
          position={[5, -1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[6, 3, 1]}
          color="#9aa6b8"
        />
        <Lightformer
          form="circle"
          intensity={0.7}
          position={[2.5, -3, 2]}
          scale={2.2}
          color="#c56b3f"
        />
      </Environment>
    </Canvas>
  );
}