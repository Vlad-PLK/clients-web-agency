import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import config from '../../data/config.json';

export default function Locations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const locations = Object.entries(config.locations);

  return (
    <section id="locations" className="py-24 px-6 bg-warm-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Nos Adresses</h2>
          <p className="text-warm-gray max-w-2xl mx-auto">
            Retrouvez-nous à Nice et Paris pour vivre l'expérience Café Fino.
          </p>
        </motion.div>

        {/* Location Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {locations.map(([key, location], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-cream rounded-2xl overflow-hidden"
            >
              {/* Map Placeholder */}
              <div className="aspect-video bg-powder-pink relative">
                <img
                  src={`https://placehold.co/800x400/F5E6E0/C4A484?text=${location.name}`}
                  alt={`Café Fino ${location.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-display text-3xl text-white">
                  {location.name}
                </h3>
              </div>

              {/* Location Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-charcoal font-medium">{location.address}</p>
                    <p className="text-warm-gray">{location.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-charcoal">
                      <span className="font-medium">{location.days}:</span> {location.hours.weekdays}
                    </p>
                    <p className="text-warm-gray">
                      <span className="font-medium">Dimanche:</span> {location.hours.sunday}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-terracotta flex-shrink-0" />
                  <a
                    href={`tel:${location.phone.replace(/\s/g, '')}`}
                    className="text-charcoal hover:text-terracotta transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>

                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-block mt-4 w-full text-center"
                >
                  Voir sur Google Maps
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
