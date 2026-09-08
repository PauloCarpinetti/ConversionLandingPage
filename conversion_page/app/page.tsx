import dynamic from "next/dynamic";
import { MessageCircle } from "lucide-react";
import { MotionSection } from "@/components/ui/motion-section";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { FaqItem, Testimonial } from "@/lib/types";

// Radix Accordion e Embla Carousel só são necessários abaixo da dobra; separar
// em chunks próprios evita que seu JS concorra com o bundle crítico da Hero
// no carregamento inicial (Constituição, Princípio I — Performance).
const Accordion = dynamic(() =>
  import("@/components/ui/accordion").then((m) => m.Accordion),
);
const Carousel = dynamic(() =>
  import("@/components/ui/carousel").then((m) => m.Carousel),
);

// Dados de exemplo apenas para validar a fundação (US1/US2/US3/US4) — o
// conteúdo real das seções chega nas próximas features (docs/escopo-eap.md).
const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Vocês aceitam convênio?",
    answer:
      "Sim, trabalhamos com os principais convênios odontológicos da região.",
  },
  {
    id: "faq-2",
    question: "Onde fica a clínica?",
    answer:
      "Estamos localizados no centro da cidade, com fácil acesso e estacionamento.",
  },
  {
    id: "faq-3",
    question: "Como agendar uma consulta?",
    answer:
      "Basta clicar no botão do WhatsApp e falar diretamente com nossa recepção.",
  },
];

const testimonials: Testimonial[] = [
  {
    id: "t-1",
    author: "Maria S.",
    text: "Atendimento excelente, equipe muito atenciosa!",
    rating: 5,
  },
  {
    id: "t-2",
    author: "João P.",
    text: "Fiz clareamento e o resultado ficou ótimo.",
    rating: 5,
  },
  {
    id: "t-3",
    author: "Ana L.",
    text: "Ambiente limpo e moderno, recomendo.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-16 pb-16">
      {/*
        Placeholder da Hero Section, já animado ao carregar (FR-004). O
        conteúdo real chega em features futuras.
      */}
      <MotionSection
        animateOnLoad
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center"
      >
        <h1 className="text-3xl font-semibold tracking-tight">
          Landing Page da Clínica Odontológica
        </h1>
        <p className="max-w-md text-zinc-600 dark:text-zinc-400">
          Fundação técnica em construção — conteúdo desta seção chega nas
          próximas features.
        </p>
      </MotionSection>

      <MotionSection className="mx-auto flex w-full max-w-2xl items-center gap-2 px-6 text-zinc-600 dark:text-zinc-400">
        <Icon icon={MessageCircle} className={cn("text-zinc-400", "text-emerald-600")} />
        <span>Ícones e utilitário de classes (cn) prontos — US1</span>
      </MotionSection>

      <MotionSection className="mx-auto w-full max-w-2xl px-6">
        <h2 className="mb-4 text-xl font-semibold">Perguntas frequentes</h2>
        <Accordion items={faqItems} />
      </MotionSection>

      <MotionSection className="mx-auto w-full max-w-4xl px-6">
        <h2 className="mb-4 text-xl font-semibold">
          O que dizem nossos pacientes
        </h2>
        <Carousel>
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="h-full rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="mt-2 text-sm font-medium">{t.author}</p>
            </div>
          ))}
        </Carousel>
      </MotionSection>
    </main>
  );
}
