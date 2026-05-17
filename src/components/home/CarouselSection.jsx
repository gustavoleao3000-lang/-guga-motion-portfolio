import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CardPreview, getPoster } from '../../lib/videoUtils';

// Configurações por formato (altura POR LINHA, vai ter 2 linhas)
const FORMAT_CONFIG = {
  reels: {
    aspect: '9/16',
    height: 'h-80 sm:h-96 md:h-[26rem] lg:h-[30rem]',
  },
  widescreen: {
    aspect: '16/9',
    height: 'h-48 sm:h-64 md:h-80 lg:h-96',
  },
};

function CarouselCard({ video, active, index, aspect }) {
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);
  const poster = getPoster(video);

  useEffect(() => {
    if (!active) {
      setInView(false);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    // rootMargin pequeno: só toca vídeos realmente visíveis (evita travar Safari mobile com 10+ videos)
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '0px', threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  return (
    <div
      ref={cardRef}
      style={{ aspectRatio: aspect }}
      className="group relative h-full flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-card/60 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-card to-black">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </div>

      {poster && (
        <img
          src={poster}
          alt=""
          loading={index < 8 ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={index < 4 ? 'high' : 'auto'}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <CardPreview video={video} active={inView} />

      {/* Vinheta sutil pra dar profundidade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      {/* Borda interna sutil pra brilho refinado */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.03]" />
    </div>
  );
}

function CarouselRow({ videos, direction, active, aspect, height, withArrows }) {
  const scrollRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const pauseTimerRef = useRef(null);

  // Auto-scroll loop infinito (direção configurável)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || paused || !active || videos.length === 0) return;

    let raf;
    const speed = 1.5; // px por frame (~90px/s — mais rápido)
    const tick = () => {
      const half = el.scrollWidth / 2;
      if (direction === 'right') {
        el.scrollLeft -= speed;
        if (el.scrollLeft <= 0) el.scrollLeft += half;
      } else {
        el.scrollLeft += speed;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, active, direction, videos.length]);

  // Pra direção "right", começa no meio (pra ter conteúdo à esquerda)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || direction !== 'right') return;
    const init = () => {
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth / 2;
      }
    };
    init();
    const t1 = setTimeout(init, 100);
    const t2 = setTimeout(init, 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [direction, videos.length]);

  useEffect(() => () => clearTimeout(pauseTimerRef.current), []);

  const pauseTemporarily = () => {
    setPaused(true);
    clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), 3000);
  };

  const scrollByCard = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-card]');
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 16 : 200;
    pauseTemporarily();
    // dir is +1 for visual "next" (right arrow), -1 for "previous" (left arrow)
    // Each row scrolls in its natural direction
    const offset = direction === 'right' ? -dir : dir;
    el.scrollBy({ left: offset * cardWidth, behavior: 'smooth' });
  };

  // Duplica pra loop infinito seamless
  const loopList = [...videos, ...videos];

  return (
    <div className="relative">
      {withArrows && (
        <>
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Anterior"
            className="group/arrow absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/85 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white hover:bg-black/80 hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.3)] active:scale-95 md:left-6 md:h-13 md:w-13"
          >
            <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover/arrow:-translate-x-0.5" />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Próximo"
            className="group/arrow absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/85 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white hover:bg-black/80 hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.3)] active:scale-95 md:right-6 md:h-13 md:w-13"
          >
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover/arrow:translate-x-0.5" />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className={`marquee-mask flex gap-3 overflow-x-auto sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${height}`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex-shrink-0 w-2 md:w-8" aria-hidden />

        {loopList.map((v, i) => (
          <div key={`${v.blob || v.vimeo || v.src}-${i}`} data-card>
            <CarouselCard
              video={v}
              active={active}
              index={i % videos.length}
              aspect={aspect}
            />
          </div>
        ))}

        <div className="flex-shrink-0 w-2 md:w-8" aria-hidden />
      </div>
    </div>
  );
}

export default function CarouselSection({
  id,
  videos = [],
  format = 'reels',
  eyebrow,
  title,
  subtitle,
  withTopBorder = true,
  compact = false,
  windowSize,           // Quantos vídeos por vez. Ex: 20 pra reels, 10 pra wide.
  rotateMs = 45000,     // De quanto em quanto tempo o batch troca (45s)
}) {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [windowStart, setWindowStart] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );

  const cfg = FORMAT_CONFIG[format] || FORMAT_CONFIG.reels;

  // Reage a mudanças de tamanho de tela (mobile <-> desktop)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Window menor no mobile pra não estourar memória do Safari iOS (que crasha com muitos videos)
  const effectiveWindowSize = windowSize
    ? Math.min(windowSize, isMobile ? 6 : windowSize)
    : windowSize;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setSectionVisible(e.isIntersecting),
      { rootMargin: '100px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Rotaciona o batch ao longo do tempo (só se effectiveWindowSize < total)
  useEffect(() => {
    if (!effectiveWindowSize || effectiveWindowSize >= videos.length) return;
    if (!sectionVisible) return;
    const id = setInterval(() => {
      // Avança metade da window pra ter mistura suave (não swap brusco)
      const step = Math.max(1, Math.floor(effectiveWindowSize / 2));
      setWindowStart((prev) => (prev + step) % videos.length);
    }, rotateMs);
    return () => clearInterval(id);
  }, [effectiveWindowSize, videos.length, rotateMs, sectionVisible]);

  if (videos.length === 0) return null;

  // Se effectiveWindowSize definido, pega só uma janela (com wrap circular)
  const activeVideos = (() => {
    if (!effectiveWindowSize || effectiveWindowSize >= videos.length) return videos;
    const out = [];
    for (let i = 0; i < effectiveWindowSize; i++) {
      out.push(videos[(windowStart + i) % videos.length]);
    }
    return out;
  })();

  // Divide em 2 linhas
  const half = Math.ceil(activeVideos.length / 2);
  const row1 = activeVideos.slice(0, half);
  const row2 = activeVideos.slice(half).concat(
    activeVideos.slice(0, Math.max(0, half - (activeVideos.length - half)))
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${compact ? 'pt-2 pb-6 md:pt-3 md:pb-10' : 'py-8 md:py-12'} ${withTopBorder ? 'border-t border-border/40' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={compact ? 'mb-4 md:mb-5' : 'mb-6 md:mb-8'}
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

      <div className="space-y-3 md:space-y-4">
        {/* Linha 1 — direção esquerda (cards vão pra esquerda) — COM setas */}
        <CarouselRow
          videos={row1}
          direction="left"
          active={sectionVisible}
          aspect={cfg.aspect}
          height={cfg.height}
          withArrows
        />

        {/* Linha 2 — direção direita (cards vão pra direita) — SEM setas */}
        <CarouselRow
          videos={row2}
          direction="right"
          active={sectionVisible}
          aspect={cfg.aspect}
          height={cfg.height}
        />
      </div>
    </section>
  );
}
