# Phase 1 Data Model: Deploy e Qualidade em Produção

Nenhuma entidade de dados de aplicação é introduzida por esta feature. O "Ambiente de Produção"
descrito em `spec.md` é uma configuração de plataforma (Vercel), não um dado manipulado pelo
código-fonte.

## Configuração de ambiente (não é "dado" da aplicação)

| Variável                       | Onde é definida        | Obrigatória em produção? | Efeito se ausente                          |
|---------------------------------|-------------------------|---------------------------|---------------------------------------------|
| `NEXT_PUBLIC_GA_ID`              | Painel da Vercel         | Não                        | `<GoogleAnalytics>` não é montado (FR-008)  |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`    | Painel da Vercel         | Sim (para US3 funcionar)   | CTA flutuante não renderiza (FR-008)        |
| `NEXT_PUBLIC_SITE_URL`           | Painel da Vercel         | Não (research.md #2)       | Cai para `VERCEL_URL`, depois `localhost`   |

Sem relacionamentos — esta feature não introduz nenhuma entidade nova que se relacione com
`Service`, `Differential`, `Testimonial` ou `FaqItem` das features anteriores.
