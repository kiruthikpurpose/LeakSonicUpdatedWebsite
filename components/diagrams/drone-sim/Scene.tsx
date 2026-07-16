'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Line, Html, Instances, Instance } from '@react-three/drei';
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
  crop: '#42562F',
  road: '#232328',
  roadEdge: '#4A4A52',
};

const CORRIDOR_LENGTH = 22;
const HALF = CORRIDOR_LENGTH / 2;

// Two distinct finding types, each revealed once the drone's flight
// progress actually reaches that point along the corridor - not on a
// fixed timer - so the visual, the HUD, and the narrative step always
// agree on what the drone has and hasn't covered yet.
const ENCROACHMENT_PROGRESS = 0.22;
const LEAK_PROGRESS = 0.52;
const ENCROACHMENT_X = -HALF + ENCROACHMENT_PROGRESS * CORRIDOR_LENGTH;
const LEAK_X = -HALF + LEAK_PROGRESS * CORRIDOR_LENGTH;
const SENTRIX_POS: [number, number, number] = [HALF + 3, 1.6, -1.4];

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
        <planeGeometry args={[CORRIDOR_LENGTH + 3, 2.4]} />
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
      <group position={[HALF + 1.4, 0, 0]}>
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

/** Scattered low-poly trees on the far side of the ROW from the road - one
 * instanced draw call each for trunks and canopies instead of one mesh per
 * tree, which is most of what keeps this cheap on a phone GPU. */
function Vegetation() {
  const trees = useMemo(() => {
    const t: { x: number; z: number; s: number }[] = [];
    for (let x = -HALF + 1; x < HALF - 2; x += 1.8) {
      if (Math.abs(x - LEAK_X) < 1.2 || Math.abs(x - ENCROACHMENT_X) < 1.2) continue;
      t.push({
        x: x + (((x * 13) % 7) / 7 - 0.5) * 0.5,
        z: 2.5 + ((x * 7) % 5) / 10,
        s: 0.7 + (((x * 17) % 5) / 5) * 0.4,
      });
    }
    return t;
  }, []);
  return (
    <Instances limit={trees.length || 1}>
      <coneGeometry args={[0.22, 0.5, 6]} />
      <meshBasicMaterial color={COLOR.vegetation} />
      {trees.map((tree, i) => (
        <group key={i} position={[tree.x, 0, tree.z]} scale={tree.s}>
          <Instance position={[0, 0.5, 0]} />
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.03, 0.04, 0.36, 5]} />
            <meshBasicMaterial color={COLOR.line} />
          </mesh>
        </group>
      ))}
    </Instances>
  );
}

/** A small cultivated patch, closer to the ROW than the treeline behind
 * it - land use a real gas transmission or CGD corridor runs alongside.
 * One instanced draw call for the whole field regardless of row count. */
function CropField() {
  const cells = useMemo(() => {
    const c: [number, number][] = [];
    for (let x = -3.5; x <= 3.5; x += 0.42) {
      for (let z = 1.1; z <= 1.7; z += 0.32) {
        c.push([x, z]);
      }
    }
    return c;
  }, []);
  return (
    <Instances limit={cells.length}>
      <boxGeometry args={[0.16, 0.1, 0.16]} />
      <meshBasicMaterial color={COLOR.crop} />
      {cells.map(([x, z], i) => (
        <Instance key={i} position={[x - 2, 0.05, z]} />
      ))}
    </Instances>
  );
}

/** A highway running parallel to the ROW, on the opposite side from the
 * crops and treeline so nothing visually overlaps it, with two cars in
 * continuous motion - the real-world traffic and land use a pipeline
 * corridor has to be inspected around, not in isolation. */
function Highway() {
  const car1 = useRef<THREE.Group>(null);
  const car2 = useRef<THREE.Group>(null);
  const roadZ = -3.6;
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const span = CORRIDOR_LENGTH + 4;
    if (car1.current) car1.current.position.x = ((t * 2.0) % span) - span / 2;
    if (car2.current) car2.current.position.x = span / 2 - ((t * 1.5) % span);
  });
  return (
    <group position={[0, 0, roadZ]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[CORRIDOR_LENGTH + 6, 1.3]} />
        <meshBasicMaterial color={COLOR.road} />
      </mesh>
      {/* shoulder edge lines make the road read clearly as a road, not an
          unexplained dark strip */}
      {[0.6, -0.6].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, z]}>
          <planeGeometry args={[CORRIDOR_LENGTH + 6, 0.025]} />
          <meshBasicMaterial color={COLOR.roadEdge} transparent opacity={0.7} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[CORRIDOR_LENGTH + 6, 0.03]} />
        <meshBasicMaterial color={COLOR.roadEdge} transparent opacity={0.5} />
      </mesh>
      <group ref={car1} position={[0, 0.06, 0.3]}>
        <mesh>
          <boxGeometry args={[0.26, 0.11, 0.15]} />
          <meshBasicMaterial color={COLOR.ink} />
        </mesh>
      </group>
      <group ref={car2} position={[0, 0.06, -0.3]}>
        <mesh>
          <boxGeometry args={[0.26, 0.11, 0.15]} />
          <meshBasicMaterial color={COLOR.accentHover} />
        </mesh>
      </group>
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
  const start = -HALF + 1;
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
  flightProgress,
  onTelemetry,
}: {
  step: SimStep;
  flightProgress: number;
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
  const showLabel = flying && step <= 2;
  const overAnomaly =
    flying &&
    (Math.abs(flightProgress - LEAK_PROGRESS) < 0.02 ||
      Math.abs(flightProgress - ENCROACHMENT_PROGRESS) < 0.02);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      if (flying) {
        // Position is deterministic on the same flight-progress value the
        // HUD's "distance covered" counter uses, not an independent clock -
        // so the drone visually reaches an anomaly at exactly the moment
        // the narrative reveals it, on any device, at any playback speed.
        const x = -HALF + flightProgress * CORRIDOR_LENGTH;
        group.current.position.x = x;
        group.current.position.y = 1.5 + Math.sin(t * 1.6) * 0.06;
        group.current.rotation.z = Math.sin(t * 1.1) * 0.05;
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
        group.current.position.set(-HALF - 1, 0.22, 1);
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
      {/* downward scan cone - amber while surveying, red once directly over
          a flagged point */}
      {flying && (
        <mesh position={[0, -0.75, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.2, 1.3, 12, 1, true]} />
          <meshBasicMaterial
            color={overAnomaly ? COLOR.accent : COLOR.amber}
            transparent
            opacity={overAnomaly ? 0.22 : 0.14}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      {showLabel && (
        <Html position={[0, 0.45, 0]} center distanceFactor={9} occlude={false}>
          <div className="whitespace-nowrap rounded-full border border-accent/40 bg-card/95 px-2.5 py-1 font-sans text-[9px] font-medium text-ink-secondary shadow-lg">
            Sentrix drone · RTK fix
          </div>
        </Html>
      )}
    </group>
  );
}

export type FindingKind = 'leak' | 'encroachment';

function Finding({
  x,
  kind,
  step,
  flightProgress,
  triggerProgress,
}: {
  x: number;
  kind: FindingKind;
  step: SimStep;
  flightProgress: number;
  triggerProgress: number;
}) {
  const revealed = step >= 2 && flightProgress >= triggerProgress;
  const decided = step >= 4 && revealed;
  if (!revealed) return null;

  const isLeak = kind === 'leak';
  const label = isLeak ? 'Leak · thermal + methane signature' : 'ROW encroachment · equipment nearby';

  return (
    <group position={[x, 0.05, isLeak ? 0.22 : -0.22]}>
      <mesh scale={decided ? 1.4 : 1}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color={decided ? COLOR.accentHover : isLeak ? COLOR.accent : COLOR.amber}
          transparent
          opacity={isLeak ? 1 : 0.85}
        />
      </mesh>
      {decided && (
        <Html position={[0, 0.5, 0]} center distanceFactor={9} occlude={false}>
          <div
            className={`whitespace-nowrap rounded-full border bg-card/95 px-2.5 py-1 font-sans text-[9px] font-semibold shadow-lg ${
              isLeak ? 'border-accent/50 text-accent' : 'border-amber-500/40 text-amber-400'
            }`}
          >
            {label}
          </div>
        </Html>
      )}
      {isLeak && <LeakPlume revealed={revealed} />}
    </group>
  );
}

/** A soft, expanding translucent plume - only mounted once its finding is
 * revealed. Three overlapping low-poly spheres rather than a particle
 * system, to stay cheap. */
function LeakPlume({ revealed }: { revealed: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const s = 0.5 + Math.sin(t * 1.2 + i) * 0.15 + i * 0.12;
      child.scale.setScalar(revealed ? s : 0.001);
    });
  });
  return (
    <group ref={group} position={[0, 0.2, 0]}>
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
      [LEAK_X, ENCROACHMENT_X].map(
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
  flightProgress,
  autoRotate,
  onTelemetry,
}: {
  step: SimStep;
  flightProgress: number;
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
        fadeDistance={26}
        fadeStrength={1}
        infiniteGrid
      />
      <Corridor />
      <Vegetation />
      <CropField />
      <Highway />
      <WalkingInspector active={step === 0} />
      <Drone step={step} flightProgress={flightProgress} onTelemetry={onTelemetry} />
      <Finding
        x={ENCROACHMENT_X}
        kind="encroachment"
        step={step}
        flightProgress={flightProgress}
        triggerProgress={ENCROACHMENT_PROGRESS}
      />
      <Finding
        x={LEAK_X}
        kind="leak"
        step={step}
        flightProgress={flightProgress}
        triggerProgress={LEAK_PROGRESS}
      />
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
  flightProgress,
  reducedMotion,
  onTelemetry,
}: {
  step: SimStep;
  flightProgress: number;
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
      <SceneContents
        step={step}
        flightProgress={flightProgress}
        autoRotate={!reducedMotion}
        onTelemetry={onTelemetry}
      />
    </Canvas>
  );
}
