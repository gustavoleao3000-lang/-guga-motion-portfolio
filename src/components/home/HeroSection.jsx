import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GugaOverlay from './GugaOverlay';

export default function HeroSection() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <section className="pt-28 md:pt-36 pb-10 md:pb-16 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  Disponível para novos projetos
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                <h1 className="font-display font-black tracking-tight leading-[0.95] mb-6">
                  <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground">
                    Motion design
                  </span>
                  <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-primary">
                    que vende.
                  </span>
                </h1>
              </motion.div>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mb-7">
                Animações, vídeos e criativos visuais para marcas, negócios e criadores que querem chamar atenção e converter mais.
              </motion.p>

              {/* Botão CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                <button
                  onClick={() => setOverlayOpen(true)}
                  className="group flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full border border-primary/60 bg-black/40 text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/15 hover:border-primary hover:shadow-[0_0_20px_rgba(255,0,255,0.2)]">
                  <span className="w-4 h-4 rounded-full border border-primary/60 flex items-center justify-center group-hover:border-primary transition-colors flex-shrink-0">
                    <svg width="7" height="8" viewBox="0 0 7 8" fill="currentColor" className="translate-x-px">
                      <path d="M0 0l7 4-7 4V0z" />
                    </svg>
                  </span>
                  Quer me conhecer?
                  <span className="font-mono text-[10px] text-primary/50 group-hover:text-primary/80 transition-colors">— guga motion em 20s</span>
                </button>
              </motion.div>
            </div>
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
