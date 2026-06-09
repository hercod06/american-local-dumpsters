import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <img
                  src="https://media.base44.com/images/public/6a0348a20dfacc3b4cecbfc0/c8042a41d_AmericanLocalDumpsterLogo2.png"
                  alt="American Local Dumpsters"
                  className="h-20 w-auto brightness-0 invert"
                />
              </div>
              <p className="font-body text-sm text-primary-foreground/60 max-w-sm leading-relaxed">
                Premium dumpster rental and junk removal services across the KY-OH-IN tri-state area. Reliable, affordable, and always on time.
              </p>
            </div>

            <div>
              <h4 className="font-body text-xs tracking-widest text-primary-foreground/40 mb-4 font-semibold">QUICK LINKS</h4>
              <ul className="space-y-2">
                {['/', '/services', '/about', '/contact'].map((path, i) => (
                  <li key={path}>
                    <Link to={path} className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                      {['Home', 'Services', 'About', 'Contact'][i]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-body text-xs tracking-widest text-primary-foreground/40 mb-4 font-semibold">CONTACT</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <a href="tel:+15138896060" className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-colors">(513) 889-6060</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <a href="mailto:americanlocaldumpsters@gmail.com" className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-colors">americanlocaldumpsters@gmail.com</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent mt-0.5" />
                  <span className="font-body text-sm text-primary-foreground/60">Serving KY, OH &amp; IN</span>
                </li>
              </ul>

              <h4 className="font-body text-xs tracking-widest text-primary-foreground/40 mb-3 font-semibold">FOLLOW US</h4>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a href="https://www.instagram.com/americanlocaldumpsters" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-primary-foreground/10 hover:bg-accent/20 flex items-center justify-center transition-colors" title="Instagram">
                  <svg className="w-4 h-4 text-primary-foreground/60 hover:text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="https://www.tiktok.com/@americanlocaldumpsters" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-primary-foreground/10 hover:bg-accent/20 flex items-center justify-center transition-colors" title="TikTok">
                  <svg className="w-4 h-4 text-primary-foreground/60 hover:text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.79a4.85 4.85 0 01-1.01-.1z"/>
                  </svg>
                </a>
                {/* Snapchat */}
                <a href="https://www.snapchat.com/add/ald.usa" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-primary-foreground/10 hover:bg-accent/20 flex items-center justify-center transition-colors" title="Snapchat">
                  <svg className="w-4 h-4 text-primary-foreground/60 hover:text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.166 2C9.726 2 7.5 3.044 6.05 4.816c-.844 1.033-1.265 2.31-1.265 3.7 0 .392.031.778.09 1.156-.23.1-.474.155-.73.155-.502 0-.913-.19-1.08-.3-.06-.04-.13-.06-.2-.06-.15 0-.29.1-.34.25-.07.2.03.41.22.49.07.03 1.57.67 1.79 2.48-.06.03-.13.05-.2.08-.4.16-.97.39-.97.83 0 .38.36.62.75.72.51.14 1.05.2 1.6.2.16 0 .32-.01.47-.02.2.3.47.58.83.83.79.55 1.83.86 2.96 1.02.1.02.18.1.18.2v.04c0 .16-.07.3-.18.4-.32.28-.97.47-1.65.66-.67.19-1.36.39-1.84.76-.46.35-.7.82-.7 1.35 0 .05.01.1.02.15.05.28.3.47.58.47h11.28c.28 0 .53-.19.58-.47.01-.05.02-.1.02-.15 0-.53-.24-1-.7-1.35-.48-.37-1.17-.57-1.84-.76-.68-.19-1.33-.38-1.65-.66-.11-.1-.18-.24-.18-.4v-.04c0-.1.08-.18.18-.2 1.13-.16 2.17-.47 2.96-1.02.36-.25.63-.53.83-.83.15.01.31.02.47.02.55 0 1.09-.06 1.6-.2.39-.1.75-.34.75-.72 0-.44-.57-.67-.97-.83-.07-.03-.14-.05-.2-.08.22-1.81 1.72-2.45 1.79-2.48.19-.08.29-.29.22-.49-.05-.15-.19-.25-.34-.25-.07 0-.14.02-.2.06-.17.1-.578.3-1.08.3-.256 0-.5-.055-.73-.155.059-.378.09-.764.09-1.156 0-1.39-.42-2.667-1.265-3.7C16.5 3.044 14.274 2 11.834 2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
            <p className="font-body text-xs text-primary-foreground/40">
              &copy; {new Date().getFullYear()} American Local Dumpsters. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}