import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Instagram, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import config from '../../data/config.json';

export default function InstagramFeed() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
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

  useEffect(() => {
    if (activeIndex === null) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % posts.length);
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, posts.length]);

  return (
    <section className="py-24 px-6 bg-cafe-cream gsap-reveal" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-6 h-6 text-crema-gold" />
            <a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl text-deep-roast hover:text-crema-gold transition-colors"
            >
              {config.social.instagramHandle}
            </a>
          </div>
          <p className="text-ash-grey">
            {t('instagram.cta')}
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <InstagramCard
              key={post.src}
              post={post}
              index={index}
              isInView={isInView}
              onClick={() => setActiveIndex(index)}
              t={t}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/70 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setActiveIndex(null)}
                className="absolute -top-10 right-0 text-ivory hover:text-crema-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={posts[activeIndex].src}
                alt={t(`instagram.postAlt.${posts[activeIndex].altKey}`)}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <button
                type="button"
                aria-label="Previous"
                onClick={() =>
                  setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length)
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-ivory p-3 rounded-full hover:bg-black/70"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => setActiveIndex((prev) => (prev + 1) % posts.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-ivory p-3 rounded-full hover:bg-black/70"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function InstagramCard({ post, index, isInView, onClick, t }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="aspect-square bg-cafe-cream/80 rounded-xl overflow-hidden group border border-espresso-dark/10 relative cursor-zoom-in"
    >
      {!isLoaded && <div className="absolute inset-0 skeleton" />}
      <img
        src={post.src}
        alt={t(`instagram.postAlt.${post.altKey}`)}
        className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
          isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </motion.button>
  );
}
