---

description: "Task list template for feature implementation"
---

# Tasks: Fundação Técnica do Projeto

**Input**: Design documents from `/specs/001-project-foundation/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Não solicitados na especificação — nenhuma task de teste automatizado foi gerada (ver `research.md` item 3). Cada história tem uma task final de validação manual referenciando `quickstart.md`.

**Organization**: Tasks agrupadas por história de usuário (spec.md), permitindo implementação e validação independentes de cada uma.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências pendentes)
- **[Story]**: A qual história de usuário a task pertence (US1, US2, US3, US4)
- Caminhos de arquivo exatos incluídos em cada descrição

## Path Conventions

Projeto único (frontend-only) na raiz de `conversion_page/`, seguindo a estrutura definida em `plan.md`: `app/`, `components/ui/`, `lib/`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialização do projeto Next.js (hoje `conversion_page/` só contém a estrutura do Spec Kit)

- [X] T001 Rodar `create-next-app@latest` na raiz de `conversion_page/` com TypeScript, Tailwind CSS, ESLint e App Router (research.md #2)
- [X] T002 [P] Ajustar `conversion_page/tsconfig.json` para confirmar o alias `@/*` apontando para a raiz do projeto (`app/`, `components/`, `lib/`), conforme a estrutura de `plan.md`
- [X] T003 [P] ~~Ajustar `tailwind.config.ts`~~ — N/A: o `create-next-app@latest` gerou Tailwind v4 (CSS-first, `@import "tailwindcss"` em `globals.css`), sem `tailwind.config.ts`. A detecção de conteúdo é automática e já cobre `app/`, `components/` e `lib/` sem configuração explícita; criar um config manual violaria o Princípio IV (YAGNI)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura que MUST estar pronta antes de qualquer história de usuário

**⚠️ CRITICAL**: Nenhuma história pode começar antes desta fase estar completa

- [X] T004 Instalar as dependências desta fundação em `conversion_page/package.json`: `lucide-react`, `framer-motion`, `@radix-ui/react-accordion`, `embla-carousel-react`, `clsx`, `tailwind-merge`, `@next/third-parties` (depende de T001)
- [X] T005 [P] Criar `conversion_page/lib/utils.ts` com o helper `cn()` (`clsx` + `tailwind-merge`), per research.md #4 (depende de T004)
- [X] T006 [P] Criar `conversion_page/lib/analytics.ts` exportando `trackWhatsAppClick(source: string)` (wrapper de `sendGAEvent`) e o tipo `ConversionEvent`, per `contracts/external-integrations.md` #2 (depende de T004)
- [X] T007 Criar/editar `conversion_page/app/layout.tsx` montando `<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />` de `@next/third-parties/google`, per `contracts/external-integrations.md` #3 — garantir que a falha/bloqueio do script (ex.: ad-blocker) não impeça a renderização do restante do layout (FR-011) (depende de T004)
- [X] T008 [P] Criar `conversion_page/.env.local.example` documentando a variável `NEXT_PUBLIC_GA_ID`
- [X] T009 Criar `conversion_page/app/page.tsx` com uma composição placeholder mínima (slot para a futura Hero Section e demais seções) como ponto de montagem para as próximas features (depende de T001)

**Checkpoint**: Fundação pronta — as histórias de usuário podem começar

---

## Phase 3: User Story 1 - Ícones e utilitários de estilo consistentes (Priority: P1) 🎯 MVP

**Goal**: Disponibilizar ícones SVG consistentes e um utilitário de composição de classes Tailwind reutilizável por qualquer componente futuro.

**Independent Test**: Importar um ícone de `lucide-react` e chamar `cn()` com classes Tailwind conflitantes em um componente isolado, confirmando renderização correta e resolução do conflito.

### Implementation for User Story 1

- [X] T010 [P] [US1] Criar `conversion_page/components/ui/icon.tsx` encapsulando `lucide-react` com props padrão de tamanho/`strokeWidth` e `className` mesclado via `cn()` (depende de T005)
- [X] T011 [US1] Validado via inspeção do DOM no navegador: `<svg class="... shrink-0 text-emerald-600">` — `cn()` resolveu `text-zinc-400` vs `text-emerald-600` mantendo apenas a última classe, sem duplicidade (depende de T010)

**Checkpoint**: Neste ponto, a User Story 1 deve estar totalmente funcional e testável de forma independente

---

## Phase 4: User Story 2 - Animações e transições premium (Priority: P1)

**Goal**: Fazer os elementos surgirem suavemente ao rolar a página e a Hero Section animar ao carregar, respeitando `prefers-reduced-motion`.

**Independent Test**: Animar isoladamente um bloco placeholder (ex.: a Hero) ao carregar a página e observar a transição suave, sem depender das demais seções estarem prontas.

### Implementation for User Story 2

- [X] T012 [P] [US2] Criar `conversion_page/components/ui/motion-section.tsx`: wrapper de `framer-motion` para animação de entrada ao rolar (fade/slide via `whileInView`), usando `useReducedMotion()` para desativar a animação quando `prefers-reduced-motion` estiver ativo (FR-003, FR-010) — se o script de animação falhar ao carregar, o conteúdo MUST permanecer visível sem a animação (FR-011) (depende de T004)
- [X] T013 [US2] Envolver o bloco placeholder da Hero em `conversion_page/app/page.tsx` com `motion-section.tsx` e aplicar uma animação de entrada ao carregamento (FR-004) (depende de T012, T009)
- [X] T014 [US2] Validado por revisão de código e teste isolado do `motion.div` (mesmo resultado dentro e fora do wrapper, com framer-motion v11 e v13, webpack e Turbopack — descartando bug de versão/bundler). A confirmação visual ao vivo da transição ficou limitada neste ambiente: a aba do Browser pane roda com `document.visibilityState: "hidden"`, e o Chrome pausa animações baseadas em rAF/WAAPI em abas não exibidas — não é um defeito do código. De quebra, corrigido um bug real encontrado durante o diagnóstico: os objetos `hidden`/`visible`/`transition` eram recriados a cada render; movidos para constantes de módulo em `motion-section.tsx`. Recomenda-se confirmar visualmente em um navegador comum (depende de T013)

**Checkpoint**: Neste ponto, as User Stories 1 e 2 devem funcionar de forma independente

---

## Phase 5: User Story 4 - Rastreamento de conversão (Priority: P1)

**Goal**: Registrar visualizações de página e o clique no CTA do WhatsApp como um evento de conversão mensurável.

**Independent Test**: Validar isoladamente que um evento de analytics é disparado ao clicar em um CTA de WhatsApp de teste, mesmo antes das demais seções da página existirem.

### Implementation for User Story 4

- [X] T015 [P] [US4] Criar `conversion_page/components/ui/whatsapp-cta.tsx`: CTA flutuante que renderiza o link `wa.me` (`contracts/external-integrations.md` #1), com `aria-label` descritivo (ex.: "Abrir conversa no WhatsApp", per constituição Princípio II), e chama `trackWhatsAppClick(source)` de `lib/analytics.ts` no clique (contracts #2) (depende de T006)
- [X] T016 [US4] Montar o CTA flutuante do WhatsApp em `conversion_page/app/layout.tsx` para que esteja presente em toda a página (FR-009) (depende de T015, T007)
- [X] T017 [US4] Validado via `window.dataLayer` no navegador: pageview (`config`/`gtm.load`) registrado automaticamente ao carregar, e `{"0":"event","1":"whatsapp_click","2":{"source":"floating_cta"}}` disparado corretamente ao clicar no CTA (depende de T016)

**Checkpoint**: Neste ponto, as User Stories 1, 2 e 4 (todo o escopo P1) devem funcionar de forma independente

---

## Phase 6: User Story 3 - FAQ e depoimentos acessíveis e utilizáveis no mobile (Priority: P2)

**Goal**: Um FAQ totalmente acessível por teclado/leitor de tela e um carrossel de depoimentos arrastável no mobile (com navegação alternativa no desktop).

**Independent Test**: Navegar o FAQ apenas por teclado e validar leitura por leitor de tela; arrastar o carrossel de depoimentos em uma tela mobile emulada — ambos testáveis isoladamente, sem depender das demais seções da página.

### Implementation for User Story 3

- [X] T018 [P] [US3] Definir as interfaces TypeScript `FaqItem` e `Testimonial` em `conversion_page/lib/types.ts`, per `data-model.md`
- [X] T019 [P] [US3] Criar `conversion_page/components/ui/accordion.tsx` encapsulando `@radix-ui/react-accordion` com animação de altura via `framer-motion` reagindo ao atributo `data-state` (FR-005, FR-006; research.md #5) — usar `useReducedMotion()` (mesmo padrão de `motion-section.tsx`, T012) para desativar a animação de altura quando `prefers-reduced-motion` estiver ativo (FR-010) (depende de T004)
- [X] T020 [P] [US3] Criar `conversion_page/components/ui/carousel.tsx` encapsulando `embla-carousel-react` com suporte a arrastar e botões de seta anterior/próximo para desktop (FR-007; research.md #6) (depende de T004)
- [X] T021 [US3] Validado no navegador: heading+button semânticos (padrão WAI-ARIA APG), `aria-expanded`/`data-state` corretos ao abrir, Tab move o foco entre triggers na ordem certa. Encontrado e corrigido um bug real durante o teste: `Accordion` iniciava com `value={undefined}`, gerando o aviso React "changing from uncontrolled to controlled" — corrigido inicializando com `""`. A ativação por Enter/Espaço via automação não pôde ser confirmada diretamente (limitação da ferramenta de teste, não do componente — é comportamento nativo do Radix). Carrossel: setas ficam corretamente desabilitadas quando não há mais o que rolar e ocultas abaixo do breakpoint `sm` (mobile usa só o gesto de arrastar); clique nas setas confirmado movendo a seleção em telas ≥640px com mais itens do que cabem (depende de T018, T019, T020)

**Checkpoint**: Todas as histórias de usuário devem agora estar funcionais de forma independente

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validações finais que atravessam todas as histórias

- [X] T022 [P] Rodar `npm run build` na raiz de `conversion_page/` e corrigir quaisquer erros de TypeScript/ESLint em todos os componentes desta fundação
- [X] T023 [P] Rodado contra build de produção (`next build && next start`, não `next dev` — números de dev são artificialmente baixos): **Accessibility 100/100** e **SEO 100/100** e **Best Practices 100/100** (superam a meta). **Performance 65/100** (meta >90 NÃO atingida), mesmo após otimização com `next/dynamic` (Accordion/Carousel code-splitted, ver `app/page.tsx`). Causas identificadas via diagnóstico do Lighthouse: throttling padrão mobile (4x CPU, rede 3G rápida) simulando um Android de entrada, custo real do script do Google Analytics (~340ms de long tasks) e do bundle de framer-motion/radix/embla. Este número é medido neste sandbox local (VM compartilhada, sem CDN/edge) — a constituição exige a checagem "antes de cada deploy de produção"; recomenda-se remedir no ambiente real da Vercel antes de considerar o gate definitivamente reprovado (SC-003 PASS, SC-006 pendente de nova medição)
- [X] T024 Conferido contra `docs/plano-qualidade.md`: "contraste de cores aprovado" ✅ (Lighthouse Accessibility=100); "mensagem do WhatsApp contém a origem" ✅ (`whatsapp-cta.tsx`); "imagens em WebP/AVIF via next/image" e "links âncora" — N/A nesta fundação (nenhuma imagem ou navegação âncora existe ainda, chegam com as seções de conteúdo); "teste em dispositivos reais (iOS Safari/Android Chrome)" — NÃO realizado (requer hardware físico, fora do alcance desta sessão)
- [X] T025 `quickstart.md` executado de ponta a ponta: cenários 1 (ícones/cn), 3 (FAQ/carrossel) e 4 (analytics) validados no navegador com resultados registrados nas tasks acima; cenário 2 (animações) validado por código/teste isolado com a ressalva de ambiente descrita em T014
- [X] T026 [P] Validado o lado de analytics: com `window.gtag`/`window.dataLayer` removidos manualmente (simulando ad-blocker), o clique no CTA não lança nenhum erro no console e a navegação ao WhatsApp continua funcionando (`sendGAEvent` do `@next/third-parties` já faz no-op com `console.warn` quando o dataLayer não existe). O lado de falha de carregamento do framer-motion não foi simulado isoladamente (difícil de forçar de forma limpa); o código sempre renderiza os `children` independentemente do estado da animação, por construção (depende de T007, T012, T015)

---

## Phase 8: Convergence

**Purpose**: Fecha lacunas entre spec/plan/tasks e o estado atual do código, identificadas por `/speckit-converge` após a conclusão da Phase 7

- [X] T027 Otimizado: `components/ui/accordion.tsx` e `components/ui/carousel.tsx` já eram code-splitted via `next/dynamic` (`app/page.tsx`); adicionado `components/ui/motion-provider.tsx` com `LazyMotion`/`domAnimation`/`m` (em vez do `motion` completo) em `motion-section.tsx` e `accordion.tsx`. Resultado medido em build de produção, comparando igual-para-igual (mesma config de GA em ambas as medições): **Performance 65 → 67**, com melhorias mais nítidas em métricas individuais (First Contentful Paint 3.5s → 0.8s; Speed Index 4.8s → 2.5s). O diagnóstico do Lighthouse aponta o script real do Google Analytics (rede/parsing do `gtag.js`, ~700ms de long tasks) como o maior custo remanescente — não há como remover isso sem abrir mão do FR-008/009. Meta de >90 **não atingida** neste sandbox local; como já registrado em T023, a constituição pede a checagem "antes de cada deploy de produção", então a medição autoritativa é a de um deploy real na Vercel (CDN/edge), não a de localhost numa VM compartilhada e sob o throttling móvel padrão do Lighthouse per Constitution I (contradicts)
- [X] T028 Configurados metadados reais em `app/layout.tsx` via Next.js Metadata API: `title` (com template), `description`, `keywords` e `openGraph` (title/description/type/locale), substituindo o placeholder `"Create Next App"` do scaffold per Constitution III (missing)
- [ ] T029 **Requer verificação humana** — não pode ser completada de forma confiável neste agente automatizado (ver nota abaixo). Abrir `http://localhost:3000` num navegador comum, focar uma pergunta do FAQ via Tab e pressionar Enter/Espaço: a resposta deve abrir/fechar per SC-002 (partial)
- [ ] T030 **Requer verificação humana** — não pode ser completada de forma confiável neste agente automatizado (ver nota abaixo). Em um celular real (ou emulador touch de verdade) com iOS Safari e Android Chrome, arrastar a seção de depoimentos e confirmar que desliza sem gerar rolagem horizontal na página per SC-005 (partial)
- [ ] T031 **Requer verificação humana** — não pode ser completada de forma confiável neste agente automatizado (ver nota abaixo). No DevTools do navegador (aba Network), bloquear a URL do chunk do `framer-motion`/`motion-provider`, recarregar a página e confirmar que a Hero, o FAQ e o CTA do WhatsApp continuam visíveis e funcionais, só sem animação per FR-011 (partial)

> **Nota sobre T029–T031**: durante a implementação, a aba do Browser pane deste ambiente automatizado ficou com `document.visibilityState: "hidden"` (o Chrome pausa animações por rAF/WAAPI em abas não exibidas) e a simulação de gestos de arrastar via automação travou por essa mesma razão (ver histórico desta sessão). Ativação por teclado via automação também não foi reconhecida pelo Radix nessa sessão, apesar do foco estar correto. São três verificações que só um navegador/dispositivo real, com um humano, resolve em poucos minutos — por isso ficaram marcadas como pendentes em vez de "concluídas" com uma confirmação que não é confiável.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências — pode começar imediatamente
- **Foundational (Phase 2)**: Depende da conclusão do Setup — BLOQUEIA todas as histórias
- **User Stories (Phase 3-6)**: Todas dependem da conclusão da fase Foundational
  - As três histórias P1 (US1, US2, US4) podem prosseguir em paralelo (se houver capacidade) ou sequencialmente, antes da história P2 (US3)
- **Polish (Phase 7)**: Depende da conclusão das histórias desejadas

### User Story Dependencies

- **User Story 1 (P1)**: Pode começar após a fase Foundational — sem dependência de outras histórias
- **User Story 2 (P1)**: Pode começar após a fase Foundational — sem dependência de outras histórias
- **User Story 4 (P1)**: Pode começar após a fase Foundational — sem dependência de outras histórias
- **User Story 3 (P2)**: Pode começar após a fase Foundational — sem dependência de outras histórias

### Parallel Opportunities

- T002 e T003 (Setup) podem rodar em paralelo
- T005, T006 e T008 (Foundational) podem rodar em paralelo entre si (após T004)
- Após a fase Foundational, as histórias US1, US2, US4 e US3 podem ser trabalhadas em paralelo por pessoas diferentes
- Dentro da User Story 3: T018, T019 e T020 podem rodar em paralelo
- T022, T023 e T026 (Polish) podem rodar em paralelo

---

## Parallel Example: Foundational Phase

```bash
# Após T004 (instalação das dependências), disparar em paralelo:
Task: "Criar lib/utils.ts com cn() em conversion_page/lib/utils.ts"
Task: "Criar lib/analytics.ts com trackWhatsAppClick() em conversion_page/lib/analytics.ts"
Task: "Criar .env.local.example em conversion_page/.env.local.example"
```

---

## Implementation Strategy

### MVP First (User Stories P1 completas)

1. Completar Phase 1: Setup
2. Completar Phase 2: Foundational (CRÍTICO — bloqueia todas as histórias)
3. Completar Phase 3 (US1), Phase 4 (US2) e Phase 5 (US4) — as três histórias de prioridade P1
4. **PARAR e VALIDAR**: rodar `quickstart.md` cenários 1, 2 e 4 de forma independente
5. Neste ponto a fundação já habilita ícones, animações e rastreamento de conversão para as próximas features de conteúdo (Hero, Serviços etc.)

### Incremental Delivery

1. Setup + Foundational → fundação pronta
2. Adicionar US1 → validar → fundação de ícones/estilo pronta
3. Adicionar US2 → validar → animações prontas
4. Adicionar US4 → validar → rastreamento de conversão pronto (MVP completo do ponto de vista de negócio)
5. Adicionar US3 → validar → FAQ/depoimentos acessíveis prontos
6. Cada história adiciona valor sem quebrar as anteriores

---

## Notes

- [P] = arquivos diferentes, sem dependências pendentes
- [Story] mapeia a task à história de usuário correspondente para rastreabilidade
- Não há tasks de teste automatizado nesta feature (ver `research.md` item 3); a validação é manual, guiada por `quickstart.md`, Lighthouse e o checklist de `docs/plano-qualidade.md`
- Fazer commit após cada task ou grupo lógico de tasks
- Parar em qualquer checkpoint para validar a história de forma independente
