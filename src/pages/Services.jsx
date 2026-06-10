import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, Trash2, HardHat, Recycle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import DumpsterSizesAndPricing from '../components/home/DumpsterSizesAndPricing';
import CTABanner from '../components/home/CTABanner';

const services = [
  {
    icon: Truck,
    title: 'Dumpster Rental',
    desc: 'Roll-off dumpsters in 10, 20, 30, and 40-yard sizes. Delivered on your schedule, picked up when you\'re done.',
    features: ['Flexible rental periods', 'Same-day delivery available', 'Weight included in price', 'Driveway-safe placement'],
  },
  {
    icon: Trash2,
    title: 'Junk Removal',
    desc: 'Full-service junk removal where our team loads everything for you. Perfect for when you don\'t want to lift a finger.',
    features: ['We do all the lifting', 'Upfront transparent pricing', 'Furniture, appliances & more', 'Donation coordination'],
  },
  {
    icon: HardHat,
    title: 'Construction Debris',
    desc: 'Specialized containers for construction and demolition waste. Compliant disposal of heavy materials.',
    features: ['Concrete & asphalt OK', 'Roofing tear-off ready', 'Permits assistance', 'Heavy load capacity'],
  },
  {
    icon: Recycle,
    title: 'Cleanout Services',
    desc: 'Estate cleanouts, foreclosure cleanups, and hoarding situations handled with care and discretion.',
    features: ['Whole-home cleanouts', 'Estate & foreclosure', 'Respectful & discreet', 'Sort, recycle & donate'],
  },
];

export default function Services() {
  return (
    <>
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="font-body text-xs font-semibold tracking-widest text-accent">OUR SERVICES</span>
            <h1 className="font-heading text-5xl sm:text-6xl text-foreground mt-3 tracking-tight">
              COMPLETE WASTE<br />SOLUTIONS
            </h1>
            <p className="font-body text-lg text-muted-foreground mt-6 leading-relaxed">
              From a single dumpster rental to a full-property cleanout, American Local Dumpsters provides comprehensive waste management across the tri-state area.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border-2 border-border rounded-sm p-8 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-foreground">{s.title}</h3>
                    <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="font-body text-sm text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button variant="outline" className="font-body font-semibold rounded-sm border-2">
                    Get a Quote <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DumpsterSizesAndPricing />
      <CTABanner />
    </>
  );
}