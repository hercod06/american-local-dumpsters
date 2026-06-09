import React from 'react';
import { motion } from 'framer-motion';
import DumpsterCard from './DumpsterCard';

const dumpsters = [
  {
    size: '10',
    image: 'https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/6d4caf735_generated_20888a5b.png',
    loads: '3',
    dimensions: '12\' L x 8\' W × 3.5\' H',
    idealFor: ['Small bathroom remodel', 'Garage cleanout', 'Deck removal', 'Minor landscaping'],
  },
  {
    size: '12',
    image: 'https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/6d4caf735_generated_20888a5b.png',
    loads: '4',
    dimensions: '14\' L × 8\' W × 4\' H',
    idealFor: ['Bathroom remodel', 'Small cleanout', 'Yard waste', 'Shingle removal'],
  },
  {
    size: '15',
    image: 'https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/995bfcfa3_generated_d2f93796.png',
    loads: '5',
    dimensions: '16\' L × 8\' W × 4.5\' H',
    idealFor: ['Kitchen remodel', 'Flooring removal', 'Medium home cleanout', 'Roofing'],
  },
  {
    size: '18',
    image: 'https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/9bcb1153b_generated_11f6a5cd.png',
    loads: '6',
    dimensions: '18\' L × 8\' W × 5\' H',
    idealFor: ['Large renovation', 'Whole home cleanout', 'New construction', 'Commercial project'],
  },
];

export default function DumpsterGallery() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-accent" />
            <span className="font-body text-xs font-bold tracking-[0.25em] text-accent uppercase">Dumpster Sizes</span>
            <div className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-heading font-bold text-5xl sm:text-6xl text-foreground uppercase tracking-tight">
            FIND YOUR FIT
          </h2>
          <p className="font-body text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            From a small garage cleanout to a major demolition project — we have the right container for every job.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dumpsters.map((d, i) => (
            <DumpsterCard key={d.size} {...d} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}