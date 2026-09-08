"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type CarouselProps = {
  children: ReactNode[];
  className?: string;
};

/**
 * Carrossel arrastável (FR-007): embla-carousel-react cobre o gesto de
 * arrastar nativamente em mobile; os botões anterior/próximo cobrem a
 * navegação em telas desktop largas, onde arrastar não é a interação padrão
 * (edge case de spec.md).
 */
export function Carousel({ children, className }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Sincroniza o estado local com o estado atual da instância imperativa do
    // Embla no momento em que ela fica pronta, então assina mudanças futuras.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única do estado inicial de uma lib externa imperativa, não um loop de render
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {children.map((child, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 hidden justify-end gap-2 sm:flex">
        <button
          type="button"
          aria-label="Depoimento anterior"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 disabled:opacity-30 dark:border-zinc-700"
        >
          <Icon icon={ChevronLeft} size={18} />
        </button>
        <button
          type="button"
          aria-label="Próximo depoimento"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 disabled:opacity-30 dark:border-zinc-700"
        >
          <Icon icon={ChevronRight} size={18} />
        </button>
      </div>
    </div>
  );
}
