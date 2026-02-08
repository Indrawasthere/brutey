"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useMemo, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { MathUtils, Vector3, TextureLoader } from "three"
import type { Group, Mesh } from "three"
import {
  Float,
  Sparkles,
  useGLTF,
  PerspectiveCamera,
  Environment,
  ContactShadows
} from "@react-three/drei"
import * as THREE from "three"

// Medieval Dark Souls color palette
const DARK_SOULS_COLORS = {
  obsidian: "#0a0a0a",
  darkStone: "#1a1a1a",
  steel: "#4a4a4a",
  darkSteel: "#2a2a2a",
  ember: "#ff6b35",
  fire: "#ff8c42",
  gold: "#ffd700",
  darkGold: "#8b7500",
  blood: "#8b0000",
  fog: "#2c2c2c",
};

// Dark Souls Knight using advanced geometry
function DarkSoulsKnight({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<Group>(null);
  const swordRef = useRef<Group>(null);

  // Animation states
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Battle ready stance animation
      if (isHovered) {
        // Aggressive forward lean
        groupRef.current.rotation.x = MathUtils.lerp(
          groupRef.current.rotation.x,
          -0.1,
          0.1
        );
        groupRef.current.position.z = MathUtils.lerp(
          groupRef.current.position.z,
          0.5,
          0.1
        );
      } else {
        // Idle breathing
        groupRef.current.rotation.x = MathUtils.lerp(
          groupRef.current.rotation.x,
          Math.sin(state.clock.elapsedTime * 0.5) * 0.02,
          0.05
        );
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
        groupRef.current.position.z = MathUtils.lerp(
          groupRef.current.position.z,
          0,
          0.05
        );
      }
    }

    // Sword movement
    if (swordRef.current) {
      if (isHovered) {
        // Raise sword for battle
        swordRef.current.rotation.z = MathUtils.lerp(
          swordRef.current.rotation.z,
          -0.5,
          0.1
        );
        swordRef.current.rotation.x = MathUtils.lerp(
          swordRef.current.rotation.x,
          -0.3,
          0.1
        );
      } else {
        // Sword at rest
        swordRef.current.rotation.z = MathUtils.lerp(
          swordRef.current.rotation.z,
          0,
          0.05
        );
        swordRef.current.rotation.x = MathUtils.lerp(
          swordRef.current.rotation.x,
          0,
          0.05
        );
      }
    }
  });

  // Create realistic PBR materials
  const armorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: DARK_SOULS_COLORS.darkSteel,
        metalness: 0.9,
        roughness: 0.3,
        envMapIntensity: 1,
      }),
    []
  );

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: DARK_SOULS_COLORS.darkGold,
        metalness: 1,
        roughness: 0.2,
        emissive: DARK_SOULS_COLORS.gold,
        emissiveIntensity: isHovered ? 0.3 : 0.1,
      }),
    [isHovered]
  );

  const swordMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: DARK_SOULS_COLORS.steel,
        metalness: 1,
        roughness: 0.1,
        emissive: isHovered ? DARK_SOULS_COLORS.ember : "#000000",
        emissiveIntensity: isHovered ? 0.5 : 0,
      }),
    [isHovered]
  );

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Helmet */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <sphereGeometry args={[0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <primitive object={armorMaterial} attach="material" />
      </mesh>

      {/* Helmet visor */}
      <mesh position={[0, 1.75, 0.3]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.1]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* Torso - Plate Armor */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.7, 0.9, 0.4]} />
        <primitive object={armorMaterial} attach="material" />
      </mesh>

      {/* Shoulder Pauldrons */}
      <mesh position={[-0.45, 1.5, 0]} rotation={[0, 0, 0.3]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <primitive object={armorMaterial} attach="material" />
      </mesh>
      <mesh position={[0.45, 1.5, 0]} rotation={[0, 0, -0.3]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <primitive object={armorMaterial} attach="material" />
      </mesh>

      {/* Belt/Waist */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.42, 0.15, 32]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* Left Arm */}
      <group position={[-0.5, 1.2, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 16]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
        {/* Left Gauntlet */}
        <mesh position={[0, -0.7, 0]} castShadow>
          <boxGeometry args={[0.15, 0.2, 0.15]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
      </group>

      {/* Right Arm with Sword */}
      <group position={[0.5, 1.2, 0]} ref={swordRef}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 16]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
        {/* Right Gauntlet */}
        <mesh position={[0, -0.7, 0]} castShadow>
          <boxGeometry args={[0.15, 0.2, 0.15]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
        {/* Sword Handle */}
        <mesh position={[0, -0.9, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
          <meshStandardMaterial color={DARK_SOULS_COLORS.darkStone} />
        </mesh>
        {/* Sword Blade */}
        <mesh position={[0, -1.5, 0]} rotation={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 1.2, 0.02]} />
          <primitive object={swordMaterial} attach="material" />
        </mesh>
        {/* Sword Guard */}
        <mesh position={[0, -1.05, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <boxGeometry args={[0.05, 0.3, 0.05]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
      </group>

      {/* Legs */}
      <group position={[0, 0.3, 0]}>
        {/* Left Leg */}
        <mesh position={[-0.18, 0, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.12, 0.8, 16]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
        {/* Right Leg */}
        <mesh position={[0.18, 0, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.12, 0.8, 16]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
      </group>

      {/* Cape */}
      <mesh position={[0, 1.2, -0.25]} rotation={[0.2, 0, 0]} castShadow>
        <planeGeometry args={[0.8, 1.2, 10, 10]} />
        <meshStandardMaterial
          color={DARK_SOULS_COLORS.blood}
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
          roughness={0.8}
        />
      </mesh>

      {/* Point lights for ember glow when in battle stance */}
      {isHovered && (
        <>
          <pointLight
            position={[0, 1.5, 0.5]}
            intensity={2}
            distance={3}
            color={DARK_SOULS_COLORS.ember}
          />
          <pointLight
            position={[0.5, -1.5, 0]}
            intensity={3}
            distance={2}
            color={DARK_SOULS_COLORS.fire}
          />
        </>
      )}
    </group>
  );
}

// Castle silhouettes in background
function CastleBackground() {
  const castles = useMemo(() => {
    return [
      // Main central tower
      { pos: [0, -2, -8], scale: [1.5, 6, 1.5], spireHeight: 2 },
      // Left towers
      { pos: [-3, -2.5, -9], scale: [1, 4, 1], spireHeight: 1.5 },
      { pos: [-5.5, -3, -10], scale: [0.8, 3.5, 0.8], spireHeight: 1.2 },
      { pos: [-2, -2.8, -7], scale: [0.7, 3, 0.7], spireHeight: 1 },
      // Right towers
      { pos: [3, -2.5, -9], scale: [1, 4, 1], spireHeight: 1.5 },
      { pos: [5.5, -3, -10], scale: [0.8, 3.5, 0.8], spireHeight: 1.2 },
      { pos: [2, -2.8, -7], scale: [0.7, 3, 0.7], spireHeight: 1 },
    ];
  }, []);

  return (
    <group>
      {castles.map((castle, i) => (
        <group key={i} position={castle.pos as [number, number, number]}>
          {/* Tower body */}
          <mesh>
            <boxGeometry args={castle.scale as [number, number, number]} />
            <meshStandardMaterial
              color={DARK_SOULS_COLORS.obsidian}
              emissive={DARK_SOULS_COLORS.ember}
              emissiveIntensity={i === 0 ? 0.3 : 0.15}
              roughness={0.9}
            />
          </mesh>
          {/* Spire */}
          <mesh position={[0, castle.scale[1] / 2 + castle.spireHeight / 2, 0]}>
            <coneGeometry args={[castle.scale[0] * 0.5, castle.spireHeight, 4]} />
            <meshStandardMaterial
              color={DARK_SOULS_COLORS.darkStone}
              emissive={DARK_SOULS_COLORS.fire}
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Windows with fire glow */}
          {[...Array(3)].map((_, j) => (
            <mesh
              key={j}
              position={[
                0,
                -castle.scale[1] / 2 + j * 1.5 + 0.5,
                castle.scale[2] / 2 + 0.01,
              ]}
            >
              <planeGeometry args={[0.2, 0.4]} />
              <meshBasicMaterial color={DARK_SOULS_COLORS.fire} />
              <pointLight
                position={[0, 0, 0.2]}
                intensity={0.5}
                distance={2}
                color={DARK_SOULS_COLORS.fire}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// Wind particles and embers
function WindParticles({ isHovered }: { isHovered: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 20;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 15;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        // Wind movement
        positions[i] += Math.sin(state.clock.elapsedTime + i) * delta * 0.5;
        positions[i + 1] += Math.cos(state.clock.elapsedTime * 0.5 + i) * delta * 0.3;

        if (isHovered) {
          positions[i + 2] += delta * 2;
        }

        // Reset particles
        if (positions[i] > 10) positions[i] = -10;
        if (positions[i] < -10) positions[i] = 10;
        if (positions[i + 1] > 8) positions[i + 1] = -8;
        if (positions[i + 2] > 5) positions[i + 2] = -10;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={DARK_SOULS_COLORS.ember}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main Scene
function Scene() {
  const [isHovered, setIsHovered] = useState(false);
  const { camera } = useThree();

  useEffect(() => {
    // Global hover detection
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Hover detection in center area
      const distance = Math.sqrt(x * x + y * y);
      setIsHovered(distance < 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Dramatic lighting */}
      <ambientLight intensity={0.2} color={DARK_SOULS_COLORS.ember} />

      {/* Main key light from below (like fire) */}
      <pointLight
        position={[0, -5, 2]}
        intensity={5}
        distance={15}
        color={DARK_SOULS_COLORS.fire}
        castShadow
      />

      {/* Back rim light */}
      <directionalLight
        position={[0, 5, -5]}
        intensity={0.5}
        color={DARK_SOULS_COLORS.gold}
      />

      {/* Side fill lights */}
      <pointLight
        position={[-5, 0, 2]}
        intensity={1}
        distance={10}
        color={DARK_SOULS_COLORS.ember}
      />
      <pointLight
        position={[5, 0, 2]}
        intensity={1}
        distance={10}
        color={DARK_SOULS_COLORS.ember}
      />

      {/* Fog atmosphere */}
      <fog attach="fog" args={[DARK_SOULS_COLORS.obsidian, 5, 20]} />

      {/* Castle background */}
      <CastleBackground />

      {/* Dark Souls Knight */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <DarkSoulsKnight isHovered={isHovered} />
      </Float>

      {/* Ground contact shadow */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.8}
        scale={10}
        blur={2}
        far={4}
        color={DARK_SOULS_COLORS.obsidian}
      />

      {/* Wind and ember particles */}
      <WindParticles isHovered={isHovered} />

      {/* Ember sparkles */}
      <Sparkles
        count={80}
        scale={15}
        size={3}
        speed={0.4}
        opacity={0.4}
        color={DARK_SOULS_COLORS.ember}
        position={[0, -1, -3]}
      />

      {/* Gold sparkles */}
      <Sparkles
        count={40}
        scale={10}
        size={2}
        speed={0.2}
        opacity={0.3}
        color={DARK_SOULS_COLORS.gold}
        position={[0, 1, -2]}
      />
    </>
  );
}

export function Knight3D() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-64 h-64 border-2 border-primary/30 animate-pulse" />
      </div>
    );
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 8], fov: 50 }}
      className="w-full h-full"
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
