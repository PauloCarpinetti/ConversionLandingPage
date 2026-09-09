# Phase 1 Data Model: Cartão de Compartilhamento em Redes Sociais

Nenhuma entidade de dados nova. A "Imagem de Capa" descrita em `spec.md` não é um dado
persistido — é um artefato visual gerado em build-time por `app/opengraph-image.tsx`, sem
parâmetros de entrada (a página é uma única rota estática, sem variações por usuário ou conteúdo
dinâmico).

## Metadados de configuração (constantes no código, não "dados")

| Constante     | Valor              | Origem                                                    |
|---------------|---------------------|------------------------------------------------------------|
| `alt`         | Texto descritivo da clínica | research.md #5                                     |
| `size`        | `{ width: 1200, height: 630 }` | research.md #2                                  |
| `contentType` | `"image/png"`        | research.md #2                                             |

Sem relacionamentos — este arquivo não interage com nenhuma outra entidade do projeto
(`FaqItem`, `Testimonial`, `Service`, `Differential`), apenas reaproveita visualmente o texto do
nome da clínica e a paleta de cor já definidos em `app/layout.tsx` e
`components/sections/hero.tsx`.
