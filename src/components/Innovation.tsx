import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A futuristic digital network of nodes connected by energy lines
const NetworkNode = ({ position, size = 0.15, color = '#0EA5E9' }: { position: [number, number, number], size?: number, color?: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const baseY = position[1];
  const offset = Math.random() * Math.PI * 2;

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = baseY + Math.sin(state.clock.elapsedTime + offset) * 0.2;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
};

// Use mesh + line segments geometry instead of <line> to avoid SVG type conflict
const EnergyLine = ({ start, end, color = '#0EA5E9' }: { start: THREE.Vector3, end: THREE.Vector3, color?: string }) => {
  const ref = useRef<THREE.LineSegments>(null);
  const points = [start, end];
  const geo = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </lineSegments>
  );
};

const nodePositions: [number, number, number][] = [
  [0, 0, 0], [-3, 1, -1], [3, 0.5, -1], [-1.5, -1, 1],
  [2, -1.5, 0], [-2.5, -1, -2], [1, 2, -2], [-1, 1.5, -1],
  [3.5, -0.5, -2], [-3, 0, 0],
];

const nodeColors = ['#0EA5E9', '#3B82F6', '#8B5CF6', '#FFC107', '#10B981', '#0EA5E9', '#3B82F6', '#FFC107', '#0EA5E9', '#3B82F6'];

const GridNetwork = () => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  const vectors = nodePositions.map(p => new THREE.Vector3(...p));

  return (
    <group ref={group}>
      {nodePositions.map((pos, i) => (
        <NetworkNode key={i} position={pos} size={i === 0 ? 0.3 : 0.12} color={nodeColors[i]} />
      ))}
      {vectors.slice(0, 7).map((v, i) =>
        vectors.slice(i + 1, i + 3).map((v2, j) => (
          <EnergyLine key={`${i}-${j}`} start={v} end={v2} color={nodeColors[i]} />
        ))
      )}
    </group>
  );
};

const Innovation = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [leftRef, rightRef].forEach((ref, i) => {
      if (!ref.current) return;
      gsap.fromTo(ref.current,
        { x: i === 0 ? -80 : 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' }
        }
      );
    });
  }, []);

  const features = [
    { label: 'AI-Powered Load Balancing', desc: 'Dynamic real-time optimization across entire grid networks.' },
    { label: 'Digital Twin Simulation', desc: 'Virtual replicas of substations for predictive maintenance.' },
    { label: 'Edge Computing Integration', desc: 'Sub-millisecond response at the source of power generation.' },
    { label: 'Blockchain Energy Trading', desc: 'Peer-to-peer renewable energy transactions at scale.' },
  ];

  return (
    <section id="innovation" className="section" style={{ zIndex: 10, overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          {/* Left: 3D Canvas */}
          <div ref={leftRef} className="glass-panel" style={{ height: '600px', borderRadius: '32px', overflow: 'hidden', position: 'relative' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <color attach="background" args={['#040D1E']} />
              <ambientLight intensity={0.3} />
              <pointLight position={[5, 5, 5]} intensity={50} color="#0EA5E9" />
              <pointLight position={[-5, -5, 5]} intensity={30} color="#3B82F6" />
              <GridNetwork />
            </Canvas>
            <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', pointerEvents: 'none' }}>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Live Visualization</div>
              <div style={{ color: '#fff', fontWeight: 600 }}>Global Energy Network</div>
            </div>
          </div>

          {/* Right: Text */}
          <div ref={rightRef}>
            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '100px', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-accent-1)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Innovation Lab
            </div>
            <h2 className="h2" style={{ marginBottom: '2rem', color: 'var(--color-fg)' }}>
              The future of power is <span className="text-gradient">intelligent</span>
            </h2>
            <p className="text-lg" style={{ marginBottom: '3rem' }}>
              We are building the digital infrastructure for tomorrow's energy grid — where every electron is tracked, optimized, and traded in real time.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {features.map((feature, i) => (
                <div key={i} className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent-1)', flexShrink: 0, marginTop: '6px', boxShadow: '0 0 12px var(--color-accent-1)' }} />
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-fg)' }}>{feature.label}</div>
                    <div style={{ opacity: 0.6, fontSize: '0.95rem', lineHeight: 1.5 }}>{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;
