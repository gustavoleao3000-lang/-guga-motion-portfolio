import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CardPreview, getPoster } from '../../lib/videoUtils';

const ROTATE_MS = 8000; // 8 segundos por reel

export default function FeaturedReel({
  videos = [],
  eyebrow = 'Reels',
  title,
  subtitle,
  withTopBorder = true,
  compact = false,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  // Detecta quando a seção tá visível
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: '100px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (!inView || paused || videos.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % videos.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [inView, paused, videos.length]);

  if (!videos.length) return null;

  const current = videos[index];
  const aspectRatio = current.aspectRatio || '9/16';
  const poster = getPoster(current);

  const goPrev = () => setIndex((i) => (i - 1 + videos.length) % videos.length);
  const goNext = () => setIndex((i) => (i + 1) % videos.length);

  return (
    <section
      ref={ref}
      className={`${compact ? 'pt-2 pb-10 md:pt-3 md:pb-14' : 'py-10 md:py-14'} ${withTopBorder ? 'border-t border-border/40' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={compact ? 'mb-6 md:mb-8' : 'mb-7 md:mb-10'}
        >
          <div className={`flex items-center gap-3 ${compact ? 'mb-2' : 'mb-4'}`}>
            <span className="block h-px w-6 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              {eyebrow}
            </span>
            <span className="block h-px flex-1 max-w-[80px] bg-muted-foreground/30" />
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground/70 md:text-xs">
              {String(index + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
            </span>
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

        {/* Featured player */}
        <div
          className="relative mx-auto"
          style={{ maxWidth: '340px' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            style={{ aspectRatio }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/60"
          >
            {/* Backdrop gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-card to-black" />

            {/* Vídeo com fade entre transições */}
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {poster && (
                  <img
                    src={poster}
                    alt={current.title}
                    loading="eager"
                    decoding="async"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <CardPreview video={current} active={inView} />
              </motion.div>
            </AnimatePresence>

            {/* Vinheta */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

            {/* Setas de navegação manual */}
            <button
              onClick={goPrev}
              aria-label="Anterior"
              className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:border-white/40 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goNext}
              aria-label="Próximo"
              className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:border-white/40 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Título overlay no rodapé */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="truncate font-display text-sm font-bold tracking-tight text-white">
                    {current.title}
                  </p>
                  {(current.category || current.tag) && (
                    <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {current.category || current.tag}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Barra de progresso fina no rodapé */}
            <div className="absolute inset-x-0 bottom-0 z-30 h-0.5 bg-white/10">
              <motion.div
                key={`${index}-${paused}`}
                initial={{ width: '0%' }}
                animate={{ width: paused ? '0%' : '100%' }}
                transition={{
                  duration: paused ? 0.2 : ROTATE_MS / 1000,
                  ease: paused ? 'easeOut' : 'linear',
                }}
                className="h-full bg-primary shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>

          {/* Dots — preview de até 9 vídeos próximos */}
          <div className="mt-5 flex items-center justify-center gap-1.5">
            {videos.slice(0, Math.min(videos.length, 9)).map((_, i) => {
              // Mostra próximos 9 ao redor do atual
              const dotIndex = (index - 4 + i + videos.length) % videos.length;
              const isActive = dotIndex === index;
              return (
                <button
                  key={i}
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`Vídeo ${dotIndex + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                  }`}
                />
              );
            })}
          </div>

          {/* Dica de interação */}
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
            Passa o cursor pra pausar · Setas pra navegar
          </p>
        </div>
      </div>
    </section>
  );
}
