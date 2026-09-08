# Implementation Plan: Seções de Conteúdo Mobile-First da Landing Page

**Branch**: `002-mobile-first-sections` | **Date**: 2026-09-08 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/002-mobile-first-sections/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Construir as cinco seções de conteúdo da landing page (Hero, Serviços, Diferenciais, Depoimentos,
FAQ) em `app/page.tsx`, substituindo o conteúdo de demonstração deixado por `001-project-foundation`.
Nenhuma dependência nova é instalada — a feature compõe os primitivos já existentes
(`components/ui/icon.tsx`, `motion-section.tsx`, `accordion.tsx`, `carousel.tsx`,
`whatsapp-cta.tsx`) com conteúdo tipado novo (`Service`, `Differential`) e conteúdo placeholder
realista armazenado em `lib/content/`, seguindo um layout mobile-first (grid de 1 coluna em 320px,
evoluindo para múltiplas colunas em telas maiores).

## Technical Context

**Language/Version**: TypeScript 5.x sobre Next.js App Router (mesma stack de `001-project-foundation`)

**Primary Dependencies**: Nenhuma nova — reaproveita integralmente `lucide-react`, `framer-motion`
(via `components/ui/motion-section.tsx`/`motion-provider.tsx`), `@radix-ui/react-accordion` (via
`components/ui/accordion.tsx`) e `embla-carousel-react` (via `components/ui/carousel.tsx`)
instalados em `001-project-foundation`

**Storage**: N/A — conteúdo estático tipado em `lib/content/`, sem banco de dados

**Testing**: Nenhum framework de teste automatizado (mesma decisão de `001-project-foundation`,
research.md #3); validação via Lighthouse, checklist manual e `quickstart.md`

**Target Platform**: Web responsivo, 320px–1920px, mobile-first

**Project Type**: Web app único (mesmo projeto Next.js de `001-project-foundation`)

**Performance Goals**: Não piorar a pontuação de Performance no Lighthouse já registrada em
`001-project-foundation` (65–75/100 neste ambiente local, ver `specs/001-project-foundation/tasks.md`
T023/T027); idealmente contribuir para aproximá-la da meta constitucional de >90

**Constraints**: Nenhuma seção MUST cortar texto, sobrepor elementos ou exigir rolagem horizontal
em nenhuma largura entre 320px e 1920px (FR-006); todo conteúdo ainda não definido pelo cliente
MUST aparecer como placeholder realista, não vazio (FR-008)

**Scale/Scope**: 5 seções de conteúdo em uma única página; ~5 serviços, ~3-4 diferenciais, ~3
depoimentos, ~5-6 itens de FAQ (conteúdo placeholder inicial)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio / Seção da Constituição | Avaliação |
|---|---|
| I. Mobile-First e Performance | PASS com ressalva — layouts explicitamente mobile-first (grid-cols-1 → sm/lg, research.md #1); Performance da fundação já está abaixo da meta (T027 em aberto) e mais conteúdo tende a pressionar ainda mais o orçamento — MUST medir novamente após esta feature (quickstart.md, Auditoria de qualidade). |
| II. HTML Semântico e Acessibilidade | PASS — `<header>`/`<section>`/`<article>` por seção (research.md #2, FR-007); reaproveita o Accordion e o Carousel já acessíveis da fundação. |
| III. SEO Técnico | PASS — hierarquia de headings (H1 na Hero, H2 por seção) reforça a Metadata API já configurada em `001-project-foundation`; nenhuma tag adicional de SEO é necessária nesta feature. |
| IV. Simplicidade e Escopo Controlado | PASS — nenhuma dependência nova; conteúdo placeholder claramente escopado para troca futura (research.md #4), sem CMS/admin (fora de escopo, conforme a constituição). |
| V. Conversão como Métrica de Sucesso | PASS — a sequência das seções (Hero → Serviços → Diferenciais → Depoimentos → FAQ) conduz ao CTA do WhatsApp já existente e rastreado, sem alterá-lo. |
| Stack Tecnológico e Restrições | PASS — mesma stack, nenhuma imagem externa adicionada (research.md #3), sem backend/CMS. |
| Fluxo de Desenvolvimento e Qualidade | PASS — Lighthouse e checklist de `docs/plano-qualidade.md` continuam sendo os portões de validação (quickstart.md). |

Nenhuma violação identificada. Seção "Complexity Tracking" permanece vazia.

## Project Structure

### Documentation (this feature)

```text
specs/002-mobile-first-sections/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

Sem `contracts/` nesta feature: não há nenhuma interface externa nova (reaproveita o link do
WhatsApp e o evento de analytics já contratados em `specs/001-project-foundation/contracts/`).

### Source Code (repository root: `conversion_page/`)

```text
conversion_page/
├── app/
│   └── page.tsx                     # Reescrito: compõe as 5 seções abaixo (substitui o conteúdo de demonstração da fundação)
├── components/
│   ├── sections/                     # NOVO nesta feature
│   │   ├── hero.tsx                  # <header> — proposta de valor (US1, FR-001)
│   │   ├── services.tsx              # <section> com <article> por serviço (US2, FR-002)
│   │   ├── differentials.tsx         # <section> com <article> por diferencial (US4, FR-003)
│   │   ├── testimonials.tsx          # <section> envolvendo components/ui/carousel.tsx (US5, FR-004)
│   │   └── faq.tsx                   # <section> envolvendo components/ui/accordion.tsx (US3, FR-005)
│   └── ui/                            # Já existente (001) — reutilizado sem alterações
├── lib/
│   ├── content/                       # NOVO nesta feature — conteúdo placeholder tipado
│   │   ├── services.ts                # Service[]
│   │   ├── differentials.ts           # Differential[]
│   │   ├── testimonials.ts            # Testimonial[] (expande o mock de 001)
│   │   └── faq.ts                     # FaqItem[] (expande o mock de 001)
│   └── types.ts                       # Estendido: adiciona Service e Differential
```

**Structure Decision**: mesma estrutura de projeto único do Next.js App Router já estabelecida em
`001-project-foundation`; esta feature apenas adiciona `components/sections/` (componentes de
página, distintos dos primitivos reutilizáveis em `components/ui/`) e `lib/content/` (dados,
separados dos tipos em `lib/types.ts` e da lógica em `lib/utils.ts`/`lib/analytics.ts`).

## Complexity Tracking

*Nenhuma violação da Constitution Check — tabela intencionalmente vazia.*
