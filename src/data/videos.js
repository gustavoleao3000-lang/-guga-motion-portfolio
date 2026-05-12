// Lista de vídeos do showreel.
//
// Como adicionar um vídeo novo:
//   1) Sobe no vimeo.com
//   2) Copia o ID (o número da URL, ex: https://vimeo.com/123456789 → 123456789)
//   3) Adiciona uma linha aqui embaixo no formato:
//      { title: 'Nome', tag: 'Motion', vimeo: '123456789' },
//
// Capa é puxada automática do Vimeo. Pra usar capa custom, adicione:
//   poster: '/videos/minha-capa.jpg'  (e coloque o arquivo em public/videos/)
//
// Vimeo unlisted (privado com link): cola a URL completa
//   ex: vimeo: 'https://vimeo.com/123456789/abc123def4'

export const VIDEOS = [
  { title: 'Motion 2',  tag: 'Motion Design', vimeo: '1191693401' },
  { title: 'Motion 3',  tag: 'Motion Design', vimeo: '1191693400' },
  { title: 'Motion 4',  tag: 'Motion Design', vimeo: '1191693473' },
  { title: 'Motion 49', tag: 'Motion Design', vimeo: '1191694193' },
  { title: 'Motion 52', tag: 'Motion Design', vimeo: '1191694192' },
  { title: 'Motion 55', tag: 'Motion Design', vimeo: '1191694230' },
  { title: 'Motion 85', tag: 'Motion Design', vimeo: '1191693403' },
];
