import { MotionSection } from "@/components/ui/motion-section";
import { Icon } from "@/components/ui/icon";
import { services } from "@/lib/content/services";

/**
 * Serviços oferecidos pela clínica (FR-002, FR-007): grid mobile-first
 * (1 coluna → sm:2 → lg:3, research.md #1), cada serviço em <article>.
 * Cresce sem mudar de estrutura (FR-010) e anima ao rolar (FR-009).
 */
export function Services() {
  return (
    <MotionSection>
      <section aria-labelledby="services-heading" className="mx-auto w-full max-w-5xl px-6 py-16">
        <h2 id="services-heading" className="text-center text-2xl font-semibold sm:text-3xl">
          Nossos Serviços
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col items-start gap-3 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <Icon icon={service.icon} size={28} className="text-sky-600" />
              <h3 className="text-lg font-medium">{service.name}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </MotionSection>
  );
}
