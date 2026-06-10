import React from 'react';
import HeroSection from '../components/home/HeroSection';
import DumpsterSizesAndPricing from '../components/home/DumpsterSizesAndPricing';
import JunkRemovalSection from '../components/home/JunkRemovalSection';
import ServiceAreaSection from '../components/home/ServiceAreaSection';
import CTABanner from '../components/home/CTABanner';
import AcceptableItemsSection from '../components/home/AcceptableItemsSection';
import WhyChooseUs from '../components/home/WhyChooseUs';

// Home 2: single dumpster size — every option is 14 YD.
const dumpsters14 = [
  {
    size: 14,
    image: 'https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/9bcb1153b_generated_11f6a5cd.png',
    loads: '5',
    dimensions: "14' × 8' × 4.5'",
    weight: '2 ton',
    idealFor: ['Home cleanout', 'Remodel', 'Roofing', 'Construction debris'],
    prices: { 1: 319, 3: 369, 7: 409 },
  },
];

export default function Home2() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <DumpsterSizesAndPricing dumpsters={dumpsters14} defaultSize={14} />
      <ServiceAreaSection />
      <AcceptableItemsSection />
      <JunkRemovalSection />
      <CTABanner />
    </>
  );
}
