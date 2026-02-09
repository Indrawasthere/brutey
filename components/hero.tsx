"use client";

import { useRef, Suspense, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Preload } from "@react-three/drei";
import { KnightKTP } from "./KnightKTP";

function Knight3D({ scrollProgress }: { scrollProgress: any }) {
  const modelRef = useRef<any>(null);
  const rotationY = useTransform(
    scrollProgress,
    [0, 1],
    [Math.PI, Math.PI + 0.6],
  );
  const positionY = useTransform(scrollProgress, [0, 1], [-0.2, -0.5]);

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
          <KnightKTP showFullBody={false} animation="Idle" scale={2.2} />
        </group>
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
      />
      <Environment preset="studio" />
      <Preload all />
    </>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="
        relative w-full bg-black
        h-screen
        overflow-hidden
        pt-0 pb-0
      "
    >
      {/* Container Sticky  */}
      <div className="sticky top-0 h-screen w-full">
        {/* Background 3D */}
        <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
          <Canvas
            resize={{ scroll: false }}
            camera={{
              position: isMobile ? [0, 0.3, 4.5] : [0, 0.5, 5],
              fov: isMobile ? 40 : 35,
            }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Knight3D scrollProgress={scrollYProgress} />
          </Canvas>
        </motion.div>

        {/* Overlay Grid & Vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(#ffffff11 1px, transparent 1px), linear-gradient(90deg, #ffffff11 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        {/* Content UI - Hapus container dan gunakan padding langsung */}
        <motion.div
          style={{ opacity, scale }}
          className="relative z-30 w-full h-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Sisi Kiri - Nama */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-red-400/50" />
              <span className="text-xs tracking-[0.4em] text-stone-500 uppercase">
                Portfolio Volume I
              </span>
            </div>
            <h1 className="font-serif text-[12vw] md:text-[7vw] font-bold leading-[0.8] text-white">
              MUHAMMAD <br />
              <span className="text-red-400 italic font-light ml-4">
                FADLAN
              </span>
            </h1>
          </div>

          {/* Sisi Kanan - Info */}
          <div className="lg:justify-self-end">
            <div className="backdrop-blur-md bg-white/[0.02] border border-white/10 p-8 max-w-sm rounded-sm">
              <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
                <span className="text-white italic">Ancient logic</span> meets
                modern engineering. Building digital fortresses.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <span className="block text-[9px] text-white/40 uppercase tracking-tighter">
                    Location
                  </span>
                  <span className="text-xs text-white uppercase font-bold">
                    Jakarta, ID
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] text-white/40 uppercase tracking-tighter">
                    Specialization
                  </span>
                  <span className="text-xs text-red-400 uppercase font-bold">
                    Software Eng
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-10 z-30 flex items-center gap-4">
          <motion.div
            animate={{ height: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] bg-red-400"
          />
          <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase vertical-text">
            Scroll to Dive
          </span>
        </div>
      </div>
    </section>
  );
}
