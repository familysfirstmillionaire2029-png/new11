import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { getDominantLine, wavelengthToRGB } from '../utils/physics';

/**
 * Electron component with orbital motion and trail
 */
function Electron({ radius, speed, color, orbitAxis = 'xy', phase = 0 }) {
  const ref = useRef();
  const trailRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase;

    if (ref.current) {
      // Calculate position based on orbit axis
      if (orbitAxis === 'xy') {
        ref.current.position.x = Math.cos(t) * radius;
        ref.current.position.y = Math.sin(t) * radius;
        ref.current.position.z = 0;
      } else if (orbitAxis === 'xz') {
        ref.current.position.x = Math.cos(t) * radius;
        ref.current.position.y = 0;
        ref.current.position.z = Math.sin(t) * radius;
      } else if (orbitAxis === 'yz') {
        ref.current.position.x = 0;
        ref.current.position.y = Math.cos(t) * radius;
        ref.current.position.z = Math.sin(t) * radius;
      }
    }
  });

  return (
    <Trail
      ref={trailRef}
      width={2}
      length={10}
      color={color}
      attenuation={(width) => width}
    >
      <Sphere ref={ref} args={[0.1, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </Sphere>
    </Trail>
  );
}

/**
 * Nucleus component (protons and neutrons)
 */
function Nucleus({ atomicNumber, color }) {
  return (
    <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        toneMapped={false}
        roughness={0.3}
        metalness={0.7}
      />
    </Sphere>
  );
}

/**
 * Orbital ring visualization
 */
function OrbitalRing({ radius, color, opacity = 0.2 }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} opacity={opacity} transparent />
    </line>
  );
}

/**
 * Complete atom scene with electrons and nucleus
 */
function AtomScene({ elementData, dominantColor }) {
  const { atomicNumber } = elementData;

  // Simplified Bohr model: distribute electrons in shells
  // 1st shell: max 2, 2nd shell: max 8, 3rd shell: max 8, 4th shell: max 2
  const getElectronShells = (n) => {
    const shells = [];
    let remaining = n;

    const shellCapacities = [2, 8, 8, 2]; // Simplified for first 20 elements

    shellCapacities.forEach((capacity, index) => {
      if (remaining > 0) {
        const count = Math.min(remaining, capacity);
        shells.push({
          count,
          radius: 1.5 + index * 1.2, // Orbital radius
          speed: 0.5 - index * 0.1, // Outer electrons move slower
        });
        remaining -= count;
      }
    });

    return shells;
  };

  const shells = getElectronShells(atomicNumber);

  // Define orbital axes to create interesting 3D patterns
  const orbitAxes = ['xy', 'xz', 'yz'];

  return (
    <group>
      {/* Nucleus */}
      <Nucleus atomicNumber={atomicNumber} color={dominantColor} />

      {/* Ambient glow around nucleus */}
      <pointLight position={[0, 0, 0]} intensity={1} color={dominantColor} distance={5} />

      {/* Electron shells */}
      {shells.map((shell, shellIndex) => (
        <group key={shellIndex}>
          {/* Orbital ring */}
          <OrbitalRing radius={shell.radius} color={dominantColor} />

          {/* Electrons in this shell */}
          {Array.from({ length: shell.count }).map((_, electronIndex) => {
            // Distribute electrons evenly around the shell
            const phase = (electronIndex / shell.count) * Math.PI * 2;
            const orbitAxis = orbitAxes[shellIndex % orbitAxes.length];

            return (
              <Electron
                key={electronIndex}
                radius={shell.radius}
                speed={shell.speed}
                color={dominantColor}
                orbitAxis={orbitAxis}
                phase={phase}
              />
            );
          })}
        </group>
      ))}

      {/* Additional ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
    </group>
  );
}

/**
 * Main AtomVisualization component
 */
export default function AtomVisualization({ elementData }) {
  if (!elementData || !elementData.spectralLines) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-dark-surface/30 rounded-lg">
        <p className="text-gray-500">Select an element to visualize</p>
      </div>
    );
  }

  const dominantLine = getDominantLine(elementData.spectralLines);
  const dominantColor = wavelengthToRGB(dominantLine.wavelength).hex;

  return (
    <div className="w-full h-full bg-dark-surface/30 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Background */}
        <color attach="background" args={['#0a0e17']} />

        {/* Atom scene */}
        <AtomScene elementData={elementData} dominantColor={dominantColor} />

        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={5}
          maxDistance={15}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Element info overlay */}
      <div className="absolute top-4 left-4 bg-dark-surface/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-dark-border">
        <div className="text-sm text-gray-400">Atomic Number</div>
        <div className="text-2xl font-bold" style={{ color: dominantColor }}>
          {elementData.atomicNumber}
        </div>
        <div className="text-xl font-semibold">{elementData.name}</div>
        <div className="text-sm text-gray-400">{elementData.symbol}</div>
      </div>
    </div>
  );
}
