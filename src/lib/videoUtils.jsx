import React, { useEffect, useRef } from 'react';
import { BLOB_BASE_URL } from '../data/videos';

/* ============================================================
   Helpers compartilhados pra renderizar vídeos
   ============================================================ */

export function parseVimeo(input) {
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

export function blobUrls(path) {
  if (!BLOB_BASE_URL || !path) return null;
  const base = BLOB_BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '').replace(/\.(mp4|webm|mov|jpg|jpeg|png)$/i, '');
  const encoded = clean.split('/').map(encodeURIComponent).join('/');
  return {
    video:  `${base}/${encoded}.mp4`,
    poster: `${base}/${encoded}.jpg`,
  };
}

export function getPoster(video) {
  if (video.poster) return video.poster;
  const blob = blobUrls(video.blob);
  if (blob) return blob.poster;
  const v = parseVimeo(video.vimeo);
  if (v) return `https://vumbnail.com/${v.id}_large.jpg`;
  return null;
}

/**
 * CardPreview — vídeo mudo em loop. Tá ativo só quando `active=true`.
 * Combine com IntersectionObserver no pai pra ligar/desligar.
 */
export function CardPreview({ video, active }) {
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
