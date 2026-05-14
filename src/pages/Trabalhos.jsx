import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { CardPreview, getPoster } from '../lib/videoUtils';
import {
  VIDEOS,
  WIDESCREEN_VIDEOS,
  NOVOS_VIDEOS,
  MIXED_VIDEOS,
} from '../data/videos';

// Junta tudo num feed só. Ordem: Novidades → Stories → Widescreen → Mix
const ALL_VIDEOS = [
  ...NOVOS_VIDEOS,
  ...VIDEOS,
  ...WIDESCREEN_VIDEOS,
  ...MIXED_VIDEOS,
];

const FILTER_ALL = 'todos';

function FeedItem({ video, index, total }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const poster = getPoster(video);
  const aspectRatio = video.aspectRatio || '9/16';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-3xl"
    >
      <div
        style={{ aspectRatio }}
        className="relative w-full overflow-hidden rounded-2xl border border-border bg-card/60 max-h-[85vh]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-card to-black" />

        {poster && (
          <img
            src={poster}
            alt={video.title}
            loading={index < 3 ? 'eager' : 'lazy'}
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <CardPreview video={video} active={inView} />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

        <div className="absolute top-3 right-3 z-10 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 backdrop-blur-md">
          <span className="font-mono text-[10px] tabular-nums text-white/70">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
          <p className="font-display text-base font-bold tracking-tight text-white md:text-lg">
            {video.title}
          </p>
          {(video.category || video.tag) && (
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {video.category || video.tag}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function FilterChip({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-200 md:text-xs ${
        active
          ? 'border border-primary bg-primary text-primary-foreground'
          : 'border border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground'
      }`}
    >
      <span>{label}</span>
      <span
        className={`font-bold tabular-nums ${
          active ? 'text-primary-foreground/70' : 'text-foreground'
        }`}
      >
        {count}
      </span>
    </button>
  );
}

export default function Trabalhos() {
  const [filter, setFilter] = useState(FILTER_ALL);

  // Lista de categorias únicas + contagem
  const counts = useMemo(() => {
    return ALL_VIDEOS.reduce((acc, v) => {
      const cat = v.category || v.tag || 'Outro';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
  }, []);

  // Ordena por contagem decrescente (categoria com mais vídeos aparece primeiro)
  const categories = useMemo(
    () => Object.keys(counts).sort((a, b) => counts[b] - counts[a]),
    [counts]
  );

  // Vídeos filtrados
  const filtered = useMemo(() => {
    if (filter === FILTER_ALL) return ALL_VIDEOS;
    return ALL_VIDEOS.filter((v) => (v.category || v.tag) === filter);
  }, [filter]);

  // Scroll suave pro topo do feed ao trocar filtro
  const feedRef = useRef(null);
  const handleFilter = (cat) => {
    setFilter(cat);
    // Pequeno delay pra animação começar
    setTimeout(() => {
      if (feedRef.current) {
        const top = feedRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 md:mb-10"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-6 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Portfólio
            </span>
            <span className="block h-px flex-1 max-w-[120px] bg-muted-foreground/30" />
          </div>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Todos os<br className="hidden md:block" />
            <span className="text-primary"> trabalhos.</span>
          </h1>
          <p className="mt-4 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
            {ALL_VIDEOS.length} vídeos · clica nos filtros pra ver por categoria
          </p>
        </motion.div>

        {/* Filtros sticky */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="sticky top-16 z-30 -mx-5 mb-8 border-y border-border/40 bg-background/85 px-5 py-3 backdrop-blur-md md:-mx-12 md:top-20 md:mb-12 md:px-12 md:py-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <FilterChip
              label="Todos"
              count={ALL_VIDEOS.length}
              active={filter === FILTER_ALL}
              onClick={() => handleFilter(FILTER_ALL)}
            />
            {categories.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                count={counts[cat]}
                active={filter === cat}
                onClick={() => handleFilter(cat)}
              />
            ))}
            {filter !== FILTER_ALL && (
              <button
                onClick={() => handleFilter(FILTER_ALL)}
                className="ml-auto inline-flex items-center gap-1 rounded-full border border-border bg-card/50 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Limpar filtro"
              >
                <X className="h-3 w-3" />
                Limpar
              </button>
            )}
          </div>
        </motion.div>

        {/* Feed */}
        <div ref={feedRef} className="flex flex-col gap-5 md:gap-8">
          {filtered.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-card/30 px-6 py-12 text-center">
              <p className="font-display text-lg font-bold tracking-tight text-foreground">
                Nenhum vídeo dessa categoria
              </p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                Tenta outro filtro acima
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.map((v, i) => (
                <FeedItem
                  key={`${v.blob || v.vimeo || v.src}`}
                  video={v}
                  index={i}
                  total={filtered.length}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-2xl rounded-2xl border border-border bg-card/40 p-6 text-center md:mt-24 md:p-10"
        >
          <p className="font-display text-2xl font-black tracking-tight md:text-3xl">
            Gostou do trabalho?
          </p>
          <p className="mt-3 max-w-md mx-auto font-mono text-xs text-muted-foreground md:text-sm">
            Vamos transformar sua ideia em motion. Manda no WhatsApp e a gente conversa.
          </p>
          <a
            href="https://wa.me/5562998744360?text=Oi%20Guga%2C%20vi%20teu%20portf%C3%B3lio%20e%20quero%20conversar."
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FB558] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)]"
          >
            Falar no WhatsApp
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
