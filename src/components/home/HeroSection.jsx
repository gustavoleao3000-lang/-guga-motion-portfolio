import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GugaOverlay from './GugaOverlay';

export default function HeroSection() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <section className="px-5 pt-20 pb-4 md:px-12 md:pt-24 md:pb-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-0 flex-1"
            >
              <div className="mb-2 flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  Disponível para novos projetos
                </span>
              </div>

              <h1 className="font-display font-black leading-[0.95] tracking-tight">
                <span className="block text-4xl text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  Motion design
                </span>
                <span className="block text-4xl text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                  que vende.
                </span>
              </h1>

              <p className="mt-3 max-w-md font-mono text-xs text-muted-foreground md:text-sm">
                Animações e criativos que chamam atenção e convertem.
              </p>
            </motion.div>

            {/* Botão CTA — compacto, na lateral no desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0"
            >
              <button
                onClick={() => setOverlayOpen(true)}
                className="group inline-flex items-center gap-2.5 rounded-full border border-primary/60 bg-black/40 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/15 hover:shadow-[0_0_20px_rgba(255,0,255,0.2)]"
              >
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-primary/60 transition-colors group-hover:border-primary">
                  <svg width="7" height="8" viewBox="0 0 7 8" fill="currentColor" className="translate-x-px">
                    <path d="M0 0l7 4-7 4V0z" />
                  </svg>
                </span>
                Quer me conhecer?
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overlay fullscreen */}
      <AnimatePresence>
        {overlayOpen && <GugaOverlay onClose={() => setOverlayOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
