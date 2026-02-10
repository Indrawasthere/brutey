"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Preload } from "@react-three/drei";
import { KnightKTP } from "./KnightKTP";

function Knight3D({ scrollProgress }: { scrollProgress: any }) {
  const modelRef = useRef<any>(null);

  const rotationY = useTransform(
    scrollProgress,
    [0, 1],
    [Math.PI, Math.PI + 0.8],
  );
  const positionY = useTransform(scrollProgress, [0, 1], [-0.2, -0.8]);

  useFrame((state) => {
    if (modelRef.current) {
      const t = state.clock.getElapsedTime();
      modelRef.current.position.y = positionY.get() + Math.sin(t * 0.5) * 0.05;
      modelRef.current.rotation.y = rotationY.get();
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 5, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <group ref={modelRef}>
          <KnightKTP showFullBody={false} animation="Idle" scale={2.5} />
        </group>
      </Suspense>
      <Environment preset="studio" />
      <Preload all />
    </>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [textAnimation, setTextAnimation] = useState({
    muhammad: { y: 80, opacity: 0 },
    fadlan: { y: 60, opacity: 0 },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextAnimation({
        muhammad: { y: 0, opacity: 1 },
        fadlan: { y: 0, opacity: 1 },
      });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* TYPOGRAPHY BEHIND */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none select-none"
      >
        <h1 className="font-serif text-[18vw] leading-[0.75] text-center font-bold tracking-tighter uppercase text-foreground/80">
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={textAnimation.muhammad}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            className="block"
          >
            MUHAMMAD
          </motion.span>
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={textAnimation.fadlan}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            className="block italic font-light text-primary brightness-110"
          >
            FADLAN
          </motion.span>
        </h1>
      </motion.div>

      {/* 3D MODEL CENTERED */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 35 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Knight3D scrollProgress={smoothProgress} />
        </Canvas>
      </motion.div>

      {/* UI OVERLAY */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-between py-20 px-6 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="label-caps text-accent/60 text-[10px]!">
            Portfolio Volume I
          </span>
          <div className="h-10 w-px bg-linear-to-b from-primary to-transparent" />
        </div>

        {/* GLASS CARD FIX */}
        <div
          className="w-full max-w-lg mt-auto pointer-events-auto"
          style={{ isolation: "isolate" }}
        >
          <div
            className="relative overflow-hidden backdrop-blur-xs bg-card/40 border border-white/10 p-6 rounded-2xl text-center shadow-2xl transition-all duration-500"
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          >
            {/* Gradient glow subtle */}
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Tagline */}
            <p className="relative z-10 text-white/60 font-sans text-sm md:text-base leading-relaxed">
              Logic-driven software engineering for real-world systems.
            </p>

            {/* Flavor line */}
            <p className="relative z-10 mt-2 text-white/30 text-xs tracking-wide">
              Forged with precision. Built to last.
            </p>

            {/* Meta */}
            <div className="relative z-10 grid grid-cols-2 gap-4 border-t border-border/30 pt-4 mt-6">
              <div className="text-center">
                <span className="label-caps text-white/40 text-[8px]! block">
                  Location
                </span>
                <span className="font-technical text-white text-xs">
                  JAKARTA, ID
                </span>
              </div>
              <div className="text-center">
                <span className="label-caps text-white/40 text-[8px]! block">
                  Specialization
                </span>
                <span className="font-technical text-primary text-xs uppercase tracking-widest">
                  Software Engineering
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 mt-10">
          <span className="label-caps text-white/30 text-[9px]!">
            SCROLL TO INITIATE
          </span>
          <div className="w-5 h-8 border border-border/50 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 bg-primary rounded-full"
            />
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_90%)]" />
    </section>
  );
}
