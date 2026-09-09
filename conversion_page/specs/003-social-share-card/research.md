# Phase 0 Research: Cartão de Compartilhamento em Redes Sociais

## 1. Como gerar a imagem de capa

- **Decision**: usar a convenção nativa do Next.js App Router `app/opengraph-image.tsx` com a
  API `ImageResponse` de `next/og`, gerando a imagem via JSX/CSS em vez de um arquivo de imagem
  literal.
- **Rationale**: nenhuma dependência nova é necessária (`next/og` já vem com o Next.js instalado
  desde `001-project-foundation`); permite desenhar um placeholder profissional por código, sem
  precisar de uma ferramenta de design externa ou de uma foto real da clínica. O Next.js injeta
  automaticamente as tags `og:image`/`og:image:width`/`og:image:height`/`og:image:type` a partir
  deste arquivo — nada precisa ser adicionado manualmente em `app/layout.tsx`.
- **Alternatives considered**: arquivo de imagem estático (`app/opengraph-image.png`) desenhado
  externamente — rejeitado por exigir uma ferramenta de design fora do fluxo de código, sem
  ganho real já que o conteúdo (nome da clínica, identidade visual) é simples o bastante para ser
  descrito diretamente em JSX/CSS.

## 2. Dimensões e formato

- **Decision**: 1200×630px, `image/png`, com o conteúdo essencial (nome da clínica) centralizado
  e com margem de segurança nas bordas.
- **Rationale**: é o tamanho universalmente recomendado para Open Graph (Facebook/WhatsApp/
  LinkedIn) — cobre a proporção ~1.91:1 usada pela maioria das plataformas. Centralizar o
  conteúdo essencial atende à FR-006 (legível tanto em recortes mais quadrados quanto mais
  largos), já que plataformas diferentes cortam essa mesma imagem em proporções ligeiramente
  diferentes.
- **Alternatives considered**: dimensões quadradas (1:1) — rejeitado por ser sub-ótimo no
  Facebook/LinkedIn, que esperam a proporção 1.91:1 como padrão.

## 3. Fonte tipográfica

- **Decision**: usar a fonte padrão do motor de renderização do `next/og` (sans-serif do
  sistema), sem carregar um arquivo de fonte customizado.
- **Rationale**: não existe ainda um brand kit/fonte definida para a clínica nos documentos do
  projeto; carregar uma fonte customizada só para esta imagem adicionaria complexidade sem um
  requisito que a justifique (Princípio IV — Simplicidade). Pode ser revisto quando a identidade
  visual real da clínica for definida pelo cliente.
- **Alternatives considered**: reaproveitar a fonte `Geist` já usada no restante da página via
  `next/font` — tecnicamente possível, mas exige carregar o arquivo `.ttf` da fonte manualmente
  para uso dentro do Satori (motor do `next/og`), o que não é trivial com `next/font` e não muda
  o resultado visual o suficiente para justificar o esforço nesta feature.

## 4. Conteúdo visual do placeholder

- **Decision**: nome da clínica ("Clínica Odontológica") em destaque, um ícone temático
  (dente/sorriso) e o mesmo gradiente azul-claro já usado na Hero (`components/sections/hero.tsx`)
  como fundo.
- **Rationale**: reaproveita a identidade visual já estabelecida pela página em vez de inventar
  uma nova, mantendo consistência entre o card de compartilhamento e a primeira impressão de quem
  já clicou no link (FR-002, FR-003).
- **Alternatives considered**: um design completamente novo/diferente do resto da página —
  rejeitado por quebrar a coerência visual entre o "antes" (card) e o "depois" (página) do clique.

## 5. Texto alternativo (alt)

- **Decision**: exportar `alt` descrevendo a clínica (ex.: "Clínica Odontológica — cuide do seu
  sorriso"), usado pelas plataformas quando a imagem não pode ser exibida (FR-007).
- **Rationale**: é a própria convenção do Next.js para isso (`opengraph-image` + export `alt`),
  sem custo adicional.

## Resumo

Nenhuma dependência nova é introduzida por esta feature — `next/og` já faz parte do Next.js
instalado em `001-project-foundation`. Nenhum item `NEEDS CLARIFICATION` pendente.
