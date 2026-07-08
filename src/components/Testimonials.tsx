import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "LuminaPower's smart grid implementation reduced our distribution losses by 28% within the first year. The level of engineering precision and project management was truly world-class.",
    name: 'Arjun Mehta',
    title: 'VP Engineering, PowerGrid Corp India',
    initials: 'AM',
    accent: '#0EA5E9',
  },
  {
    quote: "Their digital substation design for our Al Maktoum expansion was delivered ahead of schedule with zero commissioning defects. An incredibly reliable partner for critical infrastructure.",
    name: 'Khalid Al-Rashidi',
    title: 'Director of Projects, DEWA',
    initials: 'KR',
    accent: '#FFC107',
  },
  {
    quote: "The Battery Energy Storage system they engineered for our wind farm solved our curtailment problem entirely. We're now selling power 24/7 to the national grid.",
    name: 'Sofia Andersen',
    title: 'CEO, Nordic Wind Energy AS',
    initials: 'SA',
    accent: '#10B981',
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 75%' } }
      );
    }
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[active];

  return (
    <section ref={sectionRef} id="testimonials" className="section" style={{ zIndex: 10 }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-accent-1)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            Client Voices
          </div>
          <h2 className="h2" style={{ color: 'var(--color-fg)' }}>
            Trusted by industry <span className="text-gradient">leaders</span>
          </h2>
        </div>

        <div ref={contentRef} className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem', textAlign: 'center', position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d' }}>
          {/* Glow orb */}
          <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${t.accent}18, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none', transition: 'background 0.8s ease' }} />

          {/* Quote marks */}
          <div style={{ fontSize: '6rem', lineHeight: 0.5, color: t.accent, opacity: 0.3, fontFamily: 'Georgia, serif', marginBottom: '2rem', transition: 'color 0.4s', transform: 'translateZ(20px)' }}>"</div>

          <p style={{ fontSize: '1.4rem', lineHeight: 1.7, color: 'var(--color-fg)', marginBottom: '3rem', fontWeight: 300, position: 'relative', transition: 'all 0.4s ease', transform: 'translateZ(30px)' }}>
            {t.quote}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem', transform: 'translateZ(25px)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.accent}, #3B82F6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.125rem', boxShadow: `0 0 20px ${t.accent}55`, transition: 'all 0.4s' }}>
              {t.initials}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-fg)' }}>{t.name}</div>
              <div style={{ opacity: 0.5, fontSize: '0.875rem' }}>{t.title}</div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', transform: 'translateZ(10px)' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{ width: i === active ? '32px' : '10px', height: '10px', borderRadius: '100px', backgroundColor: i === active ? t.accent : 'rgba(15,23,42,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.4s ease', padding: 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
