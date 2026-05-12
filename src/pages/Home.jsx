import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ShowreelSection from '../components/home/ShowreelSection';
import ServicesSection from '../components/home/ServicesSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ShowreelSection />
      <ServicesSection />
      <CTASection />
    </div>
  );
}
