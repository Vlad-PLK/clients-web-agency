import { useEffect, useMemo, useState } from 'react';
import { HERO_BREAKPOINTS, getHeroTimings } from '../components/sections/HeroSection/heroAnimations';

/**
 * Tracks responsive state for the hero animation and exposes timing values.
 */
export default function useHeroAnimation() {
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : HERO_BREAKPOINTS.tablet
  );
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth < HERO_BREAKPOINTS.mobile;
  const isTablet = viewportWidth >= HERO_BREAKPOINTS.mobile && viewportWidth < HERO_BREAKPOINTS.tablet;

  const timings = useMemo(() => getHeroTimings({ isMobile, isTablet }), [isMobile, isTablet]);

  useEffect(() => {
    setAnimationComplete(false);
    const timeout = window.setTimeout(() => setAnimationComplete(true), timings.total * 1000);
    return () => window.clearTimeout(timeout);
  }, [timings.total]);

  return {
    isMobile,
    isTablet,
    animationComplete,
    timings,
  };
}
