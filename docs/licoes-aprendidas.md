# Fase de Encerramento

## 6. Registro de Lições Aprendidas (Lessons Learned)

Todo bom case study tem uma seção de "Desafios e Soluções" ou "Lições Aprendidas". O PMBOK exige a documentação do conhecimento adquirido. Isso demonstra humildade, transparência e capacidade de evolução.

### Desafio Encontrado

Dificuldade inicial em manter a semântica do HTML ao estilizar listas complexas na seção de "Serviços" usando utilitários do Tailwind.

### Solução Aplicada

Refatoração do componente para utilizar CSS Grid nativo aliado ao Tailwind, separando a lógica de apresentação no React, o que reduziu o excesso de classes no JSX.

### Oportunidade Futura

- Para os próximos projetos comerciais de pequeno porte, criar um template base ("boilerplate") no GitHub com o setup do Next.js + Tailwind + Componentes base de SEO já configurados, acelerando o tempo da primeira entrega.
- O relatório do PageSpeed Insights em produção (Performance 94/100, já acima da meta de >90) apontou dois diagnósticos não bloqueantes: ~92 KiB de JavaScript não usado no carregamento inicial (provável origem: bibliotecas de animação/carrossel) e uma tarefa longa na thread principal. Nenhum dos dois tira pontos da nota atual, mas ficam registrados como possível refinamento futuro (ex.: code-splitting mais agressivo dessas libs) caso o projeto precise espremer ainda mais performance.
