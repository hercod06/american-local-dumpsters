import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error('Please fill in your name and phone number.');
      return;
    }

    // Send the request by opening the user's email client, pre-filled with
    // all the form details (no backend required).
    const subject = `Quote Request - ${form.name}`;
    const lines = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || '-'}`,
      `Service: ${form.service || '-'}`,
      `Dumpster Size: ${form.size || '-'}`,
      `Rental Duration: ${form.days || '-'}`,
      `State: ${form.state || '-'}`,
      `Delivery Address: ${form.address || '-'}`,
      '',
      'Project Details:',
      form.message || '-',
    ];
    const mailto = `mailto:AmericanLocalDumpsters@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = mailto;

    setSubmitted(true);
    toast.success('Opening your email app to send the request...');
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
              A team member will reach out within 1 business hour.
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
              Fill out the form to get a free, no-obligation quote — or give us a call for immediate assistance.
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
                <Input
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="123 Main St, Cincinnati, OH"
                  className="mt-1.5 rounded-sm font-body"
                />
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

              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold rounded-sm py-6 text-base">
                <Send className="w-5 h-5 mr-2" />
                Submit Quote Request
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