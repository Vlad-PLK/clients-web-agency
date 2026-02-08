import LoadingOverlay from './components/layout/LoadingOverlay';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import FoodSlider from './components/sections/FoodSlider';
import About from './components/sections/About';
import Menu from './components/sections/Menu';
import Locations from './components/sections/Locations';
import InstagramFeed from './components/sections/InstagramFeed';

function App() {
  return (
    <>
      <LoadingOverlay />
      <Navbar />
      
      <main>
        <Hero />
        <FoodSlider />
        <About />
        <Menu />
        <Locations />
        <InstagramFeed />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
