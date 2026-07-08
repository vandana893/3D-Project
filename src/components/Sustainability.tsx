import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: '2.4M', label: 'Tonnes CO₂ Avoided', icon: '🌿' },
  { value: '1.2 GW', label: 'Clean Energy Installed', icon: '☀️' },
  { value: '85%', label: 'Waste Reduction Target', icon: '♻️' },
  { value: '2035', label: 'Net Zero Commitment', icon: '🎯' },
];

const Sustainability = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 75%' } }
      );
    }
    metricsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' } }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="sustainability" className="section" style={{ zIndex: 10, background: 'linear-gradient(180deg, transparent, rgba(16, 185, 129, 0.04), transparent)' }}>
      <div className="container">
        <div ref={contentRef} style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            Sustainability
          </div>
          <h2 className="h2" style={{ marginBottom: '2rem', color: 'var(--color-fg)' }}>
            Engineering a <span style={{ backgroundImage: 'linear-gradient(135deg, #10B981, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>greener world</span>
          </h2>
          <p className="text-lg" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Our commitment to sustainability drives every design decision — from the materials we specify to the renewable systems we engineer.
          </p>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '5rem' }}>
          {metrics.map((metric, i) => (
            <div
              key={i}
              ref={(el) => { if (el) metricsRef.current[i] = el; }}
              className="glass-panel"
              style={{ padding: '3rem 2rem', textAlign: 'center', transformStyle: 'preserve-3d' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', transform: 'translateZ(30px)' }}>{metric.icon}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#10B981', marginBottom: '0.5rem', transform: 'translateZ(25px)' }}>{metric.value}</div>
              <div style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: 1.4, transform: 'translateZ(15px)' }}>{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          {[
            { title: 'Solar & Wind Integration', desc: 'We engineer the full stack — from panel arrays to grid-scale inverter systems — ensuring maximum renewable capture and grid stability.', accent: '#FFC107' },
            { title: 'Battery Energy Storage', desc: 'Our BESS solutions store excess generation for nighttime or peak-demand dispatch, making intermittent renewables fully reliable.', accent: '#10B981' },
          ].map((item, i) => (
            <div key={i} className="glass-panel" style={{ padding: '3rem', borderLeft: `3px solid ${item.accent}`, transformStyle: 'preserve-3d' }}>
              <h3 className="h3" style={{ marginBottom: '1rem', color: 'var(--color-fg)', transform: 'translateZ(20px)' }}>{item.title}</h3>
              <p className="text-lg" style={{ fontSize: '1rem', transform: 'translateZ(10px)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
