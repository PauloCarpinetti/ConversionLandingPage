"use client";

import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type MotionSectionProps = Omit<ComponentProps<typeof motion.div>, "children"> & {
  /** Anima já na primeira renderização (ex.: Hero) em vez de esperar rolar até a viewport. */
  animateOnLoad?: boolean;
  children?: ReactNode;
};

// Definidos fora do componente: objetos recriados a cada render fariam o
// `animate`/`whileInView` do framer-motion enxergar um "novo" alvo a cada
// re-render e reiniciar a transição continuamente, travando a animação no
// meio do caminho em vez de concluí-la.
const HIDDEN = { opacity: 0, y: 24 };
const VISIBLE = { opacity: 1, y: 0 };
const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;
const TRANSITION = { duration: 0.3, ease: "easeOut" } as const;

/**
 * Wrapper de framer-motion para a entrada suave de seções (FR-003): fade + slide
 * ao rolar até a viewport (padrão) ou já ao carregar (`animateOnLoad`, usado pela
 * Hero — FR-004). Respeita `prefers-reduced-motion` via useReducedMotion() (FR-010).
 * Se o script de animação falhar ao carregar, o React ainda renderiza o conteúdo
 * dos filhos normalmente — a falha não bloqueia o conteúdo (FR-011).
 */
export function MotionSection({
  animateOnLoad = false,
  children,
  ...props
}: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={HIDDEN}
      {...(animateOnLoad
        ? { animate: VISIBLE }
        : { whileInView: VISIBLE, viewport: VIEWPORT_ONCE })}
      transition={TRANSITION}
      {...props}
    >
      {children}
    </motion.div>
  );
}
