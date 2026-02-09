import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const INTRO_KEY = 'cafefino-intro-played';
const INTRO_DURATION = 2600;

export default function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [canScroll, setCanScroll] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem(INTRO_KEY);
    if (hasPlayed) {
      setIsVisible(false);
      setCanScroll(true);
      return;
    }

    setIsVisible(true);
    setCanScroll(false);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setCanScroll(true);
      sessionStorage.setItem(INTRO_KEY, 'true');
    }, INTRO_DURATION);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-cream"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/90 to-cream" />
            <div className="absolute top-20 left-16 w-20 h-20 rounded-full bg-warm-gold/20 blur-2xl animate-pulse" />
            <div className="absolute bottom-24 right-20 w-24 h-24 rounded-full bg-espresso/10 blur-2xl animate-pulse" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative flex flex-col items-center text-center px-6"
          >
            <div className="relative mb-6">
              <div className="steam">
                <span />
                <span />
                <span />
              </div>
              <motion.img
                src="/images/logoCafeFino.jpg"
                alt="Café Fino"
                className="w-44 sm:w-52 md:w-64 lg:w-72 h-auto drop-shadow-xl"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-accent text-lg md:text-xl text-mocha italic"
            >
              {t('intro.tagline')}
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 h-px w-28 origin-left bg-warm-gold/60"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
