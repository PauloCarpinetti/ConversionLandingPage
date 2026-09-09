---

description: "Task list template for feature implementation"
---

# Tasks: Deploy e Qualidade em Produção

**Input**: Design documents from `/specs/004-production-deploy/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Não solicitados na especificação — nenhuma task de teste automatizado foi gerada (mesma decisão das features anteriores). A validação é manual, referenciando `quickstart.md`.

**Organization**: Diferente das features anteriores, quase todas as tasks aqui exigem ação humana direta (login na conta Vercel do usuário, dispositivo real) — o agente prepara o código e a documentação, mas não pode executar a configuração da conta por conta própria. Cada task marca isso explicitamente quando aplicável.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências pendentes)
- **[Story]**: A qual história de usuário a task pertence (US1–US4)
- Caminhos de arquivo exatos incluídos em cada descrição

## Path Conventions

Mesmo projeto único das features anteriores, na raiz de `conversion_page/`: apenas `app/layout.tsx` é alterado por código. O restante acontece na configuração da conta Vercel do usuário.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Nenhuma configuração de projeto/dependência nova é necessária — a stack já está completa desde `001-project-foundation`. Segue direto para a fase Foundational.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura que MUST estar pronta antes de qualquer história de usuário — sem o site publicado, nenhuma das validações (US1–US4) pode acontecer

**⚠️ CRITICAL**: Nenhuma história pode começar antes desta fase estar completa

- [X] T001 [P] Atualizar `conversion_page/app/layout.tsx`: `metadataBase` com fallback `NEXT_PUBLIC_SITE_URL` → `https://${VERCEL_URL}` → `http://localhost:3000` (research.md #2)
- [X] T002 **Requer ação humana** — criar o projeto na Vercel importando o repositório `PauloCarpinetti/ConversionLandingPage`, com **Root Directory = `conversion_page`** (research.md #1); isso dispara um primeiro deploy automático (depende de T001, per `quickstart.md` Passo 1). Confirmado: URL pública ativa em `https://conversion-landing-page-psi.vercel.app`
- [X] T003 **Requer ação humana** — configurar `NEXT_PUBLIC_WHATSAPP_NUMBER` (número real da clínica) e, se já existir, `NEXT_PUBLIC_GA_ID` no ambiente "Production" do projeto na Vercel (FR-003), per `quickstart.md` Passo 2 (depende de T002). `NEXT_PUBLIC_WHATSAPP_NUMBER` confirmado (CTA aponta para `wa.me/55...` real). `NEXT_PUBLIC_SITE_URL=https://conversion-landing-page-psi.vercel.app` configurado como correção do achado pós-deploy (research.md #2)
- [X] T004 **Requer ação humana** — disparar um redeploy (ou aguardar o automático) para que a publicação reflita o código de T001 e as variáveis de T003; anotar a URL pública atribuída, per `quickstart.md` Passo 3 (depende de T003). Redeploy confirmado: `og:image` agora resolve para `https://conversion-landing-page-psi.vercel.app/opengraph-image` e a imagem carrega corretamente (verificado via screenshot — sem tela de login)

**Checkpoint**: Site publicado numa URL pública real — as histórias de usuário podem ser validadas

---

## Phase 3: User Story 1 - Acessar a página pela internet (Priority: P1) 🎯 MVP

**Goal**: Confirmar que a página está de fato acessível publicamente, de qualquer rede.

**Independent Test**: Abrir a URL pública em uma rede diferente da do desenvolvedor e confirmar que carrega por completo.

### Implementation for User Story 1

- [X] T005 [US1] **Requer ação humana** — abrir a URL pública a partir de uma rede diferente (ex.: dados móveis) e confirmar que todas as seções (Hero até FAQ) e o CTA do WhatsApp carregam corretamente (SC-001), per `quickstart.md` cenário 1 (depende de T004). Confirmado pelo usuário

**Checkpoint**: Neste ponto, a User Story 1 deve estar validada de forma independente

---

## Phase 4: User Story 2 - Confirmar a qualidade da página publicada (Priority: P1)

**Goal**: Confirmar que a página publicada atende às metas de performance e acessibilidade contra o ambiente real.

**Independent Test**: Rodar uma auditoria de qualidade contra a URL pública, isoladamente de qualquer outro cenário.

### Implementation for User Story 2

- [X] T006 [US2] Rodado via PageSpeed Insights (mobile) contra `https://conversion-landing-page-psi.vercel.app/`: **Performance 94/100** (meta >90, SC-002 PASS), **Accessibility 100/100** (meta >95, SC-003 PASS), Best Practices 100/100, SEO 100/100. Comparado com as medições em sandbox: `002-mobile-first-sections` T024 tinha Performance 58/100 e `003-social-share-card` T007 tinha 61/100 — ambas abaixo da meta, com a resolução deliberadamente adiada para o ambiente real de produção (per notas dessas tasks). O ambiente real da Vercel (CDN/edge, build de produção do Next.js) reverteu esse déficit e bateu a meta com folga, fechando a pendência

**Checkpoint**: Neste ponto, as User Stories 1 e 2 devem estar validadas de forma independente

---

## Phase 5: User Story 3 - Confirmar que a conversão funciona de verdade (Priority: P1)

**Goal**: Confirmar que o CTA do WhatsApp e o card de compartilhamento funcionam de ponta a ponta em condições reais.

**Independent Test**: Clicar no CTA a partir de um celular real e compartilhar a URL pública numa conversa de WhatsApp, isoladamente de qualquer outro cenário.

### Implementation for User Story 3

- [X] T007 [US3] **Requer ação humana** — em um celular real, abrir a URL pública e clicar no CTA do WhatsApp; confirmar que o WhatsApp abre com a mensagem pré-formatada (SC-004), per `quickstart.md` cenário 3 (depende de T004). Confirmado pelo usuário
- [X] T008 [US3] **Requer ação humana** — compartilhar a URL pública numa conversa real do WhatsApp (e, se possível, no Instagram/Facebook) e confirmar o card de pré-visualização (imagem, título, resumo) — fecha a pendência deixada em `003-social-share-card` T003 (SC-005), per `quickstart.md` cenário 3 (depende de T004). Confirmado pelo usuário: card apareceu corretamente (imagem, título e resumo), validando também a correção do achado em research.md #2

**Checkpoint**: Neste ponto, as User Stories 1, 2 e 3 (todo o escopo P1) devem estar validadas de forma independente

---

## Phase 6: User Story 4 - Publicar mudanças futuras sem trabalho manual (Priority: P2)

**Goal**: Confirmar que o deploy contínuo funciona sem intervenção manual.

**Independent Test**: Publicar uma pequena alteração na branch principal e confirmar que ela aparece na URL pública sem nenhum passo manual de republicação.

### Implementation for User Story 4

- [ ] T009 [US4] Fazer um pequeno commit de teste na branch principal (ex.: um ajuste de texto) e confirmar que a URL pública reflete a mudança em poucos minutos, sem nenhuma ação manual além do `git push` (SC-006, FR-002), per `quickstart.md` cenário 4 (depende de T004)

**Checkpoint**: Todas as histórias de usuário devem agora estar validadas de forma independente

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validações finais que atravessam todas as histórias

- [ ] T010 [P] Confirmar no painel da Vercel que deploys anteriores ficam disponíveis para reverter em caso de falha de uma nova build (FR-007, research.md #5) — não é necessário forçar uma falha de propósito, apenas confirmar que o histórico de deploys existe e é reversível
- [ ] T011 [P] Confirmar que a ausência de uma variável de ambiente opcional (ex.: `NEXT_PUBLIC_GA_ID` não configurada) não quebra a página em produção (FR-008) — mesmo comportamento já garantido em `001-project-foundation`, reconfirmado aqui no ambiente real
- [ ] T012 Registrar a URL pública final em `docs/termo-aceite.md` (raiz do repositório), marcando o critério "Link de produção na Vercel ativo" do Termo de Aceite
- [ ] T013 Conferir esta fase contra `docs/plano-qualidade.md` e o restante do `docs/termo-aceite.md` (raiz do repositório) — última checagem antes da entrega formal do projeto (Fase 4 do cronograma, `docs/TAP.md`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Vazia — sem tasks
- **Foundational (Phase 2)**: BLOQUEIA todas as histórias — sem o site publicado, nada pode ser validado
- **User Stories (Phase 3-6)**: Todas dependem da conclusão da fase Foundational (especificamente de T004, a publicação com o código e as variáveis corretas)
  - As três histórias P1 (US1, US2, US3) podem ser validadas em paralelo ou em qualquer ordem entre si; US4 (P2) também não depende delas
- **Polish (Phase 7)**: Depende da conclusão das histórias desejadas

### User Story Dependencies

- **User Story 1 (P1)**: Depende apenas de T004 (site publicado)
- **User Story 2 (P1)**: Depende apenas de T004
- **User Story 3 (P1)**: Depende apenas de T004
- **User Story 4 (P2)**: Depende apenas de T004

### Parallel Opportunities

- T005, T006, T007/T008 e T009 podem ser feitas em qualquer ordem entre si, todas após T004
- T010 e T011 (Polish) podem rodar em paralelo

---

## Implementation Strategy

### MVP First (escopo P1)

1. Completar Phase 2: Foundational (T001–T004) — publica o site pela primeira vez
2. Completar Phase 3 (US1), Phase 4 (US2) e Phase 5 (US3) — as três histórias de prioridade P1
3. **PARAR e VALIDAR**: neste ponto, o site está no ar, com qualidade confirmada e a conversão funcionando de ponta a ponta — o objetivo comercial central do projeto está validado em produção
4. Completar US4 (deploy contínuo) e Polish como fechamento formal do projeto

### Incremental Delivery

1. Foundational → site publicado pela primeira vez
2. US1 → confirma que qualquer pessoa acessa
3. US2 → confirma que a qualidade se sustenta em produção
4. US3 → confirma a conversão de ponta a ponta (marco comercial do projeto)
5. US4 → confirma que futuras mudanças não exigem trabalho manual
6. Polish → fecha o Termo de Aceite

---

## Notes

- [P] = arquivos diferentes ou ações independentes, sem dependências pendentes
- [Story] mapeia a task à história de usuário correspondente para rastreabilidade
- A maioria das tasks aqui exige ação humana direta na conta Vercel do usuário ou em um dispositivo real — o agente prepara o código (T001) e a documentação, mas não substitui essas ações
- Não há tasks de teste automatizado nesta feature; a validação é manual, guiada por `quickstart.md` e Lighthouse
