import { useState } from 'react';
import { motion } from 'framer-motion';
import config from '../../data/config.json';

export default function Hero() {
  const [activeLocation, setActiveLocation] = useState('nice');
  const location = config.locations[activeLocation];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-powder-pink/30 to-transparent pointer-events-none" />
      
      <div className="relative text-center max-w-4xl mx-auto">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-5xl md:text-hero text-charcoal mb-6"
        >
          Café Fino
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-accent text-xl md:text-2xl text-warm-gray italic mb-12"
        >
          {config.brand.tagline}
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
            Nice
          </button>
          <button
            onClick={() => setActiveLocation('paris')}
            className={`location-toggle-btn ${activeLocation === 'paris' ? 'active' : ''}`}
          >
            Paris
          </button>
        </motion.div>

        {/* Location Info */}
        <motion.div
          key={activeLocation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-warm-gray"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">{location.hours.weekdays}</span>
          </div>
          <span className="hidden md:block text-powder-pink">•</span>
          <div className="flex items-center gap-2">
            <span>{location.days}</span>
          </div>
          <span className="hidden md:block text-powder-pink">•</span>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-terracotta"
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
