import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import GugaOverlay from './GugaOverlay';
import { useLanguage } from '@/lib/LanguageContext';

const FOTO_URL = 'https://media.base44.com/images/public/69c67984fa1d361ff818abe5/fbbd09a48_Imagem1gerada.png';

export default function HeroSection() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const { t } = useLanguage();
  const QUICK_STATS = [
    { value: '50+', label: t('hero_stat_projects') },
    { value: '3+',  label: t('hero_stat_years') },
    { value: '24h', label: t('hero_stat_response') },
  ];

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
              {/* Card pessoal — foto + nome + disponibilidade. Click abre overlay completo */}
              <button
                onClick={() => setOverlayOpen(true)}
                className="group -ml-2 mb-4 inline-flex items-center gap-3 rounded-2xl px-2 py-1.5 transition-all hover:bg-card/40"
                aria-label="Saber mais sobre o Guga"
              >
                <div className="relative z-10 flex-shrink-0">
                  <img
                    src={FOTO_URL}
                    alt="Gustavo Leão"
                    className="relative z-10 h-14 w-14 rounded-full border-2 border-primary/40 object-cover transition-all duration-500 ease-out will-change-transform group-hover:z-20 group-hover:scale-[1.8] group-hover:border-primary group-hover:shadow-[0_0_40px_rgba(255,255,255,0.45)] sm:h-16 sm:w-16"
                    style={{ objectPosition: 'center 15%' }}
                  />
                  {/* Indicador online — verde = "disponível" universal */}
                  <span className="absolute -bottom-0.5 -right-0.5 z-20 flex h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:scale-[1.8] sm:h-4 sm:w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/60 opacity-75" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#25D366] ring-2 ring-background sm:h-4 sm:w-4" />
                  </span>
                </div>
                <div className="text-left transition-transform duration-300 ease-out group-hover:scale-[1.05]" style={{ transformOrigin: 'left center' }}>
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
                  {/* Acento decorativo */}
                  <span
                    aria-hidden
                    className="absolute -left-3 top-1/2 hidden h-1 w-2 -translate-y-1/2 rounded-full bg-primary md:block"
                  />
                </span>
              </h1>

              <p className="mt-3 max-w-md font-mono text-xs text-muted-foreground md:text-sm">
                {t('hero_subtitle')}
              </p>

              {/* Stats inline — grid no mobile pra nunca quebrar */}
              <div className="mt-5 grid grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-5 md:gap-7">
                {QUICK_STATS.map((s) => (
                  <div key={s.label} className="flex flex-col items-start gap-0.5 sm:flex-row sm:items-baseline sm:gap-1.5">
                    <span className="font-display text-lg font-black text-primary sm:text-xl md:text-2xl">
                      {s.value}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">
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
              {t('hero_scroll')}
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
