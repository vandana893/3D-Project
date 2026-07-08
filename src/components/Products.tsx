import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, SpotLight } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AbstractTransformer = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.2;
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Base */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[2, 2.2, 0.5, 32]} />
        <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Energy Core */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1, 1, 2, 32]} />
        <meshPhysicalMaterial color="#0EA5E9" transmission={0.9} opacity={1} metalness={0.1} roughness={0.1} ior={1.5} thickness={2} />
      </mesh>
      
      {/* Inner Glowing Element */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
        <meshBasicMaterial color="#3B82F6" />
      </mesh>
      
      {/* Rings */}
      {[0.8, 1.5, 2.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.05, 16, 64]} />
          <meshStandardMaterial color="#FFC107" metalness={1} roughness={0.2} emissive="#FFC107" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

const Products: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { scale: 0.95, opacity: 0, y: 100 },
        {
          scale: 1, opacity: 1, y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="products" className="section" style={{ zIndex: 10 }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-accent-1)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Hardware Innovation
          </div>
          <h2 className="h2 text-gradient" style={{ marginBottom: '1rem', textAlign: 'center' }}>
            T-9000 Smart Core
          </h2>
          <p className="text-lg" style={{ textAlign: 'center', maxWidth: '600px' }}>
            Interact with our next-generation ultra-high voltage distribution node featuring AI-driven load balancing.
          </p>
        </div>
        
        <div ref={containerRef} className="glass-panel" style={{ height: '70vh', width: '100%', borderRadius: '32px', overflow: 'hidden', position: 'relative' }}>
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <color attach="background" args={['#0F172A']} />
            <fog attach="fog" args={['#0F172A', 5, 20]} />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.1} />
            
            <ambientLight intensity={0.2} />
            <SpotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={500} color="#ffffff" castShadow />
            <pointLight position={[-5, 5, -5]} intensity={100} color="#0EA5E9" />
            
            <AbstractTransformer />
            <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
            
            <Environment files="/hdri/dikhololo_night_1k.hdr" />
          </Canvas>
          
          <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', pointerEvents: 'none' }}>
            <h3 className="h3" style={{ color: '#fff', marginBottom: '0.5rem' }}>Interactive 3D Viewer</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Drag to rotate the model and explore precision engineering.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
