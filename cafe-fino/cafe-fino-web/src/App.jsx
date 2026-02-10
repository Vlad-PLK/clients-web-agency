import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection/HeroSection';
import FoodSlider from './components/sections/FoodSlider';
import About from './components/sections/About';
import Menu from './components/sections/Menu';
import ClickCollect from './components/sections/ClickCollect';
import Locations from './components/sections/Locations';
import InstagramFeed from './components/sections/InstagramFeed';
import { ToastProvider } from './components/ui/Toast';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useGSAP(() => {
    gsap.utils.toArray('.gsap-reveal').forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    });
  }, []);

  return (
    <ToastProvider>
      <Navbar />

      <main>
        <HeroSection />
        <FoodSlider />
        <About />
        <Menu />
        <ClickCollect />
        <Locations />
        <InstagramFeed />
      </main>

      <Footer />
    </ToastProvider>
  );
}

export default App;
