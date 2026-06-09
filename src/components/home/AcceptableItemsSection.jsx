import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const acceptable = [
  'Household Waste', 'Furniture', 'Glass', 'Mattresses', 'Plastic', 'Books',
  'Electronics', 'Cabinets', 'Countertops', 'Wood', 'Drywall', 'Bathtubs',
  'Sinks', 'Shingles', 'Washers', 'Dryers', 'Ovens',
];

const unacceptable = [
  'Hazardous Materials', 'Paint', 'Oil', 'Gas', 'Asbestos', 'Car Tires',
  'Car Batteries', 'Lithium-Ion Batteries', 'Refrigerators', 'Freezers',
  'Air Conditioners', 'Large amounts of dirt, gravel, concrete, bricks, etc.',
];

export default function AcceptableItemsSection() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-accent" />
            <span className="font-body text-xs font-bold tracking-[0.25em] text-accent uppercase">What We Accept</span>
            <div className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-heading font-bold text-5xl sm:text-6xl text-foreground uppercase tracking-tight">
            ACCEPTABLE ITEMS
          </h2>
          <p className="font-body text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            We accept most household and construction waste. See below for what's allowed and what's not.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Acceptable */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border-2 border-green-200 p-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <h3 className="font-heading font-bold text-3xl text-foreground uppercase">Acceptable Items</h3>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-6">
              We accept most any household/construction waste including:
            </p>
            <ul className="space-y-2">
              {acceptable.map(item => (
                <li key={item} className="flex items-center gap-3 font-body text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Unacceptable */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border-2 border-red-200 p-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-8 h-8 text-destructive" />
              <h3 className="font-heading font-bold text-3xl text-foreground uppercase">Unacceptable Items</h3>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-6">
              We cannot accept the following:
            </p>
            <ul className="space-y-2">
              {unacceptable.map(item => (
                <li key={item} className="flex items-center gap-3 font-body text-sm text-foreground">
                  <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}