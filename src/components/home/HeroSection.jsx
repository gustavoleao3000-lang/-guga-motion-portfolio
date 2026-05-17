import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GugaOverlay from './GugaOverlay';
import { useLanguage } from '@/lib/LanguageContext';

const FOTO_URL = 'https://media.base44.com/images/public/69c67984fa1d361ff818abe5/fbbd09a48_Imagem1gerada.png';

export default function HeroSection() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <section className="relative px-5 pt-20 pb-2 md:px-12 md:pt-24 md:pb-3">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-0 flex-1"
            >
              {/* Card pessoal — foto + nome + disponibilidade */}
              <button
                onClick={() => setOverlayOpen(true)}
                className="group -ml-2 mb-3 inline-flex items-center gap-3 rounded-2xl px-2 py-1.5 transition-all duration-500 ease-out will-change-transform hover:scale-[1.18] hover:bg-card/40"
                style={{ transformOrigin: 'left center' }}
                aria-label="Saber mais sobre o Guga"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={FOTO_URL}
                    alt="Gustavo Leão"
                    className="h-12 w-12 rounded-full border-2 border-primary/40 object-cover transition-all duration-500 ease-out group-hover:border-primary group-hover:shadow-[0_0_28px_rgba(255,255,255,0.45)] sm:h-14 sm:w-14"
                    style={{ objectPosition: 'center 15%' }}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/60 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-[#25D366] ring-2 ring-background sm:h-3.5 sm:w-3.5" />
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-display text-sm font-bold leading-tight tracking-tight text-foreground sm:text-base">
                    Gustavo Leão
                    <span className="ml-1.5 font-mono text-[10px] font-normal uppercase tracking-widest text-primary/80">
                      {t('hero_aka')}
                    </span>
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">
                    <span>{t('hero_role')}</span>
                    <span className="text-border">·</span>
                    <span>{t('hero_location')}</span>
                    <span className="hidden text-border sm:inline">·</span>
                    <span className="hidden text-primary sm:inline">{t('hero_available')}</span>
                  </p>
                </div>
              </button>

              <h1 className="font-display font-black leading-[0.92] tracking-tight">
                <span
                  className="block text-4xl text-foreground transition-transform duration-300 ease-out hover:scale-[1.04] sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{ transformOrigin: 'left center' }}
                >
                  {t('hero_title_1')}
                </span>
                <span
                  className="relative -mt-1 block text-5xl leading-[1] italic text-primary transition-all duration-300 ease-out hover:scale-[1.04] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontWeight: 400,
                    filter: 'drop-shadow(0 0 28px rgba(255, 255, 255, 0.3))',
                    transformOrigin: 'left center',
                  }}
                >
                  {t('hero_title_2')}
                  <span
                    aria-hidden
                    className="absolute -left-3 top-1/2 hidden h-1 w-2 -translate-y-1/2 rounded-full bg-primary md:block"
                  />
                </span>
              </h1>
            </motion.div>

            {/* Botões CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-shrink-0 flex-col items-stretch gap-2 md:items-end"
            >
              <button
                onClick={() => setOverlayOpen(true)}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-primary/60 bg-black/40 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/15 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-primary/60 transition-colors group-hover:border-primary">
                  <svg width="7" height="8" viewBox="0 0 7 8" fill="currentColor" className="translate-x-px">
                    <path d="M0 0l7 4-7 4V0z" />
                  </svg>
                </span>
                {t('hero_cta_meet')}
              </button>
              <a
                href="https://wa.me/5562998744360?text=Oi%20Guga%2C%20vi%20seu%20portf%C3%B3lio%20e%20quero%20fazer%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/50 bg-[#25D366]/10 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-[#25D366] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[#25D366]/20"
              >
                {t('hero_cta_whatsapp')}
              </a>
            </motion.div>
          </div>

          {/* Setinha sutil indicando scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 flex justify-center md:mt-8"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-muted-foreground/40"
              aria-hidden
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {overlayOpen && <GugaOverlay onClose={() => setOverlayOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
