import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const contactInfo = [
  { icon: Phone, label: 'Call Us', value: '(513) 889-6060', href: 'tel:+15138896060' },
  { icon: Mail, label: 'Email Us', value: 'AmericanLocalDumpsters@gmail.com', href: 'mailto:americanlocaldumpsters@gmail.com' },
  { icon: MapPin, label: 'Service Area', value: 'KY, OH & IN Tri-State', href: null },
  { icon: Clock, label: 'Hours', value: 'Mon-Sat: 7am - 6pm', href: null },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill from sessionStorage if coming from the pricing section
  const savedSize = sessionStorage.getItem('quote_size');
  const savedDays = sessionStorage.getItem('quote_days');
  const savedPrice = sessionStorage.getItem('quote_price');
  const savedAddress = sessionStorage.getItem('quote_address');

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    service: savedSize ? 'dumpster_rental' : '',
    size: savedSize || '',
    days: savedDays || '',
    address: savedAddress || '',
    city: '', state: '', message: ''
  });

  const prefilledSummary = savedSize
    ? `${savedSize} yd · ${savedDays} day${savedDays !== '1' ? 's' : ''} · $${savedPrice}`
    : null;

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  // ── Delivery address autocomplete (free OpenStreetMap Nominatim) ──
  const [addrSuggestions, setAddrSuggestions] = useState([]);
  const [showAddrSuggestions, setShowAddrSuggestions] = useState(false);
  const [loadingAddr, setLoadingAddr] = useState(false);
  const addrDebounceRef = useRef(null);
  const addrWrapperRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (addrWrapperRef.current && !addrWrapperRef.current.contains(e.target)) {
        setShowAddrSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchAddrSuggestions = async (query) => {
    if (query.length < 4) {
      setAddrSuggestions([]);
      return;
    }
    setLoadingAddr(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=us`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      const data = await res.json();
      setAddrSuggestions(data.map((item) => item.display_name));
      setShowAddrSuggestions(true);
    } catch (_) {
      setAddrSuggestions([]);
    }
    setLoadingAddr(false);
  };

  const handleAddressChange = (value) => {
    handleChange('address', value);
    clearTimeout(addrDebounceRef.current);
    addrDebounceRef.current = setTimeout(() => fetchAddrSuggestions(value), 300);
  };

  const selectAddress = (s) => {
    handleChange('address', s);
    setAddrSuggestions([]);
    setShowAddrSuggestions(false);
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error('Please fill in your name and phone number.');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '4f87ea8c-5868-45d7-80cf-3113c118fc6a',
          subject: `New Quote Request from ${form.name}`,
          from_name: 'American Local Dumpsters Website',
          name: form.name,
          phone: form.phone,
          email: form.email || 'Not provided',
          service: form.service || 'Not specified',
          dumpster_size: form.size || 'Not specified',
          rental_duration: form.days || 'Not specified',
          state: form.state || 'Not specified',
          delivery_address: form.address || 'Not specified',
          project_details: form.message || 'None',
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        toast.success("Quote request sent! We'll contact you shortly.");
      } else {
        toast.error('Something went wrong. Please call us at (513) 889-6060.');
      }
    } catch (_) {
      toast.error('Network error. Please try again or call (513) 889-6060.');
    }
    setSending(false);
  };

  if (submitted) {
    return (
      <section className="pt-32 pb-24 bg-background min-h-screen flex items-center">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-heading text-4xl text-foreground mb-4">REQUEST RECEIVED</h1>
            <p className="font-body text-lg text-muted-foreground mb-2">
              Thank you, {form.name}! We've received your quote request.
            </p>
            <p className="font-body text-base text-muted-foreground">
              A team member will reach out within 3 business hour.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <span className="font-body text-xs font-semibold tracking-widest text-accent">GET IN TOUCH</span>
            <h1 className="font-heading text-5xl text-foreground mt-3 tracking-tight leading-[0.9] mb-6">
              LET'S CLEAR<br />YOUR <span className="text-accent">SPACE</span>
            </h1>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-10">
              Fill out the form to get a free, no-obligation quote, or give us a call for immediate assistance.
            </p>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground block">{label.toUpperCase()}</span>
                    {href ? (
                      <a href={href} className="font-body text-base text-foreground hover:text-accent transition-colors">{value}</a>
                    ) : (
                      <span className="font-body text-base text-foreground">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-card border-2 border-border rounded-sm p-8">
              <h2 className="font-heading text-xl text-foreground mb-2">REQUEST A FREE QUOTE</h2>

              {/* Pre-filled summary banner */}
              {prefilledSummary && (
                <div className="mb-5 flex items-center gap-3 bg-accent/10 border border-accent/20 px-4 py-3">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="font-body text-sm text-foreground">
                    Pre-selected: <span className="font-bold text-accent">{prefilledSummary}</span>
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="font-body text-sm font-medium">Full Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="John Smith"
                    className="mt-1.5 rounded-sm font-body"
                  />
                </div>
                <div>
                  <Label className="font-body text-sm font-medium">Phone Number *</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-1.5 rounded-sm font-body"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label className="font-body text-sm font-medium">Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className="mt-1.5 rounded-sm font-body"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="font-body text-sm font-medium">Service Needed</Label>
                  <Select value={form.service} onValueChange={(v) => handleChange('service', v)}>
                    <SelectTrigger className="mt-1.5 rounded-sm font-body">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dumpster_rental">Dumpster Rental</SelectItem>
                      <SelectItem value="junk_removal">Junk Removal</SelectItem>
                      <SelectItem value="construction">Construction Debris</SelectItem>
                      <SelectItem value="cleanout">Cleanout Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-body text-sm font-medium">Dumpster Size</Label>
                  <Select value={form.size} onValueChange={(v) => handleChange('size', v)}>
                    <SelectTrigger className="mt-1.5 rounded-sm font-body">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 Yard</SelectItem>
                      <SelectItem value="13">13 Yard</SelectItem>
                      <SelectItem value="15">15 Yard</SelectItem>
                      <SelectItem value="18">18 Yard</SelectItem>
                      <SelectItem value="unsure">Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="font-body text-sm font-medium">Rental Duration</Label>
                  <Select value={form.days} onValueChange={(v) => handleChange('days', v)}>
                    <SelectTrigger className="mt-1.5 rounded-sm font-body">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-body text-sm font-medium">State</Label>
                  <Select value={form.state} onValueChange={(v) => handleChange('state', v)}>
                    <SelectTrigger className="mt-1.5 rounded-sm font-body">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KY">Kentucky</SelectItem>
                      <SelectItem value="OH">Ohio</SelectItem>
                      <SelectItem value="IN">Indiana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mb-4">
                <Label className="font-body text-sm font-medium">Delivery Address</Label>
                <div className="relative mt-1.5" ref={addrWrapperRef}>
                  <Input
                    value={form.address}
                    onChange={(e) => handleAddressChange(e.target.value)}
                    onFocus={() => addrSuggestions.length > 0 && setShowAddrSuggestions(true)}
                    onKeyDown={(e) => { if (e.key === 'Escape') setShowAddrSuggestions(false); }}
                    placeholder="Start typing your address..."
                    className="rounded-sm font-body pr-9"
                    autoComplete="off"
                  />
                  {loadingAddr && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin pointer-events-none" />
                  )}

                  <AnimatePresence>
                    {showAddrSuggestions && addrSuggestions.length > 0 && (
                      <motion.ul
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 top-full mt-1 bg-card border-2 border-border z-50 shadow-lg max-h-56 overflow-y-auto"
                      >
                        {addrSuggestions.map((s, i) => (
                          <li
                            key={i}
                            onMouseDown={() => selectAddress(s)}
                            className="flex items-start gap-2 px-4 py-2.5 cursor-pointer hover:bg-secondary transition-colors border-b border-border last:border-b-0"
                          >
                            <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                            <span className="font-body text-xs text-foreground leading-snug">{s}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mb-6">
                <Label className="font-body text-sm font-medium">Project Details</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us about your project..."
                  className="mt-1.5 rounded-sm font-body h-28"
                />
              </div>

              <Button type="submit" disabled={sending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold rounded-sm py-6 text-base disabled:opacity-70">
                {sending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Quote Request
                  </>
                )}
              </Button>

              <p className="font-body text-xs text-muted-foreground text-center mt-4">
                We typically respond within 1 business hour.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}