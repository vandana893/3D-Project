import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Cpu, Sun, Factory, Wind, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  { title: 'Smart Grid Solutions', icon: <Zap size={28} />, desc: 'Intelligent power distribution and monitoring for modern infrastructure.' },
  { title: 'Industrial Automation', icon: <Cpu size={28} />, desc: 'Next-gen control systems for manufacturing and production facilities.' },
  { title: 'Solar Engineering', icon: <Sun size={28} />, desc: 'Utility-scale solar power plants and commercial energy harvesting.' },
  { title: 'Electrical Infrastructure', icon: <Factory size={28} />, desc: 'High-voltage substations and transmission networks.' },
  { title: 'Renewable Energy', icon: <Wind size={28} />, desc: 'Wind turbine integration and battery energy storage systems.' },
  { title: 'Power Distribution', icon: <Activity size={28} />, desc: 'Reliable and efficient energy routing for mission-critical operations.' },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(cardsRef.current,
        { y: 150, opacity: 0, rotateX: 15, scale: 0.9 },
        {
          y: 0, opacity: 1, rotateX: 0, scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section" style={{ zIndex: 10 }}>
      <div className="container">
        <div style={{ marginBottom: '6rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-accent-1)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Our Capabilities
          </div>
          <h2 className="h2" style={{ marginBottom: '1.5rem', color: 'var(--color-fg)', maxWidth: '800px' }}>
            Elevating global infrastructure through <span className="text-gradient">precision engineering</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {servicesData.map((service, index) => (
            <div
              key={index}
              ref={(el) => { if(el) cardsRef.current[index] = el; }}
              className="glass-panel"
              style={{
                padding: '3rem 2.5rem',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.4)'
              }}
            >
              <div style={{ 
                width: '64px', height: '64px', borderRadius: '20px', backgroundColor: 'var(--color-bg)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem',
                boxShadow: '0 10px 20px rgba(14, 165, 233, 0.1), inset 0 0 0 1px rgba(14, 165, 233, 0.2)',
                color: 'var(--color-accent-1)',
                transform: 'translateZ(40px)',
                transition: 'all 0.3s ease'
              }}>
                {service.icon}
              </div>
              <h3 className="h3" style={{ marginBottom: '1rem', transform: 'translateZ(30px)', color: 'var(--color-fg)' }}>
                {service.title}
              </h3>
              <p className="text-lg" style={{ transform: 'translateZ(20px)' }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
