import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const links = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }];


  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 bg-[hsl(var(--popover-foreground))] ${
    scrolled ?
    'bg-primary shadow-lg' :
    "backdrop-blur-sm"}`
    }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/c8042a41d_AmericanLocalDumpsterLogo2.png"
              alt="American Local Dumpsters"
              className="h-14 w-auto brightness-0 invert" />
            
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={`font-body text-sm font-bold tracking-wider uppercase transition-colors hover:text-accent ${
              location.pathname === link.path ? 'text-accent' : 'text-primary-foreground/80'}`
              }>
              
                {link.label}
              </Link>
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+15138896060" className="flex items-center gap-2 text-sm font-body font-bold text-primary-foreground/80 hover:text-accent transition-colors">
              <Phone className="w-4 h-4 text-accent" />
              (513) 889-6060
            </a>
            <Link to="/contact">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/85 font-body font-bold rounded-none px-6 uppercase tracking-wider">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-primary-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen &&
      <div className="lg:hidden bg-primary border-t border-primary-foreground/10">
          <div className="px-4 py-6 space-y-4">
            {links.map((link) =>
          <Link
            key={link.path}
            to={link.path}
            className={`block font-body text-base font-bold uppercase tracking-wider py-2 ${
            location.pathname === link.path ? 'text-accent' : 'text-primary-foreground/80'}`
            }>
            
                {link.label}
              </Link>
          )}
            <div className="pt-4 border-t border-primary-foreground/10 space-y-3">
              <a href="tel:+15138896060" className="flex items-center gap-2 text-sm font-body font-bold text-primary-foreground/80">
                <Phone className="w-4 h-4 text-accent" />
                (513) 889-6060
              </a>
              <Link to="/contact">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/85 font-body font-bold rounded-none uppercase tracking-wider">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      }
    </nav>);

}