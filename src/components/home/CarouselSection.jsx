import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, VolumeX } from 'lucide-react';
import { CardPreview, getPoster } from '../../lib/videoUtils';

// Configurações por formato
const FORMAT_CONFIG = {
  reels: {
    aspect: '9/16',
    height: 'h-72 sm:h-80 md:h-[24rem] lg:h-[28rem]',
  },
  widescreen: {
    aspect: '16/9',
    height: 'h-44 sm:h-56 md:h-72 lg:h-80',
  },
};

function CarouselCard({ video, active, index, aspect }) {
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);
  const poster = getPoster(video);

  // Carrega vídeo só quando o card está perto da viewport
  useEffect(() => {
    if (!active) {
      setInView(false);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  return (
    <div
      ref={cardRef}
      style={{ aspectRatio: aspect }}
      className="group relative h-full flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card/60"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-card to-black">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {poster && (
        <img
          src={poster}
          alt={video.title}
          loading={index < 8 ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={index < 4 ? 'high' : 'auto'}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <CardPreview video={video} active={inView} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

      <div className="absolute top-2 right-2 z-10 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 backdrop-blur-md">
        <span className="font-mono text-[9px] tabular-nums text-white/70">
          {String((index % 999) + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur-md">
        <VolumeX className="h-3 w-3 text-white/70" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-3">
        <p className="truncate font-display text-xs font-bold tracking-tight text-white">
          {video.title}
        </p>
        {(video.category || video.tag) && (
          <p className="truncate font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            {video.category || video.tag}
          </p>
        )}
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
}) {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const pauseTimerRef = useRef(null);

  const cfg = FORMAT_CONFIG[format] || FORMAT_CONFIG.reels;

  // Detecta quando seção está visível
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

  // Auto-scroll contínuo (loop infinito)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || paused || !sectionVisible || videos.length === 0) return;

    let raf;
    const tick = () => {
      el.scrollLeft += 0.6; // velocidade (px/frame ≈ 36px/s)
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half; // reset silencioso (visualmente seamless)
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, sectionVisible, videos.length]);

  // Cleanup do timer ao desmontar
  useEffect(() => () => clearTimeout(pauseTimerRef.current), []);

  // Pausa temporariamente ao usar arrows
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
    el.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  };

  if (videos.length === 0) return null;

  // Duplica pra loop infinito seamless
  const loopList = [...videos, ...videos];

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

      {/* Carousel com arrows */}
      <div className="relative">
        {/* Arrow esquerda */}
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Anterior"
          className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:border-white/40 hover:text-white md:left-6 md:h-12 md:w-12"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Arrow direita */}
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Próximo"
          className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:border-white/40 hover:text-white md:right-6 md:h-12 md:w-12"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className={`marquee-mask flex gap-3 overflow-x-auto sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${cfg.height}`}
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {/* Espaçamento inicial pras arrows não cobrirem o primeiro card */}
          <div className="flex-shrink-0 w-2 md:w-8" aria-hidden />

          {loopList.map((v, i) => (
            <div key={`${v.blob || v.vimeo || v.src}-${i}`} data-card>
              <CarouselCard
                video={v}
                active={sectionVisible}
                index={i % videos.length}
                aspect={cfg.aspect}
              />
            </div>
          ))}

          {/* Espaçamento final */}
          <div className="flex-shrink-0 w-2 md:w-8" aria-hidden />
        </div>
      </div>
    </section>
  );
}
