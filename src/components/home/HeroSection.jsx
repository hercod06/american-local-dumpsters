import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Phone, Star, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRICES = {
  10: { 1: 269, 3: 299, 7: 329 },
  13: { 1: 299, 3: 349, 7: 399 },
  15: { 1: 339, 3: 379, 7: 409 },
  18: { 1: 349, 3: 389, 7: 449 },
};

const HERO_IMAGE =
  'https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/444e7c52c_generated_image.png';

const sizes = ['10 YD', '13 YD', '15 YD', '18 YD'];
const durations = ['1 Day', '3 Days', '7 Days'];

const stats = [
  { num: 'IN', label: 'Indianapolis' },
  { num: 'KY', label: 'Burlington' },
  { num: 'OH', label: 'Cincinnati' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};
const lineUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const [selectedSize, setSelectedSize] = useState('15 YD');
  const [selectedDuration, setSelectedDuration] = useState('3 Days');
  const [quoteVisible, setQuoteVisible] = useState(false);

  const sizeNum = parseInt(selectedSize.replace(' YD', ''), 10);
  const daysNum = parseInt(selectedDuration.replace(' Days', '').replace(' Day', ''), 10);
  const price = PRICES[sizeNum]?.[daysNum];

  const handleSizeChange = (value) => {
    setSelectedSize(value);
    setQuoteVisible(false);
  };

  const handleDurationChange = (value) => {
    setSelectedDuration(value);
    setQuoteVisible(false);
  };

  const handleGetPrice = () => {
    setQuoteVisible(true);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-primary">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1.08 }}
        transition={{ opacity: { duration: 1.2 }, scale: { duration: 1.4, ease: 'easeOut' } }}
      >
        <motion.img
          src={HERO_IMAGE}
          alt="Roll-off dumpster rental"
          className="h-full w-full object-cover"
          animate={{ scale: [1.08, 1.16] }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, hsl(var(--primary)/0.92) 0%, hsl(var(--primary)/0.72) 38%, hsl(var(--primary)/0.20) 70%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, hsl(var(--primary)) 0%, transparent 35%, transparent 75%, hsl(var(--primary)/0.55) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 min-h-screen flex flex-col justify-center pt-28 pb-32">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="font-body text-xs font-bold tracking-[0.3em] text-accent uppercase">
              Dumpster Rental · Junk Removal
            </span>
          </motion.div>

          <h1 className="font-heading font-bold text-primary-foreground uppercase leading-[0.88] tracking-tight text-[clamp(3rem,9vw,7rem)] overflow-hidden">
            <motion.span variants={lineUp} className="block">
              Reclaim
            </motion.span>
            <motion.span variants={lineUp} className="block text-accent">
              Your Space
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="font-body text-base sm:text-lg text-primary-foreground/85 leading-relaxed mt-7 max-w-xl"
          >
            Same day dumpsters across Kentucky, Ohio &amp; Indiana. Flat rate, transparent
            pricing with no hidden fees, no surprises. Just space, cleared.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-9">
            <Link to="/contact">
              <Button className="group bg-accent text-accent-foreground hover:bg-accent/90 font-body font-bold rounded-none px-9 py-7 text-sm uppercase tracking-widest shadow-xl shadow-accent/20 transition-all hover:shadow-2xl hover:shadow-accent/30">
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="tel:+15138896060">
              <Button
                variant="outline"
                className="font-body font-bold rounded-none px-9 py-7 text-sm uppercase tracking-widest border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all"
              >
                <Phone className="w-4 h-4 mr-2" />
                (513) 889-6060
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-10 gap-y-4 mt-14 border-t border-primary-foreground/15 pt-7"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-primary-foreground flex items-center gap-1">
                  {s.num}
                  {s.star && <Star className="w-5 h-5 text-accent fill-accent" />}
                </span>
                <span className="font-body text-[11px] tracking-widest text-primary-foreground/60 uppercase mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute right-10 bottom-32 w-[340px] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6"
        >
          <p className="font-heading text-lg font-bold text-primary-foreground tracking-wide mb-1">
            Build Your Quote
          </p>
          <p className="font-body text-xs text-primary-foreground/70 mb-5">
            Pick a size & duration to get started.
          </p>

          <div className="space-y-4 mb-5">
            <div>
              <label className="font-body text-[10px] tracking-widest text-primary-foreground/70 uppercase block mb-1.5">
                Container Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => handleSizeChange(e.target.value)}
                className="w-full font-body text-sm bg-primary/60 border border-white/20 rounded-lg px-3 py-2.5 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {sizes.map((s) => (
                  <option key={s} className="text-foreground">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-body text-[10px] tracking-widest text-primary-foreground/70 uppercase block mb-1.5">
                Rental Duration
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => handleDurationChange(e.target.value)}
                className="w-full font-body text-sm bg-primary/60 border border-white/20 rounded-lg px-3 py-2.5 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {durations.map((d) => (
                  <option key={d} className="text-foreground">
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {quoteVisible ? (
              <motion.div
                key="price"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-accent/30 bg-accent/10 p-4 text-center"
              >
                <p className="font-body text-[10px] tracking-widest text-primary-foreground/70 uppercase mb-1">
                  Your Price
                </p>
                <p className="font-heading text-5xl font-bold text-accent leading-none">${price}</p>
                <p className="font-body text-xs text-primary-foreground/60 mt-2">
                  {selectedSize} · {selectedDuration.toLowerCase()}
                </p>
                <p className="font-body text-[10px] text-primary-foreground/50 mt-1">
                  Delivery &amp; pickup included · 0–15 mi radius
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <Button
                  onClick={handleGetPrice}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body font-bold text-sm uppercase tracking-widest rounded-lg h-12"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Get My Price
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.3em] text-primary-foreground/60 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
