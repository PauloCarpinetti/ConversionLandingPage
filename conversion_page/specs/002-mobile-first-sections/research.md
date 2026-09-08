# Phase 0 Research: Seções de Conteúdo Mobile-First

## 1. Estratégia de grid responsivo (Serviços e Diferenciais)

- **Decision**: `grid-cols-1` como padrão (mobile), evoluindo para `sm:grid-cols-2` e `lg:grid-cols-3`
  nas seções de Serviços e Diferenciais.
- **Rationale**: é exatamente a decisão já registrada em `docs/requisitosdentista.md` (REQ-02) para
  a seção de Serviços; reaproveitar o mesmo padrão em Diferenciais mantém a página consistente e
  evita reinventar breakpoints.
- **Alternatives considered**: carrossel também para Serviços/Diferenciais (como Depoimentos) —
  rejeitado porque essas duas seções têm menos itens e se beneficiam de leitura direta em grid, sem
  a interação extra de arrastar.

## 2. HTML semântico por seção

- **Decision**: Hero em `<header>`; Serviços, Diferenciais, Depoimentos e FAQ cada um em
  `<section aria-labelledby="...">` apontando para o próprio `<h2>` da seção; cards de Serviços e
  Diferenciais em `<article>`.
- **Rationale**: segue literalmente `docs/requisitosdentista.md` REQ-01 (`<header>`) e REQ-03
  (`<section>`/`<article>`), e atende à constituição (Princípio II — HTML semântico obrigatório).
- **Alternatives considered**: `<div>` genérico com classes utilitárias apenas — rejeitado por não
  comunicar estrutura a leitores de tela (FR-007).

## 3. Imagens/placeholders visuais

- **Decision**: nenhuma seção desta feature usa fotografias reais. A Hero usa um fundo em gradiente/
  cor sólida (Tailwind) em vez de uma foto; Serviços e Diferenciais usam os ícones já disponíveis em
  `components/ui/icon.tsx` (lucide-react) como indicação visual, não fotos.
- **Rationale**: nenhuma imagem real da clínica foi fornecida (Assumptions da spec); usar imagens de
  banco de imagens genéricas correria risco de licenciamento e adicionaria peso de rede sem
  necessidade, pressionando ainda mais o orçamento de Performance (já abaixo da meta desde a
  convergência da fundação — ver `specs/001-project-foundation/tasks.md` T027). Ícones são leves,
  já fazem parte da fundação e não exigem nenhuma decisão de licenciamento.
- **Alternatives considered**: placeholder de serviço de imagem externo (ex. `picsum.photos`) —
  rejeitado: dependência de rede externa, risco de indisponibilidade, e nenhum requisito pede
  fotografia especificamente.

## 4. Organização do conteúdo placeholder

- **Decision**: o conteúdo de cada seção (serviços, diferenciais, depoimentos, itens de FAQ) vive em
  arquivos próprios sob `lib/content/`, um por seção, cada um exportando um array tipado — em vez de
  inline nos componentes de seção.
- **Rationale**: separa dado de apresentação, tornando trivial a troca futura pelo copywriting real
  do cliente (Assumptions da spec) sem tocar em nenhum componente visual; também facilita adicionar
  itens sem exigir mudança de estrutura (FR-010).
- **Alternatives considered**: manter os arrays inline em `app/page.tsx` (como no placeholder de
  demonstração da fundação, feature 001) — adequado só para uma demonstração mínima; não escala bem
  quando o conteúdo passa a ser real e mais extenso.

## 5. Conteúdo inicial de referência

- **Decision**: usar o conteúdo já levantado em `docs/requisitosdentista.md` e no TAP como base do
  texto placeholder: Serviços (Clareamento, Implantes, Ortodontia + 1-2 adicionais comuns em
  clínicas odontológicas), Diferenciais (equipamentos modernos, atendimento humanizado,
  localização/conveniência), FAQ (convênio, localização, agendamento — já obrigatórios por FR-005),
  Depoimentos (reaproveitar/expandir os três já usados como demonstração na fundação).
- **Rationale**: mantém o texto placeholder "realista" (FR-008) e alinhado ao que o cliente
  provavelmente vai preencher depois, em vez de um lorem ipsum genérico.

## 6. Ícone por serviço/diferencial

- **Decision**: mapear cada serviço e diferencial a um ícone específico do `lucide-react` já
  disponível via `components/ui/icon.tsx` (ex.: `Sparkles` para Clareamento, `Stethoscope` para
  Implantes, `SmilePlus` para Ortodontia, `ShieldCheck` para equipamentos modernos, `HeartHandshake`
  para atendimento humanizado).
- **Rationale**: reaproveita a fundação sem introduzir nenhuma dependência nova; ícones distintos
  ajudam a escaneabilidade da seção (FR-002).

## Resumo

Nenhuma dependência nova é introduzida por esta feature — toda a implementação usa a stack e os
componentes de UI já estabelecidos por `001-project-foundation`. Nenhum item `NEEDS CLARIFICATION`
pendente.
