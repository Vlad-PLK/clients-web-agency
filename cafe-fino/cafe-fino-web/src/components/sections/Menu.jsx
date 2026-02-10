import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import menuData from '../../data/menu.json';
import useCartStore from '../../store/useCartStore';
import { useToast } from '../ui/Toast';

const dietaryFilters = ['vegetarian', 'vegan', 'gluten-free'];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('brunch');
  const [activeFilters, setActiveFilters] = useState([]);
  const addItem = useCartStore((state) => state.addItem);
  const { addToast } = useToast();
  const ref = useRef(null);
  // Scroll reveal: fade + rise when section enters viewport.
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  const filteredItems = useMemo(() => {
    return menuData.items.filter((item) => {
      if (item.category !== activeCategory) return false;
      if (activeFilters.length === 0) return true;
      return activeFilters.every((filter) => item.dietary?.includes(filter));
    });
  }, [activeCategory, activeFilters]);

  const toggleFilter = (filterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((item) => item !== filterId)
        : [...prev, filterId]
    );
  };

  const brunchIncludes = t('menu.brunch.includes', { returnObjects: true });
  const resolvedBrunchIncludes = Array.isArray(brunchIncludes)
    ? brunchIncludes
    : menuData.brunch.includes;

  return (
    <section id="menu" className="py-24 px-6 bg-cafe-cream gsap-reveal" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">{t('menu.title')}</h2>
          <p className="text-ash-grey max-w-2xl mx-auto">
            {t('menu.subtitle')}
          </p>
        </motion.div>

        {/* Daily Specials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 grid md:grid-cols-3 gap-6"
        >
          {menuData.specials.map((special) => (
            <div
              key={special.id}
              className="rounded-2xl border border-espresso-dark/10 bg-cafe-cream/70 p-6 shadow-lg transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-2xl"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-crema-gold mb-2">
                {t('menu.dailySpecial')}
              </p>
              <h3 className="font-display text-xl text-deep-roast mb-2">
                {t(`menu.specials.${special.id}.name`, {
                  defaultValue: special.name,
                })}
              </h3>
              <p className="text-ash-grey text-sm mb-4">
                {t(`menu.specials.${special.id}.description`, {
                  defaultValue: special.description,
                })}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-crema-gold">
                  {special.price.toFixed(2)}€
                </span>
                <button
                  type="button"
                  onClick={() => {
                    addItem(special);
                    addToast(
                      t('toast.added', {
                        defaultValue: 'Added to order',
                      })
                    );
                  }}
                  className="text-sm font-semibold text-espresso-dark hover:text-crema-gold transition-colors"
                >
                  {t('menu.add')}
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {menuData.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === category.id
                  ? 'bg-deep-roast text-ivory border-espresso-dark'
                  : 'bg-cafe-cream/70 text-deep-roast border-espresso-dark/10 hover:border-crema-gold hover:text-crema-gold'
              }`}
            >
              {t(`menu.categories.${category.id}`, {
                defaultValue: category.name,
              })}
            </button>
          ))}
        </motion.div>

        {/* Dietary Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {dietaryFilters.map((filterId) => (
            <button
              key={filterId}
              onClick={() => toggleFilter(filterId)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                activeFilters.includes(filterId)
                  ? 'bg-crema-gold/20 text-espresso-dark border-crema-gold'
                  : 'bg-cafe-cream/70 text-ash-grey border-espresso-dark/10 hover:border-crema-gold hover:text-espresso-dark'
              }`}
            >
              {t(`menu.filters.${filterId}`)}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          key={`${activeCategory}-${activeFilters.join('-')}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              index={index}
              t={t}
              addToast={addToast}
            />
          ))}
        </motion.div>

        {/* Sunday Brunch Promo */}
        {activeCategory === 'brunch' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-cafe-cream/70 border border-espresso-dark/10 rounded-2xl p-8 text-center"
          >
            <h3 className="font-display text-2xl text-deep-roast mb-4">
              {t('menu.brunch.title')} — {menuData.brunch.price}€
            </h3>
            <p className="text-ash-grey mb-4">{t('menu.brunch.description')}</p>
            <ul className="text-sm text-deep-roast space-y-1">
              {resolvedBrunchIncludes.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/**
 * Menu grid card.
 * @param {Object} props
 * @param {Object} props.item - Menu item data.
 * @param {number} props.index - Card index for staggered animation.
 * @param {(key: string, options?: Object) => string} props.t - i18n translate fn.
 * @param {(message: string) => void} props.addToast - Toast trigger.
 */
function MenuCard({ item, index, t, addToast }) {
  const addItem = useCartStore((state) => state.addItem);
  const itemName = t(`menu.items.${item.id}.name`, {
    defaultValue: item.name,
  });
  const placeholder = `https://placehold.co/400x300/F5EDE2/2B2B2B?text=${encodeURIComponent(
    itemName
  )}`;
  const images = item.images?.length
    ? item.images
    : item.image
      ? [item.image]
      : [placeholder];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isHovered || images.length <= 1) {
      setActiveIndex(0);
      return;
    }

    // Hover microinteraction: cycle images while hovered.
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  useEffect(() => {
    setIsLoaded(false);
  }, [activeIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="menu-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {!isLoaded && <div className="absolute inset-0 skeleton" />}
        <AnimatePresence mode="wait">
          <motion.img
            key={`${item.id}-${activeIndex}`}
            src={images[activeIndex]}
            alt={itemName}
            className={`menu-card-image transition-all duration-300 group-hover:scale-105 ${
              isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.2 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        {item.tags?.includes('signature') && (
          <span className="absolute top-3 right-3 bg-deep-roast text-ivory text-xs px-2 py-1 rounded uppercase tracking-wider">
            {t('menu.signature')}
          </span>
        )}
        {item.dietary?.includes('vegan') && (
          <span className="absolute top-3 left-3 bg-crema-gold/90 text-espresso-dark text-xs px-2 py-1 rounded uppercase tracking-wider">
            {t('menu.vegan')}
          </span>
        )}
      </div>
      <div className="menu-card-content">
        <h4 className="menu-card-title group-hover:text-crema-gold transition-colors duration-200">
          {itemName}
        </h4>
        <span className="menu-card-underline group-hover:w-full origin-left" />
        <p className="menu-card-description">
          {t(`menu.items.${item.id}.description`, {
            defaultValue: item.description,
          })}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {item.dietary?.map((diet) => (
            <span
              key={diet}
              className="tag-chip bg-cafe-cream border border-espresso-dark/10 text-espresso-dark"
            >
              {t(`menu.dietary.${diet}`, { defaultValue: diet })}
            </span>
          ))}
        </div>
        {item.allergens?.length > 0 && (
          <p className="text-[11px] text-ash-grey/80 mb-3">
            {t('menu.allergensLabel')}: {' '}
            {item.allergens
              .map((allergen) =>
                t(`menu.allergens.${allergen}`, { defaultValue: allergen })
              )
              .join(', ')}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="menu-card-price">{item.price.toFixed(2)}€</span>
          <button
            type="button"
            onClick={() => {
              addItem(item);
              addToast(
                t('toast.added', {
                  defaultValue: 'Added to order',
                })
              );
            }}
            className="text-xs uppercase tracking-wider font-semibold text-espresso-dark hover:text-crema-gold transition-colors"
          >
            {t('menu.add')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
