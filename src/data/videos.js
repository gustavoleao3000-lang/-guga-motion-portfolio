// Listas de vídeos do showreel.
//
// Como adicionar um vídeo novo:
//   1) Sobe no vimeo.com
//   2) Copia o ID (o número da URL, ex: https://vimeo.com/123456789 → 123456789)
//   3) Adiciona uma linha na lista certa (story = vertical 9:16, wide = horizontal 16:9):
//      { title: 'Nome', tag: 'Motion', vimeo: '123456789' },
//
// Capa é puxada automática do Vimeo. Pra capa custom, adiciona:
//   poster: '/videos/minha-capa.jpg'  (coloque o arquivo em public/videos/)
//
// Vimeo unlisted (privado com link): cola a URL completa
//   ex: vimeo: 'https://vimeo.com/123456789/abc123def4'

// ===== STORIES (formato vertical 9:16) =====
export const VIDEOS = [
  { title: 'Motion 2',  tag: 'Motion', vimeo: '1191693401' },
  { title: 'Motion 3',  tag: 'Motion', vimeo: '1191693400' },
  { title: 'Motion 4',  tag: 'Motion', vimeo: '1191693473' },
  { title: 'Motion 49', tag: 'Motion', vimeo: '1191694193' },
  { title: 'Motion 52', tag: 'Motion', vimeo: '1191694192' },
  { title: 'Motion 55', tag: 'Motion', vimeo: '1191694230' },
  { title: 'Motion 85', tag: 'Motion', vimeo: '1191693403' },
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
