import { motion } from 'framer-motion';
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

  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-0 px-6 text-center"
      initial="initial"
      animate="animate"
      variants={contentVariants}
    >
      {/* Spacer for logo image (positioned above heading) */}
      <div className="h-[180px] sm:h-[200px] md:h-[220px]" />

      {/* Heading positioned below logo */}
      <h2
        className="font-display text-lg sm:text-xl lg:text-3xl tracking-[0.04em] text-center max-w-3xl drop-shadow-md"
        style={{ color: '#1a1410' }}
      >
        Cuisine de qualité & boissons créatives
      </h2>
    </motion.div>
  );
}

