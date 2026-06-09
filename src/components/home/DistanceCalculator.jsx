import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ORIGIN = '2716 Sunchase Blvd, Burlington, KY 41005';

const DISTANCE_TIERS = [
  { max: 15, label: '0–15 miles', fee: 0, feeLabel: 'Included' },
  { max: 25, label: '16–25 miles', fee: 49, feeLabel: '+$49' },
  { max: 35, label: '26–35 miles', fee: 99, feeLabel: '+$99' },
  { max: 50, label: '36–50 miles', fee: 179, feeLabel: '+$179' },
];

function getTier(miles) {
  return DISTANCE_TIERS.find(t => miles <= t.max) || null;
}

export default function DistanceCalculator() {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);
  const originCoordRef = useRef(null); // cached geocode of ORIGIN
  const destCoordRef = useRef(null);   // coords of the selected suggestion

  // Pre-geocode the origin once on mount (plenty of time, avoids rate limits)
  useEffect(() => {
    geocode(ORIGIN).then((c) => { if (c) originCoordRef.current = c; });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist address to sessionStorage so Contact page can pre-fill it
  const persistAddress = (val) => {
    sessionStorage.setItem('quote_address', val);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchSuggestions = async (query) => {
    if (query.length < 4) {
      setSuggestions([]);
      return;
    }
    setLoadingSuggestions(true);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=us`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    const data = await res.json();
    // Keep coordinates from each suggestion so we don't have to geocode again.
    setSuggestions(
      data.map((item) => ({
        label: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
      }))
    );
    setLoadingSuggestions(false);
    setShowSuggestions(true);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setAddress(val);
    persistAddress(val);
    destCoordRef.current = null; // typing invalidates a previously picked address
    setResult(null);
    setError('');
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const selectSuggestion = (s) => {
    setAddress(s.label);
    persistAddress(s.label);
    destCoordRef.current = { lat: s.lat, lon: s.lon };
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Geocode an address string to { lat, lon } using the free OpenStreetMap
  // Nominatim service (no API key required).
  const geocode = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=us`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    const data = await res.json();
    if (!data || data.length === 0) return null;
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  };

  // Straight-line distance in miles (Haversine), used as a fallback.
  const haversineMiles = (a, b) => {
    const toRad = (d) => (d * Math.PI) / 180;
    const R = 3958.8; // Earth radius in miles
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };

  const calculate = async () => {
    if (!address.trim()) return;
    setShowSuggestions(false);
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Origin: use cached coords, otherwise geocode once and cache.
      let from = originCoordRef.current;
      if (!from) {
        from = await geocode(ORIGIN);
        if (from) originCoordRef.current = from;
      }

      // Destination: reuse coords from the selected suggestion if available,
      // otherwise geocode the typed text (sequential — avoids rate limiting).
      let to = destCoordRef.current;
      if (!to) {
        to = await geocode(address);
      }

      if (!to || !from) {
        setLoading(false);
        setError("We couldn't find that address. Please try again with a full street address.");
        return;
      }

      // Try real driving distance via the free OSRM routing service,
      // fall back to straight-line distance with a road-factor estimate.
      let miles = null;
      try {
        const r = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=false`
        );
        const j = await r.json();
        if (j.routes && j.routes[0]) {
          miles = j.routes[0].distance / 1609.344;
        }
      } catch (_) {
        // routing service unavailable — fall back below
      }

      if (miles == null) {
        miles = haversineMiles(from, to) * 1.3; // approximate road distance
      }

      miles = Math.round(miles * 10) / 10;
      setLoading(false);

      const tier = getTier(miles);
      setResult({ miles, tier });
    } catch (e) {
      setLoading(false);
      setError("We couldn't calculate the distance right now. Please try again or contact us directly.");
    }
  };

  return (
    <div className="mt-6 bg-card border-2 border-border p-5">
      <p className="font-body text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-1">
        Distance Fee Calculator
      </p>
      <p className="font-body text-sm text-muted-foreground mb-4">
        Enter your delivery address to see your distance surcharge.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1" ref={wrapperRef}>
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
          {loadingSuggestions && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground animate-spin z-10 pointer-events-none" />
          )}
          <input
            type="text"
            value={address}
            onChange={handleChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onKeyDown={e => {
              if (e.key === 'Enter') calculate();
              if (e.key === 'Escape') setShowSuggestions(false);
            }}
            placeholder="e.g. 123 Main St, Cincinnati, OH"
            className="w-full pl-10 pr-4 py-3 border-2 border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            autoComplete="off"
          />

          {/* Autocomplete dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-1 bg-card border-2 border-border z-50 shadow-lg max-h-56 overflow-y-auto"
              >
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onMouseDown={() => selectSuggestion(s)}
                    className="flex items-start gap-2 px-4 py-2.5 cursor-pointer hover:bg-secondary transition-colors border-b border-border last:border-b-0"
                  >
                    <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-body text-xs text-foreground leading-snug">{s.label}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <Button
          onClick={calculate}
          disabled={loading || !address.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-bold rounded-none uppercase tracking-wider px-6 h-12 whitespace-nowrap"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check Distance'}
        </Button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 text-destructive font-body text-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4"
          >
            {result.tier ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-secondary/50 border border-border p-4">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 sm:mt-0" />
                <div className="flex-1">
                  <p className="font-body text-sm text-foreground">
                    Your address is approximately <span className="font-bold">{result.miles} miles</span> from our facility —
                    in the <span className="font-bold">{result.tier.label}</span> zone.
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs tracking-widest text-muted-foreground uppercase">Distance Fee</p>
                  <p className={`font-heading text-3xl font-bold ${result.tier.fee === 0 ? 'text-accent' : 'text-foreground'}`}>
                    {result.tier.feeLabel}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 p-4">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm text-foreground">
                  Your address is approximately <span className="font-bold">{result.miles} miles</span> away — outside our standard 50-mile service area.
                  Please <Link to="/contact" className="text-accent underline">contact us</Link> for a custom quote.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}