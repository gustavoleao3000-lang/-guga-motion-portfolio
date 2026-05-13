// Listas de vídeos do showreel.
//
// 3 formas de hospedar (pode misturar à vontade):
//
// 1) BLOB STORAGE — Cloudflare R2 (recomendado: 10GB + banda ilimitada GRÁTIS)
//    a) Cadastre em https://dash.cloudflare.com (cria conta + ativa R2)
//    b) Cria um bucket (ex: 'guga-showreel') e libera acesso público
//    c) Sobe o .mp4 E o .jpg (capa) pro bucket — mesmo nome, ex:
//       motion-1.mp4 + motion-1.jpg
//    d) Pega a URL pública do bucket (pub-xxxxxxx.r2.dev) e cola abaixo
//    e) Usa entrada: { title: 'X', blob: 'motion-1' }
//
// 2) VIMEO (funciona, mas tem branding e limites)
//    { title: 'X', tag: 'Y', vimeo: '123456789' }
//
// 3) MP4 LOCAL em /public/videos/ (não recomendado pra muitos vídeos)
//    { title: 'X', tag: 'Y', src: '/videos/x.mp4', poster: '/videos/x.jpg' }

// 👇 URL base do seu bucket R2 (sem barra no fim). Deixe vazio se não usar.
// Ex: 'https://pub-abc123def456.r2.dev'  ou  'https://videos.gugamotion.com'
export const BLOB_BASE_URL = '';

// ===== STORIES (formato vertical 9:16) =====
export const VIDEOS = [
  { title: 'Motion 2',  tag: 'Motion', vimeo: '1191693401' },
  { title: 'Motion 3',  tag: 'Motion', vimeo: '1191693400' },
  { title: 'Motion 4',  tag: 'Motion', vimeo: '1191693473' },
  { title: 'Motion 49', tag: 'Motion', vimeo: '1191694193' },
  { title: 'Motion 52', tag: 'Motion', vimeo: '1191694192' },
  { title: 'Motion 55', tag: 'Motion', vimeo: '1191694230' },
  { title: 'Motion 85', tag: 'Motion', vimeo: '1191693403' },
  // Exemplo R2 (descomenta quando tiver subido pro bucket):
  // { title: 'Reel novo', tag: 'Motion', blob: 'showreel/reel-novo' },
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
