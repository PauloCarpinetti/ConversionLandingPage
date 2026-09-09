# Feature Specification: Deploy e Qualidade em Produção

**Feature Branch**: `004-production-deploy`

**Created**: 2026-09-09

**Status**: Draft

**Input**: User description: "Deploy e Qualidade em Produção (EAP item 4.0): publicar a landing page numa URL pública real via Vercel, com deploy contínuo, configurar as variáveis de ambiente em produção, e resolver as pendências de validação (Performance no Lighthouse contra o ambiente real, e o CTA do WhatsApp/card de compartilhamento funcionando em plataformas reais) que ficaram marcadas como 'requer deploy real' nas features anteriores."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Acessar a página pela internet (Priority: P1)

Como visitante que recebeu o link da clínica (por campanha, WhatsApp ou rede social), quero abrir a página em qualquer navegador ou dispositivo com internet, sem que ela dependa de o desenvolvedor estar com o computador ligado, para poder conhecer a clínica e agendar uma consulta a qualquer momento.

**Why this priority**: Sem isso, o projeto inteiro (fundação, seções de conteúdo, integrações) não gera nenhum valor real — é a condição mínima para o site existir de fato.

**Independent Test**: Pode ser testado isoladamente abrindo a URL pública em um navegador comum, em uma rede diferente da do desenvolvedor, e confirmando que a página carrega normalmente.

**Acceptance Scenarios**:

1. **Given** a URL pública da página, **When** qualquer pessoa com acesso à internet a abre, **Then** a página carrega completamente, com todas as seções (Hero até FAQ) e o CTA do WhatsApp.
2. **Given** a mesma URL, **When** acessada de uma rede diferente da do desenvolvedor (ex.: dados móveis), **Then** o comportamento é o mesmo de quando testada localmente.

---

### User Story 2 - Confirmar a qualidade da página publicada (Priority: P1)

Como responsável pelo projeto, quero confirmar que a página publicada atende às metas de performance, acessibilidade e SEO definidas desde o início do projeto, para garantir que o que foi entregue de fato funciona bem para os pacientes em condições reais de uso — não só no ambiente de desenvolvimento.

**Why this priority**: As medições feitas durante o desenvolvimento (features anteriores) foram feitas em ambiente local, e ficou registrado explicitamente que a meta de performance só poderia ser confirmada de verdade contra o ambiente publicado.

**Independent Test**: Pode ser testado isoladamente rodando uma auditoria de qualidade contra a URL pública, sem depender de nenhum outro cenário desta feature.

**Acceptance Scenarios**:

1. **Given** a página publicada, **When** uma auditoria de qualidade é executada contra a URL pública, **Then** as pontuações de performance, acessibilidade e SEO atendem às metas definidas para o projeto.
2. **Given** o resultado da auditoria, **When** comparado com as medições feitas durante o desenvolvimento, **Then** a pontuação de performance é igual ou melhor (o ambiente real tende a performar melhor que o ambiente de desenvolvimento usado até aqui).

---

### User Story 3 - Confirmar que a conversão funciona de verdade (Priority: P1)

Como responsável pelo projeto, quero confirmar que um paciente real consegue clicar no botão do WhatsApp e que o link da página mostra um card de pré-visualização correto ao ser compartilhado, para ter certeza de que o objetivo comercial do projeto (gerar contatos via WhatsApp) funciona de ponta a ponta, não só em teoria.

**Why this priority**: É a métrica de sucesso central de todo o projeto (definida desde o Termo de Abertura); validar isso apenas em ambiente local não prova que funciona para um paciente de verdade, em um celular de verdade, através do WhatsApp de verdade.

**Independent Test**: Pode ser testado isoladamente clicando no CTA a partir da URL pública em um celular real, e compartilhando a mesma URL em uma conversa de WhatsApp para conferir o card de pré-visualização.

**Acceptance Scenarios**:

1. **Given** a página publicada, **When** um visitante clica no CTA do WhatsApp a partir de um celular real, **Then** o WhatsApp abre com a mensagem pré-formatada, pronta para enviar.
2. **Given** a URL pública, **When** compartilhada em uma conversa do WhatsApp ou em uma rede social, **Then** aparece um card de pré-visualização com imagem, título e resumo da clínica.

---

### User Story 4 - Publicar mudanças futuras sem trabalho manual (Priority: P2)

Como responsável pelo projeto, quero que qualquer alteração aprovada no código chegue automaticamente à página publicada, para não precisar repetir um processo manual de publicação a cada pequena mudança de conteúdo ou ajuste.

**Why this priority**: Reduz o custo operacional de manter o site depois da entrega inicial, mas o site já é funcional e cumpre seu objetivo mesmo que, num primeiro momento, a primeira publicação seja feita manualmente uma única vez.

**Independent Test**: Pode ser testado isoladamente publicando uma pequena alteração de conteúdo e conferindo se ela aparece na URL pública sem nenhum passo manual de publicação além de disponibilizar a alteração no repositório.

**Acceptance Scenarios**:

1. **Given** uma alteração aprovada no repositório, **When** ela chega à branch principal, **Then** a página publicada reflete essa alteração automaticamente, sem exigir uma ação manual de republicação.

### Edge Cases

- O que acontece se uma nova publicação falhar (ex.: erro de compilação)? A versão anterior estável da página MUST continuar acessível para os visitantes, sem tempo de indisponibilidade prolongado.
- O que acontece se uma variável de ambiente necessária (ex.: número de WhatsApp) não for configurada no ambiente de produção? A página MUST continuar acessível e funcional, apenas sem aquele recurso específico — mesmo comportamento de degradação já estabelecido nas features anteriores.
- O que acontece se o volume de visitantes crescer repentinamente (ex.: campanha de tráfego pago)? A página MUST continuar acessível sem degradação perceptível para o visitante.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A página MUST estar acessível publicamente através de uma URL própria, por HTTPS, sem exigir que o visitante tenha qualquer software ou configuração especial.
- **FR-002**: Uma alteração aprovada e disponibilizada na branch principal do repositório MUST chegar à página publicada automaticamente, sem uma etapa manual de republicação.
- **FR-003**: As informações de configuração específicas do ambiente (identificador de analytics, número de WhatsApp, endereço público do site) MUST ser definidas no ambiente de hospedagem, sem que nenhum valor sensível fique exposto no código-fonte do repositório.
- **FR-004**: Uma auditoria de qualidade (performance, acessibilidade, SEO) MUST ser executada contra a URL pública publicada, e não apenas em ambiente de desenvolvimento.
- **FR-005**: O CTA do WhatsApp MUST ser validado abrindo corretamente a partir da URL pública, em um dispositivo real.
- **FR-006**: O card de pré-visualização de compartilhamento (imagem, título, resumo) MUST ser validado exibindo corretamente ao compartilhar a URL pública em pelo menos um aplicativo de mensagens e uma rede social.
- **FR-007**: Se uma nova publicação falhar, a versão publicada anteriormente MUST permanecer acessível aos visitantes.
- **FR-008**: A ausência de uma variável de configuração opcional em produção MUST NOT impedir o carregamento da página nem quebrar nenhuma outra funcionalidade.

### Key Entities

- **Ambiente de Produção**: Representa a instância publicada e publicamente acessível da página. Atributos conceituais: URL pública, variáveis de configuração específicas do ambiente, histórico de publicações (para permitir reverter a uma versão anterior estável).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A página carrega com sucesso a partir da URL pública em 100% das tentativas de acesso a partir de uma rede diferente da do desenvolvedor.
- **SC-002**: A pontuação de Performance numa auditoria de qualidade contra a URL pública é superior a 90.
- **SC-003**: A pontuação de Accessibility numa auditoria de qualidade contra a URL pública permanece superior a 95.
- **SC-004**: 100% dos cliques no CTA do WhatsApp, testados a partir da URL pública em um dispositivo real, abrem o WhatsApp com a mensagem pré-formatada corretamente.
- **SC-005**: O card de pré-visualização (imagem, título, resumo) aparece corretamente em 100% das vezes que a URL pública é compartilhada nas plataformas testadas.
- **SC-006**: Uma alteração publicada na branch principal aparece na URL pública em poucos minutos, sem nenhuma ação manual de republicação além de disponibilizar a alteração no repositório.

## Assumptions

- Nenhum domínio próprio foi definido pelo cliente ainda; o subdomínio gratuito oferecido pela própria plataforma de hospedagem (ex.: `nome-do-projeto.vercel.app`) é suficiente para esta fase. Trocar para um domínio próprio no futuro não deve exigir mudança de estrutura do projeto.
- A hospedagem via Vercel já é uma decisão prévia, registrada na constituição do projeto — esta feature não reavalia essa escolha, apenas a executa.
- As variáveis de ambiente já definidas nas features anteriores (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`) são as mesmas a configurar no ambiente de produção; nenhuma variável nova é introduzida por esta feature.
- A conexão inicial entre o repositório e a plataforma de hospedagem é uma ação de configuração de conta feita uma única vez pelo responsável pelo projeto; esta feature assume que essa conexão existe ou será estabelecida como parte do trabalho, mas não presume acesso a credenciais de terceiros.
- "Poucos minutos" (SC-006) é o padrão típico de uma plataforma de hospedagem com deploy contínuo baseado em build a partir do repositório, consistente com o que a constituição do projeto já pressupõe.
