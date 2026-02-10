import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [canScroll, setCanScroll] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!canScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [canScroll]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
        setCanScroll(true);
      }
    };

    const timer = setTimeout(() => {
      setIsVisible(false);
      setCanScroll(true);
    }, 3000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cafe-cream"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="relative mx-auto mb-10 w-20 h-20">
              <div className="steam">
                <span />
                <span />
                <span />
              </div>
              <div className="absolute inset-x-3 bottom-4 h-8 border-2 border-espresso-dark rounded-b-xl rounded-t-md bg-cafe-cream shadow-lg" />
              <div className="absolute right-1 top-7 w-4 h-4 border-2 border-espresso-dark rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-10 bg-crema-gold/50 rounded-full coffee-pour" />
            </div>
            <h1 className="font-display text-hero text-deep-roast mb-4">
              Café Fino
            </h1>
            <p className="font-accent text-xl text-ash-grey italic mb-12">
              {t('loading.tagline')}
            </p>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-crema-gold"
            >
              <svg 
                className="w-6 h-6 mx-auto"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
              <span className="text-sm font-body mt-2 block">{t('loading.scroll')}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
