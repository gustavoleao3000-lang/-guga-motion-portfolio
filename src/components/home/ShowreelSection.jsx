import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VIDEOS = [
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/607d9007a_motion-2.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/55a065bb6_motion-3.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/9a1555d70_motion-4.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/f4bcb4f6b_motion-11.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/0b8012a72_motion-12.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/a906aba6d_motion-13.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/7c5351dd2_motion-20.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/f050a00fb_motion-25.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/8b410f9bb_motion-49.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/4214cc93c_motion-51.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/486d8ddfd_motion-55.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/29e52ef20_motion-58.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/6ee717bb0_motion-61.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/cab050546_motion-63.mp4',
  'https://media.base44.com/videos/public/69c67984fa1d361ff818abe5/b8636b1af_motion-67.mp4',
];

function PlayerCarousel({ videos, aspectRatio, maxWidth }) {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    setCurrent((idx + videos.length) % videos.length);
  }, [videos.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => next();
    video.addEventListener('ended', handleEnded);
    timerRef.current = setTimeout(next, 10000);
    return () => {
      video.removeEventListener('ended', handleEnded);
      clearTimeout(timerRef.current);
    };
  }, [current, next]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-black mx-auto w-full"
      style={{ aspectRatio, maxWidth }}
    >
      <AnimatePresence mode="wait">
        <motion.video
          key={current}
          ref={videoRef}
          src={videos[current]}
          autoPlay
          muted
          playsInline
          loop={false}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {/* Gradient bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-between px-4 z-10">
        <button
          onClick={prev}
          className="w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-all backdrop-blur-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 14 : 5,
                height: 5,
                background: i === current ? '#FF00FF' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-all backdrop-blur-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Counter */}
      <div className="absolute top-3 right-4 font-mono text-[10px] text-white/50 tabular-nums">
        {String(current + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
      </div>
    </div>
  );
}

export default function ShowreelSection() {
  return (
    <section id="showreel" className="px-5 md:px-12 pb-10 md:pb-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="block w-6 h-px bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Showreel</span>
        </motion.div>

        <PlayerCarousel
          videos={VIDEOS}
          aspectRatio="16 / 9"
          maxWidth={9999}
        />
      </div>
    </section>
  );
}
