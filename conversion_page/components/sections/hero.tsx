import { MotionSection } from "@/components/ui/motion-section";

/**
 * Proposta de valor da clínica (FR-001, FR-007): primeira coisa que o
 * visitante vê, compreensível sem rolar em 320px. Anima ao carregar
 * (FR-004, já implementado em 001-project-foundation). Sem foto real da
 * clínica ainda — fundo em gradiente em vez de imagem (research.md #3).
 */
export function Hero() {
  return (
    <MotionSection animateOnLoad>
      <header className="flex min-h-[85vh] flex-col items-center justify-center gap-4 bg-gradient-to-b from-sky-50 to-white px-6 text-center dark:from-sky-950 dark:to-black">
        <h1 className="max-w-md text-3xl font-semibold tracking-tight sm:max-w-xl sm:text-5xl">
          Cuide do seu sorriso com quem entende de você
        </h1>
        <p className="max-w-sm text-zinc-600 sm:max-w-lg sm:text-lg dark:text-zinc-400">
          Atendimento humanizado e equipamentos modernos para toda a família.
          Agende sua consulta pelo WhatsApp em poucos cliques.
        </p>
      </header>
    </MotionSection>
  );
}
