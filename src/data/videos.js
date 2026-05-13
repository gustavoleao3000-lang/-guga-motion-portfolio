// Listas de vídeos do showreel.
//
// 3 formas de hospedar (pode misturar à vontade):
//
// 1) BLOB STORAGE — Cloudflare R2 (recomendado: 10GB + banda ilimitada GRÁTIS)
//    { title: 'X', tag: 'Y', blob: 'NOME-DO-ARQUIVO' }
//    O código procura "{NOME}.mp4" e "{NOME}.jpg" no bucket configurado abaixo.
//
// 2) VIMEO
//    { title: 'X', tag: 'Y', vimeo: '123456789' }
//
// 3) MP4 LOCAL em /public/videos/
//    { title: 'X', tag: 'Y', src: '/videos/x.mp4', poster: '/videos/x.jpg' }

// 👇 URL pública do bucket R2 (sem barra no fim).
export const BLOB_BASE_URL = 'https://pub-c3e36dd02e914afb99967a0962723319.r2.dev';

// ===== STORIES (vertical 9:16) — vídeos do R2 =====
// Números dos vídeos MOTION subidos no bucket (arquivos: "MOTION N.mp4")
// Pra adicionar mais: sobe o arquivo no R2 e adiciona o número aqui.
// Pra remover: tira o número da lista.
const MOTION_NUMBERS = [
  1, 2, 3, 4, 5,
  11, 12, 13, 14, 15,
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
  50, 51, 52, 53, 54, 55, 56,
  58, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
  70, 71, 72, 73, 74, 76, 77, 78,
  85,
];

export const VIDEOS = MOTION_NUMBERS.map((n) => ({
  title: `Motion ${n}`,
  tag: 'Motion',
  blob: `MOTION ${n}`, // arquivo no bucket: "MOTION N.mp4" (+ opcionalmente "MOTION N.jpg")
}));

// ===== WIDESCREEN (horizontal 16:9) — ainda no Vimeo =====
// Quando subir esses pro R2, troca `vimeo: '...'` por `blob: 'NOME-DO-ARQUIVO'`
export const WIDESCREEN_VIDEOS = [
  { title: 'Arquivo 2',  tag: 'Widescreen', vimeo: '1191692380' },
  { title: 'Arquivo 4',  tag: 'Widescreen', vimeo: '1191692384' },
  { title: 'Arquivo 5',  tag: 'Widescreen', vimeo: '1191692306' },
  { title: 'Arquivo 6',  tag: 'Widescreen', vimeo: '1191692307' },
  { title: 'Arquivo 8',  tag: 'Widescreen', vimeo: '1191692305' },
  { title: 'Arquivo 9',  tag: 'Widescreen', vimeo: '1191692335' },
  { title: 'Arquivo 11', tag: 'Widescreen', vimeo: '1191692345' },
  { title: 'Arquivo 13', tag: 'Widescreen', vimeo: '1191692348' },
  { title: 'Arquivo 14', tag: 'Widescreen', vimeo: '1191692376' },
];
