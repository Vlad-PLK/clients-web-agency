import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntroAnimation from './components/layout/IntroAnimation';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import FoodSlider from './components/sections/FoodSlider';
import About from './components/sections/About';
import Menu from './components/sections/Menu';
import ClickCollect from './components/sections/ClickCollect';
import Locations from './components/sections/Locations';
import InstagramFeed from './components/sections/InstagramFeed';

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
    <>
      <IntroAnimation />
      <Navbar />
      
      <main>
        <Hero />
        <FoodSlider />
        <About />
        <Menu />
        <ClickCollect />
        <Locations />
        <InstagramFeed />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
