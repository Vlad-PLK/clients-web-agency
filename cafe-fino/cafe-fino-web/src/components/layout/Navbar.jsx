import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#menu', label: t('nav.menu') },
    { href: '#click-collect', label: t('nav.clickCollect') },
    { href: '#about', label: t('nav.about') },
    { href: '#locations', label: t('nav.locations') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const activeLanguage = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('cafe-fino-lang', language);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-cream/95 backdrop-blur-sm shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Left Links - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, 2).map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Logo - Center */}
            <a href="#" className="flex items-center">
              <span className="font-display text-2xl sm:text-3xl md:text-4xl text-espresso tracking-[0.08em] drop-shadow-sm">
                Café Fino
              </span>
            </a>

            {/* Right Links + Language - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.slice(2).map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/70">
                <button
                  type="button"
                  onClick={() => handleLanguageChange('fr')}
                  className={`transition-colors ${
                    activeLanguage === 'fr'
                      ? 'text-espresso'
                      : 'text-charcoal/40 hover:text-espresso'
                  }`}
                >
                  FR
                </button>
                <span className="text-charcoal/30">|</span>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`transition-colors ${
                    activeLanguage === 'en'
                      ? 'text-espresso'
                      : 'text-charcoal/40 hover:text-espresso'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-charcoal"
              aria-label={t('nav.toggleMenu')}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-cream pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-2xl text-charcoal hover:text-warm-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/70">
                <button
                  type="button"
                  onClick={() => handleLanguageChange('fr')}
                  className={`transition-colors ${
                    activeLanguage === 'fr'
                      ? 'text-espresso'
                      : 'text-charcoal/40'
                  }`}
                >
                  FR
                </button>
                <span className="text-charcoal/30">|</span>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`transition-colors ${
                    activeLanguage === 'en'
                      ? 'text-espresso'
                      : 'text-charcoal/40'
                  }`}
                >
                  EN
                </button>
              </div>
              <div className="pt-6 border-t border-espresso/10">
                <a
                  href="https://www.instagram.com/cafefinofrance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-gold font-body font-medium"
                >
                  @cafefinofrance
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
