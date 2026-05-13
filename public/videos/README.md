# Vídeos do Showreel — Guia de hospedagem

O site suporta **3 formas** de subir vídeo. Pode misturar à vontade.

---

## ⭐ Opção 1 — CLOUDFLARE R2 (BLOB STORAGE) — recomendado

**10GB grátis + banda ILIMITADA grátis.** Best deal pra vídeo no momento.

### Setup inicial (uma vez só)

1. Cria conta em [**dash.cloudflare.com**](https://dash.cloudflare.com/sign-up) (grátis)
2. No menu lateral: **R2 Object Storage** → clica **Purchase R2** (não cobra nada no free tier, é só pra confirmar cartão por anti-abuso)
3. Clica **Create bucket** — coloca um nome (ex: `guga-showreel`) — clica criar
4. Dentro do bucket, vai em **Settings** → **Public access** → clica **Allow Access**
5. Aparece a URL pública: `https://pub-xxxxxxxxxxxxx.r2.dev` — **copia ela**
6. Cola em `src/data/videos.js`:
   ```js
   export const BLOB_BASE_URL = 'https://pub-xxxxxxxxxxxxx.r2.dev';
   ```

### (Opcional) Domínio próprio
Em vez de `pub-xxxxx.r2.dev`, pode usar `videos.gugamotion.com.br`:
- Settings → **Custom Domains** → Connect Domain (precisa ter o domínio no Cloudflare)

### Pra cada vídeo novo:

1. **Comprime o vídeo** primeiro (importante!):
   ```bash
   ffmpeg -i original.mp4 -vcodec libx264 -crf 24 -preset slow -movflags +faststart -an motion-1.mp4
   ```
   Sem terminal: [HandBrake](https://handbrake.fr/) preset "Web Optimized 1080p30".

2. **Gera o poster (capa)** do 1º segundo:
   ```bash
   ffmpeg -i motion-1.mp4 -ss 00:00:01 -vframes 1 -q:v 3 motion-1.jpg
   ```

3. **Sobe os dois arquivos** pro bucket R2 (drag-drop no dashboard):
   - `motion-1.mp4`
   - `motion-1.jpg` (mesmo nome, extensão diferente)

4. Adiciona em `src/data/videos.js`:
   ```js
   { title: 'Motion 1', tag: 'Motion', blob: 'motion-1' },
   ```

5. Pronto! Subpastas funcionam também:
   ```js
   { title: 'Arquivo 5', tag: 'Widescreen', blob: 'widescreen/arquivo-5' },
   ```
   (precisa ter `widescreen/arquivo-5.mp4` + `widescreen/arquivo-5.jpg` no bucket)

### Limites do plano grátis R2:
- **10GB de storage** (cabem ~200 reels comprimidos de 50MB)
- **Banda ilimitada** — único provider com isso (Cloudinary cobra além de 25GB/mês)
- 1M operações de leitura/mês — sobra muito pra portfólio

---

## Opção 2 — VIMEO

Funciona, mas tem branding e clique sai pro Vimeo.

```js
{ title: 'X', tag: 'Y', vimeo: '123456789' }
```

Vimeo unlisted: cola URL completa
```js
{ vimeo: 'https://vimeo.com/123456789/abc123def4' }
```

---

## Opção 3 — MP4 local nessa pasta

Bom só pra 1-2 vídeos. Não recomendado pra muitos (pesa o repo git).

```js
{ title: 'X', tag: 'Y', src: '/videos/x.mp4', poster: '/videos/x.jpg' }
```

---

## Cuidados gerais

- Nome dos arquivos sem espaço/acento: `motion-01.mp4`, não `Motion 01.mp4`
- Resolução máx: **1920×1080** (sem 4K na web)
- Duração ideal: **10-30s por peça** pra showreel
- Sempre comprime (`-crf 24` no ffmpeg ou HandBrake) — arquivo bruto de edição é gigante demais
- Sempre tem o poster JPG do mesmo nome, senão fica feio enquanto carrega

---

## Migração Vimeo → R2

Quando quiser tirar o Vimeo:
1. Baixa o original do Vimeo (Settings → Distribution → Video File)
2. Comprime com ffmpeg (acima)
3. Gera poster
4. Sobe ambos pro R2
5. Troca `vimeo: '...'` por `blob: 'nome-do-arquivo'` no `videos.js`

Pode fazer um por um — mistura de tipos funciona.
