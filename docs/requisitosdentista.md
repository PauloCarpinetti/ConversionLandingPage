# Matriz de Rastreabilidade de Requisitos (Requirements Traceability Matrix)

## REQ-01 — Interface / UI

**Requisito de Negócio:** Proposta de Valor (Hero Section): O paciente precisa entender imediatamente o que a clínica faz e sentir confiança ao abrir o site.

**Solução Técnica / Arquitetura:** Componente `<Hero.tsx>` utilizando a tag semântica `<header>`. Uso de tipografia em destaque (H1) e imagem de fundo otimizada via Tailwind.

**Critério de Aceite:** A seção deve renderizar perfeitamente "acima da dobra" (above the fold) em telas de 320px (Mobile).

## REQ-02 — Funcional

**Requisito de Negócio:** Serviços Oferecidos: Apresentar os tratamentos (ex: Clareamento, Implantes, Ortodontia) de forma clara e visual.

**Solução Técnica / Arquitetura:** Componente `<ServicesGrid.tsx>` utilizando CSS Grid do Tailwind (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).

**Critério de Aceite:** Renderização responsiva sem quebra de layout; uso de ícones SVG leves para cada serviço.

## REQ-03 — Interface / UX

**Requisito de Negócio:** Diferenciais: Destacar por que escolher esta clínica (ex: equipamentos modernos, atendimento humanizado).

**Solução Técnica / Arquitetura:** Componente `<Features.tsx>` com uso de tags `<section>` e `<article>` (HTML semântico).

**Critério de Aceite:** Leitura escaneável, com alto contraste de cores validado pelo WCAG.

## REQ-04 — Funcional

**Requisito de Negócio:** Depoimentos (Prova Social): Mostrar avaliações reais de pacientes para aumentar a conversão.

**Solução Técnica / Arquitetura:** Componente `<Testimonials.tsx>` populado iterativamente via `.map()` no React a partir de um array de dados (mock).

**Critério de Aceite:** O componente não deve ultrapassar a largura da tela (`overflow-x hidden`).

## REQ-05 — Funcional

**Requisito de Negócio:** FAQ (Redução de objeções): Responder dúvidas comuns (aceita convênio? onde fica?) para poupar tempo da recepção.

**Solução Técnica / Arquitetura:** Componente `<Accordion.tsx>` gerenciando estado local (`useState`) no React para abrir/fechar as respostas.

**Critério de Aceite:** Transição suave (`animate`/`transition` do Tailwind) ao abrir a resposta, melhorando a UX.

## REQ-06 — Funcional (Crítico)

**Requisito de Negócio:** Conversão (CTA WhatsApp): O paciente deve conseguir agendar a consulta facilmente de qualquer lugar da página.

**Solução Técnica / Arquitetura:** Componente `<FloatingWhatsApp.tsx>` fixado (`fixed bottom-4 right-4`). Link da API do WhatsApp com mensagem pré-formatada.

**Critério de Aceite:** O clique deve abrir diretamente o app do WhatsApp no celular ou o WhatsApp Web no desktop.

## REQ-07 — Não-Funcional

**Requisito de Negócio:** Performance (Mobile-First): Visitantes de campanhas do Instagram em redes 4G não podem abandonar o site por lentidão.

**Solução Técnica / Arquitetura:** Uso intensivo do componente `<Image/>` do Next.js (conversão automática para WebP) e hospedagem Edge na Vercel.

**Critério de Aceite:** Pontuação de Performance > 90 no Google Lighthouse / Core Web Vitals.

## REQ-08 — Não-Funcional

**Requisito de Negócio:** SEO Local e Open Graph: A página deve ser encontrada no Google e exibir um "card" bonito ao ser compartilhada no WhatsApp.

**Solução Técnica / Arquitetura:** Uso da API de Metadata do Next.js (App Router) para configurar `title`, `description`, `keywords` e tags `<meta property="og:...">`.

**Critério de Aceite:** Links compartilhados no WhatsApp devem carregar a imagem de capa, título e resumo da clínica.

## REQ-09 — Não-Funcional

**Requisito de Negócio:** Acessibilidade (UX Inclusiva): Garantir navegação para pessoas com deficiência visual (leitores de tela) e por teclado.

**Solução Técnica / Arquitetura:** Adição de atributos `aria-label` nos botões, atributos `alt` em todas as imagens e contraste adequado (Tailwind).

**Critério de Aceite:** Pontuação de Accessibility > 95 no Google Lighthouse. Navegação por "Tab".
