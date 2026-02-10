import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import config from '../../data/config.json';

export default function Locations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const locations = Object.values(config.locations);
  const { t } = useTranslation();

  return (
    <section id="locations" className="py-24 px-6 bg-cafe-cream gsap-reveal" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">{t('locations.title')}</h2>
          <p className="text-ash-grey max-w-2xl mx-auto">
            {t('locations.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: location.name === 'Nice' ? 0.1 : 0.2 }}
              className="bg-cafe-cream/80 rounded-2xl overflow-hidden border border-espresso-dark/10 shadow-lg"
            >
              <div className="aspect-video bg-cafe-cream relative">
                <img
                  src={location.image}
                  alt={t('locations.imageAlt', { city: location.name })}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-roast/30 to-transparent" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-display text-2xl text-deep-roast">
                  {location.name}
                </h3>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-crema-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-deep-roast font-medium">{location.address}</p>
                    <p className="text-ash-grey">{location.city}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-crema-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-deep-roast">
                      {location.hours.weekdays}
                    </p>
                    <p className="text-ash-grey">
                      {location.hours.sunday}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-crema-gold flex-shrink-0" />
                  <a
                    href={`tel:${location.phone.replace(/\s/g, '')}`}
                    className="text-deep-roast hover:text-crema-gold transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
