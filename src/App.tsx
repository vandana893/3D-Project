import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import Industries from './components/Industries';
import Innovation from './components/Innovation';
import Projects from './components/Projects';
import Sustainability from './components/Sustainability';
// import Careers from './components/Careers';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ScrollTrigger will need refresh once loader finishes and elements display
    if (!loading) {
      ScrollTrigger.refresh();
    }
  }, [loading]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  useEffect(() => {
    let activeCard: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth) * 100;
      const yPct = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mx', `${xPct}%`);
      document.documentElement.style.setProperty('--my', `${yPct}%`);

      const card = (e.target as HTMLElement).closest('.glass-panel') as HTMLElement;
      
      if (activeCard && activeCard !== card) {
        resetCard(activeCard);
        activeCard = null;
      }

      if (card) {
        activeCard = card;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.setProperty('--rx', `${rotateX}deg`);
        card.style.setProperty('--ry', `${rotateY}deg`);
      }
    };

    const handleMouseLeave = () => {
      if (activeCard) {
        resetCard(activeCard);
        activeCard = null;
      }
    };

    const resetCard = (card: HTMLElement) => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {/* Ambient background */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />

      <Navbar />

      <main id="main-content" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Hero />
        <About />
        <Services />
        <Products />
        <Industries />
        <Innovation />
        <Projects />
        <Sustainability />
        {/* <Careers /> */}
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
