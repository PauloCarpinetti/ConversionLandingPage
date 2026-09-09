# Feature Specification: Cartão de Compartilhamento em Redes Sociais

**Feature Branch**: `003-social-share-card`

**Created**: 2026-09-08

**Status**: Draft

**Input**: User description: "Finalização das Integrações (EAP item 3.0): concluir o Open Graph com uma imagem de capa de compartilhamento, já que hoje só título/descrição estão configurados. Sem foto real da clínica ainda, a imagem precisa ser um placeholder profissional. Validação: compartilhar o link deve mostrar imagem, título e resumo no card de pré-visualização (WhatsApp/redes sociais)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver um preview confiável antes de abrir o link (Priority: P1)

Como pessoa que recebe o link da landing page por WhatsApp, Instagram ou Facebook (encaminhado por alguém ou visto em uma campanha), quero ver um card de pré-visualização com imagem, nome e resumo da clínica antes de clicar, para decidir com confiança se vale a pena abrir o link.

**Why this priority**: É a primeira impressão da clínica antes mesmo do clique — um link sem imagem (ou com uma imagem genérica/quebrada) parece pouco confiável e reduz a taxa de cliques vindos de compartilhamento, indo contra o objetivo de aquisição via redes sociais descrito no Termo de Abertura do projeto.

**Independent Test**: Pode ser testado isoladamente colando a URL da página em uma ferramenta de depuração de Open Graph (ou em um app de mensagens) e conferindo se o card mostra imagem, título e resumo, sem depender de nenhuma outra funcionalidade da página.

**Acceptance Scenarios**:

1. **Given** a URL da landing page, **When** ela é colada em uma conversa do WhatsApp, **Then** um card de pré-visualização aparece com imagem de capa, o nome da clínica e um resumo do que ela oferece.
2. **Given** o mesmo link, **When** compartilhado no Instagram ou Facebook, **Then** o card exibido também mostra a mesma imagem, título e resumo, sem cortes que escondam a informação principal (nome da clínica).
3. **Given** a imagem de capa em tamanho de miniatura (como aparece nos cards de preview), **When** uma pessoa olha rapidamente, **Then** ainda consegue identificar que se trata de uma clínica odontológica.

### Edge Cases

- O que acontece se a plataforma de destino não conseguir buscar a imagem de capa (rede lenta, imagem temporariamente indisponível)? O link MUST continuar funcional e o card MUST cair para mostrar ao menos título e resumo, nunca um link quebrado.
- Diferentes plataformas recortam a imagem em proporções diferentes (mais quadrada em algumas, mais larga em outras). A informação essencial (nome da clínica) MUST permanecer visível nos recortes mais comuns, não só na proporção "ideal".
- Se o link já foi compartilhado antes e uma plataforma cacheou uma pré-visualização antiga, a atualização da imagem pode não aparecer imediatamente para quem já a viu — isso é comportamento das próprias plataformas, fora do controle da página (ver Assumptions).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Ao compartilhar o link da página em aplicativos de mensagens ou redes sociais, o card de pré-visualização MUST exibir uma imagem de capa, um título e um resumo.
- **FR-002**: A imagem de capa MUST comunicar visualmente que se trata de uma clínica odontológica e incluir o nome da clínica, mesmo sem fotografia real do local ou da equipe.
- **FR-003**: O título exibido no card MUST corresponder ao nome/identidade da clínica já usada no restante da página.
- **FR-004**: O resumo exibido no card MUST comunicar brevemente o que a clínica oferece, de forma consistente com a proposta de valor já apresentada na página.
- **FR-005**: O card de pré-visualização MUST renderizar corretamente nas plataformas prioritárias de aquisição de tráfego do projeto (WhatsApp e Instagram/Facebook).
- **FR-006**: A imagem de capa MUST permanecer com a informação essencial (nome da clínica) legível tanto em recortes mais quadrados quanto mais largos, cobrindo os formatos de card mais comuns dessas plataformas.
- **FR-007**: A ausência ou falha no carregamento da imagem de capa por uma plataforma MUST NOT impedir a exibição do link, do título ou do resumo, nem quebrar o compartilhamento.
- **FR-008**: A adição da imagem de capa MUST NOT prejudicar o tempo de carregamento da página para o visitante comum (a imagem é buscada pela plataforma de destino ao gerar o preview, não pelo navegador de quem visita a página diretamente).

### Key Entities

- **Imagem de Capa (Cover Image)**: Representa visualmente a clínica nos cards de compartilhamento. Atributos conceituais: identidade visual (nome da clínica, tema odontológico), proporção/enquadramento pensado para recortes de card, formato leve o suficiente para não pesar no carregamento da página.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das vezes que o link da página é compartilhado no WhatsApp ou testado em uma ferramenta de depuração de Open Graph, o card de pré-visualização mostra imagem, título e resumo da clínica.
- **SC-002**: O nome da clínica permanece identificável na imagem de capa mesmo no tamanho de miniatura usado pelos cards de preview.
- **SC-003**: A pontuação de Performance no Google Lighthouse da página permanece igual à medida antes desta feature — a imagem de capa não é carregada pelo visitante comum da página.

## Assumptions

- Nenhuma fotografia real da clínica está disponível ainda; a imagem de capa é um design placeholder profissional (identidade visual + nome da clínica), substituível sem mudança de estrutura quando o cliente fornecer fotos reais.
- Título e descrição já configurados via Next.js Metadata API em `001-project-foundation` permanecem os mesmos; esta feature completa o Open Graph adicionando apenas a imagem que faltava (`docs/requisitosdentista.md`, REQ-08).
- WhatsApp e Instagram/Facebook são as plataformas prioritárias de validação, por serem os canais de aquisição de tráfego citados no Termo de Abertura do projeto (`docs/TAP.md`).
- A imagem é estática (a página tem uma única URL/rota); não há geração dinâmica de imagem por seção ou por conteúdo.
- A verificação de como cada plataforma efetivamente renderiza o card (e de eventual cache de uma pré-visualização já compartilhada antes) depende de ferramentas externas às quais a implementação nem sempre tem acesso automatizado — parte da validação final é manual.
