<!--
Sync Impact Report
Version change: [template] → 1.0.0
Modified principles: N/A (initial ratification)
Added sections: Core Principles (I–V), Stack Tecnológico e Restrições, Fluxo de Desenvolvimento e Qualidade, Governance
Removed sections: none
Templates requiring updates: ⚠ pending — plan-template.md, spec-template.md, tasks-template.md, checklist-template.md
  have not yet been checked for alignment with these principles. Review during the next /speckit-plan run.
Follow-up TODOs: none
-->
# Conversion Page — Landing Page Comercial Constitution

## Core Principles

### I. Mobile-First e Performance
Todo componente MUST ser projetado mobile-first e validado antes de qualquer merge. A pontuação
de Performance no Google Lighthouse MUST ser superior a 90, com Core Web Vitals (LCP, CLS, INP)
dentro dos limites "Good" definidos pelo Google.
Rationale: a maior parte do tráfego vem de campanhas pagas/orgânicas em redes móveis (Instagram,
Google), e lentidão eleva diretamente a taxa de rejeição antes do usuário visualizar a proposta
de valor.

### II. HTML Semântico e Acessibilidade
Toda seção MUST usar HTML semântico (`<header>`, `<section>`, `<article>`, `<nav>`) e atender aos
critérios WCAG 2.1 aplicáveis (contraste de cor, `alt` em imagens, `aria-label` em controles
interativos, navegação completa por teclado). A pontuação de Accessibility no Lighthouse MUST ser
superior a 95.
Rationale: acessibilidade amplia o alcance do funil de conversão e é parte do critério de aceite
formal do produto.

### III. SEO Técnico
Toda página MUST configurar metadados via Next.js Metadata API (`title`, `description`,
`keywords`) e tags Open Graph, garantindo pré-visualização correta ao compartilhar o link no
WhatsApp.
Rationale: a descoberta orgânica depende do Google indexar corretamente a página, e o
compartilhamento social é um canal relevante de aquisição de pacientes.

### IV. Simplicidade e Escopo Controlado (Sem Gold Plating)
Implementações MUST se limitar ao escopo definido no Termo de Abertura e na EAP do projeto.
Funcionalidades fora do escopo — como CMS/painel administrativo, sistema de agendamento online,
copywriting e criação de logotipo — MUST NOT ser implementadas sem uma alteração formal de escopo
aprovada pelo patrocinador. Código MUST seguir YAGNI: nenhuma abstração ou dependência deve ser
adicionada sem uso imediato e comprovado.
Rationale: projetos comerciais de pequeno porte dependem de prazo e orçamento enxutos; escopo não
controlado ("gold plating") consome tempo sem gerar valor de negócio proporcional.

### V. Conversão como Métrica de Sucesso
O botão/CTA de WhatsApp MUST estar acessível e funcional a partir de qualquer ponto da página
(botão flutuante fixo) e MUST abrir a conversa com uma mensagem pré-formatada identificando a
origem do contato. Nenhuma mudança de UI/UX MUST degradar a visibilidade ou a taxa de clique do
CTA.
Rationale: a landing page existe para converter visitantes em contatos diretos via WhatsApp — essa
é a métrica de negócio que justifica o projeto.

## Stack Tecnológico e Restrições

- Stack obrigatória: React, Next.js (App Router), TypeScript, Tailwind CSS.
- Hospedagem e deploy contínuo MUST ocorrer via Vercel.
- Otimização de imagens MUST usar o componente `<Image>` do Next.js (WebP/AVIF, lazy-load).
- MUST NOT introduzir backend/CMS/banco de dados além do necessário para servir conteúdo estático
  ou gerado em build/SSG — qualquer necessidade nesse sentido é uma mudança de escopo, não uma
  decisão técnica local.
- O único canal de conversão suportado é o WhatsApp (via link/API oficial); MUST NOT implementar
  formulários de agendamento ou captura de lead que substituam esse fluxo sem aprovação de escopo.

## Fluxo de Desenvolvimento e Qualidade

- Antes de cada deploy para produção, o Checklist de Qualidade (`docs/plano-qualidade.md` na raiz
  do repositório) MUST ser executado e aprovado.
- Auditorias do Google Lighthouse (Performance, Acessibilidade, SEO) MUST ser rodadas e revisadas
  antes de qualquer merge para a branch principal.
- Testes manuais em dispositivos reais (iOS Safari e Android Chrome) MUST ser realizados antes do
  Termo de Aceite (`docs/termo-aceite.md`) ser assinado.
- Lições aprendidas e desvios de plano MUST ser registrados em `docs/licoes-aprendidas.md` ao
  final do projeto.

## Governance

Esta constituição prevalece sobre práticas ad-hoc de desenvolvimento neste projeto. Qualquer
conflito entre esta constituição e outro documento de planejamento (TAP, EAP, README) MUST ser
resolvido em favor desta constituição até que uma emenda formal seja aprovada.

- **Emendas**: qualquer alteração de princípio MUST ser proposta via `/speckit-constitution`,
  revisada e aprovada por Paulo Roberto de Souza Carpinetti (Gerente de Projeto / Desenvolvedor
  Principal), e registrada no Sync Impact Report no topo deste arquivo.
- **Versionamento**: segue Semantic Versioning — MAJOR para remoção/redefinição incompatível de
  princípios, MINOR para adição de princípio ou expansão material de diretrizes, PATCH para
  esclarecimentos e correções de redação.
- **Conformidade**: a aderência aos princípios MUST ser revisada em cada execução de
  `/speckit-plan` e novamente antes de cada deploy de produção (Fase 4 do cronograma).

**Version**: 1.0.0 | **Ratified**: 2026-09-08 | **Last Amended**: 2026-09-08
