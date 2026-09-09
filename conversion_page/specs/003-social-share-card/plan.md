# Implementation Plan: Cartão de Compartilhamento em Redes Sociais

**Branch**: `003-social-share-card` | **Date**: 2026-09-08 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/003-social-share-card/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Completar o Open Graph da página adicionando a imagem de capa que faltava (REQ-08 original do
projeto), gerando-a via a convenção nativa do Next.js App Router (`app/opengraph-image.tsx` +
`next/og`) em vez de depender de uma fotografia real da clínica, que ainda não existe. Nenhuma
dependência nova é instalada; a imagem reaproveita o nome da clínica e a paleta de cor já
estabelecidos em `001-project-foundation`/`002-mobile-first-sections`.

## Technical Context

**Language/Version**: TypeScript 5.x sobre Next.js App Router (mesma stack das features
anteriores)

**Primary Dependencies**: Nenhuma nova — usa `next/og` (`ImageResponse`), já incluído no Next.js
instalado desde `001-project-foundation`

**Storage**: N/A

**Testing**: Nenhum framework de teste automatizado (mesma decisão das features anteriores);
validação via inspeção visual, tags HTML e ferramenta de depuração de Open Graph

**Target Platform**: Web — a imagem é consumida por crawlers de WhatsApp/Instagram/Facebook ao
gerar o preview do link, não pelo navegador do visitante comum

**Project Type**: Web app único (mesmo projeto Next.js das features anteriores)

**Performance Goals**: Não alterar a pontuação de Performance no Lighthouse já registrada em
`002-mobile-first-sections` — a imagem é gerada em build-time e não faz parte do carregamento da
página para o visitante comum (SC-003)

**Constraints**: 1200×630px, `image/png` (research.md #2); conteúdo essencial (nome da clínica)
legível em recortes mais quadrados e mais largos (FR-006); ausência/falha da imagem MUST NOT
quebrar o link (FR-007)

**Scale/Scope**: Uma única imagem estática para a única rota da página

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio / Seção da Constituição | Avaliação |
|---|---|
| I. Mobile-First e Performance | PASS — imagem gerada em build-time (cache estático) via `next/og`; não entra no bundle JS nem é buscada pelo visitante comum, não deve afetar a pontuação de Performance já registrada (SC-003). |
| II. HTML Semântico e Acessibilidade | PASS — `alt` exportado (research.md #5) atende à prática de texto alternativo para quando a imagem não pode ser exibida. |
| III. SEO Técnico | PASS direto — esta feature é exatamente a peça de SEO Técnico que faltava (`og:image`), completando o que a constituição já exige para "toda página". |
| IV. Simplicidade e Escopo Controlado | PASS — nenhuma dependência nova; reaproveita convenção nativa do framework e a identidade visual já estabelecida (research.md #1, #4), sem inventar um novo design. |
| V. Conversão como Métrica de Sucesso | N/A direto — não altera o CTA do WhatsApp; apoia indiretamente a aquisição via compartilhamento (US1 da spec). |
| Stack Tecnológico e Restrições | PASS — nenhuma dependência nova, nenhuma imagem externa (a imagem é gerada localmente, não busca de terceiros). |
| Fluxo de Desenvolvimento e Qualidade | PASS — Lighthouse continua sendo o portão de validação (quickstart.md, Auditoria de qualidade). |

Nenhuma violação identificada. Seção "Complexity Tracking" permanece vazia.

## Project Structure

### Documentation (this feature)

```text
specs/003-social-share-card/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

Sem `contracts/` nesta feature: nenhuma interface externa nova — o Next.js injeta as tags
`og:image:*` automaticamente a partir do arquivo de convenção, sem exigir nenhum contrato
adicional além do que já existe.

### Source Code (repository root: `conversion_page/`)

```text
conversion_page/
└── app/
    └── opengraph-image.tsx   # NOVO — gera a imagem via next/og (ImageResponse); Next.js injeta
                                # as tags og:image:* automaticamente em app/layout.tsx sem
                                # necessidade de edição manual
```

**Structure Decision**: um único arquivo novo, seguindo a convenção de arquivo especial do Next.js
App Router para a raiz da aplicação (`app/opengraph-image.tsx`) — não é necessário criar
componentes, tipos ou conteúdo em `lib/`, já que não há dado dinâmico envolvido.

## Complexity Tracking

*Nenhuma violação da Constitution Check — tabela intencionalmente vazia.*
