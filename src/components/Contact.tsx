import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, ExternalLink, Share2, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    [formRef, infoRef].forEach((ref, i) => {
      if (!ref.current) return;
      gsap.fromTo(ref.current,
        { y: 80, opacity: 0, x: i === 0 ? 60 : -60 },
        { y: 0, opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
      );
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1.25rem 1.5rem',
    borderRadius: '16px',
    border: '1px solid rgba(15, 23, 42, 0.1)',
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    fontSize: '1rem',
    color: 'var(--color-fg)',
    fontFamily: 'Outfit, sans-serif',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <section ref={sectionRef} id="contact" className="section" style={{ zIndex: 10, background: 'linear-gradient(180deg, transparent, rgba(14,165,233,0.03), transparent)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-accent-1)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            Get In Touch
          </div>
          <h2 className="h2" style={{ color: 'var(--color-fg)' }}>
            Let's build the future<br /><span className="text-gradient">together</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }}>
          {/* Info */}
          <div ref={infoRef}>
            <p className="text-lg" style={{ marginBottom: '3rem' }}>
              Ready to power your next project? Our engineering team is available globally to discuss your requirements.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              {[
                { icon: <MapPin size={20} />, label: 'Global HQ', value: 'Dubai, UAE · Singapore · Frankfurt · Houston' },
                { icon: <Phone size={20} />, label: 'Phone', value: '+971 4 800 LUMINA' },
                { icon: <Mail size={20} />, label: 'Email', value: 'engineering@luminapower.com' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-1)', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontWeight: 500, color: 'var(--color-fg)' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {[<ExternalLink size={20} />, <Share2 size={20} />, <Globe size={20} />].map((icon, i) => (
                <div key={i} className="glass-panel" style={{ width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-accent-1)' }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="glass-panel" style={{ padding: '3rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✅</div>
                <h3 className="h3" style={{ marginBottom: '1rem', color: 'var(--color-fg)' }}>Message Received!</h3>
                <p className="text-lg" style={{ fontSize: '1rem' }}>Our team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', opacity: 0.7 }}>Full Name</label>
                    <input style={inputStyle} type="text" placeholder="John Smith" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', opacity: 0.7 }}>Email Address</label>
                    <input style={inputStyle} type="email" placeholder="john@company.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', opacity: 0.7 }}>Company</label>
                  <input style={inputStyle} type="text" placeholder="Your Company Name" value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', opacity: 0.7 }}>Project Description</label>
                  <textarea style={{ ...inputStyle, height: '160px', resize: 'vertical' }} placeholder="Tell us about your project requirements..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
