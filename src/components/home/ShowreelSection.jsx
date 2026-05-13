import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight, VolumeX } from 'lucide-react';
import { BLOB_BASE_URL } from '../../data/videos';

/* ============================================================
   HELPERS
   ============================================================ */

// Hook simples pra detectar viewport mobile
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
}

function parseVimeo(input) {
  if (!input) return null;
  const s = String(input);
  const idMatch = s.match(/(?:vimeo\.com\/(?:video\/)?|^)(\d+)/);
  if (!idMatch) return null;
  const id = idMatch[1];
  let hash = null;
  const afterId = s.split(id)[1] || '';
  const slashHash = afterId.match(/^\/([a-zA-Z0-9]+)/);
  if (slashHash) hash = slashHash[1];
  const hParam = s.match(/[?&]h=([a-zA-Z0-9]+)/);
  if (hParam) hash = hParam[1];
  return { id, hash };
}

// Constrói URLs do bucket Blob Storage (R2/S3/etc) a partir do path do arquivo.
function blobUrls(path) {
  if (!BLOB_BASE_URL || !path) return null;
  const base = BLOB_BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '').replace(/\.(mp4|webm|mov|jpg|jpeg|png)$/i, '');
  const encoded = clean.split('/').map(encodeURIComponent).join('/');
  return {
    video:  `${base}/${encoded}.mp4`,
    poster: `${base}/${encoded}.jpg`,
  };
}

function getPoster(video) {
  if (video.poster) return video.poster;
  const blob = blobUrls(video.blob);
  if (blob) return blob.poster;
  const v = parseVimeo(video.vimeo);
  if (v) return `https://vumbnail.com/${v.id}_large.jpg`;
  return null;
}

/* ============================================================
   ASPECT RATIO CONFIG
   ============================================================ */

// Altura fixa do strip por tipo de seção. Cards têm largura derivada
// do seu próprio aspectRatio. Permite misturar 9:16, 1:1 e 16:9 na mesma faixa.
const SECTION_HEIGHTS = {
  story: 'h-64 sm:h-72 md:h-[22rem] lg:h-[24rem]',
  wide:  'h-44 sm:h-52 md:h-64 lg:h-72',
  mixed: 'h-60 sm:h-72 md:h-80 lg:h-[22rem]',
};

const DEFAULT_ASPECT = {
  story: '9/16',
  wide:  '16/9',
  mixed: '9/16',
};

// Layout do player no lightbox baseado no aspectRatio do vídeo.
// Suporta qualquer ratio (4/5, 9/10, 3/4, etc.) usando CSS style dinâmico.
function getLightboxLayout(aspectRatio) {
  // Tenta parsear o ratio. Se falhar, usa 9/16.
  const parts = String(aspectRatio).split('/').map((s) => parseFloat(s.trim()));
  const w = parts[0] || 9;
  const h = parts[1] || 16;
  const isWide = w / h >= 1.3; // 16/9 (1.78), 4/3 (1.33) — horizontal

  if (isWide) {
    return {
      container: 'w-full max-w-6xl',
      playerStyle: { aspectRatio: `${w}/${h}` },
      playerClass: 'w-full',
    };
  }
  // Vertical ou quase-quadrado: centraliza, limita altura
  return {
    container: 'flex max-h-[88vh] flex-col items-center',
    playerStyle: {
      aspectRatio: `${w}/${h}`,
      height: '82vh',
      maxHeight: '82vh',
      maxWidth: '92vw',
    },
    playerClass: 'w-auto',
  };
}

// Resolve o aspectRatio efetivo de um vídeo (meta do vídeo > default da seção)
function resolveAspect(video, sectionAspect) {
  return video.aspectRatio || DEFAULT_ASPECT[sectionAspect] || '9/16';
}

// Distribui os vídeos em N faixas (round-robin pra balancear)
function distribute(arr, n) {
  if (!n || n <= 1) return [arr];
  const result = Array.from({ length: n }, () => []);
  arr.forEach((v, i) => result[i % n].push(v));
  return result.filter((row) => row.length > 0);
}

/* ============================================================
   CARD PREVIEW (vídeo mudo em loop quando visível)
   ============================================================ */

function CardPreview({ video, active }) {
  const blob = blobUrls(video.blob);
  const v = parseVimeo(video.vimeo);
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (active) {
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } else {
      el.pause();
    }
  }, [active]);

  if (!active) return null;

  // Blob Storage: <video> direto
  if (blob) {
    return (
      <video
        ref={videoRef}
        src={blob.video}
        poster={blob.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  // Vimeo: iframe em background mode
  if (v) {
    const params = new URLSearchParams({
      background: '1',
      autoplay: '1',
      muted: '1',
      loop: '1',
      dnt: '1',
    });
    if (v.hash) params.set('h', v.hash);
    return (
      <iframe
        src={`https://player.vimeo.com/video/${v.id}?${params.toString()}`}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        title={video.title}
        tabIndex={-1}
        loading="lazy"
      />
    );
  }

  // MP4 local em /public/videos/
  return (
    <video
      ref={videoRef}
      src={video.src}
      poster={video.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

/* ============================================================
   REEL CARD (item individual no marquee)
   ============================================================ */

function ReelCard({ video, onOpen, active, index, aspectRatio }) {
  const poster = getPoster(video);
  const cardRef = useRef(null);
  const [cardInView, setCardInView] = useState(false);

  // IO por card: vídeo só carrega quando o card está perto da viewport.
  // Combinado com `active` (seção visível), evita carregar 30+ iframes ao mesmo tempo.
  useEffect(() => {
    if (!active) {
      setCardInView(false);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setCardInView(entry.isIntersecting),
      { rootMargin: '250px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  return (
    <button
      ref={cardRef}
      onClick={onOpen}
      style={{ aspectRatio }}
      className="group relative h-full flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-card/60 text-left transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.55)]"
      aria-label={`Abrir ${video.title}`}
    >
      {/* Gradient sempre presente como fallback (caso poster não exista/carregue) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-card to-black" />
      {poster && (
        <img
          src={poster}
          alt={video.title}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <CardPreview video={video} active={active && cardInView} />

      {/* Vinheta */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

      {/* Counter top-right */}
      <div className="absolute top-2 right-2 z-10 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 backdrop-blur-md">
        <span className="font-mono text-[9px] tabular-nums text-white/70">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Mute indicator */}
      <div className="absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur-md">
        <VolumeX className="h-3 w-3 text-white/70" />
      </div>

      {/* Play button (hover desktop / sempre opaco no mobile) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-black/60 backdrop-blur-md shadow-[0_0_24px_rgba(255,255,255,0.55)]">
          <Play className="h-4 w-4 translate-x-px fill-primary text-primary" />
        </div>
      </div>

      {/* Título no rodapé */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-3">
        <p className="truncate font-display text-xs font-bold tracking-tight text-white">
          {video.title}
        </p>
        {(video.category || video.tag) && (
          <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-widest text-muted-foreground/80">
            {video.category || video.tag}
          </p>
        )}
      </div>
    </button>
  );
}

/* ============================================================
   VIDEO PLAYER (no lightbox, com som e controles)
   ============================================================ */

function VideoPlayer({ video, playerClass, playerStyle }) {
  const blob = blobUrls(video.blob);
  const v = parseVimeo(video.vimeo);

  // object-fit: se aspectRatio explícito, container bate com vídeo → cover é seguro.
  // Sem aspectRatio, contain preserva conteúdo inteiro.
  const fitClass = video.aspectRatio ? 'object-cover' : 'object-contain';

  if (blob) {
    return (
      <video
        key={blob.video}
        src={blob.video}
        poster={blob.poster}
        controls
        autoPlay
        playsInline
        preload="metadata"
        style={playerStyle}
        className={`bg-black ${fitClass} ${playerClass}`}
      />
    );
  }

  if (v) {
    const params = new URLSearchParams({
      autoplay: '1',
      title: '0',
      byline: '0',
      portrait: '0',
      dnt: '1',
    });
    if (v.hash) params.set('h', v.hash);
    return (
      <iframe
        src={`https://player.vimeo.com/video/${v.id}?${params.toString()}`}
        style={playerStyle}
        className={`bg-black ${playerClass}`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={video.title}
      />
    );
  }

  return (
    <video
      key={video.src}
      src={video.src}
      poster={video.poster}
      controls
      autoPlay
      playsInline
      preload="metadata"
      style={playerStyle}
      className={`bg-black ${fitClass} ${playerClass}`}
    />
  );
}

/* ============================================================
   LIGHTBOX
   ============================================================ */

function Lightbox({ videos, index, onClose, onPrev, onNext, sectionAspect }) {
  const video = videos[index];
  const aspectRatio = resolveAspect(video, sectionAspect);
  const layout = getLightboxLayout(aspectRatio);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:border-primary/50 hover:text-primary md:top-6 md:right-6"
        aria-label="Fechar"
      >
        <X className="h-5 w-5" />
      </button>

      {videos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:border-primary/50 hover:text-primary md:left-6"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`relative ${layout.container}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-primary/10">
          <VideoPlayer
            video={video}
            playerClass={layout.playerClass}
            playerStyle={layout.playerStyle}
          />
        </div>
        <div className="mt-4 flex w-full items-center justify-between gap-4 px-1">
          <div className="min-w-0">
            <p className="truncate font-display text-base font-bold tracking-tight text-white">
              {video.title}
            </p>
            {(video.category || video.tag) && (
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/80">
                {video.category || video.tag}
              </p>
            )}
          </div>
          <p className="font-mono text-[10px] tabular-nums text-white/40">
            {String(index + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
          </p>
        </div>
      </motion.div>

      {videos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:border-primary/50 hover:text-primary md:right-6"
          aria-label="Próximo"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="relative mx-5 flex aspect-[16/7] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-primary/25 bg-gradient-to-br from-primary/5 via-card/40 to-black px-6 text-center md:mx-12">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
        <Play className="h-5 w-5 translate-x-px fill-primary text-primary" />
      </div>
      <p className="font-display text-base font-bold tracking-tight text-white md:text-lg">
        Em breve
      </p>
      <p className="mt-1 max-w-sm font-mono text-xs text-muted-foreground">
        Adicione vídeos em <span className="text-primary/80">src/data/videos.js</span>
      </p>
    </div>
  );
}

/* ============================================================
   SHOWREEL SECTION (componente principal)
   ============================================================ */

export default function ShowreelSection({
  id,
  videos,
  aspect = 'story',         // 'story' | 'wide' | 'mixed'
  eyebrow = 'Showreel',
  title,
  subtitle,
  direction = 'left',
  withTopBorder = true,
  compact = false,
  rows = 1,
}) {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const isMobile = useIsMobile();

  const heightClass = SECTION_HEIGHTS[aspect] || SECTION_HEIGHTS.story;
  const effectiveRows = isMobile ? 1 : rows;

  // Toca previews só quando a seção está visível
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { rootMargin: '120px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % videos.length)),
    [videos.length]
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + videos.length) % videos.length)),
    [videos.length]
  );

  const rowsList = distribute(videos, effectiveRows);

  // Duração base do marquee (escala com qtde, mas cap pra evitar lentidão exagerada)
  const perCard = aspect === 'wide' ? 4 : 3;
  const baseDuration = Math.max(28, Math.ceil(videos.length / effectiveRows) * perCard);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${compact ? 'pt-2 pb-8 md:pt-3 md:pb-12' : 'py-10 md:py-14'} ${withTopBorder ? 'border-t border-border/40' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={compact ? 'mb-4 md:mb-5' : 'mb-7 md:mb-10'}
        >
          <div className={`flex items-center gap-3 ${compact ? 'mb-2' : 'mb-4'}`}>
            <span className="block h-px w-6 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              {eyebrow}
            </span>
            <span className="block h-px flex-1 max-w-[80px] bg-muted-foreground/30" />
          </div>
          {title && (
            <h2
              className={`font-display font-black leading-tight tracking-tight ${
                compact ? 'text-xl md:text-2xl' : 'text-3xl md:text-5xl'
              }`}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className={`max-w-md font-mono text-xs text-muted-foreground md:text-sm ${
                compact ? 'mt-2' : 'mt-3'
              }`}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      {videos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3 md:space-y-4">
          {rowsList.map((rowVideos, rowIdx) => {
            const rowDir =
              rowIdx % 2 === 0
                ? direction
                : direction === 'left'
                ? 'right'
                : 'left';
            const rowDuration = baseDuration + rowIdx * 6;
            const loopList = [...rowVideos, ...rowVideos];
            return (
              <div
                key={rowIdx}
                className={`group/marquee marquee-mask relative overflow-hidden ${heightClass}`}
              >
                <div
                  className={`flex h-full w-max gap-3 sm:gap-4 animate-marquee group-hover/marquee:[animation-play-state:paused] ${
                    rowDir === 'right' ? '[animation-direction:reverse]' : ''
                  }`}
                  style={{ animationDuration: `${rowDuration}s` }}
                >
                  {loopList.map((v, i) => {
                    const originalIndex = videos.indexOf(v);
                    const cardAspect = resolveAspect(v, aspect);
                    // Cards param quando o lightbox abre (só 1 vídeo tocando por vez)
                    const isActive = sectionVisible && openIndex === null;
                    return (
                      <ReelCard
                        key={`${v.blob || v.vimeo || v.src}-${rowIdx}-${i}`}
                        video={v}
                        index={originalIndex}
                        active={isActive}
                        aspectRatio={cardAspect}
                        onOpen={() => setOpenIndex(originalIndex)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            videos={videos}
            index={openIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
            sectionAspect={aspect}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
