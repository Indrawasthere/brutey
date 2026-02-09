"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useProgress,
  Html,
} from "@react-three/drei";
import { KnightKTP } from "./KnightKTP";

// Loading component untuk 3D
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-400 border-t-transparent rounded-full animate-spin mb-2" />
        <div className="text-white text-xs font-mono">
          LOADING KNIGHT {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
}

// Knight 3D Scene Component dengan posisi portrait
function Knight3D({ scrollProgress }: { scrollProgress: any }) {
  return (
    <>
      {/* Lighting untuk portrait KTP */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[0, 3, 5]} // Cahaya dari depan atas
        intensity={1.5}
        castShadow
      />
      <directionalLight
        position={[-2, 2, 3]} // Fill light dari kiri
        intensity={0.5}
        color="#4ecdc4"
      />
      <directionalLight
        position={[2, 2, 3]} // Fill light dari kanan
        intensity={0.5}
        color="#ff6b6b"
      />

      {/* Knight Model - Portrait KTP Style */}
      <Suspense fallback={<Loader />}>
        <group position={[0, 0, 0]}>
          <KnightKTP
            showFullBody={false}
            animation="Idle"
            position={[0, -0.2, 0]} // Naikkan posisi
            rotation={[0, Math.PI, 0]} // Hadap ke depan
            scale={2.2} // Scale lebih besar untuk portrait
          />
        </group>
      </Suspense>

      {/* Simple background plane */}
      <mesh position={[0, -1, -2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="#0a0a0a" opacity={0.5} transparent />
      </mesh>

      {/* Orbit Controls dengan batasan ketat untuk portrait */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.2}
        minPolarAngle={Math.PI / 2.5} // Batasi sudut vertikal
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-0.1} // Batasi rotasi horizontal
        maxAzimuthAngle={0.1}
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.3}
      />

      {/* Environment studio untuk lighting soft */}
      <Environment preset="studio" />
    </>
  );
}

// Main Hero Component
export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax & Smooth Transitions
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const yParallax = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? -80 : -120]),
    springConfig,
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: {
      clipPath: "inset(100% 0 0 0)",
      y: 50,
      opacity: 0,
    },
    visible: {
      clipPath: "inset(0% 0 0 0)",
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.8 },
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff22 1px, transparent 1px),
                             linear-gradient(to bottom, #ffffff22 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Background 3D Scene */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 z-5">
        <Canvas
          camera={{
            position: isMobile ? [0, 0.3, 4.5] : [0, 0.5, 5],
            fov: isMobile ? 40 : 35,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Knight3D scrollProgress={scrollYProgress} />
        </Canvas>
      </motion.div>

      {/* Vignette untuk fokus ke tengah */}
      <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.8)_70%)]" />

      {/* Main Content Layout Portrait */}
      <motion.div
        style={{ opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 h-full container mx-auto px-4 md:px-6 flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Title */}
          <div className="space-y-4 md:space-y-6">
            {/* Portfolio Volume */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="h-px w-16 bg-red-400/30" />
              <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-red-400/70 uppercase">
                PORTFOLIO VOLUME — 02
              </span>
            </motion.div>

            {/* Main Name */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-[15vw] md:text-[8vw] lg:text-[7vw] font-bold leading-[0.85] tracking-tight text-white"
            >
              <span className="block">MUHAMMAD</span>
              <span className="block text-red-400 italic font-light ml-[0.2em]">
                FADLAN
              </span>
            </motion.h1>

            {/* Navigation */}
            <motion.div variants={itemVariants} className="flex gap-8 pt-4">
              <button className="group relative font-mono text-xs md:text-sm uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                ABOUT
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-400 group-hover:w-full transition-all duration-300" />
              </button>
              <button className="group relative font-mono text-xs md:text-sm uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                CONTACT
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-400 group-hover:w-full transition-all duration-300" />
              </button>
            </motion.div>
          </div>

          {/* Right Column - Info Card */}
          <motion.div variants={itemVariants} className="lg:justify-self-end">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 max-w-md">
              {/* Quote */}
              <div className="space-y-6 mb-10">
                <div className="h-px w-12 bg-red-400/50" />
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                  <span className="text-white font-medium italic">
                    Ancient logic
                  </span>{" "}
                  meets modern engineering. Building digital fortresses with
                  deliberate code.
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    LOCATION
                  </span>
                  <p className="text-sm md:text-base font-medium uppercase tracking-wider text-white">
                    JAKARTA, ID
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    SPECIALIZATION
                  </span>
                  <p className="text-sm md:text-base font-medium uppercase tracking-wider text-red-400">
                    SOFTWARE ENG.
                  </p>
                </div>
              </div>

              {/* Years Experience (optional) */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    EXPERIENCE
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">3+</span>
                    <span className="text-xs text-white/60 ml-1">YEARS</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Centered Bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{
            height: [20, 40, 20],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[1px] h-8 bg-gradient-to-b from-transparent via-red-400 to-transparent"
        />
      </div>

      {/* Copyright */}
      <div className="absolute bottom-6 right-6 z-30">
        <span className="font-mono text-[10px] text-white/30">© 2024</span>
      </div>
    </section>
  );
}
