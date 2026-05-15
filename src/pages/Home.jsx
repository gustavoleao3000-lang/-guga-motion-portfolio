import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import ShowreelSection from '../components/home/ShowreelSection';
import StatsBanner from '../components/home/StatsBanner';
import ProcessSection from '../components/home/ProcessSection';
import PackagesSection from '../components/home/PackagesSection';
import FAQSection from '../components/home/FAQSection';
import { useLanguage } from '@/lib/LanguageContext';
import {
  VIDEOS,
  WIDESCREEN_VIDEOS,
  QUADRADO_VIDEOS,
  NOVOS_VIDEOS,
} from '../data/videos';

function PortfolioCTA() {
  const { t } = useLanguage();
  const total = VIDEOS.length + WIDESCREEN_VIDEOS.length + QUADRADO_VIDEOS.length;
  const remaining = total - NOVOS_VIDEOS.length;

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
          {/* Glow sutil */}
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

export default function Home() {
  const { t } = useLanguage();
  return (
    <div>
      <HeroSection />

      {/* ÚLTIMOS TRABALHOS — única faixa de vídeos na home */}
      {NOVOS_VIDEOS.length > 0 && (
        <ShowreelSection
          id="novidades"
          videos={NOVOS_VIDEOS}
          aspect="mixed"
          direction="right"
          eyebrow={t('showreel_novos_eyebrow')}
          rows={2}
          withTopBorder={false}
          title={
            <>
              {t('showreel_novos_title_1')}<br className="hidden md:block" />
              <span className="text-primary"> {t('showreel_novos_title_2')}</span>
            </>
          }
          subtitle={t('showreel_novos_subtitle')}
        />
      )}

      {/* CTA pra portfolio completo */}
      <PortfolioCTA />

      {/* Resto da home */}
      <StatsBanner />
      <ProcessSection />
      <PackagesSection />
      <FAQSection />
    </div>
  );
}
