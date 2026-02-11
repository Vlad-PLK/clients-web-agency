import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import config from '../../data/config.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-deep-roast text-ivory py-16 px-6" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl mb-4">{t('brand.name')}</h3>
            <p className="text-ivory/70 text-sm leading-relaxed">
              {t('brand.tagline')}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cafe-cream/10 rounded-full flex items-center justify-center hover:bg-crema-gold/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Nice */}
          <div>
            <h4 className="font-display text-lg mb-4">{t('locations.shortName.nice')}</h4>
            <div className="space-y-3 text-sm text-ivory/70">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>
                  {config.locations.nice.address}<br />
                  {config.locations.nice.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:${config.locations.nice.phone.replace(/\s/g, '')}`} className="hover:text-ivory transition-colors">
                  {config.locations.nice.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Paris */}
          <div>
            <h4 className="font-display text-lg mb-4">{t('locations.shortName.paris')}</h4>
            <div className="space-y-3 text-sm text-ivory/70">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>
                  {config.locations.paris.address}<br />
                  {config.locations.paris.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:${config.locations.paris.phone.replace(/\s/g, '')}`} className="hover:text-ivory transition-colors">
                  {config.locations.paris.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4">{t('footer.contact')}</h4>
            <div className="space-y-3 text-sm text-ivory/70">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:contact@cafe-fino.fr" className="hover:text-ivory transition-colors">
                  contact@cafe-fino.fr
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram size={16} />
                <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ivory transition-colors">
                  {config.social.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ivory/50 text-sm">
            © {currentYear} Café Fino. {t('footer.rights')}
          </p>
          <p className="text-ivory/50 text-sm">
            {t('footer.credit')}{' '}
            <a
              href="https://mysmarttech.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crema-gold hover:text-ivory transition-colors"
            >
              MySmartTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
