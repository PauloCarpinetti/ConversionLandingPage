# Fase de Monitoramento e Controle

## 5. Plano e Checklist de Qualidade

Mostrar como você garante a qualidade do que entrega é um grande diferencial competitivo. Um cliente de pequeno negócio quer ter certeza de que o site vai funcionar no celular dos pacientes dele.

### Padrões Adotados

- WCAG 2.1 (Acessibilidade)
- Core Web Vitals (Google)

### Checklist de Entrega

- [ ] As imagens estão em formato WebP/AVIF via `next/image`? — **N/A**: a landing page não usa fotos reais/`next/image`; a única imagem gerada (`opengraph-image`) é um PNG via `next/og`, convenção própria do Next.js
- [x] O contraste de cores das fontes foi aprovado em validadores de acessibilidade? — confirmado: Lighthouse/PageSpeed Insights Accessibility 100/100 em produção (`004-production-deploy` T006)
- [ ] Os links âncora (navegação suave) funcionam corretamente entre as seções? — **N/A**: esta landing page não implementa navegação âncora entre seções
- [x] A mensagem padrão do WhatsApp contém a origem (ex: "Olá, vim pelo site da clínica e gostaria de agendar...")? — confirmado em produção, link real: `wa.me/...?text=Olá,%20vim%20pelo%20site%20da%20clínica...`
- [ ] Teste em dispositivos reais (iOS Safari e Android Chrome) concluído? — **Parcial**: confirmado em Android Chrome (CTA do WhatsApp e card de compartilhamento, `004-production-deploy` T005/T007/T008); iOS Safari não testado
