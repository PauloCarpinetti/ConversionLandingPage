# Quickstart: Validando o Cartão de Compartilhamento

## Pré-requisitos

- `001-project-foundation` e `002-mobile-first-sections` já implementadas.

## Setup

```bash
cd conversion_page
npm run build
npm run start
```

A imagem gerada é estática (build-time); `npm run dev` também funciona, mas `build` é o que
representa o comportamento real de produção.

## Cenários de validação (mapeados às Acceptance Scenarios da spec)

1. **Ver a imagem gerada diretamente**
   - Acesse `http://localhost:3000/opengraph-image` (ou a rota equivalente gerada pelo Next.js)
     e confirme que a imagem renderiza corretamente, com o nome da clínica legível.

2. **Conferir as tags via HTML**
   - Veja o código-fonte da página (`view-source:`) e confirme a presença de
     `<meta property="og:image" ...>`, `<meta property="og:image:width" content="1200">` e
     `<meta property="og:image:height" content="630">`.

3. **Testar em uma ferramenta de depuração de Open Graph** (cenário 1 e 2 da spec)
   - Faça deploy (ou exponha a URL local via um túnel) e cole a URL em uma ferramenta de
     depuração de Open Graph, ou compartilhe diretamente em uma conversa do WhatsApp.
   - Confirme que o card mostra imagem, título e resumo da clínica.

4. **Testar legibilidade em miniatura** (cenário 3 da spec)
   - Reduza a visualização da imagem gerada (zoom out ou redimensionar) e confirme que o nome da
     clínica continua identificável.

## Auditoria de qualidade

```bash
npx lighthouse http://localhost:3000 --view
```

- Performance MUST permanecer igual à medição anterior (SC-003) — a imagem de capa não deve
  aparecer como recurso carregado pelo navegador do visitante comum, já que é buscada apenas
  pela plataforma de compartilhamento ao gerar o preview.
