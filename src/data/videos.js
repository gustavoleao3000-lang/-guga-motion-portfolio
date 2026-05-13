// Listas de vídeos do showreel.
//
// HOSPEDAGEM (escolhe uma por vídeo):
//   • Blob Storage R2 (recomendado): { blob: 'NOME-DO-ARQUIVO' }
//   • Vimeo:                          { vimeo: '123456789' }
//   • MP4 local em /public/videos/:   { src: '/videos/x.mp4', poster: '/videos/x.jpg' }
//
// CAMPOS OPCIONAIS:
//   • aspectRatio: '9/16' | '1/1' | '16/9'  (se não setar, usa default da seção)
//   • category:    rótulo curto exibido no card (ex: "Reels", "Motion", "Brand")
//   • poster:      URL customizada da capa (sobrescreve auto-poster)
//
// Exemplo completo:
//   { title: 'Projeto X', src: '...', poster: '...', aspectRatio: '9/16', category: 'Reels' }

// 👇 URL pública do bucket R2 (sem barra no fim).
export const BLOB_BASE_URL = 'https://pub-c3e36dd02e914afb99967a0962723319.r2.dev';

/* ============================================================
   STORIES — formato vertical predominante (9:16)
   ============================================================ */
// Números dos vídeos MOTION (faixa Stories). Tirei os 15 mais novos pra Novidades.
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
  category: 'Reels',
  aspectRatio: '9/16',
  blob: `MOTION ${n}`,
}));

/* ============================================================
   WIDESCREEN — formato horizontal (16:9)
   ============================================================ */
// Arquivos do R2 (bucket: "Arquivo N.mp4")
const ARQUIVO_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const WIDESCREEN_VIDEOS = ARQUIVO_NUMBERS.map((n) => ({
  title: `Arquivo ${n}`,
  category: 'Brand Film',
  aspectRatio: '16/9',
  blob: `Arquivo ${n}`,
}));

/* ============================================================
   NOVIDADES — vídeos recém-saídos do forno
   ============================================================ */
// Trabalhos mais recentes. Aparece como faixa separada na home.
// Aspect ratio detectado do arquivo real (cada um respeita seu formato):
//   16/9 = widescreen | 1/1 = quadrado | 9/16 = vertical | 9/10 = portrait IG
export const NOVOS_VIDEOS = [
  { title: 'Motion 6',  category: 'Widescreen', aspectRatio: '16/9', blob: 'MOTION 6' },
  { title: 'Motion 7',  category: 'Widescreen', aspectRatio: '16/9', blob: 'MOTION 7' },
  { title: 'Motion 8',  category: 'Quadrado',   aspectRatio: '1/1',  blob: 'MOTION 8' },
  { title: 'Motion 9',  category: 'Vertical',   aspectRatio: '9/16', blob: 'MOTION 9' },  // ⚠️ arquivo local corrompido (48 bytes) — re-subir
  { title: 'Motion 10', category: 'Quadrado',   aspectRatio: '1/1',  blob: 'MOTION 10' },
  { title: 'Motion 17', category: 'Widescreen', aspectRatio: '16/9', blob: 'MOTION 17' },
  { title: 'Motion 18', category: 'Widescreen', aspectRatio: '16/9', blob: 'MOTION 18' },
  { title: 'Motion 57', category: 'Portrait',   aspectRatio: '9/10', blob: 'MOTION 57' },  // 1080x1200
  { title: 'Motion 75', category: 'Widescreen', aspectRatio: '16/9', blob: 'MOTION 75' },
  { title: 'Motion 79', category: 'Widescreen', aspectRatio: '16/9', blob: 'MOTION 79' },
  { title: 'Motion 80', category: 'Widescreen', aspectRatio: '16/9', blob: 'MOTION 80' },
  { title: 'Motion 81', category: 'Widescreen', aspectRatio: '16/9', blob: 'MOTION 81' },
  { title: 'Motion 82', category: 'Widescreen', aspectRatio: '16/9', blob: 'MOTION 82' },
  { title: 'Motion 83', category: 'Widescreen', aspectRatio: '16/9', blob: 'MOTION 83' },
  { title: 'Motion 84', category: 'Widescreen', aspectRatio: '16/9', blob: 'MOTION 84' },
];

/* ============================================================
   MIX — galeria com formatos misturados (1:1, 9:16, 16:9)
   ============================================================ */
// A faixa "Mix" só aparece na home se tiver pelo menos 1 vídeo aqui.
// Cada vídeo DEVE ter `aspectRatio` explícito porque a faixa aceita formatos misturados.
//
// Exemplos (descomenta e edita):
//
// export const MIXED_VIDEOS = [
//   // Vídeo quadrado:
//   { title: 'Logo Animada',  category: 'Branding',  aspectRatio: '1/1',  blob: 'SQ-LOGO-1' },
//   // Vídeo vertical:
//   { title: 'Reel Cliente',  category: 'Reels',     aspectRatio: '9/16', blob: 'MIX-REEL-1' },
//   // Vídeo horizontal:
//   { title: 'Brand Film X',  category: 'Brand',     aspectRatio: '16/9', blob: 'MIX-WIDE-1' },
// ];
export const MIXED_VIDEOS = [];
