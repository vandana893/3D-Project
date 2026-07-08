import React, { useEffect, useRef } from 'react';
import HeroCanvas from './HeroCanvas';
import gsap from 'gsap';
import windVideo from '../assets/w.mp4';

const Hero: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.children;
      gsap.fromTo(elements, 
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.5 }
      );
    }

    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Video playback blocked, retrying muted autoplay', error);
          videoRef.current?.play();
        });
      }
    }
  }, []);

  return (
    <section className="section hero-section" id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '120px', paddingBottom: '80px' }}>
      <video ref={videoRef} className="hero-video-background" autoPlay muted loop playsInline preload="auto">
        <source src={windVideo} type="video/mp4" />
      </video>
      <div className="hero-video-overlay" />
      <HeroCanvas />
      
      <div className="container content-overlay" style={{ pointerEvents: 'none', zIndex: 10 }}>
        <div ref={contentRef} style={{ maxWidth: '900px', pointerEvents: 'auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-accent-1)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '2rem', textTransform: 'uppercase', backdropFilter: 'blur(10px)', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
            Next Generation Power Systems
          </div>
          <h1 className="hero-heading" style={{ marginBottom: '2rem', maxWidth: '780px', lineHeight: '1.05' }}>
            Powering the Future with <br/>
            <span className="text-gradient">Intelligent Electrical Innovation</span>
          </h1>
          <p className="text-lg" style={{ marginBottom: '3rem', maxWidth: '700px' }}>
            Delivering next-generation electrical infrastructure, automation, renewable energy, and smart power solutions for industries worldwide.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">
              <span>Explore Solutions</span>
            </button>
            <button className="btn glass-panel" style={{ color: 'var(--color-fg)' }}>
              <span>Discover Projects</span>
            </button>
          </div>
          
          <div className="glass-panel" style={{ display: 'inline-flex', gap: '4rem', marginTop: '3.5rem', padding: '2rem 3rem', transformStyle: 'preserve-3d' }}>
            <div style={{ transform: 'translateZ(25px)' }}>
              <div className="h3 text-gradient">500+</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.6, marginTop: '0.5rem' }}>Projects Delivered</div>
            </div>
            <div style={{ transform: 'translateZ(25px)' }}>
              <div className="h3 text-gradient">120</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.6, marginTop: '0.5rem' }}>Global Markets</div>
            </div>
            <div style={{ transform: 'translateZ(25px)' }}>
              <div className="h3 text-gradient">1.2GW</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.6, marginTop: '0.5rem' }}>Renewable Energy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
