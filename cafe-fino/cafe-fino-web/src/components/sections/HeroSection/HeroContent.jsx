import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './HeroSection.module.css';
import { buildContentVariants } from './heroAnimations';

/**
 * Hero heading only (positioned below logo image).
 * @param {Object} props
 * @param {Object} props.timings
 * @param {boolean} props.animationComplete
 */
export default function HeroContent({ timings, animationComplete }) {
  const contentVariants = buildContentVariants(timings);
  const { t } = useTranslation();

  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-0 px-6 text-center"
      initial="initial"
      animate="animate"
      variants={contentVariants}
    >
      {/* Spacer for logo image (positioned above heading) */}
      <div className="h-[200px] sm:h-[220px] md:h-[240px]" />

      {/* Heading positioned below logo */}
      <h2
        className="font-display text-lg sm:text-xl lg:text-3xl tracking-[0.04em] text-center max-w-3xl drop-shadow-md"
        style={{ color: '#1a1410' }}
      >
        {t('hero.tagline')}
      </h2>
    </motion.div>
  );
}

