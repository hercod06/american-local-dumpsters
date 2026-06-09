import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const sizes = ['10 YD', '13 YD', '15 YD', '18 YD'];
const durations = ['1 Day', '3 Days', '7 Days'];

export default function HeroSection() {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('15 YD');
  const [selectedDuration, setSelectedDuration] = useState('3 Days');

  const handleSearch = () => {
    sessionStorage.setItem('quote_size', selectedSize.replace(' YD', ''));
    sessionStorage.setItem('quote_days', selectedDuration.replace(' Days', '').replace(' Day', ''));
    navigate('/contact');
  };

  return (
    <>
      {/* ── TOP BAND (light background) ── */}
      <section className="bg-background pt-24 pb-0 px-4 sm:px-6 lg:px-10 overflow-visible">
        <div className="max-w-7xl mx-auto">

          {/* Text row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl">
              
              <p className="font-body text-xs text-muted-foreground tracking-widest uppercase mb-2">
                Dumpster Rental · Junk Removal
              </p>
              <h1 className="font-heading text-[clamp(2.8rem,6vw,5.5rem)] text-foreground leading-[0.92] tracking-tight">Reclaim 
that pace

              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-xs lg:pt-4">
              
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                Same-day delivery across KY, OH & IN. Transparent flat-rate pricing — no hidden fees, no surprises.
              </p>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="font-body rounded-full border border-foreground/20 text-foreground text-xs px-5 py-2 h-auto hover:bg-foreground hover:text-background transition-all">
                  
                  Get a Free Quote
                </Button>
              </Link>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── SPLIT SECTION: top half primary color, bottom half background ── */}
      <div className="relative">
        {/* Top half = primary color */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-primary" />
        {/* Bottom half = background */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-background" />

        {/* Image that overlaps both halves */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ height: 'clamp(280px, 45vw, 560px)' }}>
            
            <img
              src="/images/hero-dumpster.jpg"
              alt="Roll-off dumpster delivered to a residential driveway"
              className="w-full h-full object-cover object-center" />
            
            {/* Bottom vignette */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 55%)' }} />
            

            {/* Quote widget — bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="absolute bottom-5 right-5 bg-background/95 backdrop-blur-md rounded-xl shadow-2xl p-4 w-[min(360px,calc(100%-2.5rem))]">
              
              <p className="font-heading text-sm text-foreground font-bold tracking-wide mb-3">
                🗑 Build Your Quote
              </p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="font-body text-[10px] tracking-widest text-muted-foreground uppercase block mb-1">Container Size</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full font-body text-xs bg-secondary border border-border rounded-md px-2 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                    
                    {sizes.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-widest text-muted-foreground uppercase block mb-1">Rental Duration</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full font-body text-xs bg-secondary border border-border rounded-md px-2 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                    
                    {durations.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <Button
                onClick={handleSearch}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/85 font-body font-bold text-xs uppercase tracking-wider rounded-lg h-9">
                
                <Search className="w-3.5 h-3.5 mr-1.5" />
                Get My Price
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── TRUST STRIP ── */}
      <section className="bg-background pt-6 pb-8 px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-7xl mx-auto flex items-center gap-8 flex-wrap">
          
          {[
          { num: '500+', label: 'Jobs Completed' },
          { num: '98%', label: 'On-Time Rate' },
          { num: '4.9★', label: 'Avg. Rating' },
          { num: 'KY·OH·IN', label: 'Tri-State Coverage' }].
          map((item) =>
          <div key={item.num} className="flex items-center gap-2">
              <span className="font-heading text-base text-foreground font-bold hidden">{item.num}</span>
              <span className="font-body text-xs text-muted-foreground hidden">{item.label}</span>
            </div>
          )}
        </motion.div>
      </section>
    </>);

}