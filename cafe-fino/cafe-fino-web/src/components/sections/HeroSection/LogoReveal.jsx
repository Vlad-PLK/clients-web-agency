import { motion } from 'framer-motion';
import { buildLogoVariants } from './heroAnimations';

/**
 * Centered Café Fino logo image reveal.
 * @param {Object} props
 * @param {Object} props.timings
 */
export default function LogoReveal({ timings }) {
  const logoVariants = buildLogoVariants(timings);

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
      initial="initial"
      animate="animate"
      variants={logoVariants}
    >
      <img
        src="/images/logoCafeFino.jpg"
        alt="Café Fino Logo"
        className="h-auto w-auto max-h-[150px] max-w-[250px] sm:max-h-[180px] sm:max-w-[280px] md:max-h-[200px] md:max-w-[300px] object-contain"
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(26, 20, 16, 0.15))',
        }}
      />
    </motion.div>
  );
}
