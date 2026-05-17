import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CardPreview, getPoster } from '../lib/videoUtils';
import { useLanguage } from '@/lib/LanguageContext';
import {
  VIDEOS,
  WIDESCREEN_VIDEOS,
  QUADRADO_VIDEOS,
} from '../data/videos';

// Embaralha uma vez (estável durante a sessão) pra misturar formatos no grid
function shuffleStable(arr) {
  const out = [...arr];
  // Embaralhamento determinístico por hash do blob (fica mesmo entre renders)
  out.sort((a, b) => {
    const ha = (a.blob || a.vimeo || a.src || '').split('').reduce((s, c) => s + c.charCodeAt(0), 0);
    const hb = (b.blob || b.vimeo || b.src || '').split('').reduce((s, c) => s + c.charCodeAt(0), 0);
    return (ha % 97) - (hb % 97);
  });
  return out;
}

function FeedItem({ video, index }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const poster = getPoster(video);
  const aspect = video.aspectRatio || '9/16';

  // Span no grid baseado no formato (mosaico tipo Pinterest)
  let spanClass = '';
  if (aspect === '9/16' || aspect === '9/10') spanClass = 'row-span-2';
  else if (aspect === '16/9') spanClass = 'col-span-2';

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
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card/60 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] ${spanClass}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-card to-black">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </div>

      {poster && (
        <img
          src={poster}
          alt=""
          loading={index < 6 ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={index < 4 ? 'high' : 'auto'}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <CardPreview video={video} active={inView} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.03]" />
    </motion.article>
  );
}

export default function Trabalhos() {
  const { t } = useLanguage();

  // Mistura todos os formatos juntos (ordem estável mas misturada)
  const allVideos = useMemo(
    () => shuffleStable([...VIDEOS, ...WIDESCREEN_VIDEOS, ...QUADRADO_VIDEOS]),
    []
  );

  return (
    <div className="pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-14"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-6 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              {t('works_eyebrow')}
            </span>
            <span className="block h-px flex-1 max-w-[120px] bg-muted-foreground/30" />
          </div>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {t('works_title_1')}{' '}
            <span
              className="italic text-primary"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
                filter: 'drop-shadow(0 0 24px rgba(255,255,255,0.25))',
              }}
            >
              {t('works_title_2')}
            </span>
          </h1>
          <p className="mt-4 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
            {allVideos.length} {t('works_subtitle')}
          </p>
        </motion.div>

        {/* Grid masonry — todos os formatos misturados, sem filtro */}
        {allVideos.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-card/30 px-6 py-12 text-center">
            <p className="font-display text-lg font-bold tracking-tight text-foreground">
              {t('works_empty_title')}
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {t('works_empty_subtitle')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 [grid-auto-flow:dense] [grid-auto-rows:140px] sm:grid-cols-3 sm:[grid-auto-rows:150px] md:grid-cols-4 md:gap-4 md:[grid-auto-rows:160px] lg:grid-cols-6 lg:[grid-auto-rows:175px]">
            {allVideos.map((v, i) => (
              <FeedItem
                key={`${v.blob || v.vimeo || v.src}`}
                video={v}
                index={i}
              />
            ))}
          </div>
        )}

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-2xl rounded-2xl border border-border bg-card/40 p-6 text-center md:mt-24 md:p-10"
        >
          <p className="font-display text-2xl font-black tracking-tight md:text-3xl">
            {t('works_cta_title')}
          </p>
          <p className="mt-3 max-w-md mx-auto font-mono text-xs text-muted-foreground md:text-sm">
            {t('works_cta_subtitle')}
          </p>
          <a
            href="https://wa.me/5562998744360?text=Oi%20Guga%2C%20vi%20teu%20portf%C3%B3lio%20e%20quero%20conversar."
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FB558] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)]"
          >
            {t('works_cta_button')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
