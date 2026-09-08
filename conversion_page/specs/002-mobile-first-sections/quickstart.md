# Quickstart: Validando as Seções de Conteúdo Mobile-First

## Pré-requisitos

- `001-project-foundation` já implementada (ícones, animações, FAQ, carrossel, CTA, analytics).

## Setup

```bash
cd conversion_page
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Cenários de validação (mapeados às Acceptance Scenarios da spec)

1. **Proposta de valor imediata** (US1)
   - Redimensione a janela para 320px de largura (ou use o modo responsivo do DevTools).
   - Confirme que a frase de proposta de valor da Hero é legível sem rolar a página.

2. **Serviços** (US2)
   - Em 320px, confirme que os serviços aparecem em uma única coluna, sem rolagem horizontal.
   - Alargue a janela (≥1024px) e confirme que os serviços se reorganizam em múltiplas colunas.

3. **FAQ** (US3)
   - Confirme que existem perguntas cobrindo convênio, localização e agendamento.
   - Abra cada uma e confirme que a resposta é compreensível sem contexto adicional.

4. **Diferenciais** (US4)
   - Confirme ao menos três diferenciais, cada um com título e explicação breve.

5. **Depoimentos** (US5)
   - Em mobile, arraste a seção e confirme que todos os depoimentos ficam acessíveis.
   - Em desktop, use os botões de seta (herdados da fundação) para navegar sem arrastar.

## Auditoria de qualidade

```bash
npm run build
npx lighthouse http://localhost:3000 --view
```

- Accessibility > 95 (gate da constituição; SC-005 desta feature).
- Performance: comparar com a medição registrada em `specs/001-project-foundation/tasks.md` (T023/
  T027) — o objetivo é não piorar o número já abaixo da meta, idealmente melhorá-lo.
- Cruzar o resultado com `docs/plano-qualidade.md` (raiz do repositório).
