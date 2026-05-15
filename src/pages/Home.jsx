import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ClipboardList } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import CarouselSection from '../components/home/CarouselSection';
import StatsBanner from '../components/home/StatsBanner';
import ProcessSection from '../components/home/ProcessSection';
import PackagesSection from '../components/home/PackagesSection';
import FAQSection from '../components/home/FAQSection';
import { useLanguage } from '@/lib/LanguageContext';
import {
  VIDEOS,
  WIDESCREEN_VIDEOS,
  QUADRADO_VIDEOS,
  FEATURED_REELS,
  FEATURED_WIDESCREEN,
} from '../data/videos';

function PortfolioCTA() {
  const { t } = useLanguage();
  const total = VIDEOS.length + WIDESCREEN_VIDEOS.length + QUADRADO_VIDEOS.length;
  const remaining = total - (FEATURED_REELS.length + FEATURED_WIDESCREEN.length);

  return (
    <section className="px-5 pb-10 pt-2 md:px-12 md:pb-14 md:pt-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-card/60 p-7 text-center md:p-10"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.05), transparent 70%)',
            }}
          />

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-3">
              <span className="block h-px w-6 bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary md:text-xs">
                {t('portfolio_cta_eyebrow')}
              </span>
              <span className="block h-px w-6 bg-primary" />
            </div>

            <h2 className="font-display text-2xl font-black leading-tight tracking-tight md:text-4xl">
              {t('portfolio_cta_title_1')}{' '}
              <span
                className="italic text-primary"
                style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
              >
                {t('portfolio_cta_title_2')}
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-md font-mono text-xs leading-relaxed text-muted-foreground md:mt-4 md:text-sm">
              <span className="text-foreground/85">+{remaining}</span> {t('portfolio_cta_subtitle')}
            </p>

            <Link
              to="/trabalhos"
              className="group mt-7 inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:shadow-[0_0_28px_rgba(255,255,255,0.4)] md:text-sm"
            >
              {t('portfolio_cta_button')}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BriefingCTA() {
  const { t } = useLanguage();
  return (
    <section className="px-5 pb-12 pt-2 md:px-12 md:pb-20 md:pt-4">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/briefing"
            className="group flex items-center gap-4 rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/[0.06] via-card to-card p-5 transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_40px_-12px_rgba(255,255,255,0.4)] md:gap-5 md:p-7"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 transition-colors group-hover:bg-primary/25 md:h-14 md:w-14">
              <ClipboardList className="h-5 w-5 text-primary md:h-6 md:w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-bold tracking-tight text-foreground md:text-lg">
                {t('contact_briefing_cta')}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                {t('contact_briefing_subtitle')}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();
  return (
    <div>
      <HeroSection />

      {/* SAIU DO FORNO · REELS — só verticais, com setas */}
      {FEATURED_REELS.length > 0 && (
        <CarouselSection
          id="reels-featured"
          videos={FEATURED_REELS}
          format="reels"
          eyebrow={t('featured_reels_eyebrow')}
          title={
            <>
              {t('featured_reels_title_1')}<br className="hidden md:block" />
              <span className="text-primary"> {t('featured_reels_title_2')}</span>
            </>
          }
          subtitle={t('featured_reels_subtitle')}
          withTopBorder={false}
        />
      )}

      {/* SAIU DO FORNO · WIDESCREEN — só horizontais, com setas */}
      {FEATURED_WIDESCREEN.length > 0 && (
        <CarouselSection
          id="widescreen-featured"
          videos={FEATURED_WIDESCREEN}
          format="widescreen"
          eyebrow={t('featured_wide_eyebrow')}
          title={
            <>
              {t('featured_wide_title_1')}<br className="hidden md:block" />
              <span className="text-primary"> {t('featured_wide_title_2')}</span>
            </>
          }
          subtitle={t('featured_wide_subtitle')}
        />
      )}

      <PortfolioCTA />
      <StatsBanner />
      <ProcessSection />
      <PackagesSection />
      <FAQSection />
      <BriefingCTA />
    </div>
  );
}
