import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

/**
 * Carousel-style image fade animation centered on screen.
 * Each image fades in at center, stays prominent, then fades to background as logo appears.
 * @param {Object} props
 * @param {boolean} props.isMobile
 * @param {boolean} props.isTablet
 * @param {Object} props.timings
 */
export default function ImageCascade({ isMobile, isTablet, timings }) {
  const images = [
    {
      key: 'coffee',
      src: '/images/official-coffee-picture1.png',
      alt: 'Café Fino coffee',
      peakOpacity: 0.95,
      finalOpacity: 0.25,
      blurFinal: 5,
      delay: 0,
      hideOnMobile: false,
    },
    {
      key: 'interior1',
      src: '/images/official-interior1.jpg',
      alt: 'Café Fino interior',
      peakOpacity: 0.92,
      finalOpacity: 0.2,
      blurFinal: 4,
      delay: 0.8,
      hideOnMobile: false,
    },
    {
      key: 'interior2',
      src: '/images/official-interior2.jpg',
      alt: 'Café Fino second interior',
      peakOpacity: 0.93,
      finalOpacity: 0.15,
      blurFinal: 6,
      delay: 1.6,
      hideOnMobile: false,
    },
    {
      key: 'photos',
      src: '/images/official-photos1.jpg',
      alt: 'Café Fino moments',
      peakOpacity: 0.90,
      finalOpacity: 0.3,
      blurFinal: 8,
      delay: 2.4,
      hideOnMobile: false,
    },
  ];

  const filteredImages = images.filter((image) => {
    if (isMobile) return true; // Show all images on mobile
    if (isTablet) return true;
    return true;
  });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* All images centered, fade in one-by-one */}
      {filteredImages.map((image) => (
        <motion.img
          key={image.key}
          src={image.src}
          alt={image.alt}
          initial={{
            opacity: 0,
            filter: 'blur(0px)',
          }}
          animate={{
            opacity: [0, image.peakOpacity, image.peakOpacity, image.finalOpacity],
            filter: [
              'blur(0px)',
              'blur(0px)',
              'blur(0px)',
              `blur(${image.blurFinal}px)`,
            ],
          }}
          transition={{
            opacity: {
              duration: 2.4,
              delay: image.delay,
              times: [0, 0.3, 0.7, 1],
              ease: 'easeInOut',
            },
            filter: {
              duration: 1.8,
              delay: image.delay + 0.6,
              times: [0, 0.7, 1],
              ease: 'easeInOut',
            },
          }}
          className={`${styles.heroImage} absolute left-1/2 top-1/2 w-[85vw] max-w-[600px] h-[75vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl object-cover`}
          style={{
            zIndex: filteredImages.length - filteredImages.indexOf(image),
          }}
          loading="eager"
        />
      ))}

      {/* Gradient overlay: fades in during logo reveal phase */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2.2,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-gradient-to-t from-cafe-cream/50 via-cafe-cream/20 to-transparent pointer-events-none"
      />
    </div>
  );
}
