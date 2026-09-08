# 1. Termo de Abertura do Projeto (Project Charter)

Este documento formaliza a existência do projeto, estabelece os limites de escopo e confere autoridade ao desenvolvedor/gerente do projeto para aplicar recursos na sua execução.

## Informações Básicas

- **Nome do Projeto:** Projeto 01 — Landing Page Comercial
- **Segmento:** Clínica Odontológica
- **Gerente de Projeto / Desenvolvedor Principal:** Paulo Roberto de Souza Carpinetti
- **Patrocinador (Sponsor):** Proprietário da Clínica Odontológica (Cliente)

## Justificativa e Propósito do Projeto (Business Case)

A clínica necessita de um canal otimizado para receber tráfego proveniente de campanhas pagas e orgânicas (Instagram e Google) e convertê-lo em contatos diretos. O projeto visa construir uma Landing Page de alta conversão, eliminando atritos no fluxo do usuário até o acionamento do atendimento comercial via WhatsApp. O projeto também atende ao objetivo comercial estratégico do desenvolvedor de possuir um produto de prateleira para responder rapidamente a demandas de pequenos negócios.

## Objetivos e Critérios de Sucesso

- **Técnico:** Implementação de código limpo demonstrando proficiência em React, Next.js e TypeScript, validado por pontuações altas no Google Lighthouse (Performance, Acessibilidade e SEO).
- **Negócio:** Redirecionamento eficiente do visitante para o WhatsApp através de um fluxo narrativo claro (Proposta de valor → Serviços → Diferenciais → Depoimentos → FAQ → CTA).
- **Design:** Entrega de uma interface estritamente Mobile-first, responsiva e com excelente UX/UI baseada em Tailwind CSS.

## Requisitos de Alto Nível

- **Stack Tecnológico:** Next.js, React, TypeScript, Tailwind CSS.
- **Infraestrutura:** Deploy contínuo via Vercel.
- **Funcionalidades Críticas:** HTML Semântico, Botão flutuante/CTA para WhatsApp, metadados Open Graph configurados, e aderência a padrões básicos de acessibilidade (WCAG).

## Riscos de Alto Nível (Premissas e Restrições)

- **Risco:** Tempo de carregamento elevado em conexões 3G/4G móveis, o que pode aumentar a taxa de rejeição antes do usuário visualizar a proposta de valor.
- **Mitigação:** Otimização agressiva de imagens, carregamento lazy-load e utilização do Next.js para renderização eficiente.

## Marcos do Cronograma (Milestones Preliminares)

- **Fase 1:** Setup da arquitetura (Next.js + TypeScript + Tailwind) e repositório.
- **Fase 2:** Desenvolvimento da interface (Mobile-first) e estruturação do fluxo (Hero até FAQ).
- **Fase 3:** Implementação de SEO (Open Graph, Meta tags) e testes de acessibilidade.
- **Fase 4:** Deploy na Vercel e validação de links (WhatsApp).
