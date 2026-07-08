import { Zap } from 'lucide-react';

const footerLinks = {
  Solutions: ['Smart Grid', 'Renewables', 'Industrial Automation', 'Energy Storage', 'High Voltage Systems'],
  Company: ['About Us', 'Careers', 'Press Room', 'Sustainability', 'Investor Relations'],
  Resources: ['Case Studies', 'Technical Docs', 'Engineering Blog', 'Events', 'Contact'],
};

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#040D1E', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Top glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, #0EA5E9, transparent)' }} />

      {/* Main Content */}
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '5rem' }}>
          {/* Brand Block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #0EA5E9, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={18} color="#fff" fill="#fff" />
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                Lumina<span style={{ color: '#0EA5E9' }}>Power</span>
              </span>
            </div>
            <p style={{ opacity: 0.5, lineHeight: 1.7, maxWidth: '280px', fontSize: '0.95rem' }}>
              Engineering the future of intelligent power. Delivering smart, sustainable, and reliable electrical infrastructure worldwide.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              {['in', 'tw', 'gh'].map(s => (
                <div key={s} style={{ width: '38px', height: '38px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s' }}>
                  {s.toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '1.5rem' }}>
                {title}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', transition: 'color 0.2s', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#0EA5E9')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ opacity: 0.35, fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} LuminaPower Global Engineering Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <a key={link} href="#" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
