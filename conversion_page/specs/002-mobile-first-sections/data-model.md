# Phase 1 Data Model: Seções de Conteúdo Mobile-First

Sem banco de dados (mesma restrição de `001-project-foundation`). As entidades novas desta feature
são tipos TypeScript com conteúdo estático em `lib/content/`, seguindo o mesmo padrão de
`FaqItem`/`Testimonial` já definidos em `lib/types.ts`.

## Serviço (`Service`)

Representa um tratamento oferecido pela clínica, exibido na seção de Serviços.

| Campo         | Tipo        | Descrição                                                        |
|---------------|-------------|---------------------------------------------------------------------|
| `id`          | `string`    | Identificador estável (chave de iteração).                          |
| `name`        | `string`    | Nome do serviço (ex.: "Clareamento Dental").                        |
| `description` | `string`    | Descrição curta do serviço.                                          |
| `icon`        | `LucideIcon`| Ícone associado, per `components/ui/icon.tsx` (research.md #6).      |

## Diferencial (`Differential`)

Representa um motivo para escolher a clínica, exibido na seção de Diferenciais.

| Campo         | Tipo        | Descrição                                          |
|---------------|-------------|-------------------------------------------------------|
| `id`          | `string`    | Identificador estável (chave de iteração).             |
| `title`       | `string`    | Título curto do diferencial.                            |
| `description` | `string`    | Explicação breve.                                        |
| `icon`        | `LucideIcon`| Ícone associado, per `components/ui/icon.tsx`.           |

## Depoimento (`Testimonial`) e Item de FAQ (`FaqItem`)

Já definidos em `001-project-foundation` (`lib/types.ts`). Esta feature apenas popula esses
tipos com conteúdo real/placeholder em `lib/content/`, sem alterar sua forma.

## Relacionamentos

Nenhuma relação entre `Service`, `Differential`, `Testimonial` e `FaqItem` — cada um é consumido de
forma independente por sua respectiva seção (`components/sections/*`).
