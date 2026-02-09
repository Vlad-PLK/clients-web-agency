import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 px-6 bg-cream gsap-reveal" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-cream/70 border border-espresso/10">
              <img
                src="/images/official-interior2.jpg"
                alt={t('about.imageAlt')}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-warm-gold/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-4xl md:text-section text-charcoal mb-6">
              {t('about.title')}
            </h2>
            
            <p className="text-mocha text-lg leading-relaxed mb-6">
              {t('about.description')}
            </p>
            
            <p className="text-mocha leading-relaxed mb-8">
              {t('about.story')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <span className="block font-display text-3xl text-warm-gold mb-1">12+</span>
                <span className="text-sm text-mocha uppercase tracking-wider">
                  {t('about.stats.years')}
                </span>
              </div>
              <div className="text-center">
                <span className="block font-display text-3xl text-warm-gold mb-1">1925</span>
                <span className="text-sm text-mocha uppercase tracking-wider">
                  {t('about.stats.roaster')}
                </span>
              </div>
              <div className="text-center">
                <span className="block font-display text-3xl text-warm-gold mb-1">2</span>
                <span className="text-sm text-mocha uppercase tracking-wider">
                  {t('about.stats.locations')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
