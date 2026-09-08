# Phase 1 Data Model: Fundação Técnica do Projeto

Este projeto não possui banco de dados (constituição, seção "Stack Tecnológico e Restrições": MUST
NOT introduzir backend/CMS/banco de dados). As entidades abaixo são tipadas em TypeScript e vivem
como conteúdo estático/mock no próprio código-fonte, servindo de contrato de forma para as features
de UI que consumirão esta fundação.

## Item de FAQ (`FaqItem`)

Representa uma pergunta e resposta exibida no accordion.

| Campo      | Tipo               | Descrição                                                        |
|------------|--------------------|-------------------------------------------------------------------|
| `id`       | `string`           | Identificador estável do item (usado pelo Radix Accordion).       |
| `question` | `string`           | Texto da pergunta.                                                 |
| `answer`   | `string`           | Texto da resposta.                                                 |

**Estado (não persistido)**: `open: boolean` — controlado pelo próprio Radix Accordion em tempo de
execução (não faz parte do dado, apenas do estado de UI).

## Depoimento (`Testimonial`)

Representa uma avaliação de paciente exibida no carrossel.

| Campo      | Tipo     | Descrição                                              |
|------------|----------|----------------------------------------------------------|
| `id`       | `string` | Identificador estável do item (chave de iteração `.map()`). |
| `author`   | `string` | Nome do paciente (ou identificação anonimizada).          |
| `text`     | `string` | Texto do depoimento.                                       |
| `rating`   | `number` | Nota opcional (1–5), se aplicável.                        |

**Ordem**: a posição no array define a ordem de exibição no carrossel (`embla-carousel-react`
consome a lista sequencialmente).

## Evento de Conversão (`ConversionEvent`)

Representa o disparo de analytics ao clicar no CTA do WhatsApp. Não é uma entidade persistida pela
aplicação — é o payload enviado ao Google Analytics via `@next/third-parties`.

| Campo    | Tipo     | Descrição                                                                 |
|----------|----------|-----------------------------------------------------------------------------|
| `name`   | `string` | Nome fixo do evento: `"whatsapp_click"`.                                    |
| `source` | `string` | Seção/origem do clique na página (ex.: `"hero"`, `"floating_cta"`, `"faq"`). |

Ver [`contracts/external-integrations.md`](contracts/external-integrations.md) para o formato
exato do evento e do link do WhatsApp.

## Relacionamentos

Não há relacionamento entre `FaqItem`, `Testimonial` e `ConversionEvent` — são listas/eventos
independentes, cada um consumido por um componente distinto (Accordion, Carousel, CTA flutuante).
