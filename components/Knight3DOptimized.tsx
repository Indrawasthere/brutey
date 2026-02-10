"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { KnightKTP } from "./KnightKTP";

export default function Knight3DOptimized({ scrollProgress, isMobile }: any) {
  const modelRef = useRef<any>(null);
  const isVisible = useRef(true);

  // Pause animation when not visible
  useFrame((state) => {
    if (!modelRef.current || !isVisible.current) return;

    const t = state.clock.getElapsedTime();
    modelRef.current.position.y = positionY.get() + Math.sin(t * 0.5) * 0.05;
    modelRef.current.rotation.y = rotationY.get();
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 5, 5]} intensity={isMobile ? 1.2 : 1.5} />
      <Suspense fallback={null}>
        <group ref={modelRef}>
          <KnightKTP
            showFullBody={false}
            animation="Idle"
            scale={isMobile ? 2 : 2.5}
          />
        </group>
      </Suspense>
      <Environment preset="studio" />
      <Preload all />
    </>
  );
}
