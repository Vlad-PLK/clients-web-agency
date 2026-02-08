import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import config from '../../data/config.json';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 px-6 bg-warm-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-powder-pink">
              <img
                src="https://placehold.co/600x750/F5E6E0/2D2D2D?text=Café+Fino"
                alt="L'intérieur de Café Fino"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-terracotta/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-4xl md:text-section text-charcoal mb-6">
              Notre Histoire
            </h2>
            
            <p className="text-warm-gray text-lg leading-relaxed mb-6">
              {config.brand.description}
            </p>
            
            <p className="text-warm-gray leading-relaxed mb-8">
              {config.brand.story}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <span className="block font-display text-3xl text-terracotta mb-1">12+</span>
                <span className="text-sm text-warm-gray uppercase tracking-wider">Années</span>
              </div>
              <div className="text-center">
                <span className="block font-display text-3xl text-terracotta mb-1">1925</span>
                <span className="text-sm text-warm-gray uppercase tracking-wider">Torréfacteur</span>
              </div>
              <div className="text-center">
                <span className="block font-display text-3xl text-terracotta mb-1">2</span>
                <span className="text-sm text-warm-gray uppercase tracking-wider">Adresses</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
