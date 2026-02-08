import { motion } from 'framer-motion';
import menu from '../../data/menu.json';

export default function FoodSlider() {
  // Get featured items for the slider
  const featuredItems = menu.items.filter(item => item.featured);
  
  // Split into rows for alternating scroll directions
  const row1 = featuredItems.slice(0, Math.ceil(featuredItems.length / 2));
  const row2 = featuredItems.slice(Math.ceil(featuredItems.length / 2));

  // Duplicate items for infinite scroll effect
  const row1Items = [...row1, ...row1, ...row1];
  const row2Items = [...row2, ...row2, ...row2];

  return (
    <section className="py-16 bg-cream overflow-hidden">
      {/* Row 1 - Scroll Left */}
      <div className="slider-container mb-6">
        <motion.div
          className="slider-row animate-slide-left"
          style={{ animationDuration: '40s' }}
        >
          {row1Items.map((item, index) => (
            <SliderItem key={`row1-${item.id}-${index}`} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Scroll Right */}
      <div className="slider-container">
        <motion.div
          className="slider-row animate-slide-right"
          style={{ animationDuration: '35s' }}
        >
          {row2Items.map((item, index) => (
            <SliderItem key={`row2-${item.id}-${index}`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SliderItem({ item }) {
  // Use placeholder image if no image provided
  const imageUrl = item.image || `https://placehold.co/256x256/F5E6E0/2D2D2D?text=${encodeURIComponent(item.name)}`;

  return (
    <a href="#menu" className="slider-item group">
      <img
        src={imageUrl}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="slider-item-overlay">
        <div>
          <span className="slider-item-title">{item.name}</span>
          {item.tags?.includes('signature') && (
            <span className="block text-xs text-terracotta mt-1 uppercase tracking-wider">
              Signature
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
