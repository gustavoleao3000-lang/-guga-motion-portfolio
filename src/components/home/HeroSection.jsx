import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import GugaOverlay from './GugaOverlay';

const QUICK_STATS = [
  { value: '50+', label: 'projetos' },
  { value: '3+', label: 'anos' },
  { value: '24h', label: 'resposta' },
];

export default function HeroSection() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <section className="relative px-5 pt-20 pb-2 md:px-12 md:pt-24 md:pb-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-0 flex-1"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  Disponível para novos projetos · Goiânia, BR
                </span>
              </div>

              <h1 className="font-display font-black leading-[0.92] tracking-tight">
                <span className="block text-4xl text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  Motion design
                </span>
                <span
                  className="relative -mt-1 block text-5xl leading-[1] italic sm:text-6xl md:text-7xl lg:text-[5.5rem]"
                  style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
                >
                  <span
                    className="animate-gradient-shimmer bg-gradient-to-r from-primary via-cyan-200 via-sky-100 to-primary bg-clip-text text-transparent"
                    style={{ filter: 'drop-shadow(0 0 28px rgba(6, 182, 212, 0.5))' }}
                  >
                    que vende.
                  </span>
                  {/* Acento magenta decorativo */}
                  <span
                    aria-hidden
                    className="absolute -left-3 top-1/2 hidden h-1 w-2 -translate-y-1/2 rounded-full bg-primary md:block"
                  />
                </span>
              </h1>

              <p className="mt-3 max-w-md font-mono text-xs text-muted-foreground md:text-sm">
                Animações e criativos que prendem atenção, vendem e te deixam com cara de marca grande.
              </p>

              {/* Stats inline */}
              <div className="mt-5 flex items-center gap-5 md:gap-7">
                {QUICK_STATS.map((s) => (
                  <div key={s.label} className="flex items-baseline gap-1.5">
                    <span className="font-display text-xl font-black text-primary md:text-2xl">
                      {s.value}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Botão CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-shrink-0 flex-col items-stretch gap-2 md:items-end"
            >
              <button
                onClick={() => setOverlayOpen(true)}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-primary/60 bg-black/40 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/15 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-primary/60 transition-colors group-hover:border-primary">
                  <svg width="7" height="8" viewBox="0 0 7 8" fill="currentColor" className="translate-x-px">
                    <path d="M0 0l7 4-7 4V0z" />
                  </svg>
                </span>
                Quer me conhecer?
              </button>
              <a
                href="https://wa.me/5562998744360?text=Oi%20Guga%2C%20vi%20seu%20portf%C3%B3lio%20e%20quero%20fazer%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/50 bg-[#25D366]/10 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-[#25D366] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[#25D366]/20"
              >
                Falar no WhatsApp →
              </a>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 flex items-center gap-2 text-muted-foreground/50"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-3 w-3" />
            </motion.div>
            <span className="font-mono text-[10px] uppercase tracking-widest">
              Showreel rolando ali embaixo
            </span>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {overlayOpen && <GugaOverlay onClose={() => setOverlayOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
