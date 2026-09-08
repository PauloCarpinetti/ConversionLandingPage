import { sendGAEvent } from "@next/third-parties/google";

export type ConversionEvent = {
  name: "whatsapp_click";
  source: string;
};

/**
 * Registra o clique no CTA do WhatsApp como evento de conversão no Google Analytics.
 * Se o script do GA estiver bloqueado/indisponível (ex.: ad-blocker), sendGAEvent
 * é um no-op seguro e não deve impedir a navegação para o WhatsApp (FR-011).
 */
export function trackWhatsAppClick(source: ConversionEvent["source"]) {
  try {
    sendGAEvent("event", "whatsapp_click", { source });
  } catch {
    // Analytics indisponível não pode bloquear a conversão (FR-011).
  }
}
