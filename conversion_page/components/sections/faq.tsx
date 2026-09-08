import { MotionSection } from "@/components/ui/motion-section";
import { Accordion } from "@/components/ui/accordion";
import { faqItems } from "@/lib/content/faq";

/**
 * Perguntas frequentes (FR-005, FR-007): cobre, no mínimo, convênio,
 * localização e agendamento. Reaproveita o Accordion acessível já validado
 * em 001-project-foundation; anima ao rolar (FR-009).
 */
export function Faq() {
  return (
    <MotionSection>
      <section aria-labelledby="faq-heading" className="mx-auto w-full max-w-2xl px-6 py-16">
        <h2 id="faq-heading" className="text-center text-2xl font-semibold sm:text-3xl">
          Perguntas Frequentes
        </h2>
        <div className="mt-10">
          <Accordion items={faqItems} />
        </div>
      </section>
    </MotionSection>
  );
}
