import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ShowreelSection from '../components/home/ShowreelSection';
import StatsBanner from '../components/home/StatsBanner';
import ProcessSection from '../components/home/ProcessSection';
import PackagesSection from '../components/home/PackagesSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';
import { VIDEOS, WIDESCREEN_VIDEOS } from '../data/videos';

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

      <StatsBanner />
      <ProcessSection />
      <PackagesSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
