import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import menuData from '../../data/menu.json';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('brunch');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredItems = menuData.items.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section id="menu" className="py-24 px-6 bg-cream" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">La Carte</h2>
          <p className="text-warm-gray max-w-2xl mx-auto">
            Des plats frais et de saison, préparés avec passion chaque jour.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {menuData.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-terracotta text-white'
                  : 'bg-powder-pink text-charcoal hover:bg-terracotta/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        {/* Sunday Brunch Promo */}
        {activeCategory === 'brunch' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-powder-pink rounded-2xl p-8 text-center"
          >
            <h3 className="font-display text-2xl text-charcoal mb-4">
              {menuData.brunch.name} — {menuData.brunch.price}€
            </h3>
            <p className="text-warm-gray mb-4">{menuData.brunch.description}</p>
            <ul className="text-sm text-charcoal space-y-1">
              {menuData.brunch.includes.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function MenuCard({ item, index }) {
  const imageUrl = item.image || `https://placehold.co/400x300/F5E6E0/2D2D2D?text=${encodeURIComponent(item.name)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="menu-card"
    >
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={item.name}
          className="menu-card-image"
          loading="lazy"
        />
        {item.tags?.includes('signature') && (
          <span className="absolute top-3 right-3 bg-terracotta text-white text-xs px-2 py-1 rounded uppercase tracking-wider">
            Signature
          </span>
        )}
        {item.tags?.includes('vegetarian') && (
          <span className="absolute top-3 left-3 bg-sage text-charcoal text-xs px-2 py-1 rounded uppercase tracking-wider">
            Végé
          </span>
        )}
      </div>
      <div className="menu-card-content">
        <h4 className="menu-card-title">{item.name}</h4>
        <p className="menu-card-description">{item.description}</p>
        <span className="menu-card-price">{item.price.toFixed(2)}€</span>
      </div>
    </motion.div>
  );
}
