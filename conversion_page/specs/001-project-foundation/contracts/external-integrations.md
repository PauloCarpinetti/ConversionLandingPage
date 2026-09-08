# Contracts: Integrações Externas

Esta fundação não expõe uma API própria; ela consome duas interfaces de sistemas externos. Ambas
são o "contrato" que os componentes de UI desta e das próximas features MUST respeitar.

## 1. Link de WhatsApp (CTA)

**Formato**: `https://wa.me/<numero-e164>?text=<mensagem-url-encoded>`

- `<numero-e164>`: telefone da clínica em formato internacional, sem símbolos (ex.: `5511999999999`).
- `<mensagem-url-encoded>`: mensagem pré-formatada, codificada como componente de URL. Exemplo de
  texto-base (definido em `docs/plano-qualidade.md`):
  `"Olá, vim pelo site da clínica e gostaria de agendar..."`

**Requisito**: o clique MUST abrir o app do WhatsApp no celular ou o WhatsApp Web no desktop
(comportamento nativo do link `wa.me`, sem necessidade de detecção de dispositivo customizada).

## 2. Evento de Analytics (`whatsapp_click`)

Disparado via `@next/third-parties/google` (`sendGAEvent`) no clique do CTA do WhatsApp.

**Payload**:

```json
{
  "event": "whatsapp_click",
  "source": "hero | floating_cta | faq | services | testimonials"
}
```

- `event`: nome fixo do evento, usado para filtrar conversões no Google Analytics.
- `source`: identifica em qual seção da página o clique ocorreu, permitindo comparar a taxa de
  conversão por seção (dado usado futuramente para otimizar o layout).

**Requisito**: toda instância do CTA do WhatsApp (flutuante ou embutido em uma seção) MUST disparar
este evento com o `source` correspondente antes ou junto da navegação para o link do WhatsApp
(FR-009 da especificação).

## 3. Page view (analytics)

O componente `GoogleAnalytics` de `@next/third-parties/google` é responsável por registrar
automaticamente uma visualização de página a cada carregamento/navegação — não requer disparo
manual (FR-008).
