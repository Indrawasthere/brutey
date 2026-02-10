"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? (containerRef as any) : undefined,
    offset: ["start start", "end start"],
  });

  // Animasi Parallax & Opacity
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateDecorative = useTransform(scrollYProgress, [0, 1], [0, 20]);

  if (!isMounted) return <section className="h-screen w-full bg-[#050505]" />;

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#050505] flex flex-col items-center justify-center"
    >
      {/* 1. GRAIN OVERLAY - Biar background hitamnya nggak flat */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 2. BRUTALIST DECORATIVE ELEMENTS (Supportive Elements) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Outline Lingkaran Raksasa */}
        <motion.div
          style={{ rotate: rotateDecorative }}
          className="absolute top-[-10%] left-[-10%] w-[120vw] h-[120vw] border-[1px] border-white/[0.03] rounded-full"
        />

        {/* Outline Kotak / Grid (Medieval Architecture Vibe) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[90vw] h-[80vh] border-x border-white/[0.02] flex justify-between px-[20vw]">
            <div className="w-[1px] h-full bg-white/[0.01]" />
            <div className="w-[1px] h-full bg-white/[0.01]" />
          </div>
        </div>

        {/* Floating Roman Numerals (Outline Style) */}
        <motion.div
          style={{ y: yParallax, opacity: 0.05 }}
          className="absolute bottom-10 right-10 text-[20vw] font-serif font-black italic text-transparent stroke-white"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
        >
          MMXXVI
        </motion.div>
      </div>

      {/* 3. MAIN TITLE - Typografi yang lu mau (Bold & Italic Layered) */}
      <motion.div
        style={{ opacity, y: yParallax }}
        className="relative z-30 flex flex-col items-center justify-center pointer-events-none select-none w-full"
      >
        <h1 className="font-serif text-center uppercase leading-[0.75]">
          <motion.span
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="block font-bold tracking-tighter text-[17vw] md:text-[14vw] lg:text-[18vw] text-white/90"
          >
            MUHAMMAD
          </motion.span>

          <motion.span
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="block italic font-light text-primary brightness-125 text-[19vw] md:text-[16vw] lg:text-[20vw] -mt-[5vw]"
          >
            FADLAN
          </motion.span>
        </h1>
      </motion.div>

      {/* 4. RESTORED GLASS CARD - Persis Layout Awal Lu */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-40 flex flex-col items-center justify-end pb-[8vh] px-6 pointer-events-none"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-lg pointer-events-auto backdrop-blur-md bg-white/[0.03] border border-white/10 p-6 rounded-2xl text-center shadow-2xl"
        >
          <p className="text-white/80 font-sans text-lg font-medium">
            I'm Fadlan
          </p>
          <p className="mt-3 text-white/60 text-sm leading-relaxed">
            Just a guy addicted to code, turning caffeine and tears into
            production-grade systems.
          </p>

          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-6">
            <div className="text-center">
              <span className="text-[8px] text-white/40 block uppercase tracking-[0.2em] mb-1">
                Location
              </span>
              <span className="text-xs text-white tracking-tight">
                JAKARTA, ID
              </span>
            </div>
            <div className="text-center">
              <span className="text-[8px] text-white/40 block uppercase tracking-[0.2em] mb-1">
                Specialization
              </span>
              <span className="text-xs text-primary uppercase font-medium">
                Software Engineering
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 5. VIGNETTE OVERLAY */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)]" />
    </section>
  );
}
