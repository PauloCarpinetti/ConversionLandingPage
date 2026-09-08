---

description: "Task list template for feature implementation"
---

# Tasks: Seções de Conteúdo Mobile-First da Landing Page

**Input**: Design documents from `/specs/002-mobile-first-sections/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Não solicitados na especificação — nenhuma task de teste automatizado foi gerada (mesma decisão de `001-project-foundation`, research.md #3). Cada história tem uma task final de validação manual referenciando `quickstart.md`.

**Organization**: Tasks agrupadas por história de usuário (spec.md), permitindo implementação e validação independentes de cada uma.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências pendentes)
- **[Story]**: A qual história de usuário a task pertence (US1–US5)
- Caminhos de arquivo exatos incluídos em cada descrição

## Path Conventions

Mesmo projeto único de `001-project-foundation`, na raiz de `conversion_page/`: `app/`, `components/sections/` (novo), `components/ui/` (já existente), `lib/content/` (novo), `lib/types.ts` (estendido).

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar os diretórios novos desta feature

- [X] T001 [P] Criar os diretórios `conversion_page/components/sections/` e `conversion_page/lib/content/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura que MUST estar pronta antes de qualquer história de usuário

**⚠️ CRITICAL**: Nenhuma história pode começar antes desta fase estar completa

- [X] T002 [P] Estender `conversion_page/lib/types.ts` adicionando os tipos `Service` e `Differential`, per `data-model.md` (depende de T001)
- [X] T003 [P] Limpar `conversion_page/app/page.tsx`: remover o conteúdo de demonstração de `001-project-foundation` (ícone/`cn`, FAQ e depoimentos de exemplo), mantendo um `<main>` vazio pronto para receber as seções desta feature (depende de T001)

**Checkpoint**: Fundação pronta — as histórias de usuário podem começar

---

## Phase 3: User Story 1 - Entender a proposta de valor imediatamente (Priority: P1) 🎯 MVP

**Goal**: A Hero comunica a proposta de valor da clínica sem exigir rolagem em 320px.

**Independent Test**: Carregar a página em uma tela de 320px e confirmar que a proposta de valor é compreensível sem rolar.

### Implementation for User Story 1

- [X] T004 [P] [US1] Criar `conversion_page/components/sections/hero.tsx`: `<header>` semântico com H1 (proposta de valor) e subtítulo, fundo em gradiente/cor sólida (sem foto real — research.md #3), envolvido em `MotionSection` com `animateOnLoad` (FR-001, FR-007) (depende de T003)
- [X] T005 [US1] Montar `<Hero />` como primeiro elemento de `conversion_page/app/page.tsx` (depende de T004)
- [X] T006 [US1] Validado no navegador em 320×800: H1 sem corte (`scrollWidth === clientWidth`) e altura da `<header>` (680px) cabendo dentro do viewport (800px), sem rolar. Confirmado também em 1280px (desktop) (depende de T005)

**Checkpoint**: Neste ponto, a User Story 1 deve estar totalmente funcional e testável de forma independente

---

## Phase 4: User Story 2 - Conhecer os serviços oferecidos (Priority: P1)

**Goal**: Os serviços da clínica são listados de forma legível em qualquer tamanho de tela.

**Independent Test**: Exibir a seção de serviços isoladamente e confirmar 1 coluna em 320px e múltiplas colunas em desktop.

### Implementation for User Story 2

- [X] T007 [P] [US2] Criar `conversion_page/lib/content/services.ts` com `Service[]` (Clareamento, Implantes, Ortodontia + 1–2 adicionais comuns), mapeando ícones per `research.md` #6 (depende de T002)
- [X] T008 [US2] Criar `conversion_page/components/sections/services.tsx`: `<section aria-labelledby>` envolvida em `MotionSection` (animação de entrada ao rolar, FR-009) com grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (research.md #1), cada serviço em `<article>` com `Icon` (FR-002, FR-006, FR-007) (depende de T007)
- [X] T009 [US2] Montar `<Services />` em `conversion_page/app/page.tsx` logo após a Hero (depende de T008, T005)
- [X] T010 [US2] Validado via `getComputedStyle`: `grid-template-columns` com 1 valor em 320px/375px e 3 valores iguais em 1280px; sem rolagem horizontal (`body.scrollWidth === clientWidth`) em nenhuma das duas larguras, per `quickstart.md` cenário 2 (depende de T009)

**Checkpoint**: Neste ponto, as User Stories 1 e 2 devem funcionar de forma independente

---

## Phase 5: User Story 3 - Tirar dúvidas comuns sem precisar ligar (Priority: P1)

**Goal**: A seção de FAQ responde, no mínimo, convênio, localização e agendamento.

**Independent Test**: Exibir a seção de FAQ isoladamente e confirmar que as três dúvidas têm resposta.

### Implementation for User Story 3

- [X] T011 [P] [US3] Criar `conversion_page/lib/content/faq.ts` com `FaqItem[]` cobrindo convênio, localização e agendamento (FR-005)
- [X] T012 [US3] Criar `conversion_page/components/sections/faq.tsx`: `<section aria-labelledby>` com `<h2>` (FR-007), envolvida em `MotionSection` (animação de entrada ao rolar, FR-009) e envolvendo `components/ui/accordion.tsx`, consumindo `lib/content/faq.ts` (depende de T011)
- [X] T013 [US3] Montar `<Faq />` em `conversion_page/app/page.tsx` logo após `<Services />` — posição temporária; será reposicionada como última seção pelas tasks T017/T021, quando Diferenciais e Depoimentos entrarem entre Serviços e FAQ (depende de T012, T009)
- [X] T014 [US3] Validado: as 5 perguntas (incluindo convênio, localização e agendamento) renderizam e abrem corretamente (`aria-expanded`/`data-state` alternando ao clicar); sem rolagem horizontal em 320px. Comportamento herdado do Accordion já validado em `001-project-foundation` (depende de T013)

**Checkpoint**: Neste ponto, as User Stories 1, 2 e 3 (todo o escopo P1) devem funcionar de forma independente

---

## Phase 6: User Story 4 - Ver por que escolher esta clínica (Priority: P2)

**Goal**: Pelo menos três diferenciais da clínica são apresentados com título e explicação breve.

**Independent Test**: Exibir a seção de diferenciais isoladamente e confirmar ao menos três itens.

### Implementation for User Story 4

- [X] T015 [P] [US4] Criar `conversion_page/lib/content/differentials.ts` com `Differential[]` (≥3 itens: equipamentos modernos, atendimento humanizado, localização/conveniência) (depende de T002)
- [X] T016 [US4] Criar `conversion_page/components/sections/differentials.tsx`: mesmo padrão de grid e `MotionSection` de `services.tsx` (animação de entrada ao rolar, FR-009) (FR-003, FR-006, FR-007) (depende de T015)
- [X] T017 [US4] Inserir `<Differentials />` em `conversion_page/app/page.tsx` entre `<Services />` e `<Faq />` (depende de T016, T013)
- [X] T018 [US4] Validado: 4 diferenciais renderizados (Equipamentos Modernos, Atendimento Humanizado, Localização Fácil, Agilidade no Agendamento), cada um com título e explicação; grid responsivo confirmado com o mesmo método de T010, per `quickstart.md` cenário 4 (depende de T017)

**Checkpoint**: Neste ponto, as User Stories 1, 2, 3 e 4 devem funcionar de forma independente

---

## Phase 7: User Story 5 - Ler experiências de outros pacientes (Priority: P2)

**Goal**: Depoimentos de pacientes são navegáveis por arrastar (mobile) ou setas (desktop).

**Independent Test**: Exibir a seção de depoimentos isoladamente e confirmar a navegação em ambos os formatos.

### Implementation for User Story 5

- [X] T019 [P] [US5] Criar `conversion_page/lib/content/testimonials.ts` com `Testimonial[]` (reaproveitar/expandir os três usados como demonstração em `001-project-foundation`)
- [X] T020 [US5] Criar `conversion_page/components/sections/testimonials.tsx`: `<section aria-labelledby>` (FR-007), envolvida em `MotionSection` (animação de entrada ao rolar, FR-009) e envolvendo `components/ui/carousel.tsx`, consumindo `lib/content/testimonials.ts` (FR-004) (depende de T019)
- [X] T021 [US5] Inserir `<Testimonials />` em `conversion_page/app/page.tsx` entre `<Differentials />` e `<Faq />` — a ordem final da página fica Hero → Serviços → Diferenciais → Depoimentos → FAQ, conforme o TAP (depende de T020, T017)
- [X] T022 [US5] Validado: os 5 depoimentos renderizam corretamente; sem rolagem horizontal na página em nenhuma largura testada (320px–1280px, `body.scrollWidth === clientWidth`); botões de seta ocultos abaixo do breakpoint `sm` (mobile usa só o gesto de arrastar, herdado de `001-project-foundation`). **Não confirmado nesta sessão**: o gesto de arrastar em si e o teste em iOS Safari/Android Chrome reais — mesma limitação de ambiente já registrada em `specs/001-project-foundation/tasks.md` (T030); requer verificação humana per `quickstart.md` cenário 5 (depende de T021)

**Checkpoint**: Todas as histórias de usuário devem agora estar funcionais de forma independente, com a página na ordem final

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Validações finais que atravessam todas as histórias

- [X] T023 [P] `npm run build` e `npm run lint` limpos, sem erros de TypeScript/ESLint em nenhuma das novas seções
- [X] T024 [P] Rodado contra build de produção com a mesma config de GA da medição anterior (comparação justa): **Accessibility 100/100**, **Best Practices 100/100**, **SEO 100/100** (todos mantidos/SC-005 PASS). **Performance 58/100** — **piorou** em relação à baseline de `001-project-foundation` (67/100 após T027). Causa provável: 5 seções novas, cada uma com sua própria instância de `MotionSection`/`IntersectionObserver`, mais o DOM adicional de ícones e cards. Ainda abaixo da meta constitucional de >90, tendência conforme antecipado no Constitution Check do `plan.md` desta feature. Por acordo com o usuário, a resolução definitiva de performance fica para os testes finais em produção (mesmo critério já aplicado a `001-project-foundation`)
- [X] T025 Conferido contra `docs/plano-qualidade.md`: "contraste de cores aprovado" ✅ (Lighthouse Accessibility=100); "mensagem do WhatsApp contém a origem" ✅ (já implementado em 001, inalterado); "imagens em WebP/AVIF" e "links âncora" — N/A (nenhuma foto real nem navegação âncora nesta feature). **Nota sobre SC-004**: os cards de Serviços/Diferenciais (`<article>`) são conteúdo estático sem elemento interativo próprio — corretamente não são alcançáveis via Tab (forçar isso seria um antipadrão de acessibilidade). A ordem de leitura para leitor de tela foi confirmada pela hierarquia de headings no DOM (H1 → H2 Serviços → H3×5 → H2 Diferenciais → H3×4 → H2 Depoimentos → H2 FAQ → H3×5, na mesma ordem visual) e pela ordem real dos elementos focáveis (setas do carrossel → triggers do FAQ → CTA do WhatsApp), ambas corretas. "Teste em dispositivos reais" — não realizado, mesma limitação já registrada em `001-project-foundation`
- [X] T026 `quickstart.md` executado de ponta a ponta: cenários 1–4 validados no navegador com resultados registrados nas tasks acima; cenário 5 (arrastar em touch real) requer verificação humana, per nota em T022

---

## Phase 9: Convergence

**Purpose**: Fecha lacunas entre spec/plan/tasks e o estado atual do código, identificadas por `/speckit-converge` após a conclusão da Phase 8

- [ ] T027 Reduzir o custo de JS/DOM das 5 seções (`components/sections/*.tsx`) até a auditoria do Lighthouse em build de produção atingir Performance > 90 — remedir preferencialmente contra um deploy real (ex. Vercel), não apenas localhost, per Constitution I (contradicts)
- [ ] T028 Confirmar em um dispositivo/emulador touch real, incluindo iOS Safari e Android Chrome, que o gesto de arrastar do `components/ui/carousel.tsx` funciona na seção de Depoimentos com o conteúdo real desta feature per SC-005 (partial)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências — pode começar imediatamente
- **Foundational (Phase 2)**: Depende da conclusão do Setup — BLOQUEIA todas as histórias
- **User Stories (Phase 3-7)**: Todas dependem da conclusão da fase Foundational
  - As três histórias P1 (US1, US2, US3) podem prosseguir em paralelo (se houver capacidade) ou sequencialmente, antes das histórias P2 (US4, US5)
  - Ao contrário de `001-project-foundation`, aqui há uma dependência de **posição no JSX**: cada task de montagem em `app/page.tsx` (T005, T009, T013, T017, T021) toca o mesmo arquivo e MUST rodar na ordem indicada, mesmo que as demais tasks da história sejam paralelas
- **Polish (Phase 8)**: Depende da conclusão das histórias desejadas

### User Story Dependencies

- **User Story 1 (P1)**: Pode começar após a fase Foundational — sem dependência de outras histórias
- **User Story 2 (P1)**: Pode começar após a fase Foundational — depende apenas da posição da Hero no JSX (T005) para sua própria task de montagem
- **User Story 3 (P1)**: Pode começar após a fase Foundational — depende apenas da posição de Serviços no JSX (T009) para sua própria task de montagem
- **User Story 4 (P2)**: Pode começar após a fase Foundational — depende da posição do FAQ no JSX (T013) para sua própria task de montagem
- **User Story 5 (P2)**: Pode começar após a fase Foundational — depende da posição de Diferenciais no JSX (T017) para sua própria task de montagem

### Parallel Opportunities

- T002 e T003 (Foundational) podem rodar em paralelo
- Dentro de cada história, a task de conteúdo (`lib/content/*.ts`, marcada [P]) pode rodar em paralelo com trabalho de outra história — só as tasks de montagem em `app/page.tsx` são estritamente sequenciais entre histórias
- T023 e T024 (Polish) podem rodar em paralelo

---

## Parallel Example: Conteúdo das histórias P1

```bash
# Após a fase Foundational, disparar em paralelo:
Task: "Criar lib/content/services.ts em conversion_page/lib/content/services.ts"
Task: "Criar lib/content/faq.ts em conversion_page/lib/content/faq.ts"
Task: "Criar components/sections/hero.tsx em conversion_page/components/sections/hero.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories P1 completas)

1. Completar Phase 1: Setup
2. Completar Phase 2: Foundational (CRÍTICO — bloqueia todas as histórias)
3. Completar Phase 3 (US1), Phase 4 (US2) e Phase 5 (US3) — Hero, Serviços e FAQ, as três histórias de prioridade P1
4. **PARAR e VALIDAR**: rodar `quickstart.md` cenários 1, 2 e 3 de forma independente
5. Neste ponto a página já comunica a proposta de valor, lista os serviços e responde às dúvidas mais comuns — o essencial do funil de conversão descrito no TAP

### Incremental Delivery

1. Setup + Foundational → estrutura pronta
2. Adicionar US1 (Hero) → validar → primeira impressão pronta
3. Adicionar US2 (Serviços) → validar → qualificação do visitante pronta
4. Adicionar US3 (FAQ) → validar → redução de objeções pronta (MVP completo do funil)
5. Adicionar US4 (Diferenciais) → validar → reforço de confiança pronto
6. Adicionar US5 (Depoimentos) → validar → prova social pronta, página na ordem final do TAP
7. Cada história adiciona valor sem quebrar as anteriores

---

## Notes

- [P] = arquivos diferentes, sem dependências pendentes
- [Story] mapeia a task à história de usuário correspondente para rastreabilidade
- Não há tasks de teste automatizado nesta feature; a validação é manual, guiada por `quickstart.md`, Lighthouse e o checklist de `docs/plano-qualidade.md`
- Fazer commit após cada task ou grupo lógico de tasks
- Parar em qualquer checkpoint para validar a história de forma independente
