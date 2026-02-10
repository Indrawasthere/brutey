"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { KnightKTP } from "./KnightKTP";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import dynamic from "next/dynamic";

const Knight3DLazy = dynamic(() => import("./Knight3DOptimized"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
});

function Knight3DInner({
  scrollProgress,
  isMobile,
}: {
  scrollProgress: any;
  isMobile: boolean;
}) {
  const modelRef = useRef<THREE.Group>(null);

  const rotationY = useTransform(
    scrollProgress,
    [0, 1],
    [Math.PI, Math.PI + 0.8],
  );
  const positionY = useTransform(scrollProgress, [0, 1], [-0.2, -0.8]);

  useFrame((state) => {
    if (!modelRef.current) return;

    const t = state.clock.getElapsedTime();

    const currentY = positionY.get();
    const currentRot = rotationY.get();

    if (!isNaN(currentY)) {
      modelRef.current.position.y = currentY + Math.sin(t * 0.5) * 0.05;
    }
    if (!isNaN(currentRot)) {
      modelRef.current.rotation.y = currentRot;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />{" "}
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={1.5} />
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
    </>
  );
}

export function Hero3D({
  scrollProgress,
  isMobile,
  yParallax,
  load3D,
}: {
  scrollProgress: any;
  isMobile: boolean;
  yParallax: any;
  load3D: boolean;
}) {
  if (!load3D) return null;

  return (
    <div className="absolute inset-0 z-10">
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 6 : 5],
          fov: isMobile ? 45 : 35,
        }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "default" : "high-performance",
        }}
      >
        <Knight3DInner scrollProgress={scrollProgress} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
