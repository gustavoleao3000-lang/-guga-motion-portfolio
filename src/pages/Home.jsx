import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ShowreelSection from '../components/home/ShowreelSection';
import ServicesSection from '../components/home/ServicesSection';
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

      <ServicesSection />
      <CTASection />
    </div>
  );
}
