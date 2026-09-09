# Implementation Plan: Deploy e Qualidade em Produção

**Branch**: `004-production-deploy` | **Date**: 2026-09-09 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/004-production-deploy/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Publicar a landing page na Vercel (decisão já travada na constituição do projeto), com deploy
contínuo a partir da branch principal, e usar essa publicação real para finalmente validar as
pendências que `001`, `002` e `003` deixaram marcadas como "requer deploy real": a meta de
Performance >90 e o funcionamento de ponta a ponta do CTA do WhatsApp e do card de
compartilhamento. Uma única mudança de código é necessária — resolver `metadataBase` também via a
variável `VERCEL_URL` que a própria Vercel injeta automaticamente, eliminando o problema de "ovo e
galinha" da URL pública identificado em `003-social-share-card`. O restante é configuração de
plataforma (conta Vercel do usuário) e validação manual.

## Technical Context

**Language/Version**: TypeScript 5.x sobre Next.js App Router (mesma stack das features
anteriores) — nenhuma mudança

**Primary Dependencies**: Nenhuma nova — apenas a plataforma de hospedagem (Vercel), já mandatada
pela constituição do projeto

**Storage**: N/A

**Testing**: Nenhum framework de teste automatizado (mesma decisão das features anteriores);
validação via Lighthouse contra a URL pública e testes manuais em dispositivo real

**Target Platform**: Vercel (Edge Network) — finalmente o ambiente real, em vez de localhost/VM de
sandbox

**Project Type**: Web app único (mesmo projeto Next.js), agora com configuração de deploy

**Performance Goals**: Lighthouse Performance > 90 contra a URL pública (SC-002) — a meta
constitucional original, nunca antes verificável em condições reais

**Constraints**: Root Directory da Vercel MUST apontar para `conversion_page/`, não a raiz do
repositório (research.md #1); nenhum segredo/valor de configuração MUST ficar commitado no
repositório (FR-003)

**Scale/Scope**: Um único ambiente de produção, um único domínio (subdomínio gratuito da Vercel
nesta fase, conforme Assumptions da spec)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio / Seção da Constituição | Avaliação |
|---|---|
| I. Mobile-First e Performance | PASS (pendente de medição real) — esta feature é o que finalmente permite confirmar a meta de >90 contra produção; se a medição real ficar abaixo da meta, isso vira trabalho de uma iteração futura, não um bloqueio para publicar. |
| II. HTML Semântico e Acessibilidade | PASS — nenhuma mudança estrutural; Accessibility já mede 100/100 em sandbox, deve se manter em produção. |
| III. SEO Técnico | PASS — o `metadataBase` via `VERCEL_URL` (research.md #2) é exatamente o que faz a Metadata API já configurada funcionar corretamente com uma URL real. |
| IV. Simplicidade e Escopo Controlado | PASS — nenhuma dependência nova, nenhum `vercel.json`, reaproveita um recurso nativo da plataforma para rollback (research.md #5) em vez de reimplementar. |
| V. Conversão como Métrica de Sucesso | PASS direto — esta feature é o que permite validar a métrica de sucesso central do projeto (CTA do WhatsApp) de ponta a ponta pela primeira vez. |
| Stack Tecnológico e Restrições | PASS — implementa diretamente o mandato "Hospedagem e deploy contínuo MUST ocorrer via Vercel". |
| Fluxo de Desenvolvimento e Qualidade | PASS — esta feature é a primeira vez que o portão "Lighthouse antes de merge/deploy" pode ser aplicado contra o ambiente real, não uma aproximação local. |

Nenhuma violação identificada. Seção "Complexity Tracking" permanece vazia.

## Project Structure

### Documentation (this feature)

```text
specs/004-production-deploy/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command) — roteiro de deploy
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

Sem `contracts/` nesta feature: a interface externa (plataforma Vercel) não é um contrato que o
projeto define — é consumida via configuração de conta, fora do código-fonte.

### Source Code (repository root: `conversion_page/`)

```text
conversion_page/
└── app/
    └── layout.tsx   # Uma linha alterada: metadataBase ganha um fallback para VERCEL_URL
                       # antes de cair em localhost (research.md #2)
```

**Structure Decision**: nenhum arquivo novo de código. A única mudança é em `app/layout.tsx`
(já existente, tocado por `003-social-share-card`). O restante desta feature acontece fora do
repositório (configuração da conta Vercel do usuário) e é documentado no `quickstart.md` como um
roteiro executável por um humano.

## Complexity Tracking

*Nenhuma violação da Constitution Check — tabela intencionalmente vazia.*
