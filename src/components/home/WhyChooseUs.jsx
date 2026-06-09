import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Timer, DollarSign, MapPin, Recycle } from 'lucide-react';

const features = [
  {
    icon: Timer,
    title: 'On-Time, Every Time',
    desc: 'Deliveries and pickups happen in the window we promise. We respect your schedule — no excuses.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    desc: 'No hidden fees, no surprise charges. The price we quote is the price you pay, period.',
  },
  {
    icon: MapPin,
    title: 'Locally Owned',
    desc: 'We live and work in the tri-state area. When you call, you talk to a neighbor, not a call center.',
  },
  {
    icon: Recycle,
    title: 'Eco-Responsible',
    desc: 'We sort, recycle, and donate whenever possible. Good for your project, great for the planet.',
  },
];

const metrics = [
  { num: '500+', label: 'Customers Served' },
  { num: '98%', label: 'On-Time Rate' },
  { num: '4.9★', label: 'Average Rating' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs font-bold tracking-[0.25em] text-accent uppercase">Why Choose Us</span>
            <h2 className="font-heading text-5xl sm:text-6xl text-foreground tracking-tight mt-2 leading-[0.9]">
              TRUSTED BY<br />
              <span className="text-accent">HUNDREDS</span> OF<br />
              HOMEOWNERS
            </h2>
            <p className="font-body text-base text-muted-foreground mt-6 mb-8 max-w-md leading-relaxed">
              We connect you directly with our local team — people who know the tri-state area and care about doing the job right.
            </p>

            <Link to="/contact" className="inline-flex items-center gap-2 font-body font-bold text-sm text-accent hover:text-accent/80 transition-colors uppercase tracking-wider">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right - Feature list */}
          <div className="space-y-1">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-5 p-5 bg-card border border-border hover:border-accent/30 transition-colors group"
              >
                <div className="w-11 h-11 bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-base text-foreground">{f.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-border group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}