"use client";

import type { ReactNode } from "react";
import { LazyMotion } from "framer-motion";

// Carrega o subconjunto de features de animação (fade/slide/height) sob
// demanda, em vez do pacote `motion` completo — reduz o JS crítico inicial
// (Constituição, Princípio I — Performance). `m.div` (usado em
// motion-section.tsx e accordion.tsx) só funciona dentro deste provider.
const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domAnimation);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
