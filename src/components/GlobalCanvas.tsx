import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

const CursorLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (lightRef.current) {
      const targetX = state.pointer.x * 8;
      const targetY = state.pointer.y * 5;
      const currentCameraY = state.camera.position.y;
      lightRef.current.position.x += (targetX - lightRef.current.position.x) * 0.08;
      lightRef.current.position.y += (currentCameraY + targetY - lightRef.current.position.y) * 0.08;
    }
  });
  return <pointLight ref={lightRef} intensity={80} distance={18} color="#0EA5E9" position={[0, 0, 3]} />;
};

const FloatingCube = ({ position, size, color }: { position: [number, number, number], size: number, color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  const speedX = Math.random() * 0.15 + 0.05;
  const speedY = Math.random() * 0.15 + 0.05;
  const floatOffset = Math.random() * Math.PI * 2;
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speedX;
      ref.current.rotation.y = state.clock.elapsedTime * speedY;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + floatOffset) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
    </mesh>
  );
};

const ScannerBeam = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const height = 65;
      const y = 15 - ((state.clock.elapsedTime * 3) % height);
      ref.current.position.y = y;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0, 20, 64]} />
      <meshBasicMaterial 
        color="#0EA5E9" 
        transparent 
        opacity={0.06} 
        blending={THREE.AdditiveBlending} 
        side={THREE.DoubleSide} 
        depthWrite={false} 
      />
    </mesh>
  );
};

// ----------------------------------------------------
// Sub-components
// ----------------------------------------------------

const TowerStrut = ({ position, height, width }: { position: [number, number, number], height: number, width: number }) => (
  <mesh position={position}>
    <boxGeometry args={[width, height, width]} />
    <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.15} />
  </mesh>
);

const PowerTower = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null);
  const floatOffset = Math.random() * Math.PI * 2;
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + floatOffset) * 0.15;
    }
  });
  return (
    <group ref={ref} position={position}>
      <TowerStrut position={[0, 0, 0]} height={4} width={0.12} />
      <TowerStrut position={[0, 1.2, 0]} height={0.1} width={2} />
      <TowerStrut position={[0, 0.6, 0]} height={0.1} width={1.4} />
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#FFC107" toneMapped={false} />
      </mesh>
    </group>
  );
};

const EnergyLine = ({ start, end, color }: { start: THREE.Vector3, end: THREE.Vector3, color: string }) => {
  const ref = useRef<THREE.LineSegments>(null);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints([start, end]), [start, end]);

  useFrame((state) => {
    if (ref.current) {
      (ref.current.material as THREE.LineBasicMaterial).opacity = 0.25 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={0.35} />
    </lineSegments>
  );
};

const EnergyCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current && ring1.current && ring2.current && ring3.current) {
      // Calculate proximity of cursor to core (core is at x:3, y:0)
      const mouse3D = new THREE.Vector2(state.pointer.x * 5, state.pointer.y * 3);
      const core2D = new THREE.Vector2(3, 0);
      const dist = mouse3D.distanceTo(core2D);
      
      const proximity = Math.max(0, 1 - dist / 5); // 0 (far) to 1 (near)
      const speedMultiplier = 1 + proximity * 1.5;
      const time = state.clock.elapsedTime * speedMultiplier;

      coreRef.current.rotation.y = time * 0.25 + state.pointer.x * 0.5;
      coreRef.current.rotation.x = state.pointer.y * -0.3;

      ring1.current.rotation.z = time * 0.4;
      ring1.current.rotation.y = time * 0.15;

      ring2.current.rotation.x = time * 0.3;
      ring2.current.rotation.z = -time * 0.2;

      ring3.current.rotation.y = -time * 0.25;
      ring3.current.rotation.x = time * 0.1;

      // Pulsate scale based on mouse proximity
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.05 * proximity;
      coreRef.current.scale.set(pulse, pulse, pulse);

      const ringScale1 = 2.8 * (1 + Math.sin(state.clock.elapsedTime * 6) * 0.02 * proximity);
      ring1.current.scale.set(ringScale1, ringScale1, ringScale1);
    }
  });

  return (
    <Float floatIntensity={2} speed={1.5} rotationIntensity={0.3}>
      <group position={[3, 0, -1]}>
        <mesh ref={ring1} scale={2.8}>
          <torusGeometry args={[1, 0.018, 16, 120]} />
          <meshBasicMaterial color="#0EA5E9" toneMapped={false} />
        </mesh>
        <mesh ref={ring2} scale={2.2} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
          <torusGeometry args={[1, 0.015, 16, 100]} />
          <meshBasicMaterial color="#3B82F6" toneMapped={false} />
        </mesh>
        <mesh ref={ring3} scale={1.7} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <torusGeometry args={[1, 0.012, 16, 80]} />
          <meshBasicMaterial color="#FFC107" toneMapped={false} />
        </mesh>

        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.4}
            chromaticAberration={0.6}
            anisotropy={0.5}
            distortion={0.3}
            distortionScale={0.3}
            temporalDistortion={0.15}
            color="#e0f2fe"
          />
        </mesh>

        <mesh scale={0.65}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#3B82F6" toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
};

const Particles = () => {
  const count = 800;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 80 - 40; // Spread vertically across all sections
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#0EA5E9"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// ----------------------------------------------------
// Camera & Scene Management
// ----------------------------------------------------

const SceneContent = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Smoothly interpolate camera Y position based on scroll progress
    const targetY = -progress * 40;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.08;

    // Gentle camera orbit / mouse effect
    const mouseX = state.pointer.x * 1.5;
    state.camera.position.x += (mouseX - state.camera.position.x) * 0.05;
    state.camera.position.z += (12 - state.camera.position.z) * 0.05;

    state.camera.lookAt(0, state.camera.position.y, 0);
  });

  const towerPositions: [number, number, number][] = [[-7, -1, -4], [-4.5, -1, -6], [8, -1, -3], [5.5, -1.5, -7]];
  const towerTops = towerPositions.map(p => new THREE.Vector3(p[0], p[1] + 2.2, p[2]));

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 12, 5]} intensity={1.5} color="#ffffff" castShadow />
      <spotLight position={[-8, 15, 8]} angle={0.25} penumbra={1} intensity={80} color="#0EA5E9" />
      <pointLight position={[3, 3, 2]} intensity={20} color="#3B82F6" />

      {/* Hero Scene objects (Y around 0) */}
      <group position={[0, 0, 0]}>
        {towerPositions.map((pos, i) => <PowerTower key={i} position={pos} />)}
        <EnergyLine start={towerTops[0]} end={towerTops[1]} color="#FFC107" />
        <EnergyLine start={towerTops[2]} end={towerTops[3]} color="#FFC107" />
        <EnergyCore />
      </group>

      {/* About/Services Ambient Scene (Y around -12) */}
      <group position={[0, -12, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <gridHelper args={[40, 40, '#0EA5E9', '#1E293B']} />
        </mesh>
      </group>

      {/* Sustainability / Wind Turbine Scene (Y around -36) */}
      <group position={[0, -36, 0]}>
        <Float floatIntensity={1} speed={1}>
          <mesh>
            <torusGeometry args={[3, 0.02, 16, 100]} />
            <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.5} />
          </mesh>
        </Float>
      </group>

      <Particles />
      <CursorLight />
      <ScannerBeam />
      {/* Hero Section */}
      <FloatingCube position={[-5, 2, -2]} size={1.2} color="#0EA5E9" />
      <FloatingCube position={[4, 3, -3]} size={1.5} color="#3B82F6" />
      <FloatingCube position={[-3, -2, -4]} size={0.8} color="#FFC107" />
      
      {/* Services / About Section */}
      <FloatingCube position={[-6, -10, -3]} size={1.4} color="#0EA5E9" />
      <FloatingCube position={[5, -14, -2]} size={1.2} color="#3B82F6" />
      <FloatingCube position={[-2, -15, -5]} size={0.9} color="#FFC107" />

      {/* Sustainability Section */}
      <FloatingCube position={[-4, -33, -3]} size={1.5} color="#10B981" />
      <FloatingCube position={[6, -38, -2]} size={1.1} color="#3B82F6" />
      <FloatingCube position={[2, -35, -4]} size={1.3} color="#10B981" />

      <Environment files="/hdri/potsdamer_platz_1k.hdr" />
    </>
  );
};

export default function GlobalCanvas() {
  return (
    <div
      className="canvas-container"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <Canvas dpr={[1, 2]} gl={{ antialias: false, alpha: true }} shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={48} />
        <SceneContent />
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.8} levels={7} />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.001, 0.001)}
            opacity={0.35}
          />
          <Noise opacity={0.02} blendFunction={BlendFunction.OVERLAY} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
