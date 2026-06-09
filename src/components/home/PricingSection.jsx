import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const pricingData = [
  // 10 yards
  { size: 10, days: 1, weight: '1 ton', price: 269, overage: 69 },
  { size: 10, days: 3, weight: '1 ton', price: 299, overage: 69 },
  { size: 10, days: 7, weight: '1 ton', price: 329, overage: 69 },
  // 13 yards
  { size: 13, days: 1, weight: '1.5 ton', price: 299, overage: 69 },
  { size: 13, days: 3, weight: '1.5 ton', price: 349, overage: 69 },
  { size: 13, days: 7, weight: '1.5 ton', price: 399, overage: 69 },
  // 15 yards
  { size: 15, days: 1, weight: '2 ton', price: 339, overage: 69 },
  { size: 15, days: 3, weight: '2 ton', price: 379, overage: 69 },
  { size: 15, days: 7, weight: '2 ton', price: 409, overage: 69 },
  // 18 yards
  { size: 18, days: 1, weight: '2 ton', price: 349, overage: 69 },
  { size: 18, days: 3, weight: '2 ton', price: 389, overage: 69 },
  { size: 18, days: 7, weight: '2 ton', price: 449, overage: 69 },
];

const mileageFees = [
  { label: '0–15 miles', price: 'Included' },
  { label: '16–25 miles', price: '+$49' },
  { label: '26–35 miles', price: '+$99' },
  { label: '36–50 miles', price: '+$179' },
];

const sizes = [10, 13, 15, 18];

export default function PricingSection() {
  const [selectedSize, setSelectedSize] = useState(10);

  const filtered = pricingData.filter(p => p.size === selectedSize);

  return (
    <section className="py-24 bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-accent" />
            <span className="font-body text-xs font-bold tracking-[0.25em] text-accent uppercase">Transparent Pricing</span>
            <div className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-heading font-bold text-5xl sm:text-6xl text-foreground uppercase tracking-tight">
            SIMPLE & CLEAR RATES
          </h2>
          <p className="font-body text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            No hidden fees. All prices include delivery, pickup, and your weight allowance.
          </p>
        </motion.div>

        {/* Size Selector */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`font-heading text-lg font-bold uppercase tracking-wider px-6 py-3 border-2 transition-all ${
                selectedSize === size
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-foreground border-border hover:border-primary'
              }`}
            >
              {size} YD
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <motion.div
          key={selectedSize}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {filtered.map((plan, i) => (
            <div
              key={plan.days}
              className={`relative bg-card border-2 p-6 ${
                plan.days === 3 ? 'border-accent' : 'border-border'
              }`}
            >
              {plan.days === 3 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground font-body text-xs font-bold tracking-widest px-4 py-1 uppercase">
                  Most Popular
                </div>
              )}
              <p className="font-body text-sm text-muted-foreground uppercase tracking-widest mb-1">{plan.days}-Day Rental</p>
              <p className="font-heading text-5xl font-bold text-foreground mb-1">${plan.price}</p>
              <p className="font-body text-xs text-muted-foreground mb-4">Weight overage: ${plan.overage}/ton</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 font-body text-sm text-foreground">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  {plan.weight} weight included
                </li>
                <li className="flex items-center gap-2 font-body text-sm text-foreground">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  Delivery &amp; pickup included
                </li>
                <li className="flex items-center gap-2 font-body text-sm text-foreground">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  0–15 mile radius included
                </li>
              </ul>
              <Link to="/contact">
                <Button className={`w-full font-body font-bold uppercase tracking-wider rounded-none ${
                  plan.days === 3
                    ? 'bg-accent text-accent-foreground hover:bg-accent/85'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}>
                  Book Now
                </Button>
              </Link>
            </div>
          ))}
        </motion.div>

        {/* Mileage Fees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary text-primary-foreground p-8"
        >
          <h3 className="font-heading font-bold text-2xl uppercase tracking-wider text-center mb-6">
            Distance Fees
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mileageFees.map(m => (
              <div key={m.label} className="text-center">
                <p className="font-body text-xs tracking-widest text-primary-foreground/60 uppercase mb-1">{m.label}</p>
                <p className="font-heading text-2xl font-bold text-accent">{m.price}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-xs text-primary-foreground/50 text-center mt-6">
            * Distance measured from our Cincinnati, OH facility. Call us for locations beyond 50 miles.
          </p>
        </motion.div>

        {/* Additional Days Note */}
        <div className="mt-6 text-center bg-card border border-border py-4 px-6">
          <p className="font-body text-sm text-foreground">
            <span className="font-bold text-accent">+$20/day</span> for each additional rental day beyond your plan.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="font-body text-sm text-muted-foreground mb-4">Need a custom quote or have questions?</p>
          <Link to="/contact">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/85 font-body font-bold rounded-none px-10 uppercase tracking-wider text-base h-12">
              Get a Free Quote
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}