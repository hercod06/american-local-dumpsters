import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTABanner() {
  return (
    <section className="py-24 bg-accent relative overflow-hidden">
      {/* Diagonal pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px'}} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-accent-foreground uppercase tracking-tight mb-4 leading-none">
            READY TO CLEAR<br />YOUR SPACE?
          </h2>
          <p className="font-body text-lg text-accent-foreground/80 mb-12 max-w-xl mx-auto">
            Get a free, no obligation quote in minutes. Same day delivery available across the tri-state area.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 font-body font-bold rounded-none px-10 py-7 text-base uppercase tracking-wider">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:+15138896060">
              <Button variant="outline" className="border-2 border-accent-foreground/50 text-accent-foreground hover:bg-accent-foreground/10 hover:border-accent-foreground font-body font-bold rounded-none px-10 py-7 text-base uppercase tracking-wider">
                <Phone className="w-5 h-5 mr-2" />
                (513) 889-6060
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
