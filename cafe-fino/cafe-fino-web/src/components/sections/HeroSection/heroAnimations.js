/**
 * Hero animation timing utilities and Framer Motion variants.
 */

export const HERO_BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
};

/**
 * Get timing values based on viewport.
 * @param {Object} params
 * @param {boolean} params.isMobile
 * @param {boolean} params.isTablet
 */
export const getHeroTimings = ({ isMobile, isTablet }) => {
  if (isMobile) {
    return {
      cascade: 0.4,
      compression: 0.6,
      logo: 0.7,
      content: 0.5,
      stabilize: 0.3,
      total: 2.5,
    };
  }

  if (isTablet) {
    return {
      cascade: 0.5,
      compression: 0.7,
      logo: 0.75,
      content: 0.55,
      stabilize: 0.25,
      total: 2.75,
    };
  }

  return {
    cascade: 0.6,
    compression: 0.8,
    logo: 0.6,
    content: 0.5,
    stabilize: 0.5,
    total: 3.0,
  };
};

/**
 * Build image cascade variants using timing data.
 * Left-to-right sweep animation with 3-keyframe approach.
 * @param {Object} timings
 */
export const buildImageVariants = (timings) => {
  const total = timings.cascade + timings.compression;

  return {
    initial: (custom = {}) => ({
      opacity: 0,
      scale: 0.85,
      x: custom.offset?.x ?? -300,
      y: 0,
      rotate: custom.rotate ?? 0,
      filter: 'blur(0px)',
    }),
    animate: (custom = {}) => ({
      opacity: [0, custom.opacity * 0.7, custom.opacity],
      scale: [0.85, 0.95, 0.92],
      x: [custom.offset?.x ?? -300, (custom.offset?.x ?? -300) * 0.3, 0],
      y: [0, 0, 0],
      rotate: [custom.rotate ?? 0, (custom.rotate ?? 0) * 0.5, 0],
      filter: [
        'blur(0px)',
        `blur(${(custom.blurTo ?? 0) * 0.4}px)`,
        `blur(${custom.blurTo ?? 0}px)`,
      ],
      transition: {
        duration: total,
        times: [0, 0.5, 1],
        ease: 'easeInOut',
        delay: custom.delay ?? 0,
      },
    }),
  };
};

/**
 * Variants for the logo reveal.
 * @param {Object} timings
 */
export const buildLogoVariants = (timings) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: timings.cascade + timings.compression,
      duration: timings.logo,
      ease: 'easeOut',
    },
  },
});

/**
 * Variants for the hero content (headline + CTAs).
 * @param {Object} timings
 */
export const buildContentVariants = (timings) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: timings.cascade + timings.compression + timings.logo,
      duration: timings.content,
      ease: 'easeOut',
    },
  },
});
