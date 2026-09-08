import { MotionSection } from "@/components/ui/motion-section";
import { Icon } from "@/components/ui/icon";
import { differentials } from "@/lib/content/differentials";

/**
 * Diferenciais da clínica (FR-003, FR-007): mesmo padrão de grid mobile-first
 * e animação ao rolar (FR-009) de services.tsx.
 */
export function Differentials() {
  return (
    <MotionSection>
      <section
        aria-labelledby="differentials-heading"
        className="mx-auto w-full max-w-5xl bg-zinc-50 px-6 py-16 dark:bg-zinc-900"
      >
        <h2 id="differentials-heading" className="text-center text-2xl font-semibold sm:text-3xl">
          Por que escolher nossa clínica
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item) => (
            <article
              key={item.id}
              className="flex flex-col items-start gap-3 rounded-lg bg-white p-6 dark:bg-black"
            >
              <Icon icon={item.icon} size={28} className="text-sky-600" />
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </MotionSection>
  );
}
