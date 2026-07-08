import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industryData = [
  {
    title: 'Manufacturing',
    desc: 'Powering industrial automation with smart electrical systems and real-time monitoring.',
    accent: '#0EA5E9',
    stat: '340+ Plants',
  },
  {
    title: 'Smart Cities',
    desc: 'Building the intelligent urban electrical backbone from substations to streetlights.',
    accent: '#3B82F6',
    stat: '80+ Cities',
  },
  {
    title: 'Data Centers',
    desc: 'Mission-critical power distribution ensuring 99.999% uptime for cloud infrastructure.',
    accent: '#8B5CF6',
    stat: '60+ Facilities',
  },
  {
    title: 'Healthcare',
    desc: 'Reliable, redundant power systems for hospitals and medical research campuses.',
    accent: '#10B981',
    stat: '200+ Hospitals',
  },
  {
    title: 'Renewable Energy',
    desc: 'Grid integration for solar, wind, and battery energy storage projects worldwide.',
    accent: '#FFC107',
    stat: '1.2GW Installed',
  },
  {
    title: 'Oil & Gas',
    desc: 'Hazardous-area certified electrical engineering for upstream and downstream operations.',
    accent: '#F97316',
    stat: '120+ Sites',
  },
];

const Industries = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
        }
      );
    }
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { y: 80, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1, delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="industries" className="section" style={{ zIndex: 10 }}>
      <div className="container">
        <div ref={titleRef} style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-accent-1)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            Industries We Serve
          </div>
          <h2 className="h2" style={{ color: 'var(--color-fg)', maxWidth: '700px' }}>
            Powering every industry, <span className="text-gradient">everywhere on earth</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {industryData.map((industry, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="glass-panel"
              style={{
                padding: '3rem 2.5rem',
                cursor: 'pointer',
                borderLeft: `3px solid ${industry.accent}`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-8px) scale(1.02)';
                el.style.boxShadow = `0 40px 80px rgba(0,0,0,0.08), 0 0 0 1px ${industry.accent}44`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = '';
                el.style.boxShadow = '';
              }}
            >
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: `${industry.accent}15`, filter: 'blur(30px)' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: industry.accent, marginBottom: '1rem' }}>
                {industry.stat}
              </div>
              <h3 className="h3" style={{ marginBottom: '1rem', color: 'var(--color-fg)' }}>
                {industry.title}
              </h3>
              <p className="text-lg" style={{ fontSize: '1rem' }}>
                {industry.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
