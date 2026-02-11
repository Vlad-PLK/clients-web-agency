import ImageCascade from './ImageCascade';
import LogoReveal from './LogoReveal';
import HeroContent from './HeroContent';
import useHeroAnimation from '../../../hooks/useHeroAnimation';
import styles from './HeroSection.module.css';
import { useTranslation } from 'react-i18next';

/**
 * Full-screen hero section with integrated image cascade animation.
 */
export default function HeroSection() {
  const { t } = useTranslation();

  try {
    const { isMobile, isTablet, animationComplete, timings } = useHeroAnimation();

    const heightClasses = isMobile
      ? 'h-[60vh]'
      : isTablet
        ? 'h-[70vh]'
        : 'h-screen';

    return (
      <section
        id="hero"
        className={`${styles.heroSection} ${heightClasses} relative w-full bg-gradient-to-b from-cafe-cream to-ivory flex items-center justify-center overflow-hidden z-10`}
      >
        {/* Phase 1-2: Image cascade + compression */}
        <ImageCascade isMobile={isMobile} isTablet={isTablet} timings={timings} />

        {/* Phase 3: Logo reveal */}
        <LogoReveal timings={timings} />

        {/* Phase 4: Headline + CTA */}
        <HeroContent timings={timings} animationComplete={animationComplete} />
      </section>
    );
  } catch (error) {
    console.error('HeroSection Error:', error);
    return (
      <section className="h-screen w-full bg-cafe-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-deep-roast mb-4">{t('brand.name')}</h1>
          <p className="text-deep-roast/70">{error?.message || t('common.loading')}</p>
        </div>
      </section>
    );
  }
}
