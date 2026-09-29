# Barbearia Manchester — site (proposta)

Site estático e sem dependências (HTML + CSS + JS puro), com fontes hospedadas localmente.

```
index.html
assets/css/style.css
assets/js/main.js
assets/fonts/   Anton (títulos), Inter (textos), Instrument Serif itálico (citações)
assets/img/     fotos reais fornecidas pela barbearia (fachada e logotipo)
```

Para visualizar localmente: `npx serve .` (ou abra o `index.html` no navegador).

## Antes de publicar

- **Fotos demonstrativas**: toda `<img data-demo>` usa foto de banco de imagens.
  Troque o `src`/`srcset` por fotos reais da Manchester (salve em `assets/img/`,
  de preferência em `.webp`). Se uma foto não carregar, o layout exibe um espaço
  reservado com o monograma BM.
- **Serviços**: nomes e descrições são exemplos; não há preços nem duração.
  Confirme com a barbearia (bloco comentado com `CONFIRMAR` no `index.html`).
- **Avaliações no Google**: "187+" foi o número informado ao montar a proposta.
  Atualize se tiver mudado.
- **Agendamento**: os botões "Agendar horário" levam à seção de contato e
  telefone. Se houver link oficial de agendamento (WhatsApp, app etc.), troque o `href`.
- **Horários de funcionamento**: não foram informados e, por isso, não aparecem no site.
- **Open Graph**: ao publicar num domínio, troque os caminhos de `og:image` e
  `image` (JSON-LD) por URLs absolutas.
