# Phase 0 Research: Fundação Técnica do Projeto

## 1. Gerenciador de pacotes

- **Decision**: npm (com `package-lock.json` versionado).
- **Rationale**: já vem com o Node.js, é o gerenciador padrão suportado nativamente pela Vercel
  sem configuração extra, e o projeto não é um monorepo — não há benefício de pnpm/yarn workspaces.
  Alinha com o Princípio IV (Simplicidade) da constituição.
- **Alternatives considered**: pnpm (mais rápido em monorepos, irrelevante para um único app);
  yarn (nenhuma vantagem concreta sobre npm neste escopo).

## 2. Scaffold do Next.js

- **Decision**: gerar o projeto com `create-next-app@latest`, selecionando TypeScript, Tailwind
  CSS, ESLint e App Router, diretamente na raiz de `conversion_page/` (que já contém `.specify/`,
  `.claude/` e `specs/`).
- **Rationale**: é o caminho oficial e mais simples para obter a stack exigida pela constituição
  (Next.js App Router + TypeScript + Tailwind) com configuração já validada pela equipe do Next.js.
  Fixar aqui uma versão exata do Next.js ficaria desatualizado rapidamente; a versão real fica
  registrada no `package-lock.json` gerado durante `/speckit-implement`.
- **Alternatives considered**: montar a configuração manualmente (webpack/tsconfig/tailwind.config
  do zero) — rejeitado por adicionar trabalho e risco de configuração divergente do padrão do
  Next.js sem nenhum ganho para este projeto.

## 3. Framework de testes automatizados

- **Decision**: nenhum framework de teste automatizado dedicado nesta fundação. A validação de
  qualidade usa os portões já definidos na constituição: build TypeScript sem erros, auditorias do
  Google Lighthouse (Performance/Acessibilidade/SEO) e o checklist manual de dispositivos reais
  (`docs/plano-qualidade.md`).
- **Rationale**: esta feature é puramente de infraestrutura (instalação de dependências), sem
  lógica de negócio para testar unitariamente ainda. Introduzir um test runner sem casos de teste
  concretos violaria o Princípio IV (sem gold plating / YAGNI).
- **Alternatives considered**: Vitest + React Testing Library (adiado para quando existirem
  componentes de UI com lógica testável); Playwright e2e (adiado para quando o fluxo completo da
  página existir).

## 4. Utilitário de composição de classes Tailwind

- **Decision**: criar um helper `cn()` em `lib/utils.ts` combinando `clsx` (composição condicional)
  e `tailwind-merge` (resolução de conflitos entre classes Tailwind).
- **Rationale**: é o padrão de facto do ecossistema Next.js + Tailwind (o mesmo padrão usado por
  bibliotecas de componentes como shadcn/ui), evitando reinventar a lógica de merge de classes em
  cada componente.
- **Alternatives considered**: concatenar classes manualmente com template strings — rejeitado por
  não resolver conflitos de classes Tailwind (ex.: duas classes de padding diferentes aplicadas
  condicionalmente).

## 5. Animação do FAQ (Radix Accordion + framer-motion)

- **Decision**: usar o primitivo não-estilizado `@radix-ui/react-accordion` para a semântica/
  acessibilidade (ARIA, navegação por teclado) e animar a altura do conteúdo com `framer-motion`,
  reagindo ao atributo `data-state` exposto pelo Radix.
- **Rationale**: o Radix Accordion não anima por padrão; como `framer-motion` já é dependência
  desta fundação (FR-003/FR-004, animação da Hero Section), reaproveitá-lo aqui evita manter duas
  técnicas de animação diferentes no projeto (consistência conforme Princípio IV).
- **Alternatives considered**: animação via CSS puro (`grid-template-rows` trick) — mais leve em
  bytes, porém adicionaria uma segunda técnica de animação isolada só para o FAQ, sem reuso.

## 6. Navegação do carrossel de depoimentos em desktop

- **Decision**: usar `embla-carousel-react` com botões de seta (anterior/próximo) via a API pública
  do Embla, complementando o gesto de arrastar em touch.
- **Rationale**: atende ao Edge Case da spec ("desktop não depende exclusivamente do gesto de
  arrastar") sem exigir plugins adicionais — a navegação por botões usa a mesma instância do Embla.
- **Alternatives considered**: plugin `embla-carousel-autoplay` — fora de escopo, não solicitado
  pela spec e adicionaria complexidade não requisitada (Princípio IV).

## 7. Provedor de analytics via `@next/third-parties`

- **Decision**: Google Analytics (componente `GoogleAnalytics` de `@next/third-parties/google`),
  registrando um evento customizado `whatsapp_click` no clique do CTA flutuante.
- **Rationale**: é gratuito (adequado ao orçamento de um pequeno negócio, TAP), integra-se ao mesmo
  ecossistema Google já exigido pela constituição para SEO/Search Console, e é a integração de
  analytics oficialmente otimizada pelo `@next/third-parties`.
- **Alternatives considered**: Google Tag Manager via `@next/third-parties` (mais flexível, porém
  exige configuração adicional de contêiner/tags não justificada para uma página única); serviços
  pagos (Plausible/Fathom) — custo não previsto no orçamento do cliente (TAP, Business Case).

## Resumo

Todos os itens `NEEDS CLARIFICATION` do Technical Context do plano foram resolvidos acima. Nenhuma
pesquisa adicional pendente para avançar à Fase 1 (Design & Contracts).
