import { MotionSection } from "@/components/ui/motion-section";
import { Carousel } from "@/components/ui/carousel";
import { testimonials } from "@/lib/content/testimonials";

/**
 * Depoimentos de pacientes (FR-004, FR-007): reaproveita o Carousel
 * arrastável/com setas já validado em 001-project-foundation; anima ao
 * rolar (FR-009).
 */
export function Testimonials() {
  return (
    <MotionSection>
      <section aria-labelledby="testimonials-heading" className="mx-auto w-full max-w-4xl px-6 py-16">
        <h2 id="testimonials-heading" className="text-center text-2xl font-semibold sm:text-3xl">
          O que dizem nossos pacientes
        </h2>
        <div className="mt-10">
          <Carousel>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="h-full rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="mt-2 text-sm font-medium">{testimonial.author}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </MotionSection>
  );
}
