import { useState, useEffect, useRef } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import gsap from 'gsap';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Industries', href: '#industries' },
  { label: 'Innovation', href: '#innovation' },
  { label: 'Projects', href: '#projects' },
  { label: 'Sustainability', href: '#sustainability' },
  // { label: 'Careers', href: '#careers' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  // Handle mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.to(mobileMenuRef.current, {
        x: '0%',
        duration: 0.5,
        ease: 'power3.out',
      });
      // Stagger link entrances
      gsap.fromTo(
        '.mobile-nav-link',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [mobileOpen]);

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    padding: scrolled ? '1rem 0' : '1.75rem 0',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    backdropFilter: 'blur(22px) saturate(190%)',
    backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.45)',
    borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid transparent',
  };

  return (
    <>
      <nav ref={navRef} style={navStyle}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #0EA5E9, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(14,165,233,0.4)' }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#F8FAFC', letterSpacing: '-0.02em' }}>
              Lumina<span style={{ color: 'var(--color-accent-1)' }}>Power</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="desktop-only" style={{ display: 'flex', gap: '0.15rem', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    fontSize: '1.05rem',
                    color: activeLink === link.href ? '#A5F3FC' : '#F8FAFC',
                    opacity: activeLink === link.href ? 1 : 0.95,
                    transition: 'all 0.25s ease',
                    textDecoration: 'none',
                    fontWeight: 600,
                    backgroundColor: activeLink === link.href ? 'rgba(14,165,233,0.22)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    if (activeLink !== link.href) {
                      target.style.backgroundColor = 'rgba(14, 165, 233, 0.15)';
                      target.style.color = '#A5F3FC';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    if (activeLink !== link.href) {
                      target.style.backgroundColor = 'transparent';
                      target.style.color = '#F8FAFC';
                    }
                  }}
                  onClick={() => setActiveLink(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="#contact" className="btn btn-primary desktop-only" style={{ padding: '0.7rem 1.5rem', fontSize: '0.92rem' }}>
              <span>Get in Touch</span>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none',
                cursor: 'pointer',
                color: 'var(--color-fg)',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                backgroundColor: scrolled ? 'rgba(14, 165, 233, 0.05)' : 'rgba(255, 255, 255, 0.2)',
                border: scrolled ? '1px solid rgba(14, 165, 233, 0.1)' : '1px solid rgba(255, 255, 255, 0.3)',
              }}
              className="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sliding Menu */}
      <div
        ref={mobileMenuRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(380px, 100vw)',
          backgroundColor: '#040D1E',
          color: '#fff',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '8rem 3rem 4rem 3rem',
          transform: 'translateX(100%)',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.3)',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Background glow in mobile menu */}
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15), transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: 'auto' }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="mobile-nav-link"
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: activeLink === link.href ? 'var(--color-accent-1)' : '#fff',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'color 0.25s',
                }}
                onClick={() => {
                  setActiveLink(link.href);
                  setMobileOpen(false);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <a
            href="#contact"
            className="btn btn-primary"
            style={{ width: '100%', padding: '1.1rem' }}
            onClick={() => setMobileOpen(false)}
          >
            <span>Get in Touch</span>
          </a>
        </div>
      </div>
    </>
  );
}
