// Listas de vídeos do showreel.
//
// Estrutura no R2 (bucket "asaasas"):
//   reels/01.mp4 + reels/01.jpg     (verticais 9:16)
//   widescreen/01.mp4 + ...          (horizontais 16:9)
//   quadrado/01.mp4 + ...            (quadrados 1:1)
//
// Pra adicionar um vídeo novo:
//   1) Comprime + gera capa .jpg do mesmo nome
//   2) Sobe os 2 arquivos no R2 dentro da pasta certa
//   3) Adiciona o número aqui na lista da categoria

// URL pública do bucket R2 (sem barra no fim)
export const BLOB_BASE_URL = 'https://pub-c3e36dd02e914afb99967a0962723319.r2.dev';

/* ============================================================
   REELS — verticais 9:16 (69 vídeos)
   Subidos em 2 batches no R2: reels-A (01-35) e reels-B (36-69)
   ============================================================ */
const REELS_COUNT = 69;
export const VIDEOS = Array.from({ length: REELS_COUNT }, (_, i) => {
  const num = i + 1;
  const n = String(num).padStart(2, '0');
  const folder = num <= 35 ? 'reels-A' : 'reels-B';
  return {
    title: `Reel ${n}`,
    category: 'Reels',
    aspectRatio: '9/16',
    blob: `${folder}/${n}`,
  };
});

/* ============================================================
   WIDESCREEN — horizontais 16:9 (24 vídeos)
   ============================================================ */
const WIDESCREEN_COUNT = 24;
export const WIDESCREEN_VIDEOS = Array.from({ length: WIDESCREEN_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    title: `Widescreen ${n}`,
    category: 'Widescreen',
    aspectRatio: '16/9',
    blob: `widescreen/${n}`,
  };
});

/* ============================================================
   NOVIDADES — vazio por enquanto
   ============================================================ */
// Pra destacar drops recentes, copia entradas pra cá.
// Como vazio, a seção "Novidades" não aparece na home.
export const NOVOS_VIDEOS = [];

/* ============================================================
   MIX / QUADRADOS — quadrados 1:1 (4 vídeos)
   ============================================================ */
const QUADRADO_COUNT = 4;
export const MIXED_VIDEOS = Array.from({ length: QUADRADO_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    title: `Quadrado ${n}`,
    category: 'Quadrado',
    aspectRatio: '1/1',
    blob: `quadrado/${n}`,
  };
});
