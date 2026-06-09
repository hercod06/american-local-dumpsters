import React from 'react';
import HeroSection2 from '../components/home/HeroSection2';
import DumpsterSizesAndPricing from '../components/home/DumpsterSizesAndPricing';
import JunkRemovalSection from '../components/home/JunkRemovalSection';
import ServiceAreaSection from '../components/home/ServiceAreaSection';
import CTABanner from '../components/home/CTABanner';
import AcceptableItemsSection from '../components/home/AcceptableItemsSection';
import WhyChooseUs from '../components/home/WhyChooseUs';

export default function Home2() {
  return (
    <>
      <HeroSection2 />
      <WhyChooseUs />
      <DumpsterSizesAndPricing />
      <ServiceAreaSection />
      <AcceptableItemsSection />
      <JunkRemovalSection />
      <CTABanner />
    </>
  );
}
