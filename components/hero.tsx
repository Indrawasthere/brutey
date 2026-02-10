"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import dynamic from "next/dynamic";

// ═══════════════════════════════════════════════════════════════
// LAZY LOAD 3D - Hanya jalan di Desktop
// ═══════════════════════════════════════════════════════════════
const Hero3D = dynamic(
  () => import("./hero-3d").then((m) => ({ default: m.Hero3D })),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background" />,
  },
);

// ═══════════════════════════════════════════════════════════════
// HELPER HOOKS (Hydration Safe)
// ═══════════════════════════════════════════════════════════════
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [load3D, setLoad3D] = useState(false);

  // Hook Window & Media
  const { width } = useWindowSize();
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const isLandscape = useMediaQuery(
    "(orientation: landscape) and (max-height: 500px)",
  );

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Responsive logic
  const isMobile = isMounted ? width < 768 : false;
  const isTablet = isMounted ? width >= 768 && width < 1024 : false;
  const isSmallMobile = isMounted ? width < 640 : false;
  const shouldUse3D =
    isMounted && !isMobile && !isTablet && !prefersReducedMotion;

  // useScroll Fix (Cek target hanya jika mounted)
  const { scrollYProgress } = useScroll({
    target: isMounted ? (containerRef as any) : undefined,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Trigger 3D Loading
  useEffect(() => {
    if (shouldUse3D) {
      const timer = setTimeout(() => setLoad3D(true), 800);
      return () => clearTimeout(timer);
    }
  }, [shouldUse3D]);

  // Safety Return (SSR/Loading state)
  if (!isMounted) {
    return <section className="h-screen w-full bg-background" />;
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* 1. LARGE TYPOGRAPHY - Desktop Only */}
      {!isMobile && (
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none select-none hidden sm:flex"
        >
          <h1 className="font-serif text-center text-[12vw] lg:text-[18vw] leading-[0.75] font-bold tracking-tighter uppercase text-foreground/80">
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
              className="block"
            >
              MUHAMMAD
            </motion.span>
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4,
              }}
              className="block italic font-light text-primary brightness-110"
            >
              FADLAN
            </motion.span>
          </h1>
        </motion.div>
      )}

      {/* 2. MOBILE TITLE */}
      {isMobile && (
        <motion.div
          style={{ opacity }}
          className="absolute top-24 left-0 right-0 z-30 pointer-events-none"
        >
          <h1 className="font-serif text-center px-6">
            <span className="block text-5xl font-bold tracking-tight text-white/90 uppercase">
              MUHAMMAD
            </span>
            <span className="block text-6xl font-light italic text-primary brightness-110 -mt-2">
              FADLAN
            </span>
          </h1>
        </motion.div>
      )}

      {/* 3. 3D OR STATIC FALLBACK */}
      {shouldUse3D && load3D ? (
        <motion.div style={{ y: yParallax }} className="absolute inset-0 z-10">
          <Hero3D
            scrollProgress={smoothProgress}
            isMobile={false}
            yParallax={yParallax}
            load3D={true}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ y: yParallax }}
        >
          <img
            src="/knight-poster.webp"
            alt="Knight Fallback"
            className="w-full h-full object-cover opacity-60 grayscale"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        </motion.div>
      )}

      {/* 4. GLASS CARD INFO */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-end py-20 px-6 pointer-events-none"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-lg pointer-events-auto backdrop-blur-sm bg-card/40 border border-white/10 p-6 rounded-2xl text-center shadow-2xl"
        >
          <p className="text-white/80 font-sans text-lg font-medium">
            I'm Fadlan
          </p>
          <p className="mt-3 text-white/60 text-sm leading-relaxed">
            Just a guy addicted to code, turning caffeine and tears into
            production-grade systems.
          </p>
          <div className="grid grid-cols-2 gap-4 border-t border-border/30 pt-4 mt-6">
            <div className="text-center">
              <span className="text-[8px] text-white/40 block uppercase tracking-widest">
                Location
              </span>
              <span className="text-xs text-white">JAKARTA, ID</span>
            </div>
            <div className="text-center">
              <span className="text-[8px] text-white/40 block uppercase tracking-widest">
                Specialization
              </span>
              <span className="text-xs text-primary uppercase">
                Software Engineering
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 5. VIGNETTE OVERLAY */}
      <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_90%)]" />
    </section>
  );
}
