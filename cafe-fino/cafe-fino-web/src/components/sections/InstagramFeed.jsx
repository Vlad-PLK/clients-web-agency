import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import config from '../../data/config.json';

export default function InstagramFeed() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();
  const posts = [
    {
      src: '/images/cafefino-coffeecup-latteart.jpg',
      altKey: 'table',
    },
    {
      src: '/images/purplelatte.jpg',
      altKey: 'breakfast',
    },
    {
      src: '/images/briochefraiseetchocolat.jpg',
      altKey: 'barista',
    },
    {
      src: '/images/granolafruits.jpg',
      altKey: 'latteArt',
    },
    {
      src: '/images/veggiesandsalmon.jpg',
      altKey: 'dessert',
    },
    {
      src: '/images/simpleavocadotoast.jpg',
      altKey: 'granola',
    },
  ];

  return (
    <section className="py-24 px-6 bg-cream gsap-reveal" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-6 h-6 text-warm-gold" />
            <a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl text-charcoal hover:text-warm-gold transition-colors"
            >
              {config.social.instagramHandle}
            </a>
          </div>
          <p className="text-mocha">
            {t('instagram.cta')}
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <motion.a
              key={post.src}
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="aspect-square bg-cream/80 rounded-xl overflow-hidden group border border-espresso/10"
            >
              <img
                src={post.src}
                alt={t(`instagram.postAlt.${post.altKey}`)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
