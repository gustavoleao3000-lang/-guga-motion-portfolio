import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ShowreelSection from '../components/home/ShowreelSection';
import StatsBanner from '../components/home/StatsBanner';
import ProcessSection from '../components/home/ProcessSection';
import PackagesSection from '../components/home/PackagesSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';
import { VIDEOS, WIDESCREEN_VIDEOS, MIXED_VIDEOS, NOVOS_VIDEOS } from '../data/videos';

export default function Home() {
  return (
    <div>
      <HeroSection />

      <ShowreelSection
        id="showreel"
        videos={VIDEOS}
        aspect="story"
        direction="left"
        eyebrow="Showreel · Stories"
        rows={2}
        compact
        withTopBorder={false}
      />

      <ShowreelSection
        id="widescreen"
        videos={WIDESCREEN_VIDEOS}
        aspect="wide"
        direction="right"
        eyebrow="Widescreen"
        rows={2}
        title={
          <>
            Em formato<br className="hidden md:block" />
            <span className="text-primary"> cinematográfico.</span>
          </>
        }
        subtitle="Brand films, edições longas e peças horizontais"
      />

      {/* Faixa NOVA — mesma cara das outras (2 linhas, com título, com borda) */}
      {NOVOS_VIDEOS.length > 0 && (
        <ShowreelSection
          id="novidades"
          videos={NOVOS_VIDEOS}
          aspect="mixed"
          direction="left"
          eyebrow="Novidades"
          rows={2}
          title={
            <>
              Trabalhos<br className="hidden md:block" />
              <span className="text-primary"> recentes.</span>
            </>
          }
          subtitle="Os drops mais novos saindo do forno"
        />
      )}

      {MIXED_VIDEOS.length > 0 && (
        <ShowreelSection
          id="mix"
          videos={MIXED_VIDEOS}
          aspect="mixed"
          direction="right"
          eyebrow="Mix"
          rows={2}
          title={
            <>
              Mistura de<br className="hidden md:block" />
              <span className="text-primary"> formatos.</span>
            </>
          }
          subtitle="Verticais, quadrados e horizontais lado a lado"
        />
      )}

      <StatsBanner />
      <ProcessSection />
      <PackagesSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
