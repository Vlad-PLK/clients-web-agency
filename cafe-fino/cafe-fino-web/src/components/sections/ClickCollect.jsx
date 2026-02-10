import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import menuData from '../../data/menu.json';
import config from '../../data/config.json';
import useCartStore from '../../store/useCartStore';
import { useToast } from '../ui/Toast';

const timeSlots = [
  '08:00',
  '08:30',
  '09:00',
  '10:30',
  '12:00',
  '12:30',
  '14:00',
  '16:30',
  '18:00',
];

export default function ClickCollect() {
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [selectedTime, setSelectedTime] = useState(timeSlots[2]);
  const [pickupLocation, setPickupLocation] = useState('nice');
  const ref = useRef(null);
  // Scroll reveal: gently lift section into view.
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore((state) => state.subtotal());
  const { addToast } = useToast();
  const { t } = useTranslation();

  const filteredItems = menuData.items.filter(
    (item) => item.category === activeCategory
  );

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <section id="click-collect" className="py-24 px-6 bg-cafe-cream/90 gsap-reveal" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-crema-gold mb-3">
            {t('clickCollect.badge')}
          </p>
          <h2 className="font-display text-4xl md:text-section text-deep-roast mb-4">
            {t('clickCollect.title')}
          </h2>
          <p className="text-ash-grey max-w-2xl mx-auto">
            {t('clickCollect.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-[1.6fr_1fr] gap-12"
        >
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {menuData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-deep-roast text-ivory border-espresso-dark'
                      : 'bg-cafe-cream/70 text-ash-grey border-espresso-dark/10 hover:border-crema-gold hover:text-espresso-dark'
                  }`}
                >
                  {t(`menu.categories.${category.id}`, {
                    defaultValue: category.name,
                  })}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <ClickCollectItemCard
                  key={item.id}
                  item={item}
                  t={t}
                  onAdd={() => {
                    addItem(item);
                    addToast(
                      t('toast.added', {
                        defaultValue: 'Added to order',
                      })
                    );
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-espresso-dark/10 bg-cafe-cream/80 p-6 shadow-lg">
              <h3 className="font-display text-xl text-deep-roast mb-4">
                {t('clickCollect.cartTitle')}
              </h3>
              {items.length === 0 ? (
                <p className="text-ash-grey text-sm">
                  {t('clickCollect.cartEmpty')}
                </p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-deep-roast">
                          {t(`menu.items.${item.id}.name`, {
                            defaultValue: item.name,
                          })}
                        </p>
                        <p className="text-xs text-ash-grey">
                          {item.price.toFixed(2)}€
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-espresso-dark/20 text-espresso-dark hover:border-crema-gold"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold text-deep-roast">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full border border-espresso-dark/20 text-espresso-dark hover:border-crema-gold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="border-t border-espresso-dark/10 mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-ash-grey">
                  <span>{t('clickCollect.subtotal')}</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-ash-grey">
                  <span>{t('clickCollect.tax')}</span>
                  <span>{tax.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between font-semibold text-deep-roast text-base">
                  <span>{t('clickCollect.total')}</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-espresso-dark/10 bg-cafe-cream/80 p-6 shadow-lg">
              <h3 className="font-display text-xl text-deep-roast mb-4">
                {t('clickCollect.slotTitle')}
              </h3>
              <label className="text-xs uppercase tracking-wider text-ash-grey">
                {t('clickCollect.pickupPoint')}
              </label>
              <div className="flex gap-2 mt-2 mb-4">
                {Object.keys(config.locations).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPickupLocation(key)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                      pickupLocation === key
                        ? 'bg-deep-roast text-ivory border-espresso-dark'
                        : 'bg-cafe-cream/70 text-ash-grey border-espresso-dark/10 hover:border-crema-gold'
                    }`}
                  >
                    {t(`locations.shortName.${key}`, { defaultValue: key })}
                  </button>
                ))}
              </div>
              <label className="text-xs uppercase tracking-wider text-ash-grey">
                {t('clickCollect.pickupSlot')}
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                      selectedTime === slot
                        ? 'bg-crema-gold/20 text-espresso-dark border-crema-gold'
                        : 'bg-cafe-cream/70 text-ash-grey border-espresso-dark/10 hover:border-crema-gold'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <p className="text-xs text-ash-grey mt-4">
                {t('clickCollect.pickupAt', {
                  address: config.locations[pickupLocation].address,
                  city: config.locations[pickupLocation].city,
                })}
              </p>
            </div>

            <div className="rounded-2xl border border-espresso-dark/10 bg-cafe-cream/80 p-6 shadow-lg">
              <h3 className="font-display text-xl text-deep-roast mb-4">
                {t('clickCollect.checkoutTitle')}
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={t('clickCollect.namePlaceholder')}
                  className="w-full rounded-lg border border-espresso-dark/10 bg-cafe-cream/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crema-gold"
                />
                <input
                  type="email"
                  placeholder={t('clickCollect.emailPlaceholder')}
                  className="w-full rounded-lg border border-espresso-dark/10 bg-cafe-cream/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crema-gold"
                />
                <input
                  type="tel"
                  placeholder={t('clickCollect.phonePlaceholder')}
                  className="w-full rounded-lg border border-espresso-dark/10 bg-cafe-cream/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crema-gold"
                />
                <textarea
                  rows={3}
                  placeholder={t('clickCollect.notePlaceholder')}
                  className="w-full rounded-lg border border-espresso-dark/10 bg-cafe-cream/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crema-gold"
                />
              </div>
              <button type="button" className="btn-primary w-full mt-4">
                {t('clickCollect.confirm')}
              </button>
              <p className="text-xs text-ash-grey mt-3">
                {t('clickCollect.paymentNote')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Click & Collect item card.
 * @param {Object} props
 * @param {Object} props.item - Menu item data.
 * @param {(key: string, options?: Object) => string} props.t - i18n translate fn.
 * @param {() => void} props.onAdd - Add-to-order handler.
 */
function ClickCollectItemCard({ item, t, onAdd }) {
  const itemName = t(`menu.items.${item.id}.name`, {
    defaultValue: item.name,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="menu-card group">
      <div className="relative overflow-hidden">
        {!isLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={
            item.image ||
            `https://placehold.co/400x300/F5EDE2/2B2B2B?text=${encodeURIComponent(
              itemName
            )}`
          }
          alt={itemName}
          className={`menu-card-image transition-all duration-300 group-hover:scale-105 ${
            isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
        {item.tags?.includes('signature') && (
          <span className="absolute top-3 right-3 bg-deep-roast text-ivory text-xs px-2 py-1 rounded uppercase tracking-wider">
            {t('menu.signature')}
          </span>
        )}
      </div>
      <div className="menu-card-content">
        <h3 className="menu-card-title group-hover:text-crema-gold transition-colors duration-200">
          {itemName}
        </h3>
        <span className="menu-card-underline group-hover:w-full origin-left" />
        <p className="menu-card-description">
          {t(`menu.items.${item.id}.description`, {
            defaultValue: item.description,
          })}
        </p>
        <div className="flex items-center justify-between">
          <span className="menu-card-price">{item.price.toFixed(2)}€</span>
          <button
            type="button"
            onClick={onAdd}
            className="text-xs uppercase tracking-wider font-semibold text-espresso-dark hover:text-crema-gold transition-colors"
          >
            {t('menu.add')}
          </button>
        </div>
      </div>
    </div>
  );
}
