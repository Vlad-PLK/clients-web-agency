import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../ui/Toast';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { addToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftLinks = [
    { href: '#menu', label: t('nav.menu') },
    { href: '#about', label: t('nav.about') },
  ];

  const rightLinks = [
    { href: '#click-collect', label: t('nav.clickCollect') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const tabletLinks = [
    { href: '#menu', label: t('nav.menu') },
    { href: '#click-collect', label: t('nav.clickCollect') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const mobileLinks = [
    ...leftLinks,
    { href: '#click-collect', label: t('nav.clickCollect') },
    { href: '#contact', label: t('nav.contact') },
    { href: '#locations', label: t('nav.locations') },
  ];

  const activeLanguage = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('cafe-fino-lang', language);
    addToast(
      t('toast.language', {
        defaultValue: 'Language updated',
      })
    );
  };

  const linkClasses =
    'text-ivory text-base font-body tracking-[0.08em] transition-colors duration-200 border-b-2 border-transparent pb-1 hover:text-crema-gold hover:border-crema-gold';

  const LanguageToggle = ({ className = '' }) => (
    <div className={`flex items-center gap-2 text-[14px] uppercase tracking-[0.2em] text-ash-grey ${className}`}>
      <button
        type="button"
        onClick={() => handleLanguageChange('fr')}
        className={`transition-colors ${
          activeLanguage === 'fr'
            ? 'text-crema-gold'
            : 'text-ash-grey hover:text-crema-gold'
        }`}
      >
        FR
      </button>
      <span className="text-ash-grey/50">|</span>
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`transition-colors ${
          activeLanguage === 'en'
            ? 'text-crema-gold'
            : 'text-ash-grey hover:text-crema-gold'
        }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <>
      <motion.nav
        id="main-navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`sticky top-0 z-[1000] bg-deep-roast transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_4px_12px_rgba(0,0,0,0.15)]' : ''
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-8 py-5">
          {/* Top Section - Language Toggle (Desktop/Tablet) */}
          <LanguageToggle className="hidden md:flex" />

          {/* Main Navigation */}
          <div className="flex w-full flex-col items-center gap-3">
            {/* Desktop Layout */}
            <div className="hidden w-full items-center justify-center gap-8 lg:flex">
              <div className="flex items-center gap-8">
                {leftLinks.map((link) => (
                  <a key={link.href} href={link.href} className={linkClasses}>
                    {link.label}
                  </a>
                ))}
              </div>

              <a href="#" className="px-8">
                <span className="font-display text-2xl md:text-3xl text-ivory tracking-[0.12em]">
                  Café Fino
                </span>
              </a>

              <div className="flex items-center gap-8">
                {rightLinks.map((link) => (
                  <a key={link.href} href={link.href} className={linkClasses}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Tablet Layout */}
            <div className="hidden w-full items-center justify-center gap-8 md:flex lg:hidden">
              <a href="#" className="px-6">
                <span className="font-display text-3xl text-ivory tracking-[0.12em]">
                  Café Fino
                </span>
              </a>
              <div className="flex items-center gap-8">
                {tabletLinks.map((link) => (
                  <a key={link.href} href={link.href} className={linkClasses}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="relative flex w-full flex-col items-center gap-3 md:hidden">
              <a href="#" className="w-full text-center">
                <span className="font-display text-2xl text-ivory tracking-[0.12em]">
                  Café Fino
                </span>
              </a>
              <LanguageToggle className="md:hidden" />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center text-ivory"
                aria-label={t('nav.toggleMenu')}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Bottom Section - Locations */}
          <a
            href="#locations"
            className="text-[14px] uppercase tracking-[0.2em] text-ash-grey transition-colors hover:text-crema-gold"
          >
            {t('nav.locations')}
          </a>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[900] flex items-center justify-center bg-deep-roast/95 px-6 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 text-center">
              {mobileLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-2xl text-ivory transition-colors hover:text-crema-gold"
                >
                  {link.label}
                </a>
              ))}
              <LanguageToggle className="pt-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
