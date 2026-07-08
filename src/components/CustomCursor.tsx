import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Track mouse position
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: 'power2.out',
      });

      gsap.to(ring, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Interactive element hovers
    const onMouseEnterInteractive = () => {
      gsap.to(ring, {
        scale: 1.8,
        backgroundColor: 'rgba(14, 165, 233, 0.15)',
        borderColor: 'transparent',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1.5,
        backgroundColor: '#FFC107',
        duration: 0.3,
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: '#0EA5E9',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#0EA5E9',
        duration: 0.3,
      });
    };

    // Add listeners to active UI elements
    const updateListeners = () => {
      const interactives = document.querySelectorAll('a, button, .glass-panel, [role="button"]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    updateListeners();

    // Since React apps render dynamic components, re-evaluate occasionally
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      const interactives = document.querySelectorAll('a, button, .glass-panel, [role="button"]');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          top: -15,
          left: -15,
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1.5px solid #0EA5E9',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'border-color 0.3s, background-color 0.3s',
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#0EA5E9',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />
    </>
  );
}
