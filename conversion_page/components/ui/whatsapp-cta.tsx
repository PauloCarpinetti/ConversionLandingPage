"use client";

import { MessageCircle } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { trackWhatsAppClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const DEFAULT_MESSAGE =
  "Olá, vim pelo site da clínica e gostaria de agendar...";

type WhatsAppCtaProps = {
  /** Seção/origem do clique, usada no evento de conversão (contracts/external-integrations.md #2). */
  source: string;
  className?: string;
};

/**
 * CTA flutuante do WhatsApp (constituição, Princípio V): fica fixo em qualquer
 * ponto da página e dispara um evento de conversão rastreável ao ser clicado
 * (FR-009). Sem NEXT_PUBLIC_WHATSAPP_NUMBER configurado, não renderiza nada em
 * vez de gerar um link quebrado.
 */
export function WhatsAppCta({ source, className }: WhatsAppCtaProps) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!phone) return null;

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir conversa no WhatsApp"
      onClick={() => trackWhatsAppClick(source)}
      className={cn(
        "fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105",
        className,
      )}
    >
      <Icon icon={MessageCircle} size={28} className="text-white" />
    </a>
  );
}
