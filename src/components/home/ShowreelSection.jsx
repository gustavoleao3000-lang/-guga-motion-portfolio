import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight, VolumeX } from 'lucide-react';
import { VIDEOS } from '../../data/videos';

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

function getPoster(video) {
  if (video.poster) return video.poster;
  const v = parseVimeo(video.vimeo);
  if (v) return `https://vumbnail.com/${v.id}_large.jpg`;
  return null;
}

function CardPreview({ video, active }) {
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
      />
    );
  }

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

function VideoCard({ video, onOpen, index }) {
  const poster = getPoster(video);
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '80px', threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.button
      ref={cardRef}
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 bg-card/50 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(255,0,255,0.35)]"
    >
      {/* Poster (sempre visível, faz fundo enquanto vídeo carrega) */}
      {poster ? (
        <img
          src={poster}
          alt={video.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-card to-black" />
      )}

      {/* Preview que toca quando o card entra na tela */}
      <CardPreview video={video} active={inView} />

      {/* Vinheta pra legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Indicador "mudo" — só quando o preview tá rolando */}
      {inView && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 backdrop-blur-md">
          <VolumeX className="h-3 w-3 text-white/70" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/70">
            mudo
          </span>
        </div>
      )}

      {/* Botão play (vira convite pra abrir com som) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 opacity-90 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/20 group-hover:opacity-100 group-hover:shadow-[0_0_24px_rgba(255,0,255,0.45)]">
          <Play className="h-5 w-5 translate-x-px fill-white text-white transition-colors group-hover:fill-primary group-hover:text-primary" />
        </div>
      </div>

      {/* Info no rodapé */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold tracking-tight text-white">
            {video.title}
          </p>
          {video.tag && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">
              {video.tag}
            </p>
          )}
        </div>
        <span className="font-mono text-[10px] tabular-nums text-white/40">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.button>
  );
}

function VideoPlayer({ video }) {
  const v = parseVimeo(video.vimeo);
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
        className="aspect-video w-full bg-black"
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
      className="aspect-video w-full bg-black"
    />
  );
}

function Lightbox({ videos, index, onClose, onPrev, onNext }) {
  const video = videos[index];

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
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-primary/10">
          <VideoPlayer video={video} />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 px-1">
          <div className="min-w-0">
            <p className="truncate font-display text-base font-bold tracking-tight text-white">
              {video.title}
            </p>
            {video.tag && (
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                {video.tag}
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
    <div className="relative flex aspect-[16/7] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-primary/25 bg-gradient-to-br from-primary/5 via-card/40 to-black px-6 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
        <Play className="h-5 w-5 translate-x-px fill-primary text-primary" />
      </div>
      <p className="font-display text-base font-bold tracking-tight text-white md:text-lg">
        Showreel em breve
      </p>
      <p className="mt-1 max-w-sm font-mono text-xs text-muted-foreground">
        Adicione vídeos em <span className="text-primary/80">src/data/videos.js</span> (Vimeo ou MP4).
      </p>
    </div>
  );
}

export default function ShowreelSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % VIDEOS.length)),
    []
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + VIDEOS.length) % VIDEOS.length)),
    []
  );

  return (
    <section id="showreel" className="border-t border-border/30 px-5 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-7 md:mb-10"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-6 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Showreel
            </span>
          </div>
          <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Trabalhos selecionados<br className="hidden md:block" />
            <span className="text-primary"> em movimento.</span>
          </h2>
        </motion.div>

        {VIDEOS.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {VIDEOS.map((v, i) => (
              <VideoCard
                key={v.vimeo || v.src || i}
                video={v}
                index={i}
                onOpen={() => setOpenIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            videos={VIDEOS}
            index={openIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
