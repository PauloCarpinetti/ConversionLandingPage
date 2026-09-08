# Feature Specification: Fundação Técnica do Projeto

**Feature Branch**: `001-project-foundation`

**Created**: 2026-09-08

**Status**: Draft

**Input**: User description: "Fundação do projeto incluindo a instalação de lucide-react (ícones), framer-motion (animações e transições para UX e FAQ), @radix-ui/react-accordion (FAQ acessível), embla-carousel-react (carrossel de depoimentos arrastável no mobile), clsx e tailwind-merge (composição de classes), e @next/third-parties (tracking e analytics)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ícones e utilitários de estilo consistentes (Priority: P1)

Como desenvolvedor construindo as seções da landing page, preciso de uma biblioteca de ícones leve e de utilitários para compor classes Tailwind condicionalmente, para que cada seção (Hero, Serviços, Diferenciais, FAQ) use ícones visuais consistentes sem duplicar lógica de estilo condicional entre componentes.

**Why this priority**: É a base usada por praticamente todos os outros componentes visuais da página; sem isso, o desenvolvimento das seções fica bloqueado ou inconsistente.

**Independent Test**: Pode ser validado importando um ícone (`lucide-react`) e uma função de composição de classes (`clsx` + `tailwind-merge`) em um componente de teste e confirmando que renderizam e resolvem conflitos de classes Tailwind corretamente.

**Acceptance Scenarios**:

1. **Given** o projeto Next.js configurado, **When** um componente importa um ícone de `lucide-react`, **Then** o ícone é renderizado como SVG sem erros de build.
2. **Given** duas classes Tailwind conflitantes passadas condicionalmente, **When** elas são combinadas via `clsx` + `tailwind-merge`, **Then** apenas a classe de maior precedência (a mais específica/última) permanece no resultado final, sem duplicidade.

---

### User Story 2 - Animações e transições premium (Priority: P1)

Como visitante da landing page, quero que os elementos surjam suavemente ao rolar a página e que o FAQ abra/feche com uma transição fluida, para que a experiência transmita uma sensação "premium" e profissional da clínica.

**Why this priority**: Faz parte direta do objetivo de design do projeto (UX/UI de alta qualidade) e afeta a percepção de confiança do paciente logo no primeiro contato com a página — impacto direto na conversão.

**Independent Test**: Pode ser testado isoladamente animando a Hero Section ao carregar a página e o accordion do FAQ ao abrir/fechar, observando visualmente a transição suave sem necessidade das demais seções estarem prontas.

**Acceptance Scenarios**:

1. **Given** a página carregada, **When** o usuário rola até uma seção fora da viewport inicial, **Then** os elementos daquela seção surgem com uma transição de entrada suave (fade/slide), em vez de aparecerem abruptamente.
2. **Given** o FAQ renderizado, **When** o usuário clica em uma pergunta, **Then** a resposta expande com uma animação de altura suave, e recolhe da mesma forma ao ser clicada novamente.

---

### User Story 3 - FAQ e depoimentos acessíveis e utilizáveis no mobile (Priority: P2)

Como paciente acessando pelo celular, quero conseguir abrir as perguntas do FAQ (inclusive usando teclado/leitor de tela) e navegar pelos depoimentos de outros pacientes de forma natural por gesto de arrastar, para tirar minhas dúvidas e ganhar confiança antes de agendar uma consulta.

**Why this priority**: Suporta diretamente dois objetivos do Termo de Abertura: redução de objeções (FAQ) e prova social (depoimentos), com o requisito de acessibilidade (WCAG) já estabelecido na constituição do projeto.

**Independent Test**: O FAQ pode ser testado navegando somente por teclado (Tab/Enter/Espaço) e validando o comportamento com leitor de tela; o carrossel de depoimentos pode ser testado isoladamente arrastando os cards em um dispositivo touch/emulado sem depender de outras seções.

**Acceptance Scenarios**:

1. **Given** o FAQ renderizado, **When** o usuário navega apenas via teclado, **Then** cada pergunta é focável e pode ser aberta/fechada com Enter ou Espaço, com o estado (aberto/fechado) anunciado corretamente por leitores de tela.
2. **Given** a seção de depoimentos em uma tela mobile, **When** o usuário arrasta horizontalmente, **Then** os depoimentos deslizam suavemente entre si, permanecendo dentro dos limites da tela (sem overflow horizontal da página).

---

### User Story 4 - Rastreamento de conversão (Priority: P1)

Como responsável pela clínica (patrocinador), quero saber quantos visitantes clicam no botão do WhatsApp e como chegaram até a página, para avaliar o retorno das campanhas pagas e orgânicas que direcionam tráfego à landing page.

**Why this priority**: É a métrica de sucesso central do projeto (conversão via WhatsApp definida na constituição); sem rastreamento, não é possível validar se o objetivo de negócio do projeto foi atingido.

**Independent Test**: Pode ser validado de forma isolada verificando que um evento de analytics é disparado ao clicar no CTA de WhatsApp, mesmo antes das demais seções da página estarem finalizadas.

**Acceptance Scenarios**:

1. **Given** a integração de analytics configurada, **When** a página é carregada, **Then** uma visualização de página é registrada na ferramenta de analytics.
2. **Given** a integração de analytics configurada, **When** o usuário clica no CTA flutuante do WhatsApp, **Then** um evento de conversão distinto é registrado, identificável separadamente das visualizações de página.

### Edge Cases

- O que acontece se o JavaScript de animação falhar ao carregar (ex: bloqueador de scripts)? O conteúdo e o CTA do WhatsApp MUST permanecer visíveis e funcionais mesmo sem animação (progressive enhancement).
- Como o sistema se comporta quando o usuário tem a preferência "reduzir movimento" (`prefers-reduced-motion`) ativada no sistema operacional? As transições MUST ser reduzidas ou removidas nesse caso.
- O que acontece se o script de analytics for bloqueado por um ad-blocker? A página e o CTA do WhatsApp MUST continuar funcionando normalmente; apenas o rastreamento fica indisponível.
- Como o carrossel de depoimentos se comporta em uma tela desktop larga, onde o gesto de arrastar não é o padrão de interação? Deve permanecer navegável (ex: por setas/indicadores), sem depender exclusivamente do gesto de arrastar.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O projeto MUST disponibilizar um conjunto consistente de ícones SVG utilizável em qualquer componente das seções da landing page.
- **FR-002**: O projeto MUST disponibilizar um mecanismo de composição de classes CSS condicionais compatível com Tailwind, evitando conflitos de classes duplicadas ou contraditórias.
- **FR-003**: O projeto MUST disponibilizar uma capacidade de animação reutilizável, capaz de animar a entrada de elementos ao rolar a página e transições de abertura/fechamento de conteúdo.
- **FR-004**: A Hero Section MUST utilizar uma animação de entrada ao carregamento da página.
- **FR-005**: O FAQ MUST ser implementado com um componente de accordion acessível, oferecendo navegação por teclado e semântica ARIA corretas nativamente.
- **FR-006**: A transição de abertura/fechamento do FAQ MUST ser animada de forma suave.
- **FR-007**: A seção de Depoimentos MUST ser navegável por gesto de arrastar (swipe/drag) em telas mobile, usando um carrossel.
- **FR-008**: O projeto MUST integrar uma solução de rastreamento e analytics capaz de registrar visualizações de página.
- **FR-009**: O clique no CTA flutuante do WhatsApp MUST disparar um evento de conversão rastreável, distinto de uma visualização de página comum.
- **FR-010**: Todas as animações MUST respeitar a preferência do sistema `prefers-reduced-motion`, reduzindo ou eliminando movimento quando ativada.
- **FR-011**: A ausência ou falha de carregamento de qualquer uma das bibliotecas de animação/analytics MUST NOT impedir a renderização do conteúdo principal ou o funcionamento do CTA do WhatsApp.

### Key Entities

- **Evento de Conversão**: Representa uma interação do visitante com o CTA do WhatsApp (o clique). Atributos conceituais: origem/seção da página onde ocorreu o clique, timestamp.
- **Item de FAQ**: Representa uma pergunta e resposta exibida no accordion. Atributos conceituais: pergunta, resposta, estado (aberto/fechado).
- **Depoimento**: Representa uma avaliação de paciente exibida no carrossel. Atributos conceituais: autor, texto do depoimento, posição na sequência do carrossel.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A capacidade de animação de entrada ao rolar funciona de ponta a ponta no placeholder da Hero Section construído por esta fundação, sem elementos aparecendo de forma abrupta. A validação de que 100% das seções finais (Hero até FAQ) usam essa capacidade é um critério de aceite das features de conteúdo futuras (Hero, Serviços, Diferenciais, Depoimentos, FAQ), fora do escopo desta fundação.
- **SC-002**: O FAQ é totalmente operável apenas por teclado, com 0 elementos inacessíveis a leitores de tela (validado por auditoria de acessibilidade).
- **SC-003**: A pontuação de Accessibility no Google Lighthouse permanece acima de 95 após a integração de todos os componentes desta fundação (conforme a constituição do projeto).
- **SC-004**: 100% dos cliques no CTA do WhatsApp geram um evento de conversão registrado na ferramenta de analytics, verificável em tempo real durante testes manuais.
- **SC-005**: A seção de depoimentos é navegável por arrastar em 100% dos dispositivos mobile testados (iOS Safari e Android Chrome), sem gerar rolagem horizontal indevida na página.
- **SC-006**: O tempo de carregamento da página (Performance no Lighthouse) permanece acima de 90 mesmo após a adição de todas as bibliotecas desta fundação.

## Assumptions

- As bibliotecas específicas indicadas nesta fundação (`lucide-react`, `framer-motion`, `@radix-ui/react-accordion`, `embla-carousel-react`, `clsx`, `tailwind-merge`, `@next/third-parties`) já foram definidas como decisão de implementação pelo stakeholder/desenvolvedor principal e são tratadas aqui como dependência de base para as próximas features (Hero, Serviços, Diferenciais, Depoimentos, FAQ, CTA).
- A ferramenta de analytics concreta usada através de `@next/third-parties` (ex.: Google Analytics/Google Tag Manager) será definida no plano técnico (`/speckit-plan`); esta especificação assume apenas que visualizações de página e o evento de clique no WhatsApp devem ser rastreáveis.
- O carrossel de depoimentos é a única seção com interação de arrastar; as demais seções usam rolagem vertical padrão da página.
- Dispositivos desktop terão uma forma alternativa de navegação no carrossel (setas/indicadores), já que o gesto de arrastar é uma interação primariamente touch.
- Esta feature é uma fundação técnica compartilhada; não entrega uma seção completa da landing page por si só, mas desbloqueia o desenvolvimento das seções definidas na EAP do projeto (`docs/escopo-eap.md`).
