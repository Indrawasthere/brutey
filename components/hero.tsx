"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { KnightKTP } from "./KnightKTP";

// Custom hook buat window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// Custom hook buat media query
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

function Knight3D({
  scrollProgress,
  isMobile,
}: {
  scrollProgress: any;
  isMobile: boolean;
}) {
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

  // Media queries & window size
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isSmallMobile = width < 640;
  const isLandscape = useMediaQuery(
    "(orientation: landscape) and (max-height: 500px)",
  );
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* LARGE TYPOGRAPHY - Hidden on small mobile, shown sm+ */}
      <motion.div
        style={{ opacity }}
        className="hidden sm:flex absolute inset-0 z-0 flex-col items-center justify-center pointer-events-none select-none"
      >
        <h1 className="font-serif text-center text-[12vw] sm:text-[14vw] md:text-[16vw] lg:text-[18vw] leading-[0.85] sm:leading-[0.8] md:leading-[0.75] font-bold tracking-tighter uppercase text-foreground/80">
          <motion.span
            initial={
              prefersReducedMotion ? { opacity: 1 } : { y: 80, opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3,
            }}
            className="block"
          >
            MUHAMMAD
          </motion.span>
          <motion.span
            initial={
              prefersReducedMotion ? { opacity: 1 } : { y: 60, opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.4,
            }}
            className="block italic font-light text-primary brightness-110"
          >
            FADLAN
          </motion.span>
        </h1>
      </motion.div>

      {/* MOBILE-ONLY TITLE - Compact positioning */}
      <motion.div
        style={{ opacity }}
        className="sm:hidden absolute top-24 left-0 right-0 z-30 pointer-events-none"
      >
        <h1 className="font-serif text-center px-6">
          <motion.span
            initial={
              prefersReducedMotion ? { opacity: 1 } : { x: -30, opacity: 0 }
            }
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            className="block text-5xl font-bold tracking-tight text-white/90 uppercase"
          >
            MUHAMMAD
          </motion.span>
          <motion.span
            initial={
              prefersReducedMotion ? { opacity: 1 } : { x: -30, opacity: 0 }
            }
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3,
            }}
            className="block text-6xl font-light italic text-primary brightness-110 -mt-2"
          >
            FADLAN
          </motion.span>
        </h1>

        {/* Mobile subtitle */}
        <motion.p
          initial={
            prefersReducedMotion ? { opacity: 1 } : { y: 20, opacity: 0 }
          }
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: 0.5,
          }}
          className="mt-3 text-center text-sm text-white/50 tracking-widest uppercase font-sans"
        ></motion.p>
      </motion.div>

      {/* 3D MODEL - Responsive camera & performance */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 z-10">
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
          <Knight3D scrollProgress={smoothProgress} isMobile={isMobile} />
        </Canvas>
      </motion.div>

      {/* UI OVERLAY */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-between py-12 sm:py-20 px-4 sm:px-6 pointer-events-none"
      >
        {/* Top indicator - Hidden on landscape mobile */}
        {!isLandscape && (
          <div className="flex flex-col items-center gap-2">
            <span className="label-caps text-accent/60 text-[9px] sm:text-[10px] tracking-wider">
              Portfolio Volume I
            </span>
            <div className="h-8 sm:h-10 w-px bg-gradient-to-b from-primary to-transparent" />
          </div>
        )}

        {/* GLASS CARD - Responsive padding & spacing */}
        <div
          className={`w-full max-w-lg pointer-events-auto px-4 sm:px-0 ${
            isLandscape
              ? "mt-auto mb-2"
              : isSmallMobile
                ? "mt-auto mb-20"
                : "mt-auto mb-4"
          }`}
          style={{ isolation: "isolate" }}
        >
          <motion.div
            initial={
              prefersReducedMotion ? { opacity: 1 } : { y: 30, opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.6,
            }}
            className="relative overflow-hidden backdrop-blur-sm bg-card/40 border border-white/10 p-5 sm:p-6 rounded-2xl text-center shadow-2xl"
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          >
            {/* Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Intro */}
            <p className="relative z-10 text-white/80 font-sans text-sm sm:text-base md:text-lg font-medium">
              I'm Fadlan
            </p>

            {/* Main tagline */}
            <p className="relative z-10 mt-3 text-white/60 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
              Just a guy addicted to code, turning caffeine and tears into
              production-grade systems.
            </p>

            {/* Role line */}
            <p className="relative z-10 mt-2 text-white/40 text-[10px] sm:text-xs tracking-wide">
              Software Engineer focused on what actually works.
            </p>

            {/* Meta - Responsive grid */}
            <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 border-t border-border/30 pt-4 mt-5 sm:mt-6">
              <div className="text-center">
                <span className="label-caps text-white/40 text-[7px] sm:text-[8px] block mb-1">
                  Location
                </span>
                <span className="font-technical text-white text-[11px] sm:text-xs">
                  JAKARTA, ID
                </span>
              </div>
              <div className="text-center">
                <span className="label-caps text-white/40 text-[7px] sm:text-[8px] block mb-1">
                  Specialization
                </span>
                <span className="font-technical text-primary text-[11px] sm:text-xs uppercase tracking-wider">
                  Software Engineering
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - Hidden in landscape, adjusted spacing */}
        {!isLandscape && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`flex flex-col items-center gap-3 ${
              isSmallMobile ? "mt-4" : "mt-6 md:mt-10"
            } mb-safe`}
            aria-label="Scroll down"
          >
            <span className="label-caps text-white/30 text-[8px] sm:text-[9px] tracking-widest">
              SCROLL TO INITIATE
            </span>
            <div className="w-5 h-8 border border-border/50 rounded-full flex justify-center p-1">
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-1.5 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_90%)]" />
    </section>
  );
}
