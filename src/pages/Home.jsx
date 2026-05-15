import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ShowreelSection from '../components/home/ShowreelSection';
import StatsBanner from '../components/home/StatsBanner';
import ProcessSection from '../components/home/ProcessSection';
import PackagesSection from '../components/home/PackagesSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';
import { useLanguage } from '@/lib/LanguageContext';
import { VIDEOS, WIDESCREEN_VIDEOS, NOVOS_VIDEOS } from '../data/videos';

export default function Home() {
  const { t } = useLanguage();
  return (
    <div>
      <HeroSection />

      {/* ÚLTIMOS TRABALHOS — faixa mista (reels + widescreen + quadrado misturados) */}
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

      {/* SHOWREEL · STORIES — todos os reels (69) */}
      <ShowreelSection
        id="showreel"
        videos={VIDEOS}
        aspect="story"
        direction="left"
        eyebrow={t('showreel_stories_eyebrow')}
        rows={3}
        compact
      />

      {/* WIDESCREEN — todos horizontais (24) */}
      <ShowreelSection
        id="widescreen"
        videos={WIDESCREEN_VIDEOS}
        aspect="wide"
        direction="right"
        eyebrow={t('showreel_wide_eyebrow')}
        rows={2}
        title={
          <>
            {t('showreel_wide_title_1')}<br className="hidden md:block" />
            <span className="text-primary"> {t('showreel_wide_title_2')}</span>
          </>
        }
        subtitle={t('showreel_wide_subtitle')}
      />

      <StatsBanner />
      <ProcessSection />
      <PackagesSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
