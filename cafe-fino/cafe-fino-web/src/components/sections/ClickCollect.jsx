import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import menuData from '../../data/menu.json';
import config from '../../data/config.json';
import useCartStore from '../../store/useCartStore';

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
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore((state) => state.subtotal());
  const { t } = useTranslation();

  const filteredItems = menuData.items.filter(
    (item) => item.category === activeCategory
  );

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <section id="click-collect" className="py-24 px-6 bg-cream/90 gsap-reveal">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-warm-gold mb-3">
            {t('clickCollect.badge')}
          </p>
          <h2 className="font-display text-4xl md:text-section text-charcoal mb-4">
            {t('clickCollect.title')}
          </h2>
          <p className="text-mocha max-w-2xl mx-auto">
            {t('clickCollect.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12">
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {menuData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-espresso text-cream border-espresso'
                      : 'bg-cream/70 text-mocha border-espresso/10 hover:border-warm-gold hover:text-espresso'
                  }`}
                >
                  {t(`menu.categories.${category.id}`, {
                    defaultValue: category.name,
                  })}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {filteredItems.map((item) => {
                const itemName = t(`menu.items.${item.id}.name`, {
                  defaultValue: item.name,
                });

                return (
                  <div key={item.id} className="menu-card group">
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          item.image ||
                          `https://placehold.co/400x300/F5EDE2/2B2B2B?text=${encodeURIComponent(
                            itemName
                          )}`
                        }
                        alt={itemName}
                        className="menu-card-image transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      {item.tags?.includes('signature') && (
                        <span className="absolute top-3 right-3 bg-espresso text-cream text-xs px-2 py-1 rounded uppercase tracking-wider">
                          {t('menu.signature')}
                        </span>
                      )}
                    </div>
                    <div className="menu-card-content">
                      <h3 className="menu-card-title">{itemName}</h3>
                      <p className="menu-card-description">
                        {t(`menu.items.${item.id}.description`, {
                          defaultValue: item.description,
                        })}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="menu-card-price">
                          {item.price.toFixed(2)}€
                        </span>
                        <button
                          type="button"
                          onClick={() => addItem(item)}
                          className="text-xs uppercase tracking-wider font-semibold text-espresso hover:text-warm-gold transition-colors"
                        >
                          {t('menu.add')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-espresso/10 bg-cream/80 p-6 shadow-lg">
              <h3 className="font-display text-xl text-charcoal mb-4">
                {t('clickCollect.cartTitle')}
              </h3>
              {items.length === 0 ? (
                <p className="text-mocha text-sm">
                  {t('clickCollect.cartEmpty')}
                </p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-charcoal">
                          {t(`menu.items.${item.id}.name`, {
                            defaultValue: item.name,
                          })}
                        </p>
                        <p className="text-xs text-mocha">
                          {item.price.toFixed(2)}€
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-espresso/20 text-espresso hover:border-warm-gold"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full border border-espresso/20 text-espresso hover:border-warm-gold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="border-t border-espresso/10 mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-mocha">
                  <span>{t('clickCollect.subtotal')}</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-mocha">
                  <span>{t('clickCollect.tax')}</span>
                  <span>{tax.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between font-semibold text-charcoal text-base">
                  <span>{t('clickCollect.total')}</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-espresso/10 bg-cream/80 p-6 shadow-lg">
              <h3 className="font-display text-xl text-charcoal mb-4">
                {t('clickCollect.slotTitle')}
              </h3>
              <label className="text-xs uppercase tracking-wider text-mocha">
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
                        ? 'bg-espresso text-cream border-espresso'
                        : 'bg-cream/70 text-mocha border-espresso/10 hover:border-warm-gold'
                    }`}
                  >
                    {t(`locations.shortName.${key}`, { defaultValue: key })}
                  </button>
                ))}
              </div>
              <label className="text-xs uppercase tracking-wider text-mocha">
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
                        ? 'bg-warm-gold/20 text-espresso border-warm-gold'
                        : 'bg-cream/70 text-mocha border-espresso/10 hover:border-warm-gold'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <p className="text-xs text-mocha mt-4">
                {t('clickCollect.pickupAt', {
                  address: config.locations[pickupLocation].address,
                  city: config.locations[pickupLocation].city,
                })}
              </p>
            </div>

            <div className="rounded-2xl border border-espresso/10 bg-cream/80 p-6 shadow-lg">
              <h3 className="font-display text-xl text-charcoal mb-4">
                {t('clickCollect.checkoutTitle')}
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={t('clickCollect.namePlaceholder')}
                  className="w-full rounded-lg border border-espresso/10 bg-cream/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-warm-gold"
                />
                <input
                  type="email"
                  placeholder={t('clickCollect.emailPlaceholder')}
                  className="w-full rounded-lg border border-espresso/10 bg-cream/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-warm-gold"
                />
                <input
                  type="tel"
                  placeholder={t('clickCollect.phonePlaceholder')}
                  className="w-full rounded-lg border border-espresso/10 bg-cream/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-warm-gold"
                />
                <textarea
                  rows={3}
                  placeholder={t('clickCollect.notePlaceholder')}
                  className="w-full rounded-lg border border-espresso/10 bg-cream/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-warm-gold"
                />
              </div>
              <button type="button" className="btn-primary w-full mt-4">
                {t('clickCollect.confirm')}
              </button>
              <p className="text-xs text-mocha mt-3">
                {t('clickCollect.paymentNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
