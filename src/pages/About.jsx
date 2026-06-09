import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Clock, Users, Recycle, MapPin, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import CTABanner from '../components/home/CTABanner';

const stats = [
  { value: '10+', label: 'Years Serving the Tri-State' },
  { value: '5,000+', label: 'Loads Hauled' },
  { value: '50mi', label: 'Service Radius' },
  { value: '1hr', label: 'Avg. Quote Response' },
];

const values = [
  {
    icon: Clock,
    title: 'On-Time, Every Time',
    desc: 'We respect your schedule. Same-day delivery is available and we show up when we say we will.',
  },
  {
    icon: ThumbsUp,
    title: 'Transparent Pricing',
    desc: 'No hidden fees or surprise charges. The price we quote is the price you pay.',
  },
  {
    icon: ShieldCheck,
    title: 'Licensed & Insured',
    desc: 'Fully licensed and insured for your peace of mind on every job, big or small.',
  },
  {
    icon: Recycle,
    title: 'Responsible Disposal',
    desc: 'We sort, recycle, and donate whenever possible to keep waste out of landfills.',
  },
  {
    icon: Users,
    title: 'Locally Owned',
    desc: 'A local, family-run business that treats your property and project like our own.',
  },
  {
    icon: MapPin,
    title: 'Tri-State Coverage',
    desc: 'Proudly serving Kentucky, Ohio, and Indiana across the greater Cincinnati area.',
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="font-body text-xs font-semibold tracking-widest text-accent">ABOUT US</span>
              <h1 className="font-heading text-5xl sm:text-6xl text-foreground mt-3 tracking-tight leading-[0.95]">
                YOUR LOCAL<br />WASTE PARTNER
              </h1>
              <p className="font-body text-lg text-muted-foreground mt-6 leading-relaxed">
                American Local Dumpsters is a locally owned dumpster rental and junk removal company
                serving the Kentucky, Ohio, and Indiana tri-state area. We make clearing your space
                simple, fast, and affordable — whether it's a single-room cleanout or a full
                construction project.
              </p>
            </motion.div>

            {/* Right — company logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex justify-center lg:justify-end"
            >
              <img
                src="/images/AmericanLocalDumpsterOficialLogo.svg"
                alt="American Local Dumpsters logo"
                className="w-full max-w-sm h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-4xl sm:text-5xl font-bold text-accent">{s.value}</p>
                <p className="font-body text-sm text-primary-foreground/80 mt-2 uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl text-foreground tracking-tight mb-6">OUR STORY</h2>
            <div className="space-y-4 font-body text-base text-muted-foreground leading-relaxed">
              <p>
                We started American Local Dumpsters with a simple goal: make dumpster rental and
                junk removal honest, easy, and dependable for our neighbors. Too many people had
                dealt with confusing pricing, late deliveries, and poor service — we knew there was
                a better way.
              </p>
              <p>
                Today we provide roll-off dumpsters in a range of sizes, full-service junk removal,
                construction debris hauling, and complete property cleanouts. Every job is handled
                by a local team that cares about doing things right — from driveway-safe placement
                to recycling and donating whatever we can.
              </p>
              <p>
                When you call us, you're talking to people in your community, not a faceless call
                center. That's the difference of working with a truly local company.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary/40 border-y-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="font-body text-xs font-semibold tracking-widest text-accent">WHY CHOOSE US</span>
            <h2 className="font-heading text-4xl text-foreground tracking-tight mt-3">
              WHAT SETS US APART
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border-2 border-border rounded-sm p-6 hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-lg text-foreground mb-2">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/contact">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-bold rounded-none px-8 py-6 uppercase tracking-wider">
                Get a Free Quote <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
