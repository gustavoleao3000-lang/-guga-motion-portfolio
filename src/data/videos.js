// Lista de vídeos do showreel.
//
// Opção 1 — VIMEO (recomendado, mais leve):
//   1) Sobe o vídeo no vimeo.com
//   2) Copia o link (ex: https://vimeo.com/123456789  ou só o número 123456789)
//   3) Cola abaixo. A capa é puxada automática.
//
// Opção 2 — MP4 LOCAL:
//   1) Joga o .mp4 e o .jpg em /public/videos/
//   2) Usa src e poster com caminhos /videos/...
//
// Vimeo unlisted (privado com link): cola a URL completa
//   ex: 'https://vimeo.com/123456789/abc123def4' (com o hash depois da barra)

export const VIDEOS = [
  // ====== EXEMPLOS — descomente e troque pelos seus ======
  //
  // Vimeo (jeito mais fácil):
  // { title: 'Projeto 1', tag: 'Motion Design', vimeo: '76979871' },
  //
  // Vimeo com capa customizada (em vez da auto):
  // { title: 'Campanha', tag: 'Social', vimeo: '76979871', poster: '/videos/capa.jpg' },
  //
  // MP4 local:
  // { title: 'Vinheta', tag: 'Branding', src: '/videos/vinheta.mp4', poster: '/videos/vinheta.jpg' },
];
