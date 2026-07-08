import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Cpu, Leaf, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: <Cpu size={24} />,
    title: 'Precision Engineering',
    desc: 'Deploying high-voltage substations, smart control systems, and customized electrical automation with zero margin for error.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Enterprise Reliability',
    desc: 'Securing mission-critical data centers and large-scale industrial plants with 24/7 power redundancy solutions.',
  },
  {
    icon: <Leaf size={24} />,
    title: 'Sustainable Energy',
    desc: 'Pioneering clean energy transition through solar farm grid connection and smart battery storage technologies.',
  },
  {
    icon: <Globe size={24} />,
    title: 'Global Delivery',
    desc: 'Operating across multiple continents with standardized excellence and local regulatory compliance.',
  },
];

export default function About() {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    if (cardContainerRef.current) {
      gsap.fromTo(
        cardContainerRef.current.children,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardContainerRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" className="section" style={{ zIndex: 10 }}>
      <div className="container">
        <div
          ref={titleRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3rem',
            marginBottom: '6rem',
            alignItems: 'start',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                borderRadius: '100px',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                color: 'var(--color-accent-1)',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              Who We Are
            </div>
            <h2 className="h2" style={{ color: 'var(--color-fg)' }}>
              Engineering the <span className="text-gradient">Power</span> Grid of Tomorrow
            </h2>
          </div>
          <div style={{ paddingTop: '2.5rem' }}>
            <p className="text-lg" style={{ marginBottom: '1.5rem', color: 'var(--color-fg)', fontWeight: 400 }}>
              LuminaPower is a premier global Electrical Engineering & Smart Energy company. We specialize in building and optimizing smart electrical grids, renewable energy, and automated control panels.
            </p>
            <p className="text-lg" style={{ fontSize: '1.05rem' }}>
              Working alongside Siemens, Tesla, and industrial giants, we deliver critical power transmission networks, intelligent battery storage systems, and advanced power distribution architectures. Our work guarantees high energy efficiency, maximum safety, and strict carbon reduction metrics.
            </p>
          </div>
        </div>

        <div
          ref={cardContainerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="glass-panel"
              style={{
                padding: '3rem 2rem',
                background: 'rgba(255, 255, 255, 0.55)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(14, 165, 233, 0.1)',
                  color: 'var(--color-accent-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  transform: 'translateZ(30px)',
                }}
              >
                {pillar.icon}
              </div>
              <h3
                className="h3"
                style={{
                  fontSize: '1.35rem',
                  marginBottom: '1rem',
                  color: 'var(--color-fg)',
                  transform: 'translateZ(25px)',
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  opacity: 0.7,
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  transform: 'translateZ(15px)',
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
