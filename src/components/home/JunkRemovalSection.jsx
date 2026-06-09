import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
{ icon: Truck, title: 'Full-Service Removal', desc: 'Our crew handles all the heavy lifting. You point, we load.' },
{ icon: Clock, title: 'Same-Day Availability', desc: 'Need it gone today? We offer same-day junk removal across the tri-state.' },
{ icon: Shield, title: 'Responsible Disposal', desc: 'We recycle and donate whenever possible. Eco-friendly waste management.' }];


export default function JunkRemovalSection() {
  return (
    <section className="py-24 bg-secondary/50 border-y-2 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative">
            
            <div className="rounded-sm overflow-hidden border-2 border-border">
              <img
                src="https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/af15b1f33_generated_aadf1f01.png"
                alt="Before and after junk removal transformation"
                className="w-full h-72 lg:h-96 object-cover" />
              
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent rounded-sm px-6 py-4 shadow-lg">
              <span className="font-heading text-accent-foreground text-2xl">100%</span>
              <span className="block font-body text-accent-foreground/80 text-xs">SATISFACTION</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            
            <span className="font-body text-xs font-semibold tracking-widest text-accent">JUNK REMOVAL</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-foreground mt-3 tracking-tight mb-2">WE DO THE
HEAVY LIFTING
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-5">Don't want to deal with loading a dumpster yourself? Our full-service junk removal team handles everything — from old furniture to construction debris.

            </p>

            <div className="space-y-6 mb-10">
              {features.map(({ icon: Icon, title, desc }) =>
              <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-foreground">{title}</h3>
                    <p className="font-body text-sm text-muted-foreground mt-1">{desc}</p>
                  </div>
                </div>
              )}
            </div>

            <Link to="/contact">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold rounded-sm px-8 py-6 text-base">
                Schedule a Pickup
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>);

}