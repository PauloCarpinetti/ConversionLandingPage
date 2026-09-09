# Quickstart: Publicando e Validando em Produção

Esta feature envolve conectar o repositório à sua conta na Vercel — uma ação real, na sua conta,
que só você pode autorizar. Os passos abaixo são o roteiro; o agente pode preparar o código
(research.md #2) mas não pode logar na sua conta Vercel por você.

## Pré-requisitos

- `001-project-foundation`, `002-mobile-first-sections` e `003-social-share-card` já implementadas
  e commitadas na branch principal (`main`).
- Uma conta na Vercel (gratuita) conectada à sua conta do GitHub.
- O número de WhatsApp real da clínica (formato E.164 sem símbolos, ex.: `5511999999999`).

## Passo 1: Criar o projeto na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe o repositório
   `PauloCarpinetti/ConversionLandingPage`.
2. Em **Root Directory**, selecione `conversion_page` (research.md #1) — **não** deixe a raiz do
   repositório.
3. A Vercel deve detectar automaticamente o framework Next.js; não é necessário alterar comandos
   de build.

## Passo 2: Configurar as variáveis de ambiente

Em **Project Settings → Environment Variables**, adicione (ambiente "Production"):

| Nome | Valor |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número real da clínica, formato E.164 sem símbolos |
| `NEXT_PUBLIC_GA_ID` | Measurement ID real do Google Analytics (se já existir; senão, deixe sem configurar) |

`NEXT_PUBLIC_SITE_URL` pode ficar de fora por enquanto (research.md #2 resolve isso
automaticamente via `VERCEL_URL`).

## Passo 3: Publicar

Clique em **Deploy**. Ao concluir, a Vercel mostra a URL pública (algo como
`https://conversion-page.vercel.app` ou similar).

## Cenários de validação (mapeados às Acceptance Scenarios da spec)

1. **Acesso público** (US1)
   - Abra a URL pública em uma rede diferente da sua (ex.: dados móveis) e confirme que a página
     carrega por completo, com todas as seções.

2. **Qualidade em produção** (US2)
   ```bash
   npx lighthouse https://<sua-url>.vercel.app --view
   ```
   - Performance > 90, Accessibility > 95 (SC-002, SC-003).

3. **Conversão real** (US3)
   - Em um celular real, abra a URL pública e clique no CTA do WhatsApp — confirme que o WhatsApp
     abre com a mensagem pré-formatada (SC-004).
   - Compartilhe a mesma URL numa conversa do WhatsApp e confirme o card de pré-visualização
     (imagem, título, resumo) — igual ao já preparado em `003-social-share-card`, agora com uma
     URL real (SC-005).

4. **Deploy contínuo** (US4)
   - Faça um pequeno commit na branch principal (ex.: um ajuste de texto) e confirme que a URL
     pública reflete a mudança em poucos minutos, sem nenhum passo manual além do `git push`
     (SC-006).

## Se algo der errado

- **Build falhou**: confira os logs de build no painel da Vercel; a versão anterior (se houver)
  continua no ar automaticamente (FR-007, research.md #5).
- **CTA do WhatsApp não aparece**: confira se `NEXT_PUBLIC_WHATSAPP_NUMBER` foi definida no
  ambiente "Production" (não só "Development"/"Preview").
- **Card de compartilhamento sem imagem**: pode ser cache do WhatsApp/rede social de uma tentativa
  anterior — use a ferramenta de depuração de Open Graph da plataforma para forçar uma nova
  leitura.
