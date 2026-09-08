# Implementation Plan: Fundação Técnica do Projeto

**Branch**: `001-project-foundation` | **Date**: 2026-09-08 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-project-foundation/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Estabelecer o scaffold do Next.js (App Router + TypeScript + Tailwind CSS) na raiz de
`conversion_page/` — que hoje só contém a estrutura do Spec Kit — e instalar as sete dependências
de UI/UX/analytics decididas pelo stakeholder (`lucide-react`, `framer-motion`,
`@radix-ui/react-accordion`, `embla-carousel-react`, `clsx`, `tailwind-merge`,
`@next/third-parties`), expondo um helper `cn()` compartilhado e os contratos de integração externa
(link do WhatsApp e evento de analytics) que as próximas features (Hero, Serviços, Diferenciais,
Depoimentos, FAQ) irão consumir.

## Technical Context

**Language/Version**: TypeScript 5.x sobre Node.js LTS (Next.js App Router)

**Primary Dependencies**: Next.js, React, Tailwind CSS (stack já mandatada pela constituição) +
`lucide-react`, `framer-motion`, `@radix-ui/react-accordion`, `embla-carousel-react`, `clsx`,
`tailwind-merge`, `@next/third-parties` (decisão desta feature)

**Storage**: N/A — site estático/SSG, sem banco de dados (proibido pela constituição)

**Testing**: Nenhum framework de teste automatizado nesta fundação; portões de qualidade são build
TypeScript, Google Lighthouse e o checklist manual de dispositivos (ver `research.md` item 3)

**Target Platform**: Web responsivo (320px–1920px), navegadores evergreen — validação manual em
iOS Safari e Android Chrome (mandato da constituição)

**Project Type**: Web app único (frontend Next.js, sem backend separado)

**Performance Goals**: Lighthouse Performance > 90 mesmo após a adição de todas as dependências
desta fundação (SC-006)

**Constraints**: Lighthouse Accessibility > 95; animações MUST respeitar `prefers-reduced-motion`;
sem backend/CMS/banco de dados; sem bloqueio de conteúdo/CTA caso analytics ou animação falhem
(FR-010, FR-011)

**Scale/Scope**: Landing page de página única (SPA/SSG), ~5–6 seções, um único público-alvo
(pacientes da clínica) — sem i18n ou multi-tenant

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio / Seção da Constituição | Avaliação |
|---|---|
| I. Mobile-First e Performance | PASS — bibliotecas escolhidas são leves e amplamente usadas em produção; meta de Lighthouse > 90 mantida como critério de aceite (SC-006). |
| II. HTML Semântico e Acessibilidade | PASS — `@radix-ui/react-accordion` fornece semântica ARIA e navegação por teclado nativamente (FR-005), atendendo ao requisito sem trabalho extra de acessibilidade manual. |
| III. SEO Técnico | N/A nesta feature — nenhuma página/conteúdo de SEO é criado aqui; `@next/third-parties` não interfere na Metadata API que será usada pelas features de conteúdo. |
| IV. Simplicidade e Escopo Controlado | PASS — cada dependência instalada mapeia 1:1 a um requisito explícito da spec; nenhum CMS, agendamento online ou abstração especulativa é introduzido. |
| V. Conversão como Métrica de Sucesso | PASS — `@next/third-parties` é justamente o mecanismo que torna o CTA do WhatsApp mensurável (FR-008/FR-009). |
| Stack Tecnológico e Restrições | PASS — o scaffold usa exatamente React + Next.js (App Router) + TypeScript + Tailwind CSS, sem backend/CMS/BD. |
| Fluxo de Desenvolvimento e Qualidade | PASS — ausência de teste automatizado não enfraquece os portões definidos (Lighthouse + checklist manual continuam obrigatórios antes de deploy). |

Nenhuma violação identificada. Seção "Complexity Tracking" permanece vazia.

## Project Structure

### Documentation (this feature)

```text
specs/001-project-foundation/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   └── external-integrations.md
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root: `conversion_page/`)

```text
conversion_page/
├── app/
│   ├── layout.tsx        # Root layout; monta <GoogleAnalytics> (@next/third-parties/google)
│   ├── page.tsx          # Página única da landing page (composição das seções futuras)
│   └── globals.css       # Estilos base + diretivas Tailwind
├── components/
│   ├── ui/                # Primitivos reutilizáveis desta fundação
│   │   ├── accordion.tsx  # Wrapper de @radix-ui/react-accordion + animação framer-motion
│   │   ├── carousel.tsx   # Wrapper de embla-carousel-react (com setas para desktop)
│   │   └── icon.tsx       # Re-export/config central de lucide-react (se necessário)
│   └── sections/           # Placeholder para Hero/Serviços/Diferenciais/Depoimentos/FAQ
│                            # (implementados em features futuras, fora do escopo 001)
├── lib/
│   ├── utils.ts           # Helper cn() = clsx + tailwind-merge
│   └── analytics.ts       # Wrapper de sendGAEvent para o evento whatsapp_click
├── public/                 # Assets estáticos
├── specs/                  # Spec Kit (já existente)
├── .specify/ .claude/      # Spec Kit (já existente)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Structure Decision**: projeto único (frontend-only), seguindo as convenções nativas do Next.js
App Router (`app/`, `components/`, `lib/`) em vez do template genérico `src/{models,services,cli}`
— não há CLI, serviço de backend nem múltiplos projetos (frontend+backend) neste escopo, então as
Opções 2 e 3 do template de estrutura não se aplicam.

## Complexity Tracking

*Nenhuma violação da Constitution Check — tabela intencionalmente vazia.*
