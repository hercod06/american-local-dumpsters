import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons for Leaflet with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Center: 2716 Sunchase Blvd, Burlington, KY 41005
const CENTER = [38.9507, -84.7174];
const RADIUS_MILES = 15;
const RADIUS_METERS = RADIUS_MILES * 1609.34;

const zones = [
  { miles: 15, label: '0–15 miles', sublabel: 'Included in price', color: '#1e3a5f', fillOpacity: 0.12 },
  { miles: 25, label: '16–25 miles', sublabel: '+$49', color: '#1e3a5f', fillOpacity: 0.07 },
  { miles: 35, label: '26–35 miles', sublabel: '+$99', color: '#1e3a5f', fillOpacity: 0.05 },
  { miles: 50, label: '36–50 miles', sublabel: '+$179', color: '#1e3a5f', fillOpacity: 0.03 },
];

function SetView() {
  const map = useMap();
  useEffect(() => {
    map.setView(CENTER, 10);
  }, [map]);
  return null;
}

export default function ServiceAreaSection() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-accent" />
            <span className="font-body text-xs font-bold tracking-[0.25em] text-accent uppercase">Service Coverage</span>
            <div className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-heading font-bold text-5xl sm:text-6xl text-foreground uppercase tracking-tight">
            TRI-STATE STRONG
          </h2>
          <p className="font-body text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            Based in Burlington, KY — serving the KY-OH-IN tri-state area up to 50 miles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-sm overflow-hidden border-2 border-border"
          style={{ height: '480px' }}
        >
          <MapContainer
            center={CENTER}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <SetView />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Service radius circles — largest first so smaller ones render on top */}
            {[...zones].reverse().map(zone => (
              <Circle
                key={zone.miles}
                center={CENTER}
                radius={zone.miles * 1609.34}
                pathOptions={{
                  color: '#1e3a5f',
                  weight: zone.miles === 15 ? 2.5 : 1,
                  dashArray: zone.miles === 15 ? null : '6 4',
                  fillColor: '#1e3a5f',
                  fillOpacity: zone.fillOpacity,
                }}
              />
            ))}

            {/* Center marker */}
            <Marker position={CENTER}>
              <Popup>
                <div className="text-sm font-semibold">2716 Sunchase Blvd<br />Burlington, KY 41005</div>
                <div className="text-xs text-gray-500 mt-1">American Local Dumpsters</div>
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>

        {/* Distance legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {zones.map(zone => (
            <div key={zone.miles} className="bg-card border border-border p-4 text-center">
              <p className="font-heading text-lg font-bold text-foreground">{zone.label}</p>
              <p className="font-body text-sm text-accent font-semibold">{zone.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}