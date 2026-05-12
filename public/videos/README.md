# Vídeos do Showreel

Você tem duas formas de adicionar vídeos. Recomendo **Vimeo**.

---

## ✅ Opção 1 — Vimeo (mais fácil e mais leve)

1. Sobe o vídeo em [vimeo.com](https://vimeo.com)
2. Copia a URL (ex: `https://vimeo.com/123456789`) — pode ser só o número também
3. Abre `src/data/videos.js` e adiciona:
   ```js
   { title: 'Meu Projeto', tag: 'Motion', vimeo: '123456789' },
   ```
4. Salva. A capa é puxada automática do Vimeo.

**Vimeo privado/unlisted?** Cola a URL completa com o hash:
```js
{ title: 'Privado', tag: 'Cliente', vimeo: 'https://vimeo.com/123456789/abc123def4' }
```

**Capa customizada (opcional):** salva uma JPG nesta pasta e adiciona `poster: '/videos/capa.jpg'`.

---

## Opção 2 — MP4 local nesta pasta

1. Coloque `.mp4` + `.jpg` (capa) aqui dentro
2. Adicione em `src/data/videos.js`:
   ```js
   { title: 'Vinheta', tag: 'Branding', src: '/videos/vinheta.mp4', poster: '/videos/vinheta.jpg' },
   ```

**Comprimir antes de subir** (importante!):
```bash
ffmpeg -i original.mp4 -vcodec libx264 -crf 24 -preset slow -movflags +faststart -an saida.mp4
```
Sem terminal: use o [HandBrake](https://handbrake.fr/) com o preset **"Web Optimized 1080p30"**.

---

## Por que Vimeo é melhor?

| | Vimeo | MP4 local |
|---|---|---|
| Peso do site | ~0 (só thumb) | ~5–20MB por vídeo |
| Qualidade adaptativa | ✅ ajusta à conexão | ❌ fixa |
| Trocar vídeo | edita no Vimeo | re-upload + commit |
| Limite de armazenamento | conta Vimeo (free 500MB/sem) | espaço do servidor |
| Stats de view | ✅ painel Vimeo | ❌ |

---

## Regras pra nome de arquivo
- Sem espaços, sem acentos: `motion-01.mp4` (não `Motion 01.mp4`)
- Caminho começa com `/videos/` no código (NÃO `public/videos/`)
