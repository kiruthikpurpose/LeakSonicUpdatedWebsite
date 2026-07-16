'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Line } from '@react-three/drei';
import * as THREE from 'three';

// Brand palette, hardcoded - WebGL materials need real colour values, not
// CSS custom properties, so these mirror the dark-theme tokens in
// globals.css (--color-accent, --color-line, etc.) directly.
const COLOR = {
  base: '#0A0A0B',
  card: '#141417',
  line: '#26262B',
  lineStrong: '#33333A',
  accent: '#C41F2B',
  accentHover: '#DC2A36',
  ink: '#FFFFFF',
  inkMuted: '#8A8A90',
};

const CORRIDOR_LENGTH = 16;
const MARKER_X = [-5, -1.5, 2, 5.5];

export type SimStep = 0 | 1 | 2 | 3;

/** Low-poly, unlit (MeshBasicMaterial) geometry throughout - deliberate:
 * it matches the site's flat, blueprint-diagram visual language, and it
 * means no scene lighting has to be computed every frame, which is most of
 * why this stays smooth on a mid-range phone. */
function Corridor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[CORRIDOR_LENGTH + 4, 0.9]} />
        <meshBasicMaterial color={COLOR.lineStrong} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[CORRIDOR_LENGTH, 0.18, 0.18]} />
        <meshBasicMaterial color={COLOR.card} />
      </mesh>
      {/* refinery cluster at the corridor's far end */}
      <group position={[CORRIDOR_LENGTH / 2 + 1.4, 0, 0]}>
        {[0, 0.9, 1.8].map((z, i) => (
          <mesh key={z} position={[i * 0.1, 0.4, z - 0.9]}>
            <cylinderGeometry args={[0.28, 0.28, 0.8, 16]} />
            <meshBasicMaterial color={COLOR.line} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Drone({ step }: { step: SimStep }) {
  const group = useRef<THREE.Group>(null);
  const rotorRefs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Continuous back-and-forth flight along the corridor, independent of
      // the narrative step - keeps the scene alive without re-triggering
      // per-step logic every frame.
      const x = Math.sin(t * 0.35) * (CORRIDOR_LENGTH / 2 - 1);
      group.current.position.x = x;
      group.current.position.y = 1.1 + Math.sin(t * 1.6) * 0.05;
      group.current.rotation.z = Math.sin(t * 0.35) > 0 ? -0.08 : 0.08;
    }
    rotorRefs.forEach((r) => {
      if (r.current) r.current.rotation.y += 0.9;
    });
  });

  return (
    <group ref={group} position={[0, 1.1, 0]}>
      <mesh>
        <boxGeometry args={[0.32, 0.08, 0.32]} />
        <meshBasicMaterial color={COLOR.ink} />
      </mesh>
      {[
        [0.28, 0, 0.28],
        [-0.28, 0, 0.28],
        [0.28, 0, -0.28],
        [-0.28, 0, -0.28],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.06, 6]} />
            <meshBasicMaterial color={COLOR.inkMuted} />
          </mesh>
          <mesh ref={rotorRefs[i]} position={[0, 0.05, 0]}>
            <boxGeometry args={[0.32, 0.015, 0.04]} />
            <meshBasicMaterial color={COLOR.inkMuted} transparent opacity={0.7} />
          </mesh>
        </group>
      ))}
      {/* downward scan indicator - only visible during the capture step */}
      {step >= 1 && (
        <mesh position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.16, 0.9, 12, 1, true]} />
          <meshBasicMaterial color={COLOR.accent} transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

function EvidenceMarkers({ step }: { step: SimStep }) {
  return (
    <>
      {MARKER_X.map((x, i) => {
        const revealed = step >= 1;
        const reviewed = step >= 2;
        const decided = step === 3 && i === MARKER_X.length - 1;
        return (
          <group key={x} position={[x, 0.05, i % 2 === 0 ? 0.22 : -0.22]}>
            <mesh scale={revealed ? 1 : 0.001}>
              <sphereGeometry args={[decided ? 0.13 : 0.08, 16, 16]} />
              <meshBasicMaterial
                color={decided ? COLOR.accentHover : reviewed ? COLOR.ink : COLOR.accent}
                transparent
                opacity={revealed ? (decided ? 1 : 0.85) : 0}
              />
            </mesh>
            {decided && (
              <mesh position={[0, 0.55, 0]}>
                <planeGeometry args={[0.5, 0.32]} />
                <meshBasicMaterial color={COLOR.card} transparent opacity={0.95} side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}
    </>
  );
}

function DataLinks({ step }: { step: SimStep }) {
  const points = useMemo(
    () =>
      MARKER_X.map(
        (x) =>
          [
            [x, 0.05, 0],
            [CORRIDOR_LENGTH / 2 + 2.4, 1.4, 0],
          ] as [number, number, number][],
      ),
    [],
  );
  if (step < 2) return null;
  return (
    <>
      {points.map((pts, i) => (
        <Line key={i} points={pts} color={COLOR.accent} transparent opacity={0.35} lineWidth={1} />
      ))}
    </>
  );
}

function SentrixNode({ step }: { step: SimStep }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const active = step >= 2;
    const t = state.clock.getElapsedTime();
    const pulse = active ? 1 + Math.sin(t * 3) * 0.08 : 1;
    mesh.current.scale.setScalar(pulse);
    mesh.current.rotation.y += active ? 0.01 : 0.003;
  });
  return (
    <group position={[CORRIDOR_LENGTH / 2 + 2.4, 1.4, 0]}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshBasicMaterial color={COLOR.accent} wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshBasicMaterial color={COLOR.ink} />
      </mesh>
    </group>
  );
}

function SceneContents({ step, autoRotate }: { step: SimStep; autoRotate: boolean }) {
  return (
    <>
      <color attach="background" args={[COLOR.base]} />
      <fog attach="fog" args={[COLOR.base, 10, 26]} />
      <Grid
        position={[0, -0.03, 0]}
        args={[30, 30]}
        cellSize={1}
        cellThickness={0.5}
        cellColor={COLOR.line}
        sectionSize={5}
        sectionThickness={0.8}
        sectionColor={COLOR.lineStrong}
        fadeDistance={22}
        fadeStrength={1}
        infiniteGrid
      />
      <Corridor />
      <Drone step={step} />
      <EvidenceMarkers step={step} />
      <DataLinks step={step} />
      <SentrixNode step={step} />
      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={16}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={autoRotate}
        autoRotateSpeed={0.6}
        makeDefault
      />
    </>
  );
}

export function DroneSimScene({ step, reducedMotion }: { step: SimStep; reducedMotion: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [2, 5, 11], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'low-power' }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <SceneContents step={step} autoRotate={!reducedMotion} />
    </Canvas>
  );
}
