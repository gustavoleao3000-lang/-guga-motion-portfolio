import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FOTO_URL = 'https://media.base44.com/images/public/69c67984fa1d361ff818abe5/fbbd09a48_Imagem1gerada.png';
const TOTAL = 20;

const STATS = [
  { value: '3+', label: 'anos de experiência' },
  { value: '50+', label: 'projetos entregues' },
  { value: '100%', label: 'dedicação' },
];

const CHIPS = ['Ritmo', 'Atenção', 'Conversão'];

export default function GugaOverlay({ onClose }) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Progressive timer 0 → 20
  useEffect(() => {
    setElapsed(0);
    intervalRef.current = setInterval(() => {
      setElapsed(prev => {
        if (prev >= TOTAL) { clearInterval(intervalRef.current); return TOTAL; }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const progress = (elapsed / TOTAL) * 100;
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        key="panel"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-[101] inset-0 md:inset-[22px] md:rounded-[26px] flex flex-col overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0008 0%, #0d000d 50%, #050010 100%)',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 0 80px rgba(255,255,255,0.08), inset 0 0 120px rgba(255,255,255,0.03)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── TOP BAR ── */}
        <div className="flex-shrink-0 px-6 md:px-10 pt-5 pb-0">
          {/* Label + timer */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40">
              Guga em 20 segundos
            </span>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs tabular-nums"
                style={{ color: elapsed >= TOTAL ? '#A7A7A7' : '#FFFFFF', textShadow: '0 0 12px currentColor' }}>
                {pad(elapsed)}s
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M1 1l10 10M11 1L1 11" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-[1.5px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #FFFFFF, #A7A7A7)',
                boxShadow: '0 0 8px rgba(255,255,255,0.5)',
                transition: 'width 0.9s linear',
              }}
            />
          </div>
        </div>

        {/* ── SCROLLABLE CONTENT ── */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 pt-8 pb-8 md:pb-10">
          {/* Headline */}
          <div className="mb-8 md:mb-10">
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Quer saber quem vai dar{' '}
              <span style={{ color: '#FFFFFF', textShadow: '0 0 30px rgba(255,255,255,0.3)' }}>
                movimento à sua ideia?
              </span>
            </h2>
            <p className="font-mono text-sm md:text-base text-white/50 mt-4 max-w-2xl leading-relaxed">
              Sou o Guga, motion designer focado em transformar ideias em criativos com ritmo, personalidade e intenção de venda.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {/* Left: Photo */}
            <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={FOTO_URL}
                alt="Gustavo Leão"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 15%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-display font-bold text-base text-white">Gustavo Leão</p>
                <p className="font-mono text-xs mt-0.5" style={{ color: '#A7A7A7' }}>Motion Designer</p>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col justify-between gap-6">
              <p className="font-mono text-sm text-white/70 leading-relaxed">
                Eu penso no movimento como parte da estratégia: prender atenção rápido, explicar sem enrolar e deixar a marca com cara de coisa grande.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {STATS.map(({ value, label }) => (
                  <div
                    key={value}
                    className="flex flex-col items-center text-center p-3 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <span className="font-display font-black text-xl md:text-2xl text-white">{value}</span>
                    <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 mt-1 leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                {CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.05)' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#showreel"
              onClick={onClose}
              className="flex-1 text-center font-mono text-xs uppercase tracking-widest px-6 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #FFFFFF, #666666)', boxShadow: '0 0 24px rgba(255,255,255,0.25)' }}
            >
              Ver trabalhos
            </a>
            <a
              href="https://wa.me/5562998744360?text=Oi%20Guga%2C%20vi%20seu%20trabalho%20e%20quero%20fazer%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex-1 text-center font-mono text-xs uppercase tracking-widest px-6 py-4 rounded-xl text-white/70 hover:text-white transition-all duration-200 hover:border-white/30 active:scale-95"
              style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
            >
              Bora conversar
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
