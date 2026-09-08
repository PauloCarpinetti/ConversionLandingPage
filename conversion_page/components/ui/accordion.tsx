"use client";

import { useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/types";

type AccordionProps = {
  items: FaqItem[];
  className?: string;
};

/**
 * FAQ acessível (FR-005): usa @radix-ui/react-accordion para semântica ARIA e
 * navegação por teclado nativas, com animação de altura via framer-motion
 * (FR-006), respeitando `prefers-reduced-motion` (FR-010: transição vira
 * instantânea em vez de removida, já que aqui a animação também comunica
 * estado, não é só decorativa).
 *
 * `forceMount` mantém o conteúdo sempre no DOM (o Radix não aplica o atributo
 * nativo `hidden` nesse modo), deixando a visibilidade inteiramente a cargo
 * da altura/opacidade animadas abaixo — confirmado via inspeção do DOM
 * durante a validação manual desta task.
 */
export function Accordion({ items, className }: AccordionProps) {
  // Radix trata um <Root> controlado de tipo "single" como incontrolado
  // enquanto `value` for `undefined`; usar "" desde o primeiro render evita o
  // aviso "changing from uncontrolled to controlled" no console.
  const [openValue, setOpenValue] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      value={openValue}
      onValueChange={setOpenValue}
      className={cn(
        "w-full divide-y divide-zinc-200 dark:divide-zinc-800",
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = openValue === item.id;
        return (
          <AccordionPrimitive.Item key={item.id} value={item.id}>
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium">
                {item.question}
                <Icon
                  icon={ChevronDown}
                  className={cn(
                    "transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content forceMount asChild>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: "easeOut" }
                }
                className="overflow-hidden"
              >
                <p className="pb-4 text-zinc-600 dark:text-zinc-400">
                  {item.answer}
                </p>
              </motion.div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        );
      })}
    </AccordionPrimitive.Root>
  );
}
