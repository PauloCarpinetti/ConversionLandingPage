# Projeto 01 — Landing Page Comercial (Estudo de Caso)

Landing page de alta conversão para uma clínica odontológica, desenvolvida em **React + Next.js + TypeScript + Tailwind CSS**, com deploy contínuo na **Vercel**. Este README documenta o ciclo de vida completo do projeto seguindo os conceitos do PMBOK (Iniciação, Planejamento, Monitoramento e Controle, Encerramento), servindo como estudo de caso de portfólio.

> Cada seção abaixo também existe como arquivo individual em [`docs/`](docs/), caso prefira consultá-las separadamente.

## Sumário

- [Fase de Iniciação](#fase-de-iniciação)
  - [1. Termo de Abertura do Projeto (Project Charter)](#1-termo-de-abertura-do-projeto-project-charter)
  - [2. Registro das Partes Interessadas (Stakeholder Register)](#2-registro-das-partes-interessadas-stakeholder-register)
- [Fase de Planejamento](#fase-de-planejamento)
  - [3. Declaração do Escopo e EAP](#3-declaração-do-escopo-e-eap-estrutura-analítica-do-projeto)
  - [4. Matriz de Rastreabilidade de Requisitos](#4-matriz-de-rastreabilidade-de-requisitos-requirements-traceability-matrix)
- [Fase de Monitoramento e Controle](#fase-de-monitoramento-e-controle)
  - [5. Plano e Checklist de Qualidade](#5-plano-e-checklist-de-qualidade)
- [Fase de Encerramento](#fase-de-encerramento)
  - [6. Registro de Lições Aprendidas](#6-registro-de-lições-aprendidas-lessons-learned)
  - [7. Termo de Aceite](#7-termo-de-aceite-formal-acceptance)

---

## Fase de Iniciação

### 1. Termo de Abertura do Projeto (Project Charter)

Este documento formaliza a existência do projeto, estabelece os limites de escopo e confere autoridade ao desenvolvedor/gerente do projeto para aplicar recursos na sua execução.

#### Informações Básicas

- **Nome do Projeto:** Projeto 01 — Landing Page Comercial
- **Segmento:** Clínica Odontológica
- **Gerente de Projeto / Desenvolvedor Principal:** Paulo Roberto de Souza Carpinetti
- **Patrocinador (Sponsor):** Proprietário da Clínica Odontológica (Cliente)

#### Justificativa e Propósito do Projeto (Business Case)

A clínica necessita de um canal otimizado para receber tráfego proveniente de campanhas pagas e orgânicas (Instagram e Google) e convertê-lo em contatos diretos. O projeto visa construir uma Landing Page de alta conversão, eliminando atritos no fluxo do usuário até o acionamento do atendimento comercial via WhatsApp. O projeto também atende ao objetivo comercial estratégico do desenvolvedor de possuir um produto de prateleira para responder rapidamente a demandas de pequenos negócios.

#### Objetivos e Critérios de Sucesso

- **Técnico:** Implementação de código limpo demonstrando proficiência em React, Next.js e TypeScript, validado por pontuações altas no Google Lighthouse (Performance, Acessibilidade e SEO).
- **Negócio:** Redirecionamento eficiente do visitante para o WhatsApp através de um fluxo narrativo claro (Proposta de valor → Serviços → Diferenciais → Depoimentos → FAQ → CTA).
- **Design:** Entrega de uma interface estritamente Mobile-first, responsiva e com excelente UX/UI baseada em Tailwind CSS.

#### Requisitos de Alto Nível

- **Stack Tecnológico:** Next.js, React, TypeScript, Tailwind CSS.
- **Infraestrutura:** Deploy contínuo via Vercel.
- **Funcionalidades Críticas:** HTML Semântico, Botão flutuante/CTA para WhatsApp, metadados Open Graph configurados, e aderência a padrões básicos de acessibilidade (WCAG).

#### Riscos de Alto Nível (Premissas e Restrições)

- **Risco:** Tempo de carregamento elevado em conexões 3G/4G móveis, o que pode aumentar a taxa de rejeição antes do usuário visualizar a proposta de valor.
- **Mitigação:** Otimização agressiva de imagens, carregamento lazy-load e utilização do Next.js para renderização eficiente.

#### Marcos do Cronograma (Milestones Preliminares)

- **Fase 1:** Setup da arquitetura (Next.js + TypeScript + Tailwind) e repositório.
- **Fase 2:** Desenvolvimento da interface (Mobile-first) e estruturação do fluxo (Hero até FAQ).
- **Fase 3:** Implementação de SEO (Open Graph, Meta tags) e testes de acessibilidade.
- **Fase 4:** Deploy na Vercel e validação de links (WhatsApp).

### 2. Registro das Partes Interessadas (Stakeholder Register)

Este documento identifica quem é impactado pelo projeto e como gerenciar o engajamento dessas pessoas. Para um portfólio de software, isso demonstra que você não apenas escreve código, mas entende o impacto no negócio e nos usuários finais.

#### Cliente / Clínica

- **Papel no Projeto:** Patrocinador (Sponsor)
- **Interesse:** Alto
- **Influência:** Alta
- **Requisitos Principais:** Aumento de conversões; design que transmita confiança e higiene; facilidade de manutenção.
- **Estratégia de Engajamento:** Manter informado sobre o alinhamento entre o design e a identidade visual da clínica. Mostrar o fluxo de conversão.

#### Pacientes

- **Papel no Projeto:** Usuários Finais
- **Interesse:** Alto
- **Influência:** Baixa
- **Requisitos Principais:** Navegação rápida no celular; clareza sobre serviços odontológicos e facilidade para agendar via WhatsApp.
- **Estratégia de Engajamento:** Foco total na experiência do usuário (UX) e performance Mobile-first. Garantir acessibilidade visual.

#### Paulo R. S. Carpinetti

- **Papel no Projeto:** Gerente e Desenvolvedor
- **Interesse:** Alto
- **Influência:** Alta
- **Requisitos Principais:** Entregar um código padronizado; validar a arquitetura; gerar um case de sucesso comercial e técnico.
- **Estratégia de Engajamento:** Gerenciar o escopo de forma rigorosa para evitar gold plating (adicionar recursos não solicitados) e garantir um deploy rápido.

#### Algoritmos (Google)

- **Papel no Projeto:** Sistema Intermediário
- **Interesse:** Alto
- **Influência:** Alta
- **Requisitos Principais:** Core Web Vitals dentro dos padrões (LCP, CLS, INP); HTML semântico e dados estruturados; metadados de SEO e Open Graph corretos; acessibilidade (WCAG); indexabilidade mobile-first.
- **Estratégia de Engajamento:** Seguir as boas práticas de SEO técnico do Next.js (Metadata API, sitemap, robots.txt) e validar continuamente as métricas via Google Lighthouse e Search Console antes de cada deploy.

---

## Fase de Planejamento

### 3. Declaração do Escopo e EAP (Estrutura Analítica do Projeto)

Em projetos comerciais menores, delimitar o que não será feito é tão importante quanto definir o que será feito. Isso protege o seu tempo e o orçamento do cliente. A EAP (ou WBS - Work Breakdown Structure) quebra o trabalho em pacotes menores e gerenciáveis.

#### Escopo do Produto

Uma landing page Single-Page Application (SPA) desenvolvida em React/Next.js, contendo as seções: Hero, Serviços, Diferenciais, Depoimentos e FAQ, finalizando com um CTA para o WhatsApp.

#### Critérios de Aceitação

- Pontuação acima de 90 no Google Lighthouse (Performance, SEO e Acessibilidade).
- Layout 100% responsivo validado em telas de 320px a 1920px.

#### Exclusões do Escopo (O que NÃO está incluso)

- Criação de logotipo.
- Produção de textos (copywriting ficará a cargo do cliente/clínica).
- Painel administrativo (CMS) para edição de conteúdo.
- Sistema de agendamento online (tudo será via WhatsApp).

#### EAP (Pacotes de Trabalho)

- **1.0 Engenharia de Frontend** — Setup Next.js, Tailwind, Configuração do Repositório.
- **2.0 UI/UX** — Implementação Mobile-first das seções Hero até FAQ.
- **3.0 Integrações** — Configuração da API do WhatsApp, metadados Open Graph.
- **4.0 Deploy e Qualidade** — Hospedagem na Vercel, auditoria de código.

### 4. Matriz de Rastreabilidade de Requisitos (Requirements Traceability Matrix)

#### REQ-01 — Interface / UI

**Requisito de Negócio:** Proposta de Valor (Hero Section): O paciente precisa entender imediatamente o que a clínica faz e sentir confiança ao abrir o site.

**Solução Técnica / Arquitetura:** Componente `<Hero.tsx>` utilizando a tag semântica `<header>`. Uso de tipografia em destaque (H1) e imagem de fundo otimizada via Tailwind.

**Critério de Aceite:** A seção deve renderizar perfeitamente "acima da dobra" (above the fold) em telas de 320px (Mobile).

#### REQ-02 — Funcional

**Requisito de Negócio:** Serviços Oferecidos: Apresentar os tratamentos (ex: Clareamento, Implantes, Ortodontia) de forma clara e visual.

**Solução Técnica / Arquitetura:** Componente `<ServicesGrid.tsx>` utilizando CSS Grid do Tailwind (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).

**Critério de Aceite:** Renderização responsiva sem quebra de layout; uso de ícones SVG leves para cada serviço.

#### REQ-03 — Interface / UX

**Requisito de Negócio:** Diferenciais: Destacar por que escolher esta clínica (ex: equipamentos modernos, atendimento humanizado).

**Solução Técnica / Arquitetura:** Componente `<Features.tsx>` com uso de tags `<section>` e `<article>` (HTML semântico).

**Critério de Aceite:** Leitura escaneável, com alto contraste de cores validado pelo WCAG.

#### REQ-04 — Funcional

**Requisito de Negócio:** Depoimentos (Prova Social): Mostrar avaliações reais de pacientes para aumentar a conversão.

**Solução Técnica / Arquitetura:** Componente `<Testimonials.tsx>` populado iterativamente via `.map()` no React a partir de um array de dados (mock).

**Critério de Aceite:** O componente não deve ultrapassar a largura da tela (`overflow-x hidden`).

#### REQ-05 — Funcional

**Requisito de Negócio:** FAQ (Redução de objeções): Responder dúvidas comuns (aceita convênio? onde fica?) para poupar tempo da recepção.

**Solução Técnica / Arquitetura:** Componente `<Accordion.tsx>` gerenciando estado local (`useState`) no React para abrir/fechar as respostas.

**Critério de Aceite:** Transição suave (`animate`/`transition` do Tailwind) ao abrir a resposta, melhorando a UX.

#### REQ-06 — Funcional (Crítico)

**Requisito de Negócio:** Conversão (CTA WhatsApp): O paciente deve conseguir agendar a consulta facilmente de qualquer lugar da página.

**Solução Técnica / Arquitetura:** Componente `<FloatingWhatsApp.tsx>` fixado (`fixed bottom-4 right-4`). Link da API do WhatsApp com mensagem pré-formatada.

**Critério de Aceite:** O clique deve abrir diretamente o app do WhatsApp no celular ou o WhatsApp Web no desktop.

#### REQ-07 — Não-Funcional

**Requisito de Negócio:** Performance (Mobile-First): Visitantes de campanhas do Instagram em redes 4G não podem abandonar o site por lentidão.

**Solução Técnica / Arquitetura:** Uso intensivo do componente `<Image/>` do Next.js (conversão automática para WebP) e hospedagem Edge na Vercel.

**Critério de Aceite:** Pontuação de Performance > 90 no Google Lighthouse / Core Web Vitals.

#### REQ-08 — Não-Funcional

**Requisito de Negócio:** SEO Local e Open Graph: A página deve ser encontrada no Google e exibir um "card" bonito ao ser compartilhada no WhatsApp.

**Solução Técnica / Arquitetura:** Uso da API de Metadata do Next.js (App Router) para configurar `title`, `description`, `keywords` e tags `<meta property="og:...">`.

**Critério de Aceite:** Links compartilhados no WhatsApp devem carregar a imagem de capa, título e resumo da clínica.

#### REQ-09 — Não-Funcional

**Requisito de Negócio:** Acessibilidade (UX Inclusiva): Garantir navegação para pessoas com deficiência visual (leitores de tela) e por teclado.

**Solução Técnica / Arquitetura:** Adição de atributos `aria-label` nos botões, atributos `alt` em todas as imagens e contraste adequado (Tailwind).

**Critério de Aceite:** Pontuação de Accessibility > 95 no Google Lighthouse. Navegação por "Tab".

---

## Fase de Monitoramento e Controle

### 5. Plano e Checklist de Qualidade

Mostrar como você garante a qualidade do que entrega é um grande diferencial competitivo. Um cliente de pequeno negócio quer ter certeza de que o site vai funcionar no celular dos pacientes dele.

#### Padrões Adotados

- WCAG 2.1 (Acessibilidade)
- Core Web Vitals (Google)

#### Checklist de Entrega

- [ ] As imagens estão em formato WebP/AVIF via `next/image`? — **N/A**: a landing page não usa fotos reais/`next/image`; a única imagem gerada (`opengraph-image`) é um PNG via `next/og`, convenção própria do Next.js
- [x] O contraste de cores das fontes foi aprovado em validadores de acessibilidade? — confirmado: Lighthouse/PageSpeed Insights Accessibility 100/100 em produção (`004-production-deploy` T006)
- [ ] Os links âncora (navegação suave) funcionam corretamente entre as seções? — **N/A**: esta landing page não implementa navegação âncora entre seções
- [x] A mensagem padrão do WhatsApp contém a origem (ex: "Olá, vim pelo site da clínica e gostaria de agendar...")? — confirmado em produção, link real: `wa.me/...?text=Olá,%20vim%20pelo%20site%20da%20clínica...`
- [ ] Teste em dispositivos reais (iOS Safari e Android Chrome) concluído? — **Parcial**: confirmado em Android Chrome (CTA do WhatsApp e card de compartilhamento, `004-production-deploy` T005/T007/T008); iOS Safari não testado

---

## Fase de Encerramento

### 6. Registro de Lições Aprendidas (Lessons Learned)

Todo bom case study tem uma seção de "Desafios e Soluções" ou "Lições Aprendidas". O PMBOK exige a documentação do conhecimento adquirido. Isso demonstra humildade, transparência e capacidade de evolução.

#### Desafio Encontrado

Dificuldade inicial em manter a semântica do HTML ao estilizar listas complexas na seção de "Serviços" usando utilitários do Tailwind.

#### Solução Aplicada

Refatoração do componente para utilizar CSS Grid nativo aliado ao Tailwind, separando a lógica de apresentação no React, o que reduziu o excesso de classes no JSX.

#### Oportunidade Futura

Para os próximos projetos comerciais de pequeno porte, criar um template base ("boilerplate") no GitHub com o setup do Next.js + Tailwind + Componentes base de SEO já configurados, acelerando o tempo da primeira entrega.

### 7. Termo de Aceite (Formal Acceptance)

Finalize o projeto documentando a entrega formal. No portfólio, isso pode ser traduzido como a comprovação de que o projeto atingiu os objetivos.

- **Entregável:** Link de produção na Vercel ativo — [conversion-landing-page-psi.vercel.app](https://conversion-landing-page-psi.vercel.app).
- **Validação:** Cliente confirmou o recebimento de mensagens no WhatsApp através da Landing Page.
- **Métricas de Sucesso Atingidas:** Performance 94/100 e Accessibility 100/100 (mobile) — [relatório PageSpeed Insights](https://pagespeed.web.dev/analysis/https-conversion-landing-page-psi-vercel-app/zl9sq2ye0x?form_factor=mobile).
