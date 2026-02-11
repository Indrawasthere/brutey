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

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateDecorative = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const scaleRunes = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  if (!isMounted) return <section className="h-screen w-full bg-[#050505]" />;

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#050505] flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.svg
          style={{ scale: scaleRunes }}
          className="absolute inset-0 w-full h-full opacity-[0.02]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="runes"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <text
                x="50"
                y="50"
                fontFamily="serif"
                fontSize="12"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                ᛉ
              </text>
              <text
                x="20"
                y="20"
                fontFamily="serif"
                fontSize="10"
                fill="white"
                opacity="0.5"
              >
                ᚨ
              </text>
              <text
                x="80"
                y="30"
                fontFamily="serif"
                fontSize="14"
                fill="white"
                opacity="0.3"
              >
                ᛞ
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#runes)" />
        </motion.svg>

        <motion.div
          style={{ rotate: rotateDecorative }}
          className="absolute top-[-10%] left-[-10%] w-[120vw] h-[120vw] border-2 border-white/5 rounded-full"
        />

        <motion.div
          style={{ rotate: rotateDecorative }}
          className="absolute top-[20%] right-[-20%] w-[80vw] h-[80vw] border border-white/3 rounded-full"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[90vw] h-[80vh] border-x border-white/3 flex justify-between px-[20vw]">
            <div className="w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
            <div className="w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
          </div>
        </div>

        <motion.div
          style={{ y: yParallax, opacity: 0.05 }}
          className="absolute bottom-10 right-10 text-[20vw] font-serif font-black italic text-stone-400 opacity-10 outline-1"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
        >
          MMXXVI
        </motion.div>

        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 0.5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[15%] left-[10%] w-0.5 h-15 bg-linear-to-b from-transparent via-white/20 to-transparent"
        />

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -0.5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[25%] right-[15%] w-0.5 h-10 bg-linear-to-b from-transparent via-white/15 to-transparent"
        />
      </div>

      <motion.div
        style={{ opacity, y: yParallax }}
        className="relative z-30 flex flex-col items-center justify-center pointer-events-none select-none w-full"
      >
        <h1 className="font-serif text-center uppercase leading-[0.75]">
          <motion.span
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="block font-black tracking-tighter text-[17vw] md:text-[14vw] lg:text-[18vw] text-white/95 relative"
          >
            <span className="absolute -top-2 -left-2 text-[2vw] text-white/20">
              ⚔
            </span>
            MUHAMMAD
            <span className="absolute -bottom-2 -right-2 text-[2vw] text-white/20">
              ⚔
            </span>
          </motion.span>

          <motion.span
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="block italic font-light text-primary brightness-125 text-[19vw] md:text-[16vw] lg:text-[20vw] -mt-[5vw] relative"
          >
            <motion.span
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -left-4 top-1/2 text-[3vw]"
            >
              †
            </motion.span>
            FADLAN
            <motion.span
              animate={{ opacity: [0.7, 0.3, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute -right-4 top-1/2 text-[3vw]"
            >
              †
            </motion.span>
          </motion.span>
        </h1>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-40 flex flex-col items-center justify-end pb-[8vh] px-6 pointer-events-none"
      >
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{
            scale: 1.02,
            y: -5,
            transition: { duration: 0.3 },
          }}
          className="w-full max-w-lg pointer-events-auto backdrop-blur-md bg-white/3 border border-white/10 p-6 rounded-2xl text-center shadow-2xl relative overflow-hidden group"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 0px rgba(124, 45, 18, 0)",
                "0 0 20px rgba(124, 45, 18, 0.3)",
                "0 0 0px rgba(124, 45, 18, 0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="absolute -top-10 -left-10 w-20 h-20 border border-white/5 rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-24 h-24 border border-white/5 rounded-full" />

          <div className="relative z-10">
            <p className="text-white/90 font-sans text-lg font-medium flex items-center justify-center gap-2">
              <span className="text-xs">⚔</span>
              I'm Fadlan
              <span className="text-xs">⚔</span>
            </p>
            <p className="mt-3 text-white/70 text-sm leading-relaxed">
              Just a guy addicted to code, turning caffeine and tears into
              production-grade systems.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-6">
              <div className="text-center relative">
                <span className="text-[8px] text-white/40 block uppercase tracking-[0.2em] mb-1">
                  Location
                </span>
                <span className="text-xs text-white tracking-tight">
                  JAKARTA, ID
                </span>
              </div>
              <div className="text-center relative">
                <span className="text-[8px] text-white/40 block uppercase tracking-[0.2em] mb-1">
                  Specialization
                </span>
                <span className="text-xs text-primary uppercase font-medium">
                  Software Engineering
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)]" />

      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px rgba(255,255,255,0.02)",
            "0 0 40px rgba(255,255,255,0.05)",
            "0 0 20px rgba(255,255,255,0.02)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-px h-px rounded-full bg-white/5"
      />

      <motion.div
        animate={{
          boxShadow: [
            "0 0 15px rgba(255,255,255,0.01)",
            "0 0 30px rgba(255,255,255,0.03)",
            "0 0 15px rgba(255,255,255,0.01)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-1/3 right-1/3 w-px h-px rounded-full bg-white/5"
      />
    </section>
  );
}
