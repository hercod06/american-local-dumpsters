import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import DistanceCalculator from './DistanceCalculator';

const dumpsters = [
  {
    size: 10,
    image: 'https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/6d4caf735_generated_20888a5b.png',
    loads: '3',
    dimensions: "14' × 8' × 3.5'",
    weight: '1 ton',
    idealFor: ['Garage cleanout', 'Deck removal', 'Small remodel', 'Landscaping'],
    prices: { 1: 269, 3: 299, 7: 329 },
  },
  {
    size: 13,
    image: 'https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/995bfcfa3_generated_d2f93796.png',
    loads: '4',
    dimensions: "14' × 8' × 4'",
    weight: '1.5 ton',
    idealFor: ['Bathroom remodel', 'Small cleanout', 'Yard waste', 'Shingles'],
    prices: { 1: 299, 3: 349, 7: 399 },
  },
  {
    size: 15,
    image: 'https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/9bcb1153b_generated_11f6a5cd.png',
    loads: '5',
    dimensions: "14' × 8' × 4.5'",
    weight: '2 ton',
    idealFor: ['Kitchen remodel', 'Flooring', 'Home cleanout', 'Roofing'],
    prices: { 1: 339, 3: 379, 7: 409 },
  },
  {
    size: 18,
    image: 'https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/9bcb1153b_generated_11f6a5cd.png',
    loads: '6',
    dimensions: "14' × 8' × 5'",
    weight: '2 ton',
    idealFor: ['Large renovation', 'Full cleanout', 'New construction', 'Commercial'],
    prices: { 1: 349, 3: 389, 7: 449 },
  },
];

const rentalDays = [1, 3, 7];

export default function DumpsterSizesAndPricing() {
  const [selectedSize, setSelectedSize] = useState(10);
  const [selectedDays, setSelectedDays] = useState(3);
  const navigate = useNavigate();

  const dumpster = dumpsters.find(d => d.size === selectedSize);
  const price = dumpster.prices[selectedDays];

  const handleBooking = () => {
    sessionStorage.setItem('quote_size', String(selectedSize));
    sessionStorage.setItem('quote_days', String(selectedDays));
    sessionStorage.setItem('quote_price', String(price));
    navigate('/contact');
  };

  return (
    <section className="py-12 bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — compact */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <span className="font-body text-xs font-bold tracking-[0.25em] text-accent uppercase">Dumpster Sizes & Pricing</span>
            <h2 className="font-heading font-bold text-4xl text-foreground uppercase tracking-tight mt-0.5">FIND YOUR FIT</h2>
          </div>
          {/* Size Selector inline */}
          <div className="flex gap-2 flex-wrap">
            {dumpsters.map(d => (
              <button
                key={d.size}
                onClick={() => setSelectedSize(d.size)}
                className={`font-heading text-sm font-bold uppercase tracking-wider px-4 py-2 border-2 transition-all ${
                  selectedSize === d.size
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-foreground border-border hover:border-primary'
                }`}
              >
                {d.size} YD
              </button>
            ))}
          </div>
        </div>

        {/* Main Content — 3 columns on desktop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSize}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch"
          >
            {/* Col 1 — Image + specs */}
            <div className="bg-card border-2 border-border overflow-hidden">
              <div className="relative h-36 overflow-hidden bg-secondary">
                <img
                  src={dumpster.image}
                  alt={`${dumpster.size} yard dumpster`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-primary/90 px-2 py-0.5">
                  <span className="font-heading text-primary-foreground text-base font-bold">{dumpster.size} YD</span>
                </div>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                  {[
                    { label: 'Dimensions', value: dumpster.dimensions },
                    { label: 'Capacity', value: `≈${dumpster.loads} loads` },
                    { label: 'Weight', value: dumpster.weight },
                    { label: 'Overage', value: '$69/ton' },
                  ].map(item => (
                    <div key={item.label}>
                      <p className="font-body text-[10px] tracking-widest text-muted-foreground uppercase">{item.label}</p>
                      <p className="font-body text-xs font-semibold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
                <p className="font-body text-[10px] font-bold tracking-widest text-accent uppercase mb-1">Ideal For</p>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                  {dumpster.idealFor.map(item => (
                    <li key={item} className="flex items-center gap-1 font-body text-[11px] text-muted-foreground">
                      <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Col 2 — Duration selector */}
            <div className="bg-card border-2 border-border p-4 flex flex-col justify-between">
              <div>
                <p className="font-body text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-3">Rental Duration</p>
                <div className="grid grid-cols-3 gap-2">
                  {rentalDays.map(days => (
                    <button
                      key={days}
                      onClick={() => setSelectedDays(days)}
                      className={`relative py-3 border-2 transition-all ${
                        selectedDays === days
                          ? 'bg-accent border-accent text-accent-foreground'
                          : 'bg-transparent border-border text-foreground hover:border-accent/50'
                      }`}
                    >
                      {days === 3 && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-body text-[9px] font-bold tracking-widest px-1.5 py-0.5 uppercase whitespace-nowrap">
                          Popular
                        </span>
                      )}
                      <span className="font-heading text-xl font-bold block">{days}</span>
                      <span className="font-body text-[10px] uppercase tracking-wider">Day{days > 1 ? 's' : ''}</span>
                    </button>
                  ))}
                </div>
                <p className="font-body text-[10px] text-muted-foreground mt-2 text-center">+$20/day beyond your plan</p>
              </div>

              {/* Distance fees compact */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-body text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-2">Distance Fees</p>
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { label: '0–15 mi', price: 'Free' },
                    { label: '16–25 mi', price: '+$49' },
                    { label: '26–35 mi', price: '+$99' },
                    { label: '36–50 mi', price: '+$179' },
                  ].map(m => (
                    <div key={m.label} className="flex items-center justify-between bg-secondary/50 px-2 py-1">
                      <span className="font-body text-[10px] text-muted-foreground">{m.label}</span>
                      <span className="font-heading text-xs font-bold text-accent">{m.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Col 3 — Price + CTA */}
            <div className="flex flex-col gap-3">
              <div className="bg-primary text-primary-foreground p-4 flex-1">
                <p className="font-body text-[10px] tracking-widest text-primary-foreground/60 uppercase mb-0.5">Your Total</p>
                <p className="font-heading text-6xl font-bold text-primary-foreground leading-none">${price}</p>
                <p className="font-body text-xs text-primary-foreground/50 mt-1 mb-3">{selectedDays} day{selectedDays > 1 ? 's' : ''} rental · {dumpster.size} yd</p>
                <div className="space-y-1.5">
                  {[
                    'Delivery & pickup included',
                    `${dumpster.weight} weight included`,
                    '0–15 mile radius included',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-accent flex-shrink-0" />
                      <span className="font-body text-xs text-primary-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleBooking}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/85 font-body font-bold rounded-none uppercase tracking-wider text-sm h-11"
              >
                Book This Dumpster
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Link to="/contact" className="block">
                <Button variant="outline" className="w-full font-body font-bold rounded-none uppercase tracking-wider border-2 text-sm h-9">
                  Get a Custom Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <DistanceCalculator />

      </div>
    </section>
  );
}