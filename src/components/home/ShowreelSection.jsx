import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { BLOB_BASE_URL } from '../../data/videos';

/* ============================================================
   HELPERS
   ============================================================ */

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

// Alturas maiores no mobile pra dar protagonismo aos vídeos
// Alturas menores no mobile (mais videos visiveis por linha)
const SECTION_HEIGHTS = {
  story: 'h-56 sm:h-72 md:h-[22rem] lg:h-[24rem]',
  wide:  'h-36 sm:h-52 md:h-64 lg:h-72',
  mixed: 'h-48 sm:h-64 md:h-80 lg:h-[22rem]',
};

const DEFAULT_ASPECT = {
  story: '9/16',
  wide:  '16/9',
  mixed: '9/16',
};

function resolveAspect(video, sectionAspect) {
  return video.aspectRatio || DEFAULT_ASPECT[sectionAspect] || '9/16';
}

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

  // Blob Storage: <video> mudo em loop
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

  // Vimeo: iframe em background mode (sem som, sem controles)
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

  // MP4 local
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
   REEL CARD — display-only, sem click
   ============================================================ */

function ReelCard({ video, active, index, aspectRatio }) {
  const poster = getPoster(video);
  const cardRef = useRef(null);
  const [cardInView, setCardInView] = useState(false);

  // IO por card: vídeo só carrega quando o card está perto da viewport
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
    <div
      ref={cardRef}
      style={{ aspectRatio }}
      className="group relative h-full flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-card/60"
    >
      {/* Skeleton shimmer enquanto carrega */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-card to-black">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>
      {poster && (
        <img
          src={poster}
          alt={video.title}
          loading={index < 12 ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={index < 6 ? 'high' : 'auto'}
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

      {/* Título no rodapé */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-3">
        <p className="truncate font-display text-xs font-bold tracking-tight text-white">
          {video.title}
        </p>
        {(video.category || video.tag) && (
          <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            {video.category || video.tag}
          </p>
        )}
      </div>
    </div>
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
   SHOWREEL SECTION
   ============================================================ */

export default function ShowreelSection({
  id,
  videos,
  aspect = 'story',
  eyebrow = 'Showreel',
  title,
  subtitle,
  direction = 'left',
  withTopBorder = true,
  compact = false,
  rows = 1,
}) {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const isMobile = useIsMobile();

  const heightClass = SECTION_HEIGHTS[aspect] || SECTION_HEIGHTS.story;
  const effectiveRows = isMobile ? Math.min(2, rows) : rows;

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

  const rowsList = distribute(videos, effectiveRows);

  const perCard = aspect === 'wide' ? 4 : 3;
  const baseDuration = Math.max(28, Math.ceil(videos.length / effectiveRows) * perCard);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${compact ? 'pt-2 pb-6 md:pt-3 md:pb-12' : 'py-8 md:py-14'} ${withTopBorder ? 'border-t border-border/40' : ''}`}
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
                className={`marquee-mask relative overflow-hidden ${heightClass}`}
              >
                <div
                  className={`flex h-full w-max gap-3 sm:gap-4 animate-marquee ${
                    rowDir === 'right' ? '[animation-direction:reverse]' : ''
                  }`}
                  style={{ animationDuration: `${rowDuration}s` }}
                >
                  {loopList.map((v, i) => {
                    const originalIndex = videos.indexOf(v);
                    const cardAspect = resolveAspect(v, aspect);
                    return (
                      <ReelCard
                        key={`${v.blob || v.vimeo || v.src}-${rowIdx}-${i}`}
                        video={v}
                        index={originalIndex}
                        active={sectionVisible}
                        aspectRatio={cardAspect}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
