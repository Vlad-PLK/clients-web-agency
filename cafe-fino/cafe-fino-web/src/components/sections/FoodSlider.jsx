import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const sliderItems = [
  {
    id: 'brino-avocat',
    titleKey: 'slider.items.brino-avocat.title',
    subtitleKey: 'slider.items.brino-avocat.subtitle',
    image: '/images/brino+avocadotoast.jpg',
  },
  {
    id: 'brino-viande',
    titleKey: 'slider.items.brino-viande.title',
    subtitleKey: 'slider.items.brino-viande.subtitle',
    image: '/images/brinoviandehachee.jpg',
  },
  {
    id: 'brioche-fraise-chocolat',
    titleKey: 'slider.items.brioche-fraise-chocolat.title',
    subtitleKey: 'slider.items.brioche-fraise-chocolat.subtitle',
    image: '/images/briochefraiseetchocolat.jpg',
  },
  {
    id: 'latte-art',
    titleKey: 'slider.items.latte-art.title',
    subtitleKey: 'slider.items.latte-art.subtitle',
    image: '/images/cafefino-coffeecup-latteart.jpg',
  },
  {
    id: 'cafefino-exterieur',
    titleKey: 'slider.items.cafefino-exterieur.title',
    subtitleKey: 'slider.items.cafefino-exterieur.subtitle',
    image: '/images/cafefinoexterieur.jpg',
  },
  {
    id: 'service-barista',
    titleKey: 'slider.items.service-barista.title',
    subtitleKey: 'slider.items.service-barista.subtitle',
    image: '/images/coffee-inside-serving.jpg',
  },
  {
    id: 'croissant-oeufs-1',
    titleKey: 'slider.items.croissant-oeufs-1.title',
    subtitleKey: 'slider.items.croissant-oeufs-1.subtitle',
    image: '/images/croissanteggs3.jpg',
  },
  {
    id: 'croissant-brouilles',
    titleKey: 'slider.items.croissant-brouilles.title',
    subtitleKey: 'slider.items.croissant-brouilles.subtitle',
    image: '/images/croissant-oeufs-brouiles.jpg',
  },
  {
    id: 'croissant-brouilles-2',
    titleKey: 'slider.items.croissant-brouilles-2.title',
    subtitleKey: 'slider.items.croissant-brouilles-2.subtitle',
    image: '/images/croissant-oeufs-brouilles2.jpg',
  },
  {
    id: 'brunch-deux',
    titleKey: 'slider.items.brunch-deux.title',
    subtitleKey: 'slider.items.brunch-deux.subtitle',
    image: '/images/fullservingfor2person.jpg',
  },
  {
    id: 'table-famille',
    titleKey: 'slider.items.table-famille.title',
    subtitleKey: 'slider.items.table-famille.subtitle',
    image: '/images/fullservingformultiplepeope.jpg',
  },
  {
    id: 'duo-granola-avocat',
    titleKey: 'slider.items.duo-granola-avocat.title',
    subtitleKey: 'slider.items.duo-granola-avocat.subtitle',
    image: '/images/granola+avocadotoast.jpg',
  },
  {
    id: 'granola-fruits',
    titleKey: 'slider.items.granola-fruits.title',
    subtitleKey: 'slider.items.granola-fruits.subtitle',
    image: '/images/granolafruits.jpg',
  },
  {
    id: 'trio-avocat',
    titleKey: 'slider.items.trio-avocat.title',
    subtitleKey: 'slider.items.trio-avocat.subtitle',
    image: '/images/multipleavocadotoast.jpg',
  },
  {
    id: 'oeuf-hollandaise',
    titleKey: 'slider.items.oeuf-hollandaise.title',
    subtitleKey: 'slider.items.oeuf-hollandaise.subtitle',
    image: '/images/oeufmollethollandaise.jpg',
  },
  {
    id: 'cappuccino',
    titleKey: 'slider.items.cappuccino.title',
    subtitleKey: 'slider.items.cappuccino.subtitle',
    image: '/images/official-coffee-picture1.png',
  },
  {
    id: 'interieur-1',
    titleKey: 'slider.items.interieur-1.title',
    subtitleKey: 'slider.items.interieur-1.subtitle',
    image: '/images/official-interior1.jpg',
  },
  {
    id: 'interieur-2',
    titleKey: 'slider.items.interieur-2.title',
    subtitleKey: 'slider.items.interieur-2.subtitle',
    image: '/images/official-interior2.jpg',
  },
  {
    id: 'instant-signature',
    titleKey: 'slider.items.instant-signature.title',
    subtitleKey: 'slider.items.instant-signature.subtitle',
    image: '/images/official-photos1.jpg',
  },
  {
    id: 'terrasse',
    titleKey: 'slider.items.terrasse.title',
    subtitleKey: 'slider.items.terrasse.subtitle',
    image: '/images/outsideofthecafe1.jpg',
  },
  {
    id: 'purple-latte',
    titleKey: 'slider.items.purple-latte.title',
    subtitleKey: 'slider.items.purple-latte.subtitle',
    image: '/images/purplelatte.jpg',
  },
  {
    id: 'avocado-simple',
    titleKey: 'slider.items.avocado-simple.title',
    subtitleKey: 'slider.items.avocado-simple.subtitle',
    image: '/images/simpleavocadotoast.jpg',
  },
  {
    id: 'croissant-smashe',
    titleKey: 'slider.items.croissant-smashe.title',
    subtitleKey: 'slider.items.croissant-smashe.subtitle',
    image: '/images/smashedcroissant.jpg',
  },
  {
    id: 'brino-original',
    titleKey: 'slider.items.brino-original.title',
    subtitleKey: 'slider.items.brino-original.subtitle',
    image: '/images/thebrino1.jpg',
  },
  {
    id: 'brino-gourmet',
    titleKey: 'slider.items.brino-gourmet.title',
    subtitleKey: 'slider.items.brino-gourmet.subtitle',
    image: '/images/thebrino2.jpg',
  },
  {
    id: 'saumon-legumes',
    titleKey: 'slider.items.saumon-legumes.title',
    subtitleKey: 'slider.items.saumon-legumes.subtitle',
    image: '/images/veggiesandsalmon.jpg',
  },
];

const AUTO_ADVANCE_DELAY = 4500;
const SLIDE_GAP = 24;

export default function FoodSlider() {
  const { t } = useTranslation();
  const items = sliderItems;
  const [index, setIndex] = useState(1);
  const [instant, setInstant] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const cardRef = useRef(null);

  const duplicatedItems = [items[items.length - 1], ...items, items[0]];
  const maxIndex = items.length + 1;

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        const width = cardRef.current.getBoundingClientRect().width;
        setSlideWidth(width);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, AUTO_ADVANCE_DELAY);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === maxIndex) {
      const timeout = setTimeout(() => {
        setInstant(true);
        setIndex(1);
      }, 650);
      return () => clearTimeout(timeout);
    }
    if (index === 0) {
      const timeout = setTimeout(() => {
        setInstant(true);
        setIndex(items.length);
      }, 650);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [index, items.length, maxIndex]);

  useEffect(() => {
    if (!instant) return undefined;
    const timeout = setTimeout(() => setInstant(false), 50);
    return () => clearTimeout(timeout);
  }, [instant]);

  const offset = slideWidth ? -(index * (slideWidth + SLIDE_GAP)) : 0;

  return (
    <section className="py-16 bg-cafe-cream overflow-hidden gsap-reveal">
      <div className="slider-container relative">
        <motion.div
          className="slider-row"
          animate={{ x: offset }}
          transition={
            instant
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
          }
        >
          {duplicatedItems.map((item, itemIndex) => (
            <SliderItem
              key={`${item.id}-${itemIndex}`}
              item={item}
              ref={itemIndex === 0 ? cardRef : null}
            />
          ))}
        </motion.div>

        <button
          type="button"
          aria-label={t('slider.previous')}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-cafe-cream/90 px-3 py-2 text-espresso-dark shadow-lg transition hover:bg-cafe-cream"
          onClick={() => setIndex((prev) => prev - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label={t('slider.next')}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-cafe-cream/90 px-3 py-2 text-espresso-dark shadow-lg transition hover:bg-cafe-cream"
          onClick={() => setIndex((prev) => prev + 1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}

const SliderItem = forwardRef(function SliderItem({ item }, ref) {
  const { t } = useTranslation();
  const title = t(item.titleKey);
  const subtitle = t(item.subtitleKey);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <a href="#menu" className="slider-item group" ref={ref}>
      {!isLoaded && <div className="absolute inset-0 skeleton" />}
      <img
        src={item.image}
        alt={title}
        className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
          isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        }`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
      <div className="slider-item-overlay">
        <div>
          <span className="slider-item-title">{title}</span>
          <span className="block text-xs text-ivory/80 mt-1 tracking-wide">
            {subtitle}
          </span>
        </div>
      </div>
    </a>
  );
});
