# Vídeos do Showreel — Guia de hospedagem

O site suporta **3 formas** de subir vídeo. Pode misturar à vontade.

---

## ⭐ Opção 1 — CLOUDINARY (recomendado)

Hospedagem própria, CDN global, grátis até 25GB. Sem branding do Vimeo.

### Setup inicial (uma vez só)

1. Cadastra grátis em **https://cloudinary.com/users/register/free**
2. Vai no **Dashboard** → copia o **"Cloud name"** (ex: `gugamotion`)
3. Abre `src/data/videos.js` e cola na linha:
   ```js
   export const CLOUDINARY_CLOUD_NAME = 'gugamotion';
   ```

### Pra cada vídeo novo:

1. Vai no **Media Library** do Cloudinary → arrasta o `.mp4`
2. Recomendado: organiza em pasta (ex: cria pasta `showreel`)
3. Copia o **Public ID** (ex: `showreel/motion-novo`)
4. Adiciona em `src/data/videos.js`:
   ```js
   { title: 'Motion novo', tag: 'Motion', cloudinary: 'showreel/motion-novo' },
   ```
5. Pronto! O site automaticamente:
   - Gera thumbnail do 1º segundo
   - Cria versão leve (400px, `q_auto:low`) pro preview no card
   - Usa versão HD (`q_auto:good`) no lightbox

### Limites do plano grátis:
- 25GB de storage
- 25GB de banda/mês
- Vídeo consome 4× créditos → na prática ~6GB de banda de vídeo/mês
- Pra portfólio pessoal: sobra. Se viralizar, upgrade pra $99/mês.

---

## Opção 2 — VIMEO

Funciona, mas tem branding e limites na conta free.

```js
{ title: 'X', tag: 'Y', vimeo: '123456789' }
```

Vimeo unlisted (privado com link): cola URL completa
```js
{ vimeo: 'https://vimeo.com/123456789/abc123def4' }
```

---

## Opção 3 — MP4 local nessa pasta

Bom pra 1-2 vídeos pequenos. Não recomendado pra muitos (pesa o repo).

```js
{ title: 'X', tag: 'Y', src: '/videos/x.mp4', poster: '/videos/x.jpg' }
```

**Compressão obrigatória** antes de subir:
```bash
ffmpeg -i original.mp4 -vcodec libx264 -crf 24 -preset slow -movflags +faststart -an saida.mp4
```
Ou usa [HandBrake](https://handbrake.fr/) preset "Web Optimized 1080p30".

---

## Migração Vimeo → Cloudinary

Quando quiser tirar o Vimeo de vez:
1. Baixa os vídeos originais do Vimeo (Settings → Distribution → Video File)
2. Sobe pra Cloudinary
3. Edita `videos.js`: troca `vimeo: '...'` por `cloudinary: '...'`

Pode fazer um por um — os tipos misturados (vimeo + cloudinary) funcionam juntos.

---

## Cuidados

- Nome dos arquivos sem espaço/acento: `motion-01.mp4`, não `Motion 01.mp4`
- Resolução máx: **1920×1080** (não precisa de 4K na web)
- Duração ideal: **10-30s por peça** pra showreel
- Sempre tem capa automática — não precisa subir JPG separado pro Cloudinary
