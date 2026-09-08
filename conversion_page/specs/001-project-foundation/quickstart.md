# Quickstart: Validando a Fundação Técnica do Projeto

## Pré-requisitos

- Node.js LTS instalado.
- Este guia assume que o scaffold do Next.js (`create-next-app`) e a instalação das dependências
  desta fundação já foram executados pelas tasks de `/speckit-tasks` + `/speckit-implement`.

## Setup

```bash
cd conversion_page
npm install
npm run dev
```

Abra `http://localhost:3000` no navegador.

## Cenários de validação (mapeados às Acceptance Scenarios da spec)

1. **Ícones e utilitários de estilo** (US1)
   - Verifique que um ícone é renderizado como SVG em qualquer seção de teste.
   - Passe duas classes Tailwind conflitantes para o helper `cn()` (`lib/utils.ts`) e confirme que
     apenas a última prevalece no DOM renderizado (inspecionar via devtools).

2. **Animações e transições** (US2)
   - Role a página até uma seção fora da viewport inicial e observe a transição de entrada suave.
   - Abra e feche uma pergunta do FAQ e observe a animação de altura suave.
   - Ative "Reduzir movimento" no sistema operacional, recarregue a página e confirme que as
     animações são reduzidas/eliminadas (FR-010).

3. **FAQ e depoimentos acessíveis** (US3)
   - Navegue pelo FAQ apenas com teclado (Tab, Enter/Espaço) e confirme foco visível e abertura das
     respostas.
   - Em uma emulação mobile (DevTools ou dispositivo real), arraste a seção de depoimentos e
     confirme que desliza sem gerar scroll horizontal na página.
   - Em desktop, confirme que setas/indicadores permitem navegar pelo carrossel sem arrastar.

4. **Rastreamento de conversão** (US4)
   - Com o Google Analytics configurado (ID real ou de teste), abra o relatório em tempo real e
     confirme o registro de uma visualização de página ao carregar.
   - Clique no CTA flutuante do WhatsApp e confirme o evento `whatsapp_click` no relatório em tempo
     real (ver [`contracts/external-integrations.md`](contracts/external-integrations.md)).

## Auditoria de qualidade

```bash
npm run build
npx lighthouse http://localhost:3000 --view
```

- Performance > 90, Accessibility > 95 (gate da constituição do projeto).
- Cruzar o resultado com o checklist em `docs/plano-qualidade.md` (raiz do repositório) antes de
  considerar a fundação concluída.
