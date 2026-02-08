import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
import config from '../../data/config.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl mb-4">Café Fino</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {config.brand.tagline}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Nice */}
          <div>
            <h4 className="font-display text-lg mb-4">Nice</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>
                  {config.locations.nice.address}<br />
                  {config.locations.nice.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:${config.locations.nice.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                  {config.locations.nice.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Paris */}
          <div>
            <h4 className="font-display text-lg mb-4">Paris</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>
                  {config.locations.paris.address}<br />
                  {config.locations.paris.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:${config.locations.paris.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                  {config.locations.paris.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:contact@cafe-fino.fr" className="hover:text-white transition-colors">
                  contact@cafe-fino.fr
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram size={16} />
                <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {config.social.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} Café Fino. Tous droits réservés.
          </p>
          <p className="text-white/50 text-sm">
            Site réalisé par{' '}
            <a
              href="https://mysmarttech.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta hover:text-white transition-colors"
            >
              MySmartTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
