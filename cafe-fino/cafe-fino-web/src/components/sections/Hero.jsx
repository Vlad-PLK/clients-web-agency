import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import config from '../../data/config.json';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [activeLocation, setActiveLocation] = useState('nice');
  const location = config.locations[activeLocation];
  const parallaxRef = useRef(null);
  const { t } = useTranslation();

  useGSAP(() => {
    if (!parallaxRef.current) return;
    gsap.to(parallaxRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          ref={parallaxRef}
          src="/images/official-coffee-picture1.png"
          alt={t('hero.imageAlt')}
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cafe-cream/70 via-cafe-cream/80 to-cafe-cream" />
      </div>
      
      <div className="relative text-center max-w-4xl mx-auto">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 flex justify-center"
        >
          <img
            src="/images/logoCafeFino.jpg"
            alt="Café Fino"
            className="w-48 sm:w-56 md:w-72 lg:w-[22rem] h-auto drop-shadow-lg"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-accent text-xl md:text-2xl text-ash-grey italic mb-12"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* Location Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="location-toggle mb-16"
        >
          <button
            onClick={() => setActiveLocation('nice')}
            className={`location-toggle-btn ${activeLocation === 'nice' ? 'active' : ''}`}
          >
            {t('locations.shortName.nice')}
          </button>
          <button
            onClick={() => setActiveLocation('paris')}
            className={`location-toggle-btn ${activeLocation === 'paris' ? 'active' : ''}`}
          >
            {t('locations.shortName.paris')}
          </button>
        </motion.div>

        {/* Location Info */}
        <motion.div
          key={activeLocation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-ash-grey"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">{location.hours.weekdays}</span>
          </div>
          <span className="hidden md:block text-crema-gold">•</span>
          <div className="flex items-center gap-2">
            <span>{t(`locations.days.${activeLocation}`)}</span>
          </div>
          <span className="hidden md:block text-crema-gold">•</span>
          <div className="flex items-center gap-2">
            <span>{location.address}, {location.city.split(' ')[1]}</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="relative mb-3">
          <div className="steam">
            <span />
            <span />
            <span />
          </div>
          <div className="w-10 h-8 border-2 border-espresso-dark rounded-b-xl rounded-t-md bg-cafe-cream shadow-lg" />
          <div className="absolute right-[-10px] top-1 w-4 h-4 border-2 border-espresso-dark rounded-full" />
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-crema-gold"
        >
          <svg 
            className="w-5 h-5"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
