---

description: "Task list template for feature implementation"
---

# Tasks: Cartão de Compartilhamento em Redes Sociais

**Input**: Design documents from `/specs/003-social-share-card/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Não solicitados na especificação — nenhuma task de teste automatizado foi gerada (mesma decisão das features anteriores). A validação é manual, referenciando `quickstart.md`.

**Organization**: Feature pequena com uma única história de usuário (US1) — cobre a feature inteira. Diferente das features anteriores, não há uma fase "Foundational" separada: como só existe uma história, não há infraestrutura compartilhada entre múltiplas histórias para isolar. A fase de Setup também não gera nenhuma task própria: nenhuma dependência nova, diretório novo ou configuração é necessária (`next/og` já faz parte do Next.js instalado desde `001-project-foundation`).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências pendentes)
- **[Story]**: A qual história de usuário a task pertence (US1)
- Caminhos de arquivo exatos incluídos em cada descrição

## Path Conventions

Mesmo projeto único das features anteriores, na raiz de `conversion_page/`: apenas `app/opengraph-image.tsx` é novo.

## Phase 1: User Story 1 - Ver um preview confiável antes de abrir o link (Priority: P1) 🎯 MVP

**Goal**: Compartilhar o link da página em WhatsApp/Instagram/Facebook exibe um card com imagem de capa, título e resumo da clínica.

**Independent Test**: Colar a URL da página em uma ferramenta de depuração de Open Graph (ou compartilhar em um app de mensagens) e conferir se o card mostra imagem, título e resumo.

### Implementation for User Story 1

- [X] T001 [US1] Criado `conversion_page/app/opengraph-image.tsx`: `ImageResponse` de `next/og` com `size = { width: 1200, height: 630 }`, `contentType = "image/png"` e `alt` descritivo; fundo em gradiente igual ao da Hero, ícone de dente, nome da clínica e tagline centralizados com margem de 140px nas laterais (FR-002, FR-003, FR-006). Durante a implementação, o build acusou `metadataBase` ausente (o `og:image` cairia em `localhost` mesmo em produção) — corrigido em `app/layout.tsx` com `NEXT_PUBLIC_SITE_URL` (documentado em `.env.local.example`)
- [X] T002 [US1] Validado no navegador: rota `/opengraph-image` renderiza corretamente (1200×630, gradiente, ícone, título, tagline — confirmado visualmente); tags `og:image`, `og:image:width=1200`, `og:image:height=630`, `og:image:type=image/png` e `og:image:alt` presentes e corretas no HTML da página (depende de T001)
- [ ] T003 [US1] **Requer verificação humana** — depende de deploy ou túnel público que este agente não tem. Validar em uma ferramenta de depuração de Open Graph **e** compartilhando o link real tanto no WhatsApp quanto no Instagram/Facebook (FR-001, FR-005), observando como cada um recorta a imagem e confirmando que o nome da clínica permanece visível em ambos os recortes (FR-006), per `quickstart.md` cenário 3 (depende de T002)
- [X] T004 [US1] Validado via captura em escala reduzida (~35%, simulando miniatura de app de mensagens): "Clínica Odontológica" e o ícone permanecem legíveis (SC-002), per `quickstart.md` cenário 4 (depende de T001)
- [X] T005 [US1] Validado por análise arquitetural: a imagem é gerada e cacheada em build-time (rota estática, confirmado no output do `next build`), então não há cenário de "falha ao carregar em runtime" para o visitante comum; o `<meta property="og:image">` é declarativo — se uma plataforma não conseguir buscá-lo, ela deixa de mostrar a imagem sem afetar o link, título ou resumo (comportamento padrão de qualquer tag Open Graph, não código específico desta feature) (depende de T001)

**Checkpoint**: Neste ponto, a User Story 1 (a feature inteira) deve estar funcional e testável de forma independente

---

## Phase 2: Polish & Cross-Cutting Concerns

**Purpose**: Validações finais

- [X] T006 [P] `npm run build` e `npm run lint` limpos, sem erros de TypeScript/ESLint
- [X] T007 [P] Rodado contra build de produção com a mesma config de GA da medição anterior: **Accessibility 100/100**, **Best Practices 100/100**, **SEO 100/100** (mantidos). **Performance 61/100** — dentro da margem de variação normal em relação aos 58/100 de `002-mobile-first-sections` (T024); confirma SC-003, já que a imagem não é buscada pelo visitante comum
- [X] T008 Conferido contra `docs/plano-qualidade.md`: os demais itens do checklist são inalterados por esta feature (nenhuma seção de conteúdo nova, nenhum link âncora). "Imagens em WebP/AVIF via `next/image`" não se aplica aqui — a imagem de Open Graph usa a convenção própria do Next.js (`next/og`/`ImageResponse`, PNG gerado em build-time), não o componente `next/image` de conteúdo de página
- [X] T009 `quickstart.md` executado de ponta a ponta: cenários 1, 2 e 4 validados no navegador com resultados registrados nas tasks acima; cenário 3 (plataforma real) requer verificação humana, per nota em T003

---

## Dependencies & Execution Order

### Phase Dependencies

- **User Story 1 (Phase 1)**: Sem dependências de outra fase — pode começar imediatamente, é a feature inteira
- **Polish (Phase 2)**: Depende da conclusão da User Story 1

### Parallel Opportunities

- T006 e T007 (Polish) podem rodar em paralelo
- T001 é um único arquivo — não há paralelismo dentro da implementação desta feature

---

## Implementation Strategy

### MVP First (única história)

1. Completar T001–T005 (User Story 1) — já é a feature completa
2. **PARAR e VALIDAR**: rodar `quickstart.md` cenários 1 e 2 de forma independente (cenário 3 depende de deploy/plataforma real; T005 pode ser testado localmente)
3. Completar Polish (T006–T009)

---

## Notes

- [P] = arquivos diferentes, sem dependências pendentes
- Não há tasks de teste automatizado nesta feature; a validação é manual, guiada por `quickstart.md`, tags HTML, uma ferramenta de depuração de Open Graph e Lighthouse
- Fazer commit após cada task ou grupo lógico de tasks
