import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram } from 'lucide-react';
import config from '../../data/config.json';

export default function InstagramFeed() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Placeholder images - replace with actual Instagram feed integration
  const placeholderImages = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    url: `https://placehold.co/400x400/F5E6E0/C4A484?text=IG+${i + 1}`,
    alt: `Café Fino Instagram post ${i + 1}`,
  }));

  return (
    <section className="py-24 px-6 bg-cream" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-6 h-6 text-terracotta" />
            <a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl text-charcoal hover:text-terracotta transition-colors"
            >
              {config.social.instagramHandle}
            </a>
          </div>
          <p className="text-warm-gray">
            Suivez nos aventures quotidiennes sur Instagram
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {placeholderImages.map((image, index) => (
            <motion.a
              key={image.id}
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="aspect-square rounded-lg overflow-hidden group"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href={config.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Instagram size={18} />
            Suivez-nous
          </a>
        </motion.div>
      </div>
    </section>
  );
}
