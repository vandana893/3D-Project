import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Zap } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress animation
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 100,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate: () => {
          setProgress(Math.floor(obj.val));
        },
        onComplete: () => {
          // Exit animation
          gsap.timeline({
            onComplete: onComplete
          })
          .to(barRef.current, {
            width: '100%',
            duration: 0.3,
            ease: 'power1.inOut'
          })
          .to(textRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in'
          })
          .to(containerRef.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 0.8,
            ease: 'power4.inOut'
          });
        }
      });

      // Subtle pulse on the core logo
      gsap.to('.loader-logo', {
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: 'sine.inOut'
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#040D1E',
        color: '#FFFFFF',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      {/* Background grids */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div ref={textRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', zIndex: 10 }}>
        {/* Brand Core Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            className="loader-logo"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0EA5E9, #3B82F6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)'
            }}
          >
            <Zap size={24} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em' }}>
            Lumina<span style={{ color: '#0EA5E9' }}>Power</span>
          </span>
        </div>

        {/* Loading details */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <div style={{ fontSize: '3rem', fontWeight: 300, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.05em' }}>
            {progress}%
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.5rem' }}>
            Initializing Smart Infrastructure
          </div>
        </div>

        {/* Progress track */}
        <div
          style={{
            width: '200px',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1px',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '1rem'
          }}
        >
          <div
            ref={barRef}
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#0EA5E9',
              boxShadow: '0 0 10px #0EA5E9',
              transition: 'width 0.1s linear'
            }}
          />
        </div>
      </div>
    </div>
  );
}
