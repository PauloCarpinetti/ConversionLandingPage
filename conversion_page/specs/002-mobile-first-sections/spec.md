# Feature Specification: Seções de Conteúdo Mobile-First da Landing Page

**Feature Branch**: `002-mobile-first-sections`

**Created**: 2026-09-08

**Status**: Draft

**Input**: User description: "Implementação Mobile-First das seções de conteúdo da landing page (EAP item 2.0): Hero, Serviços, Diferenciais, Depoimentos e FAQ, construídas mobile-first (320px como base) sobre a fundação técnica já existente, com texto placeholder realista onde o copywriting definitivo ainda não foi entregue pelo cliente."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Entender a proposta de valor imediatamente (Priority: P1)

Como visitante que chegou pelo Instagram ou Google no celular, quero entender em segundos o que a clínica oferece e sentir confiança ao abrir o site, para decidir se vale a pena continuar lendo ou já procurar o contato.

**Why this priority**: É a primeira coisa que qualquer visitante vê; sem uma primeira impressão clara e confiável, o visitante abandona a página antes de conhecer os serviços ou o CTA.

**Independent Test**: Pode ser testado isoladamente carregando a página em uma tela de 320px e verificando se a proposta de valor da clínica é compreensível sem precisar rolar a página.

**Acceptance Scenarios**:

1. **Given** um visitante abre a página em um celular, **When** a página carrega, **Then** ele vê, sem precisar rolar, uma frase clara sobre o que a clínica oferece e uma imagem/visual que transmite confiança e cuidado.
2. **Given** a página carregada em qualquer tamanho de tela (320px a telas largas de desktop), **When** o visitante observa a seção inicial, **Then** o texto permanece legível e bem distribuído, sem cortes ou sobreposições.

---

### User Story 2 - Conhecer os serviços oferecidos (Priority: P1)

Como visitante interessado em tratamento odontológico, quero ver rapidamente quais serviços a clínica oferece (ex.: clareamento, implantes, ortodontia), para saber se a clínica atende à minha necessidade antes de entrar em contato.

**Why this priority**: É a informação central que qualifica o visitante — sem saber os serviços, ele não sabe se deve prosseguir para o contato.

**Independent Test**: Pode ser testado isoladamente exibindo a lista de serviços e conferindo que cada um é identificável por nome e um ícone/indicação visual, em qualquer largura de tela.

**Acceptance Scenarios**:

1. **Given** a seção de serviços renderizada, **When** o visitante a visualiza no celular, **Then** os serviços aparecem em uma coluna única, legível, sem exigir rolagem horizontal.
2. **Given** a mesma seção em uma tela larga (desktop), **When** o visitante a visualiza, **Then** os serviços se reorganizam em múltiplas colunas, aproveitando o espaço disponível sem ficar espremidos.

---

### User Story 3 - Tirar dúvidas comuns sem precisar ligar (Priority: P1)

Como visitante com dúvidas práticas (aceita convênio? onde fica? como agendo?), quero encontrar respostas diretamente na página, para não precisar telefonar ou esperar uma resposta antes de decidir prosseguir.

**Why this priority**: Reduz objeções que impedem a conversão e poupa tempo da recepção da clínica — parte do objetivo de negócio original do projeto.

**Independent Test**: Pode ser testado isoladamente verificando se as perguntas mais comuns de um paciente em potencial têm resposta visível na seção de FAQ.

**Acceptance Scenarios**:

1. **Given** a seção de FAQ renderizada, **When** o visitante procura por informações sobre convênio, localização e agendamento, **Then** encontra uma pergunta e resposta cobrindo cada um desses três temas.
2. **Given** a seção de FAQ, **When** o visitante lê as respostas, **Then** o texto é claro e não exige conhecimento prévio sobre a clínica.

---

### User Story 4 - Ver por que escolher esta clínica (Priority: P2)

Como visitante comparando opções de clínicas, quero entender os diferenciais desta clínica (equipamentos modernos, atendimento humanizado), para justificar a escolha por ela em vez de outra.

**Why this priority**: Reforça a decisão de conversão, mas a página já é funcional sem esta seção — os diferenciais complementam, não substituem, a proposta de valor e os serviços.

**Independent Test**: Pode ser testado isoladamente conferindo que cada diferencial é apresentado com um título curto e uma explicação breve, legível em qualquer tamanho de tela.

**Acceptance Scenarios**:

1. **Given** a seção de diferenciais renderizada, **When** o visitante a lê, **Then** consegue identificar pelo menos três motivos concretos para escolher a clínica.

---

### User Story 5 - Ler experiências de outros pacientes (Priority: P2)

Como visitante inseguro sobre marcar uma consulta, quero ler relatos de outros pacientes sobre a experiência na clínica, para ganhar confiança antes de entrar em contato.

**Why this priority**: É prova social que reforça a confiança, mas — assim como os diferenciais — é um reforço complementar à proposta de valor e aos serviços, não um bloqueio para a conversão básica.

**Independent Test**: Pode ser testado isoladamente exibindo os depoimentos e confirmando que cada um mostra o nome do paciente e o relato, navegável mesmo com mais depoimentos do que cabem na tela.

**Acceptance Scenarios**:

1. **Given** a seção de depoimentos em um celular, **When** o visitante navega por ela, **Then** consegue ver todos os depoimentos disponíveis, um por vez ou em sequência, sem que a página role para os lados inteira.
2. **Given** a mesma seção em uma tela larga, **When** o visitante navega por ela, **Then** consegue avançar e voltar entre os depoimentos sem depender de um gesto de toque.

### Edge Cases

- O que acontece se um visitante acessar por uma tela muito estreita (320px, o menor caso oficialmente suportado)? Nenhuma seção MUST cortar texto, sobrepor elementos ou exigir rolagem horizontal.
- O que acontece se o texto definitivo de algum serviço, diferencial ou depoimento ainda não tiver sido entregue pelo cliente? A seção MUST exibir um texto placeholder realista no mesmo formato do conteúdo final, em vez de ficar vazia ou quebrada.
- O que acontece se a lista de serviços, diferenciais ou depoimentos crescer além da quantidade inicial (ex.: a clínica adicionar um novo serviço no futuro)? O layout de cada seção MUST comportar um número maior de itens sem exigir mudança de estrutura.
- Como cada seção se comporta para um visitante navegando só por teclado ou leitor de tela? Toda a informação MUST estar disponível na mesma ordem e completude de quem usa mouse/toque.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A página MUST apresentar, na primeira seção visível, uma proposta de valor da clínica compreensível sem exigir rolagem em uma tela de 320px de largura.
- **FR-002**: A página MUST listar os serviços oferecidos pela clínica, cada um identificável por nome.
- **FR-003**: A página MUST apresentar ao menos três diferenciais da clínica, cada um com um título e uma breve explicação.
- **FR-004**: A página MUST apresentar depoimentos de pacientes, cada um com o nome do autor e o texto do relato.
- **FR-005**: A página MUST apresentar uma seção de perguntas frequentes cobrindo, no mínimo, convênio, localização e agendamento.
- **FR-006**: Todas as seções MUST se adaptar de uma coluna única (telas a partir de 320px) até layouts de múltiplas colunas em telas largas, sem sobreposição, corte de texto ou rolagem horizontal indevida.
- **FR-007**: Toda seção MUST usar marcação semântica apropriada ao seu conteúdo (títulos hierárquicos, listas, regiões identificáveis), de forma que a estrutura da página seja compreensível por leitores de tela.
- **FR-008**: Quando o texto definitivo de um serviço, diferencial ou depoimento não estiver disponível, a página MUST exibir um texto placeholder realista no mesmo formato do conteúdo final (não um espaço vazio nem um lorem ipsum genérico sem relação com o conteúdo).
- **FR-009**: As seções MUST se conectar visualmente ao restante da página (ícones, animações de entrada e CTA do WhatsApp) já estabelecidos pela fundação técnica do projeto, mantendo uma experiência única e coerente.
- **FR-010**: Cada seção MUST permanecer utilizável com o número de itens (serviços, diferenciais ou depoimentos) crescendo além da quantidade inicial de conteúdo.

### Key Entities

- **Serviço**: Um tratamento oferecido pela clínica. Atributos conceituais: nome, descrição curta, ícone/indicação visual associada.
- **Diferencial**: Um motivo para escolher a clínica. Atributos conceituais: título, descrição breve.
- **Depoimento**: Já definido na fundação técnica (001-project-foundation) — autor, texto do relato, posição de exibição.
- **Item de FAQ**: Já definido na fundação técnica (001-project-foundation) — pergunta, resposta.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Um visitante consegue identificar a proposta de valor da clínica em até 5 segundos de visualização da página, sem rolar, em uma tela de 320px.
- **SC-002**: 100% dos serviços, diferenciais, depoimentos e itens de FAQ listados permanecem totalmente legíveis (sem corte de texto ou sobreposição) em qualquer largura de tela entre 320px e 1920px.
- **SC-003**: Um visitante consegue encontrar a resposta para "vocês aceitam convênio?", "onde fica a clínica?" e "como eu agendo uma consulta?" sem sair da página.
- **SC-004**: 100% do conteúdo de cada seção está disponível e na mesma ordem tanto para navegação por mouse/toque quanto por teclado ou leitor de tela.
- **SC-005**: A pontuação de Accessibility no Google Lighthouse permanece acima de 95 após a adição de todas as seções de conteúdo (conforme a constituição do projeto).

## Assumptions

- A fundação técnica do projeto (ícones, animações de entrada, FAQ acessível, carrossel de depoimentos, CTA do WhatsApp e rastreamento de conversão) já existe e será reaproveitada por estas seções, não recriada.
- O copywriting definitivo de serviços, diferenciais e depoimentos é responsabilidade do cliente/clínica e está fora do escopo deste projeto (`docs/escopo-eap.md` — Exclusões do Escopo); esta feature usa texto placeholder realista, substituível depois sem mudança de estrutura.
- O conteúdo inicial de referência (serviços como clareamento/implantes/ortodontia; diferenciais como equipamentos modernos e atendimento humanizado; dúvidas de convênio/localização/agendamento) segue o levantamento já feito em `docs/requisitosdentista.md`.
- Não há painel administrativo para editar esse conteúdo (fora de escopo, conforme a constituição do projeto); alterações de conteúdo são feitas diretamente no código-fonte.
- As imagens reais da clínica (fotos do consultório, equipe, pacientes) ainda não foram fornecidas; onde uma imagem for necessária, um placeholder visualmente adequado é aceitável até a substituição pelo material real do cliente.
