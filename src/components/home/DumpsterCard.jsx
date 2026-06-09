import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DumpsterCard({ size, image, loads, idealFor, dimensions, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-card border-2 border-border rounded-sm overflow-hidden hover:border-accent/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-secondary">
        <img
          src={image}
          alt={`${size} yard dumpster`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm rounded-sm px-3 py-1.5">
          <span className="font-heading text-primary-foreground text-lg">{size}</span>
          <span className="font-body text-primary-foreground/70 text-xs ml-1">YARD</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-body text-sm text-muted-foreground mb-2">
          ≈ {loads} pickup truck loads
        </p>
        <p className="font-body text-xs text-muted-foreground/70 mb-4">{dimensions}</p>

        {/* Ideal For - shown on hover */}
        <div className={`overflow-hidden transition-all duration-300 ${hovered ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
          <p className="font-body text-xs font-semibold tracking-widest text-accent mb-2">IDEAL FOR</p>
          <ul className="space-y-1">
            {idealFor.map(item => (
              <li key={item} className="font-body text-sm text-muted-foreground flex items-center gap-2">
                <span className="w-1 h-1 bg-accent rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Link to="/contact">
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold rounded-sm">
            Rent This Size
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}