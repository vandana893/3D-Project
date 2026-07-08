import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: 'Al Maktoum Solar Park',
    location: 'Dubai, UAE',
    category: 'Solar Infrastructure',
    stat1: { label: 'Capacity', value: '950 MW' },
    stat2: { label: 'Homes Powered', value: '320,000+' },
    accent: '#FFC107',
    bg: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
  },
  {
    title: 'North Sea HVDC Grid',
    location: 'Norway & Denmark',
    category: 'High Voltage Transmission',
    stat1: { label: 'Cable Length', value: '580 km' },
    stat2: { label: 'Power Transfer', value: '1.4 GW' },
    accent: '#0EA5E9',
    bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
  },
  {
    title: 'Singapore Smart Grid',
    location: 'Singapore',
    category: 'Smart City Infrastructure',
    stat1: { label: 'Grid Nodes', value: '12,000' },
    stat2: { label: 'Efficiency Gain', value: '31%' },
    accent: '#10B981',
    bg: 'linear-gradient(135deg, #004d3a, #006b52, #003d2e)',
  },
];

const Projects = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } }
      );
    }
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { y: 100, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' } }
      );
    });
  }, []);

  return (
    <section id="projects" className="section" style={{ zIndex: 10 }}>
      <div className="container">
        <div ref={titleRef} style={{ marginBottom: '6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-accent-1)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Featured Projects
            </div>
            <h2 className="h2" style={{ color: 'var(--color-fg)' }}>
              Landmark projects,<br /><span className="text-gradient">global impact</span>
            </h2>
          </div>
          <button className="btn btn-primary">
            <span>View All Projects</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {projectsData.map((project, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="glass-panel"
              style={{
                borderRadius: '32px',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: index % 2 === 0 ? '1fr 1.5fr' : '1.5fr 1fr',
                minHeight: '400px',
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.4)',
                border: 'none',
              }}
            >
              {/* Info Panel */}
              <div
                style={{
                  padding: '4rem',
                  borderRadius: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  order: index % 2 === 0 ? 0 : 1,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: project.accent, marginBottom: '1rem', transform: 'translateZ(20px)' }}>
                    {project.category} · {project.location}
                  </div>
                  <h3 className="h3" style={{ marginBottom: '2rem', color: 'var(--color-fg)', fontSize: '2rem', transform: 'translateZ(30px)' }}>
                    {project.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '3rem', transform: 'translateZ(25px)' }}>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: project.accent }}>{project.stat1.value}</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.6, marginTop: '0.25rem' }}>{project.stat1.label}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: project.accent }}>{project.stat2.value}</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.6, marginTop: '0.25rem' }}>{project.stat2.label}</div>
                  </div>
                </div>
              </div>

              {/* Visual Panel */}
              <div
                style={{
                  background: project.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  order: index % 2 === 0 ? 1 : 0,
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '300px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Abstract visual decoration */}
                <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', border: `2px solid ${project.accent}33`, top: '50%', left: '50%', transform: 'translate(-50%, -50%) translateZ(10px)' }} />
                <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', border: `2px solid ${project.accent}55`, top: '50%', left: '50%', transform: 'translate(-50%, -50%) translateZ(20px)' }} />
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: project.accent, opacity: 0.2, filter: 'blur(30px)', position: 'absolute', transform: 'translateZ(15px)' }} />
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: project.accent, boxShadow: `0 0 40px ${project.accent}`, transform: 'translateZ(40px)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
