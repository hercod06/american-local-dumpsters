import React from 'react';
import HeroSection from '../components/home/HeroSection';
import DumpsterSizesAndPricing from '../components/home/DumpsterSizesAndPricing';
import JunkRemovalSection from '../components/home/JunkRemovalSection';
import ServiceAreaSection from '../components/home/ServiceAreaSection';
import CTABanner from '../components/home/CTABanner';
import AcceptableItemsSection from '../components/home/AcceptableItemsSection';
import WhyChooseUs from '../components/home/WhyChooseUs';

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <DumpsterSizesAndPricing />
      <ServiceAreaSection />
      <AcceptableItemsSection />
      <JunkRemovalSection />
      <CTABanner />
    </>
  );
}