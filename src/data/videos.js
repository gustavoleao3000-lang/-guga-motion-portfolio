// Listas de vídeos do showreel.
//
// Estrutura no R2 (bucket "asaasas"):
//   reels-A/{01-35}.mp4 + .jpg     (verticais 9:16, batch A)
//   reels-B/{36-69}.mp4 + .jpg     (verticais 9:16, batch B)
//   widescreen/{01-24}.mp4 + .jpg  (horizontais 16:9)
//   quadrado/{01-04}.mp4 + .jpg    (quadrados 1:1)

export const BLOB_BASE_URL = 'https://pub-c3e36dd02e914afb99967a0962723319.r2.dev';

// ============================================================
// HELPERS — montam cada entrada com path certo
// ============================================================

function reelEntry(num) {
  const n = String(num).padStart(2, '0');
  const folder = num <= 35 ? 'reels-A' : 'reels-B';
  return {
    title: `Reel ${n}`,
    category: 'Reels',
    aspectRatio: '9/16',
    blob: `${folder}/${n}`,
  };
}

function widescreenEntry(num) {
  const n = String(num).padStart(2, '0');
  return {
    title: `Widescreen ${n}`,
    category: 'Widescreen',
    aspectRatio: '16/9',
    blob: `widescreen/${n}`,
  };
}

function quadradoEntry(num) {
  const n = String(num).padStart(2, '0');
  return {
    title: `Post ${n}`,
    category: 'Formato post',
    aspectRatio: '1/1',
    blob: `quadrado/${n}`,
  };
}

/**
 * Mistura arrays de forma proporcional (pra faixa "Últimos trabalhos" ficar variada).
 * Em cada iteração escolhe o array com maior % restante.
 */
function interleave(...arrays) {
  const totals = arrays.map((a) => a.length);
  const remaining = arrays.map((a) => [...a]);
  const out = [];
  while (remaining.some((a) => a.length > 0)) {
    let bestIdx = 0;
    let bestRatio = -1;
    for (let i = 0; i < remaining.length; i++) {
      if (remaining[i].length === 0) continue;
      const ratio = remaining[i].length / totals[i];
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestIdx = i;
      }
    }
    out.push(remaining[bestIdx].shift());
  }
  return out;
}

// ============================================================
// REELS — todos os 69 vídeos verticais (faixa Stories)
// ============================================================
export const VIDEOS = Array.from({ length: 69 }, (_, i) => reelEntry(i + 1));

// ============================================================
// WIDESCREEN — todos os 24 vídeos horizontais
// ============================================================
export const WIDESCREEN_VIDEOS = Array.from({ length: 24 }, (_, i) => widescreenEntry(i + 1));

// ============================================================
// QUADRADO — todos os 4 (usado no /trabalhos pelo filtro Quadrado)
// ============================================================
export const QUADRADO_VIDEOS = Array.from({ length: 4 }, (_, i) => quadradoEntry(i + 1));

// Alias antigo (Trabalhos.jsx ainda pode estar referenciando)
export const MIXED_VIDEOS = QUADRADO_VIDEOS;

// ============================================================
// ÚLTIMOS TRABALHOS — seleção misturada (reels + widescreen + quadrado)
// Aparece como PRIMEIRA faixa na home. Mostra os melhores trabalhos.
// ============================================================

// Números escolhidos pelo Guga (preservando a ordem)
const PICKED_REELS = [
  2, 3, 4, 6, 7, 8, 11, 12, 15, 17, 19, 21, 23, 24, 25, 27, 29, 30, 33, 35, 36, 39, 41,
  44, 47, 49, 51, 54, 57, 58, 62, 65, 67, 69,
];
const PICKED_WIDESCREEN = [1, 3, 5, 7, 9, 10, 11, 12, 13, 15, 17, 18, 20, 22];
const PICKED_QUADRADO = [1, 2, 3, 4];

// Misturado em ordem balanceada (varia formato no marquee)
export const NOVOS_VIDEOS = interleave(
  PICKED_REELS.map(reelEntry),
  PICKED_WIDESCREEN.map(widescreenEntry),
  PICKED_QUADRADO.map(quadradoEntry),
);
