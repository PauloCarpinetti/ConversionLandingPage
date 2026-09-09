# Phase 0 Research: Deploy e Qualidade em Produção

## 1. Diretório raiz do projeto na Vercel

- **Decision**: ao criar o projeto na Vercel, configurar o **Root Directory** como `conversion_page`
  (não a raiz do repositório).
- **Rationale**: o repositório git tem `docs/` e outros arquivos na raiz; o app Next.js de fato
  fica em `conversion_page/` (com seu próprio `package.json`). Sem essa configuração, a Vercel
  tentaria rodar o build a partir da raiz do repositório e falharia por não encontrar um
  `package.json` ali.
- **Alternatives considered**: mover o app Next.js para a raiz do repositório — rejeitado por
  reestruturar todo o projeto sem necessidade; a Vercel já suporta nativamente apontar para um
  subdiretório via configuração do projeto, sem exigir nenhuma mudança de código.

## 2. Resolução da URL pública para Open Graph (`metadataBase`)

- **Decision**: em `app/layout.tsx`, resolver `metadataBase` nesta ordem de prioridade:
  `NEXT_PUBLIC_SITE_URL` (se definida) → `https://${VERCEL_URL}` (variável de ambiente que a
  própria Vercel injeta automaticamente em todo deploy, sem nenhuma configuração manual) →
  `http://localhost:3000` (fallback local).
- **Rationale**: resolve o problema de "ovo e galinha" identificado durante `003-social-share-card`
  (não dá para saber a URL final antes do primeiro deploy). Com `VERCEL_URL`, o `og:image` já
  funciona corretamente desde o primeiro deploy, sem exigir que o usuário descubra e configure a
  URL manualmente antes. `NEXT_PUBLIC_SITE_URL` continua disponível como override, útil quando um
  domínio próprio for configurado no futuro (Assumptions da spec).
- **Alternatives considered**: exigir que o usuário sempre configure `NEXT_PUBLIC_SITE_URL`
  manualmente antes do primeiro deploy — rejeitado por ser um passo manual evitável e propenso a
  erro (foi exatamente a falta desse valor que já causou um bug real em `003-social-share-card`).

## 3. Arquivo de configuração da Vercel

- **Decision**: nenhum `vercel.json` é necessário. A Vercel detecta Next.js automaticamente
  (framework, comando de build, diretório de saída) sem configuração adicional.
- **Rationale**: princípio de simplicidade — não há redirecionamentos, headers customizados ou
  necessidade de sobrescrever o comportamento padrão da plataforma.
- **Alternatives considered**: nenhuma — não haveria o que configurar.

## 4. Variáveis de ambiente em produção

- **Decision**: configurar `NEXT_PUBLIC_GA_ID` e `NEXT_PUBLIC_WHATSAPP_NUMBER` diretamente no
  painel da Vercel (Project Settings → Environment Variables), com os valores reais da clínica.
  `NEXT_PUBLIC_SITE_URL` fica **opcional** nesta fase (research.md #2 já resolve isso via
  `VERCEL_URL`), reservada para quando um domínio próprio existir.
- **Rationale**: mantém segredos/configuração fora do código-fonte (FR-003), reaproveitando
  exatamente as variáveis já definidas e documentadas em `.env.local.example` desde as features
  anteriores — nenhuma variável nova é introduzida.
- **Alternatives considered**: nenhuma — é o mecanismo padrão e já documentado no projeto.

## 5. Estratégia de rollback em caso de falha de deploy

- **Decision**: nenhuma ação de código é necessária — a Vercel mantém automaticamente a última
  build de produção bem-sucedida no ar caso uma nova build falhe, e permite reverter para qualquer
  deploy anterior pelo painel em poucos cliques.
- **Rationale**: atende FR-007 usando um recurso nativo da plataforma já escolhida pela
  constituição do projeto, sem exigir nenhuma configuração ou script adicional.
- **Alternatives considered**: nenhuma — reimplementar isso manualmente seria redundante e
  contrariaria o Princípio IV (Simplicidade).

## 6. Auditoria de qualidade contra produção

- **Decision**: rodar a mesma auditoria Lighthouse já usada durante o desenvolvimento
  (`npx lighthouse <url> --view`), desta vez apontando para a URL pública em vez de localhost.
- **Rationale**: reaproveita a ferramenta e o processo já estabelecidos (`specs/001-.../tasks.md`
  T023, `specs/002-.../tasks.md` T024, `specs/003-.../tasks.md` T007); a única mudança é o alvo da
  auditoria, que passa a ser o ambiente real — exatamente a medição que faltava.
- **Alternatives considered**: usar o PageSpeed Insights (também baseado em Lighthouse, hospedado
  pelo Google) como alternativa/complemento — não é necessário como decisão desta feature, mas
  fica registrado como uma opção equivalente caso o usuário prefira rodar por conta própria depois.

## Resumo

Uma única mudança de código é necessária (research.md #2, `metadataBase` com fallback para
`VERCEL_URL`). O restante desta feature é configuração de plataforma e validação manual — não há
nenhuma dependência nova. Nenhum item `NEEDS CLARIFICATION` pendente.
