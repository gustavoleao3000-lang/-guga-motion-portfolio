// Listas de vídeos do showreel.
//
// 3 formas de hospedar (pode misturar):
//
// 1) CLOUDINARY (recomendado — sem Vimeo, hospedagem própria, CDN rápido)
//    a) Cadastre grátis em https://cloudinary.com (25GB storage + 25GB banda/mês)
//    b) Pegue o "Cloud Name" no dashboard e cole abaixo
//    c) Suba o vídeo pelo dashboard (drag-drop) → copia o "Public ID"
//       Ex: se subiu como "showreel/motion-2", o public ID é exatamente isso
//    d) Adiciona uma entrada: { title: 'X', tag: 'Y', cloudinary: 'showreel/motion-2' }
//
// 2) VIMEO (atual — funciona, mas tem branding e limite na conta free)
//    { title: 'X', tag: 'Y', vimeo: '123456789' }
//
// 3) MP4 LOCAL em /public/videos/
//    { title: 'X', tag: 'Y', src: '/videos/x.mp4', poster: '/videos/x.jpg' }

// 👇 Cole seu Cloud Name aqui depois de cadastrar (deixe '' enquanto não tiver):
export const CLOUDINARY_CLOUD_NAME = '';

// ===== STORIES (formato vertical 9:16) =====
export const VIDEOS = [
  { title: 'Motion 2',  tag: 'Motion', vimeo: '1191693401' },
  { title: 'Motion 3',  tag: 'Motion', vimeo: '1191693400' },
  { title: 'Motion 4',  tag: 'Motion', vimeo: '1191693473' },
  { title: 'Motion 49', tag: 'Motion', vimeo: '1191694193' },
  { title: 'Motion 52', tag: 'Motion', vimeo: '1191694192' },
  { title: 'Motion 55', tag: 'Motion', vimeo: '1191694230' },
  { title: 'Motion 85', tag: 'Motion', vimeo: '1191693403' },
  // Exemplo Cloudinary (descomenta quando tiver subido):
  // { title: 'Reel novo', tag: 'Motion', cloudinary: 'showreel/reel-novo' },
];

// ===== WIDESCREEN (formato horizontal 16:9) =====
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
