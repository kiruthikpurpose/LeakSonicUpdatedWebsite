'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Line, Html } from '@react-three/drei';
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
  amber: '#E0A030',
  ink: '#FFFFFF',
  inkMuted: '#8A8A90',
  vegetation: '#2A3B2E',
  crop: '#3A4A32',
  road: '#1C1C1F',
  roadLine: '#5A5A62',
};

const CORRIDOR_LENGTH = 22;
const LEAK_X = 6.5;
const SENTRIX_POS: [number, number, number] = [CORRIDOR_LENGTH / 2 + 3, 1.6, -1.4];
// Findings mapped along the corridor - one of them is the leak, revealed
// last, in step 5 ("The decision").
const MARKER_X = [-8, -4.5, -1, 3, LEAK_X, 9.5];

export type SimStep = 0 | 1 | 2 | 3 | 4 | 5;

export type Telemetry = {
  lat: number;
  lon: number;
  altitudeM: number;
  speedKmh: number;
  rtkFixed: boolean;
  tempC: number;
  humidityPct: number;
};

const BASE_LAT = 22.9734;
const BASE_LON = 78.6569;

/** Low-poly, unlit (MeshBasicMaterial) geometry throughout - deliberate:
 * it matches the site's flat, blueprint-diagram visual language, and it
 * means no scene lighting has to be computed every frame, which is most of
 * why this stays smooth on a mid-range phone. */
function Corridor() {
  return (
    <group>
      {/* Right-of-way strip - the actual easement width around the buried
          asset, distinct from the pipeline centreline itself. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]}>
        <planeGeometry args={[CORRIDOR_LENGTH + 3, 2.6]} />
        <meshBasicMaterial color={COLOR.accent} transparent opacity={0.05} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[CORRIDOR_LENGTH + 4, 0.9]} />
        <meshBasicMaterial color={COLOR.lineStrong} transparent opacity={0.5} />
      </mesh>
      {/* pipeline centreline (the buried asset itself, shown at grade for
          legibility) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[CORRIDOR_LENGTH, 0.18, 0.18]} />
        <meshBasicMaterial color={COLOR.card} />
      </mesh>
      {/* refinery / offtake cluster at the corridor's far end */}
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

/** Scattered low-poly trees (cone + cylinder) along one side of the ROW -
 * the vegetation a real pipeline corridor runs through, and the reason
 * vegetation stress is one of the surface signals worth watching. */
function Vegetation() {
  const trees = useMemo(() => {
    const t: { x: number; z: number; s: number }[] = [];
    for (let x = -CORRIDOR_LENGTH / 2 + 1; x < CORRIDOR_LENGTH / 2 - 2; x += 1.6) {
      if (Math.abs(x - LEAK_X) < 1.2) continue; // keep the leak point clear
      t.push({ x: x + (Math.random() - 0.5) * 0.4, z: 1.6 + Math.random() * 0.9, s: 0.7 + Math.random() * 0.5 });
    }
    return t;
  }, []);
  return (
    <group>
      {trees.map((tree, i) => (
        <group key={i} position={[tree.x, 0, tree.z]} scale={tree.s}>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.03, 0.04, 0.36, 5]} />
            <meshBasicMaterial color={COLOR.line} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <coneGeometry args={[0.22, 0.5, 6]} />
            <meshBasicMaterial color={COLOR.vegetation} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** A small cultivated patch on the other side of the ROW - crops are
 * exactly the kind of land use a real gas transmission or CGD corridor
 * runs alongside. */
function CropField() {
  const rows = useMemo(() => {
    const cells: [number, number][] = [];
    for (let x = -3; x <= 3; x += 0.5) {
      for (let z = -2.6; z >= -3.6; z -= 0.5) {
        cells.push([x, z]);
      }
    }
    return cells;
  }, []);
  return (
    <group position={[-2, 0, 0]}>
      {rows.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.06, z]}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshBasicMaterial color={COLOR.crop} />
        </mesh>
      ))}
    </group>
  );
}

/** A highway running parallel to the ROW with a couple of cars in
 * continuous motion - the real-world traffic and land use a pipeline
 * corridor has to be inspected around, not in isolation. */
function Highway() {
  const car1 = useRef<THREE.Mesh>(null);
  const car2 = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (car1.current) car1.current.position.x = ((t * 2.2) % (CORRIDOR_LENGTH + 6)) - (CORRIDOR_LENGTH / 2 + 3);
    if (car2.current)
      car2.current.position.x = CORRIDOR_LENGTH / 2 + 3 - (((t * 1.7) % (CORRIDOR_LENGTH + 6)));
  });
  return (
    <group position={[0, 0, -3.4]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[CORRIDOR_LENGTH + 6, 1.1]} />
        <meshBasicMaterial color={COLOR.road} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[CORRIDOR_LENGTH + 6, 0.03]} />
        <meshBasicMaterial color={COLOR.roadLine} transparent opacity={0.6} />
      </mesh>
      <mesh ref={car1} position={[0, 0.08, 0.25]}>
        <boxGeometry args={[0.24, 0.1, 0.13]} />
        <meshBasicMaterial color={COLOR.ink} />
      </mesh>
      <mesh ref={car2} position={[0, 0.08, -0.25]}>
        <boxGeometry args={[0.24, 0.1, 0.13]} />
        <meshBasicMaterial color={COLOR.accentHover} />
      </mesh>
    </group>
  );
}

/** Step 0 only - a technician walking the ROW on foot with a handheld
 * detector. This is the baseline the rest of the scene is measured
 * against: slow, linear, and covering a small fraction of the corridor
 * in the time it takes a drone to cover all of it. */
function WalkingInspector({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Mesh>(null);
  const legR = useRef<THREE.Mesh>(null);
  const start = -CORRIDOR_LENGTH / 2 + 1;
  const span = 3.4;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const progress = (Math.sin(t * 0.25) + 1) / 2;
    group.current.position.x = start + progress * span;
    const walk = Math.sin(t * 6);
    if (legL.current) legL.current.rotation.x = walk * 0.5;
    if (legR.current) legR.current.rotation.x = -walk * 0.5;
  });

  // Conditionally unmounted (not just hidden) so its <Html> label - which
  // does not track an Object3D's imperative `.visible` toggle - actually
  // disappears once the manual-patrol step ends.
  if (!active) return null;

  return (
    <group ref={group} position={[start, 0, 0.5]}>
      <mesh position={[0, 0.62, 0]}>
        <capsuleGeometry args={[0.09, 0.28, 4, 8]} />
        <meshBasicMaterial color={COLOR.ink} />
      </mesh>
      <mesh position={[0, 0.86, 0]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshBasicMaterial color={COLOR.inkMuted} />
      </mesh>
      <mesh ref={legL} position={[-0.05, 0.32, 0]}>
        <boxGeometry args={[0.06, 0.36, 0.06]} />
        <meshBasicMaterial color={COLOR.inkMuted} />
      </mesh>
      <mesh ref={legR} position={[0.05, 0.32, 0]}>
        <boxGeometry args={[0.06, 0.36, 0.06]} />
        <meshBasicMaterial color={COLOR.inkMuted} />
      </mesh>
      {/* handheld gas detector wand */}
      <mesh position={[0.16, 0.5, 0.1]} rotation={[0.3, 0, 0.2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 6]} />
        <meshBasicMaterial color={COLOR.amber} />
      </mesh>
      <Html position={[0, 1.15, 0]} center distanceFactor={9} occlude={false}>
        <div className="whitespace-nowrap rounded-full border border-line-strong bg-card/95 px-2.5 py-1 font-sans text-[9px] font-medium text-ink-secondary shadow-lg">
          Manual foot patrol · handheld detector
        </div>
      </Html>
    </group>
  );
}

function Drone({
  step,
  onTelemetry,
}: {
  step: SimStep;
  onTelemetry: (t: Telemetry) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const lastEmit = useRef(0);
  const rotorRefs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];
  const flying = step >= 1;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      if (flying) {
        const x = Math.sin(t * 0.28) * (CORRIDOR_LENGTH / 2 - 0.5);
        group.current.position.x = x;
        group.current.position.y = 1.5 + Math.sin(t * 1.6) * 0.06;
        group.current.rotation.z = Math.cos(t * 0.28) > 0 ? -0.08 : 0.08;
        group.current.visible = true;

        if (t - lastEmit.current > 0.2) {
          lastEmit.current = t;
          onTelemetry({
            lat: BASE_LAT + x * 0.00065,
            lon: BASE_LON + Math.cos(t * 0.1) * 0.0004,
            altitudeM: 42 + Math.sin(t * 0.5) * 3,
            speedKmh: 27 + Math.sin(t * 0.9) * 4,
            rtkFixed: true,
            tempC: 31 + Math.sin(t * 0.15) * 2.5,
            humidityPct: 58 + Math.cos(t * 0.12) * 6,
          });
        }
      } else {
        // Parked on its launch pad near the start of the corridor before
        // step 1 - visible, but not yet flying.
        group.current.position.set(-CORRIDOR_LENGTH / 2 - 1, 0.22, 1);
        group.current.rotation.z = 0;
        group.current.visible = true;
      }
    }
    rotorRefs.forEach((r) => {
      if (r.current) r.current.rotation.y += flying ? 0.9 : 0.15;
    });
  });

  return (
    <group ref={group} position={[0, 1.5, 0]}>
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
      {/* downward scan cone - amber while surveying, red once it is over an
          active anomaly */}
      {flying && (
        <mesh position={[0, -0.75, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.2, 1.3, 12, 1, true]} />
          <meshBasicMaterial
            color={step >= 3 ? COLOR.accent : COLOR.amber}
            transparent
            opacity={0.14}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      {flying && (
        <Html position={[0, 0.45, 0]} center distanceFactor={9} occlude={false}>
          <div className="whitespace-nowrap rounded-full border border-accent/40 bg-card/95 px-2.5 py-1 font-sans text-[9px] font-medium text-ink-secondary shadow-lg">
            Sentrix drone · RTK fix
          </div>
        </Html>
      )}
    </group>
  );
}

function EvidenceMarkers({ step }: { step: SimStep }) {
  return (
    <>
      {MARKER_X.map((x, i) => {
        const isLeak = x === LEAK_X;
        const revealed = step >= 2 && !isLeak;
        const leakRevealed = isLeak && step >= 3;
        const shown = revealed || leakRevealed;
        const decided = isLeak && step >= 4;
        if (!shown) return null;
        return (
          <group key={x} position={[x, 0.05, i % 2 === 0 ? 0.22 : -0.22]}>
            <mesh scale={decided ? 1.4 : 1}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial
                color={decided ? COLOR.accentHover : isLeak ? COLOR.accent : COLOR.ink}
                transparent
                opacity={isLeak ? 1 : 0.7}
              />
            </mesh>
            {decided && (
              <Html position={[0, 0.5, 0]} center distanceFactor={9} occlude={false}>
                <div className="whitespace-nowrap rounded-full border border-accent/50 bg-card/95 px-2.5 py-1 font-sans text-[9px] font-semibold text-accent shadow-lg">
                  Anomaly · thermal + methane signature
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </>
  );
}

/** A soft, expanding translucent plume at the leak point - only appears
 * from the "anomaly detected" step onward. Several overlapping low-poly
 * spheres rather than a particle system, to stay cheap. */
function LeakPlume({ step }: { step: SimStep }) {
  const group = useRef<THREE.Group>(null);
  const visible = step >= 3;
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const s = 0.5 + Math.sin(t * 1.2 + i) * 0.15 + i * 0.12;
      child.scale.setScalar(visible ? s : 0.001);
    });
  });
  return (
    <group ref={group} position={[LEAK_X, 0.25, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, i * 0.18, 0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial color={COLOR.amber} transparent opacity={0.14} />
        </mesh>
      ))}
    </group>
  );
}

function DataLinks({ step }: { step: SimStep }) {
  const points = useMemo(
    () =>
      [LEAK_X, -1, -4.5].map(
        (x) =>
          [
            [x, 0.05, 0],
            SENTRIX_POS,
          ] as [number, number, number][],
      ),
    [],
  );
  if (step < 4) return null;
  return (
    <>
      {points.map((pts, i) => (
        <Line key={i} points={pts} color={COLOR.accent} transparent opacity={0.35} lineWidth={1} />
      ))}
    </>
  );
}

/** The AI decision layer - previously an unlabelled wireframe icosahedron
 * that read as an arbitrary "hexagon box." Rebuilt as a plain glowing
 * sphere with an orbiting ring and a persistent, unambiguous label, so
 * what it represents is never in question. */
function SentrixNode({ step }: { step: SimStep }) {
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const active = step >= 4;
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (core.current) {
      const pulse = active ? 1 + Math.sin(t * 3) * 0.1 : 1;
      core.current.scale.setScalar(pulse);
    }
    if (ring.current) {
      ring.current.rotation.z += active ? 0.02 : 0.004;
      ring.current.rotation.x = Math.PI / 2.4;
    }
  });
  return (
    <group position={SENTRIX_POS}>
      <mesh ref={core}>
        <sphereGeometry args={[0.26, 20, 20]} />
        <meshBasicMaterial color={active ? COLOR.accent : COLOR.lineStrong} transparent opacity={0.9} />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[0.42, 0.012, 8, 40]} />
        <meshBasicMaterial color={active ? COLOR.accentHover : COLOR.line} transparent opacity={0.8} />
      </mesh>
      <Html position={[0, 0.7, 0]} center distanceFactor={9} occlude={false}>
        <div className="whitespace-nowrap rounded-full border border-accent/40 bg-card/95 px-2.5 py-1 font-sans text-[9px] font-semibold text-ink shadow-lg">
          Sentrix AI · decision engine
        </div>
      </Html>
    </group>
  );
}

function SceneContents({
  step,
  autoRotate,
  onTelemetry,
}: {
  step: SimStep;
  autoRotate: boolean;
  onTelemetry: (t: Telemetry) => void;
}) {
  return (
    <>
      <color attach="background" args={[COLOR.base]} />
      <fog attach="fog" args={[COLOR.base, 12, 32]} />
      <Grid
        position={[0, -0.03, 0]}
        args={[40, 40]}
        cellSize={1}
        cellThickness={0.5}
        cellColor={COLOR.line}
        sectionSize={5}
        sectionThickness={0.8}
        sectionColor={COLOR.lineStrong}
        fadeDistance={28}
        fadeStrength={1}
        infiniteGrid
      />
      <Corridor />
      <Vegetation />
      <CropField />
      <Highway />
      <WalkingInspector active={step === 0} />
      <Drone step={step} onTelemetry={onTelemetry} />
      <EvidenceMarkers step={step} />
      <LeakPlume step={step} />
      <DataLinks step={step} />
      <SentrixNode step={step} />
      <OrbitControls
        enablePan={false}
        minDistance={7}
        maxDistance={22}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        makeDefault
      />
    </>
  );
}

export function DroneSimScene({
  step,
  reducedMotion,
  onTelemetry,
}: {
  step: SimStep;
  reducedMotion: boolean;
  onTelemetry: (t: Telemetry) => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [3, 7, 15], fov: 40 }}
      gl={{ antialias: true, powerPreference: 'low-power' }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <SceneContents step={step} autoRotate={!reducedMotion} onTelemetry={onTelemetry} />
    </Canvas>
  );
}
